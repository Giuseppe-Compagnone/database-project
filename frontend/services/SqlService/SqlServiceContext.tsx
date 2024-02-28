import { createContext } from "react";
import { StudentModel, TeacherModel } from "../../models";

export interface SqlServiceContent {
  user: TeacherModel | StudentModel | null;
  setUser: (val: TeacherModel | StudentModel | null) => void;
  type: "student" | "teacher" | null;
  formatDate: (dateString: string) => string;
}

export const SqlServiceContext = createContext<SqlServiceContent>({
  user: null,
  setUser: (): any => {},
  type: null,
  formatDate: (): any => {},
});
