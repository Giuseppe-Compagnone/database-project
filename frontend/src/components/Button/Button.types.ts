import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
  text: string;
  icon?: IconDefinition;
  backgroundColor?: string;
  color?: string;
  className?: string;
  onClick: () => void;
}
