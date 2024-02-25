import { createContext } from "react";

export interface SqlServiceContent {}

export const SqlServiceContext = createContext<SqlServiceContent>({});
