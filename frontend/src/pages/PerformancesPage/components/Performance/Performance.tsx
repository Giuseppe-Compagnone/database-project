import { PerformanceProps } from "./Performance.types";
import React from "react";

const Performance = (props: PerformanceProps) => {
  return (
    <div className="performance">
      <h2 className="title">{props.courseName}</h2>
      <p className="date">{props.date}</p>
      <p className="evaluation">Evaluation: {props.evaluation}</p>
    </div>
  );
};

export default Performance;
