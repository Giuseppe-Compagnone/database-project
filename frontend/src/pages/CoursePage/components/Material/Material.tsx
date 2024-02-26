import { Button } from "../../../../components";
import { MaterialProps } from "./Material.types";
import React from "react";

const Material = (props: MaterialProps) => {
  return (
    <div className="material">
      <div className="info">
        <h2 className="title">{props.title}</h2>
        <p className="desc">{props.desc}</p>
      </div>
      <Button
        text={"Open"}
        onClick={() => {
          window.open(props.link, "_blank");
        }}
      />
      <div className="date">{props.postDate}</div>
    </div>
  );
};

export default Material;
