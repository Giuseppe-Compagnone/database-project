import { SqlServiceProviderProps } from "./SqlService.types";
import { SqlServiceContext } from "./SqlServiceContext";
import React, { useEffect, useState } from "react";
import { StudentModel, TeacherModel } from "./../../models";

const SqlServiceProvider = (props: SqlServiceProviderProps) => {
  //States

  const [user, setUser] = useState<TeacherModel | StudentModel | null>(null);
  const [type, setType] = useState<"student" | "teacher" | null>(null);

  //Effects

  useEffect(() => {
    if (user) {
      if ((user as TeacherModel).specialization) {
        setType("teacher");
      } else {
        setType("student");
      }
    } else {
      setType(null);
    }
  }, [user]);

  return (
    <SqlServiceContext.Provider
      value={{
        user,
        setUser,
        type,
      }}
    >
      {props.children}
    </SqlServiceContext.Provider>
  );
};

export default SqlServiceProvider;
