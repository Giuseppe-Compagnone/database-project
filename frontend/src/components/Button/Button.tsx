import { ButtonProps } from "./Button.types";
import React, { CSSProperties } from "react";
import cn from "classnames";

const Button = (props: ButtonProps) => {
  const background = props.backgroundColor || "#000";
  const color = props.color || "#fff";

  return (
    <button
      style={{ "--background": background, "--color": color } as CSSProperties}
      className={cn("button", props.className && props.className)}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.text}
    </button>
  );
};

export default Button;
