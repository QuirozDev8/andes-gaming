import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const [debugPort = "9223", appPort = "4176"] = process.argv.slice(2);
const qaDir = resolve(".qa");
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
];

const targetUrl = `http://127.0.0.1:${appPort}/productos/game-studio`;
const tab = await fetch(
  `http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(targetUrl)}`,
  { method: "PUT" },
).then((response) => response.json());

const socket = new WebSocket(tab.webSocketDebuggerUrl);
const pending = new Map();
const browserErrors = [];
let commandId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve: resolveCommand, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolveCommand(message.result);
    return;
  }

  if (message.method === "Runtime.exceptionThrown") {
    browserErrors.push(message.params.exceptionDetails.text);
  }

  if (
    message.method === "Runtime.consoleAPICalled" &&
    ["error", "warning"].includes(message.params.type)
  ) {
    browserErrors.push(
      message.params.args.map((argument) => argument.value ?? argument.description).join(" "),
    );
  }
});

await new Promise((resolveSocket, rejectSocket) => {
  socket.addEventListener("open", resolveSocket, { once: true });
  socket.addEventListener("error", rejectSocket, { once: true });
});

function send(method, params = {}) {
  commandId += 1;
  const id = commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolveCommand, reject) => {
    pending.set(id, { resolve: resolveCommand, reject });
  });
}

const wait = (milliseconds) => new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));

await send("Page.enable");
await send("Runtime.enable");

const report = [];

for (const viewport of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: targetUrl });

  let sectionReady = false;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const check = await send("Runtime.evaluate", {
      expression:
        "Boolean(document.querySelector('#original-games-preview')) && document.fonts.status === 'loaded'",
      returnByValue: true,
    });
    if (check.result.value) {
      sectionReady = true;
      break;
    }
    await wait(100);
  }
  if (!sectionReady) throw new Error(`Section did not render at ${viewport.width}px.`);

  await wait(1000);
  const metrics = await send("Runtime.evaluate", {
    expression: `(() => {
      const section = document.querySelector('#original-games-preview');
      section.scrollIntoView({ block: 'start' });
      const rect = section.getBoundingClientRect();
      const scene = section.querySelector('.original-games-preview-scene');
      const desktopPath = section.querySelector('.original-games-preview-orbit-path-desktop');
      const planetSelectors = [
        '.original-games-preview-game-purple .original-games-preview-planet-wrap',
        '.original-games-preview-game-cyan .original-games-preview-planet-wrap',
      ];
      const orbitAlignment = window.innerWidth >= 900 ? planetSelectors.map((selector) => {
        const target = section.querySelector(selector).getBoundingClientRect();
        const center = {
          x: target.left + target.width / 2,
          y: target.top + target.height / 2,
        };
        const pathLength = desktopPath.getTotalLength();
        let nearest = { distance: Number.POSITIVE_INFINITY, x: 0, y: 0 };
        for (let sample = 0; sample <= 500; sample += 1) {
          const point = desktopPath.getPointAtLength((pathLength * sample) / 500);
          const svgPoint = desktopPath.ownerSVGElement.createSVGPoint();
          svgPoint.x = point.x;
          svgPoint.y = point.y;
          const screenPoint = svgPoint.matrixTransform(desktopPath.getScreenCTM());
          const distance = Math.hypot(screenPoint.x - center.x, screenPoint.y - center.y);
          if (distance < nearest.distance) {
            nearest = { distance, x: screenPoint.x, y: screenPoint.y };
          }
        }
        return {
          selector,
          centerX: center.x - scene.getBoundingClientRect().left,
          centerY: center.y - scene.getBoundingClientRect().top,
          nearestPathX: nearest.x - scene.getBoundingClientRect().left,
          nearestPathY: nearest.y - scene.getBoundingClientRect().top,
          distance: nearest.distance,
        };
      }) : [];
      return {
        x: rect.x,
        y: rect.y + window.scrollY,
        width: rect.width,
        height: rect.height,
        viewportWidth: window.innerWidth,
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        classifiedCount: section.querySelectorAll('.original-games-preview-game-classified').length,
        ctaPath: section.querySelector('.original-games-preview-cta-link')?.getAttribute('href'),
        orbitAlignment,
      };
    })()`,
    returnByValue: true,
  });

  const values = metrics.result.value;
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: values.y,
      width: viewport.width,
      height: Math.ceil(values.height),
      scale: 1,
    },
  });
  const screenshotPath = resolve(qaDir, `original-games-${viewport.width}-section.png`);
  await writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));
  report.push({ ...viewport, ...values, screenshotPath });
}

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: targetUrl });
await wait(1200);
await send("Runtime.evaluate", {
  expression: "document.querySelector('.original-games-preview-cta-link').click()",
});
await wait(800);
const interactionResult = await send("Runtime.evaluate", {
  expression: `({
    destination: window.location.pathname + window.location.hash,
    contactFormPresent: Boolean(document.querySelector('#contact-page-form')),
  })`,
  returnByValue: true,
});

const interaction = interactionResult.result.value;

await writeFile(
  resolve(qaDir, "original-games-browser-report.json"),
  JSON.stringify({ report, interaction, browserErrors }, null, 2),
);

socket.close();
console.log(JSON.stringify({ report, interaction, browserErrors }, null, 2));
