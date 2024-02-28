import { PerformancesPageProps } from "./PerformancesPage.types";
import React, { useEffect, useState } from "react";
import { Performance } from "./components";
import { LoadingScreen } from "../../components";
import { StudentModel, StudentPerformanceModel } from "../../../models";
import { NotificationHandler } from "../../../utils";
import axios from "axios";
import { useSqlService } from "../../../services";

const PerformancesPage = (props: PerformancesPageProps) => {
  //States
  const [performances, setPerformances] =
    useState<Array<StudentPerformanceModel> | null>(null);

  //Hooks
  const { user, formatDate } = useSqlService();

  //Effects
  useEffect(() => {
    fetchPerformances();
  }, [user]);

  //Methods

  const fetchPerformances = async () => {
    if (user !== null) {
      try {
        const res = await axios.get(
          `${process.env.SERVER}/performances/${
            (user as StudentModel).student_id
          }`
        );
        setPerformances(res.data || []);
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on getting performances");
      }
    }
  };

  return (
    <LoadingScreen isLoaded={performances !== null}>
      <div className="performances-page">
        <div className="header">
          <h1 className="title">Your Performances</h1>
          <div className="average">
            Average: {(user as StudentModel)?.performance_avg || 0}
          </div>
        </div>
        <div className="performances">
          {performances?.map((perf, i) => {
            return (
              <Performance
                key={i}
                courseName={perf.course_id as string}
                evaluation={perf.evaluation}
                date={formatDate(perf.completion_date)}
              />
            );
          })}
          {performances?.length <= 0 && (
            <p className="no-item">You have no registered performances</p>
          )}
        </div>
      </div>
    </LoadingScreen>
  );
};

export default PerformancesPage;
