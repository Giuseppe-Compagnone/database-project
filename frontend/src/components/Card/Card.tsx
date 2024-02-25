import React from "react";
import { SignUpPageProps } from "./Card.types";

const Card = (props: SignUpPageProps) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
