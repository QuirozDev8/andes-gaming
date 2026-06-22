import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./BtnElegant.module.css";

type BtnElegantBaseProps = {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  text: string;
};

type BtnElegantAsLinkProps = BtnElegantBaseProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  to: string;
};

type BtnElegantAsAnchorProps = BtnElegantBaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  to?: never;
};

type BtnElegantAsButtonProps = BtnElegantBaseProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: never;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export type BtnElegantProps =
  | BtnElegantAsLinkProps
  | BtnElegantAsAnchorProps
  | BtnElegantAsButtonProps;

function isAnchorButton(props: BtnElegantProps): props is BtnElegantAsAnchorProps {
  return "href" in props;
}

function isLinkButton(props: BtnElegantProps): props is BtnElegantAsLinkProps {
  return "to" in props;
}

function getClassName(className?: string) {
  return [styles.button, className].filter(Boolean).join(" ");
}

function BtnElegantContent({ text }: { text: string }) {
  return (
    <span className={styles.inner}>
      <span className={styles.topWhite} aria-hidden="true" />
      <span className={styles.label}>{text}</span>
      <span className={styles.icon} aria-hidden="true">
        <Rocket strokeWidth={1.8} />
      </span>
    </span>
  );
}

function BtnElegant(props: BtnElegantProps) {
  const { ariaLabel, className, disabled, text } = props;

  if (isLinkButton(props)) {
    const { onClick, to } = props;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    return (
      <Link
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className={getClassName(className)}
        onClick={handleClick}
        tabIndex={disabled ? -1 : undefined}
        to={to}
      >
        <BtnElegantContent text={text} />
      </Link>
    );
  }

  if (isAnchorButton(props)) {
    const { href, onClick, rel, target } = props;

    return (
      <a
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className={getClassName(className)}
        href={disabled ? undefined : href}
        onClick={disabled ? undefined : onClick}
        rel={rel}
        tabIndex={disabled ? -1 : undefined}
        target={target}
      >
        <BtnElegantContent text={text} />
      </a>
    );
  }

  const { onClick, type = "button" } = props;

  return (
    <button
      aria-label={ariaLabel}
      className={getClassName(className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <BtnElegantContent text={text} />
    </button>
  );
}

export default BtnElegant;
