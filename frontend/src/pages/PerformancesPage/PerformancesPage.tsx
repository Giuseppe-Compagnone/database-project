import { PerformancesPageProps } from "./PerformancesPage.types";
import React from "react";
import { Performance } from "./components";

const PerformancesPage = (props: PerformancesPageProps) => {
  return (
    <div className="performances-page">
      <div className="header">
        <h1 className="title">Your Performances</h1>
        <div className="average">Average: 0</div>
      </div>
      <div className="performances">
        <Performance
          courseName={"italiano"}
          evaluation={30}
          date={"2024/02/26"}
        />
        <Performance
          courseName={"italiano"}
          evaluation={30}
          date={"2024/02/26"}
        />
        <Performance
          courseName={"italiano"}
          evaluation={30}
          date={"2024/02/26"}
        />
        <Performance
          courseName={"italiano"}
          evaluation={30}
          date={"2024/02/26"}
        />
      </div>
    </div>
  );
};

export default PerformancesPage;
