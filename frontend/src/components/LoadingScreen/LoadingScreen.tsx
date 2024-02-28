import classNames from "classnames";
import Spinner from "../Spinner";
import { LoadingScreenProps } from "./LoadingScreen.types";
import React from "react";

const LoadingScreen = (props: LoadingScreenProps) => {
  return (
    <div className={classNames("loading-screen", !props.isLoaded && "loading")}>
      {props.isLoaded ? <>{props.children}</> : <Spinner />}
    </div>
  );
};

export default LoadingScreen;
