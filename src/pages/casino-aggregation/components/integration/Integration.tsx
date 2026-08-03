import {
  Boxes,
  Cpu,
  Gamepad2,
  MonitorSmartphone,
  type LucideIcon,
} from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Integration.module.css';

type IntegrationNodeId = 'platform' | 'andes' | 'ecosystem';

type IntegrationNode = {
  id: IntegrationNodeId;
  icon: LucideIcon;
  step: string;
};

const integrationNodes: IntegrationNode[] = [
  { id: 'platform', icon: MonitorSmartphone, step: '01' },
  { id: 'andes', icon: Cpu, step: '02' },
  { id: 'ecosystem', icon: Gamepad2, step: '03' },
];

const capabilityIndexes = [0, 1, 2, 3] as const;

export default function Integration() {
  const { t } = useTranslation('casinoAggregation');
  const [activeNodeId, setActiveNodeId] = useState<IntegrationNodeId>('andes');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeNode =
    integrationNodes.find((node) => node.id === activeNodeId) ?? integrationNodes[1];
  const ActiveIcon = activeNode.icon;

  const selectAndFocusNode = (index: number) => {
    const targetNode = integrationNodes[index];

    if (!targetNode) return;

    setActiveNodeId(targetNode.id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex: number | undefined;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIndex = (index + 1) % integrationNodes.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIndex = (index - 1 + integrationNodes.length) % integrationNodes.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = integrationNodes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectAndFocusNode(targetIndex);
  };

  return (
    <section className={styles.integration} aria-labelledby="integration-title">
      <span className={styles.glowViolet} aria-hidden="true" />
      <span className={styles.glowCyan} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {t('integration.eyebrow')}
            <span aria-hidden="true" />
          </p>
          <h2 className={styles.title} id="integration-title">
            <span>{t('integration.title.primary')}</span>
            <span className={styles.titleAccent}>{t('integration.title.accent')}</span>
          </h2>
          <p className={styles.introduction}>{t('integration.description')}</p>
        </header>

        <div
          className={styles.diagram}
          data-active={activeNodeId}
          aria-label={t('integration.diagramLabel')}
        >
          <div className={styles.flow} role="tablist" aria-label={t('integration.navigationLabel')}>
            {integrationNodes.map((node, index) => {
              const NodeIcon = node.icon;
              const isActive = activeNodeId === node.id;

              return (
                <div className={styles.nodeSlot} data-node={node.id} key={node.id}>
                  {index > 0 && (
                    <span className={styles.connector} data-connector={index} aria-hidden="true">
                      <span className={styles.connectorLine} />
                      <span className={styles.particle} />
                      <span className={styles.arrowForward}>›</span>
                      <span className={styles.arrowBack}>‹</span>
                    </span>
                  )}

                  <button
                    aria-controls="integration-node-panel"
                    aria-selected={isActive}
                    className={styles.node}
                    id={`integration-tab-${node.id}`}
                    onClick={() => setActiveNodeId(node.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                  >
                    <span className={styles.step}>{node.step}</span>
                    <span className={styles.nodeIcon} aria-hidden="true">
                      <NodeIcon strokeWidth={1.6} />
                    </span>
                    <span className={styles.nodeCopy}>
                      <strong>{t(`integration.nodes.${node.id}.title`)}</strong>
                      <small>{t(`integration.nodes.${node.id}.summary`)}</small>
                    </span>
                    <span className={styles.status} aria-hidden="true">
                      <span />
                      {isActive ? t('integration.activeStatus') : t('integration.exploreStatus')}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <article
            aria-labelledby={`integration-tab-${activeNodeId}`}
            className={styles.detailPanel}
            id="integration-node-panel"
            key={activeNodeId}
            role="tabpanel"
            tabIndex={0}
          >
            <div className={styles.detailLead}>
              <span className={styles.detailIcon} aria-hidden="true">
                <ActiveIcon strokeWidth={1.6} />
              </span>
              <div>
                <span className={styles.detailLabel}>{t('integration.detailLabel')}</span>
                <h3>{t(`integration.nodes.${activeNodeId}.title`)}</h3>
                <p>{t(`integration.nodes.${activeNodeId}.description`)}</p>
              </div>
            </div>

            <ul className={styles.capabilities}>
              {capabilityIndexes.map((capabilityIndex) => (
                <li key={capabilityIndex}>
                  <Boxes aria-hidden="true" strokeWidth={1.7} />
                  <span>
                    {t(`integration.nodes.${activeNodeId}.capabilities.${capabilityIndex}`)}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

      </div>
    </section>
  );
}
