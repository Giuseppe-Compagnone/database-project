import React, { useEffect, useState } from "react";
import { Material } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHeading,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Button, LoadingScreen, Spinner } from "../../components";
import { CourseMaterialModel, CourseModel } from "../../../models";
import { NotificationHandler } from "../../../utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSqlService } from "../../../services";

export interface UploadMaterialInfo {
  name: string;
  desc: string;
  link: string;
}

export interface UploadPerformaceInfo {
  mail: string;
  evaluation: string;
}

const CoursePage = () => {
  //States
  const [course, setCourse] = useState<CourseModel | null>(null);
  const [materials, setMaterials] = useState<Array<CourseMaterialModel> | null>(
    null
  );
  const [materialInfo, setMaterialInfo] = useState<UploadMaterialInfo>({
    name: "",
    desc: "",
    link: "",
  });
  const [performanceInfo, setPerformanceInfo] = useState<UploadPerformaceInfo>({
    mail: "",
    evaluation: "",
  });

  //Hooks
  const { title } = useParams();
  const { type } = useSqlService();
  const { formatDate } = useSqlService();

  //Effects
  useEffect(() => {
    fetchCourse();
  }, [title]);

  useEffect(() => {
    if (course !== null) {
      fetchMaterial();
    }
  }, [course]);

  const fetchCourse = async () => {
    if (title) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/course/${title}`
        );
        setCourse(res.data);
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on get course");
      }
    }
  };

  const fetchMaterial = async () => {
    if (course) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/materials/${course.course_id}`
        );
        setMaterials(res.data);
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on get materials");
      }
    }
  };

  const uploadMaterial = async () => {
    if (course !== null) {
      try {
        await axios.post(`${process.env.REACT_APP_SERVER}/upload-material`, {
          title: materialInfo.name,
          description: materialInfo.desc,
          fileOrLink: materialInfo.link,
          publicationDate: new Date().toISOString().substring(0, 10),
          courseId: course.course_id,
        });
        NotificationHandler.instance.success("Uploaded");
        setMaterials(null);
        await fetchMaterial();
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on upload");
      }
    }
  };

  const uploadPerformance = async () => {
    if (course !== null) {
      if (parseInt(performanceInfo.evaluation) < 18) {
        NotificationHandler.instance.error(
          "Evaluation must be between 18 and 30"
        );
        return;
      }

      try {
        await axios.post(`${process.env.REACT_APP_SERVER}/upload-performance`, {
          email: performanceInfo.mail,
          courseId: course.course_id.toString(),
          evaluation: performanceInfo.evaluation,
          completionDate: new Date().toISOString().substring(0, 10),
        });
        NotificationHandler.instance.success("Uploaded");
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on upload");
      }
    }
  };

  return (
    <LoadingScreen isLoaded={course !== null}>
      <div className="course-page">
        <div className="header">
          <div className="teacher">prof. {course?.responsible_teacher_id}</div>
          <h1 className="title">{course?.title}</h1>
          <p className="desc">{course?.description}</p>
          <div className="enrolleds">Enrolleds: {course?.num_enrollments}</div>
        </div>
        <h1 className="title">Materials</h1>
        <div className="materials">
          {!materials && (
            <div className="loading-wrapper">
              <Spinner />
            </div>
          )}
          {materials?.length <= 0 && (
            <p className="no-item">There are no course materials</p>
          )}
          {materials?.map((material, i) => {
            return (
              <Material
                key={i}
                title={material.title}
                desc={material.description}
                link={material.file_or_link}
                postDate={formatDate(material.publication_date)}
              />
            );
          })}
        </div>
        {type == "teacher" && (
          <>
            <h1 className="title" style={{ margin: "2rem 0" }}>
              Upload Material
            </h1>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submit");
              }}
            >
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faHeading} />
                </div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Material name..."
                  name="name"
                  required
                  value={materialInfo.name}
                  onChange={(e) => {
                    setMaterialInfo((old) => {
                      old.name = e.target.value;

                      return { ...old };
                    });
                  }}
                />
              </div>
              <div className="field-wrapper">
                <div className="icon textarea">
                  <FontAwesomeIcon icon={faFileLines} />
                </div>
                <label htmlFor="desc">Description</label>
                <textarea
                  name="desc"
                  placeholder="Material description..."
                  required
                  value={materialInfo.desc}
                  onChange={(e) => {
                    setMaterialInfo((old) => {
                      old.desc = e.target.value;

                      return { ...old };
                    });
                  }}
                />
              </div>
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  placeholder="Material link..."
                  name="link"
                  required
                  value={materialInfo.link}
                  onChange={(e) => {
                    setMaterialInfo((old) => {
                      old.link = e.target.value;

                      return { ...old };
                    });
                  }}
                />
              </div>
              <Button
                text={"Upload"}
                onClick={async () => {
                  await uploadMaterial();
                }}
              />
            </form>
            <h1 className="title" style={{ margin: "2rem 0" }}>
              Upload Student Performance
            </h1>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submit");
              }}
            >
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  placeholder="Student email..."
                  name="mail"
                  required
                  value={performanceInfo.mail}
                  onChange={(e) => {
                    setPerformanceInfo((old) => {
                      old.mail = e.target.value;

                      return { ...old };
                    });
                  }}
                />
              </div>

              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <label htmlFor="eval">Evaluation</label>
                <input
                  type="text"
                  placeholder="Student Evaluation"
                  name="eval"
                  required
                  value={performanceInfo.evaluation}
                  onChange={(e) => {
                    setPerformanceInfo((old) => {
                      if (e.target.value === "") {
                        old.evaluation = "";
                      } else {
                        if (/^-?\d*$/.test(e.target.value)) {
                          const evaluation = parseInt(e.target.value);

                          if (evaluation > 30) {
                            old.evaluation = "30";
                          } else {
                            old.evaluation = evaluation.toString();
                          }
                        }
                      }

                      return { ...old };
                    });
                  }}
                />
              </div>
              <Button
                text={"Upload"}
                onClick={async () => {
                  await uploadPerformance();
                }}
              />
            </form>
          </>
        )}
      </div>
    </LoadingScreen>
  );
};

export default CoursePage;
