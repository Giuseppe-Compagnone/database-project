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

  //Methods

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <SqlServiceContext.Provider
      value={{
        user,
        setUser,
        type,
        formatDate,
      }}
    >
      {props.children}
    </SqlServiceContext.Provider>
  );
};

export default SqlServiceProvider;
