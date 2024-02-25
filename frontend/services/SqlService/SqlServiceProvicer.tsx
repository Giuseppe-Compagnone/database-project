import { SqlServiceProviderProps } from "./SqlService.types";
import { SqlServiceContext } from "./SqlServiceContext";
import React from "react";

const SqlServiceProvider = (props: SqlServiceProviderProps) => {
  return (
    <SqlServiceContext.Provider value={{}}>
      {props.children}
    </SqlServiceContext.Provider>
  );
};

export default SqlServiceProvider;
