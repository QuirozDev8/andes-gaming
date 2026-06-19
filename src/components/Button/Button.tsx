import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from "react";
import styles from "./Button.module.css";

type ButtonBaseProps = {
  ariaLabel?: string;
  disabled?: boolean;
  text: string;
}; 

type ButtonAsAnchorProps = ButtonBaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
};

type ButtonAsButtonProps = ButtonBaseProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

function isAnchorButton(props: ButtonProps): props is ButtonAsAnchorProps {
  return "href" in props;
}

function ButtonContent({ text }: { text: string }) {
  return (
    <>
      <strong className={styles.text}>{text}</strong>
      <span className={styles.containerStars} aria-hidden="true">
        <span className={styles.stars} />
      </span>
      <span className={styles.glow} aria-hidden="true">
        <span className={styles.circle} />
        <span className={styles.circle} />
      </span>
    </>
  );
}

export function Button(props: ButtonProps) {
  const { ariaLabel, disabled, text } = props;

  if (isAnchorButton(props)) {
    const { href, onClick, rel, target } = props;

    return (
      <a
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className={styles.button}
        href={disabled ? undefined : href}
        onClick={disabled ? undefined : onClick}
        rel={rel}
        target={target}
      >
        <ButtonContent text={text} />
      </a>
    );
  }

  const { onClick, type = "button" } = props;

  return (
    <button
      aria-label={ariaLabel}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <ButtonContent text={text} />
    </button>
  );
}

export default Button;
