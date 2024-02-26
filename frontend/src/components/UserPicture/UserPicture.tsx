/* eslint-disable @burneeble/burneeble/camel-case-vars */
import React, { CSSProperties, useEffect, useState } from "react";
import { UserPictureProps } from "./UserPicture.types";

const UserPicture = (props: UserPictureProps) => {
  //States
  const [firstColor, setFirstColor] = useState<string>("");
  const [secondColor, setSecondColor] = useState<string>("");
  const [letters, setLetters] = useState<string>("");
  const size = (props.size || 2.5) + "rem";
  const fontSize = (1.3 * (props.size || 2.5)) / 2.5 + "rem";

  //Effects
  useEffect(() => {
    const first = props.name.slice(0, Math.floor(props.name.length / 2));
    const second = props.name.slice(
      Math.floor(props.name.length / 2),
      props.name.length
    );
    setFirstColor(stringToColour(first));
    setSecondColor(stringToColour(second));
    let tmp: string = "";
    props.name
      .trim()
      .split(" ")
      .forEach((w, i) => {
        if (i <= 1) {
          tmp += w[0].toUpperCase();
        }
      });
    setLetters(tmp);
  }, [props.name]);

  //Methods
  const stringToColour = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };

  return (
    <div
      className="user-picture"
      style={
        {
          "--first-color": firstColor,
          "--second-color": secondColor,
          "--size": size,
          "--font-size": fontSize,
        } as CSSProperties
      }
    >
      <p className="letters">{letters}</p>
    </div>
  );
};

export default UserPicture;
