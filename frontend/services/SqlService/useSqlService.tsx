import { useContext } from "react";
import { SqlServiceContext } from "./SqlServiceContext";

const useSqlService = () => {
  const context = useContext(SqlServiceContext);

  if (typeof context === "undefined") {
    throw new Error("`useSqlService` must be within a `SqlServiceProvider`");
  }

  return context;
};

export { useSqlService };
