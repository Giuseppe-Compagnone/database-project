import express from "express";
import cors from "cors";
import {
  createCourse,
  enroll,
  getCourseByTitle,
  getCoursesForStudent,
  getCoursesForTeacher,
  getMaterials,
  getPerformances,
  login,
  registerStudent,
  registerTeacher,
  uploadMaterial,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Get
app.get("/", async (req, res) => {
  res.send("Server is running");
});

app.get("/courses/:role/:id", async (req, res) => {
  try {
    let result;
    if (req.params.role === "student") {
      result = await getCoursesForStudent(req.params.id);
    }
    if (req.params.role === "teacher") {
      result = await getCoursesForTeacher(req.params.id);
    }

    res.json(result || []);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error on getting courses");
  }
});

app.get("/course/:title", async (req, res) => {
  try {
    const result = await getCourseByTitle(req.params.title);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.get("/materials/:id", async (req, res) => {
  try {
    const result = await getMaterials(req.params.id);

    res.json(result || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.get("/performances/:id", async (req, res) => {
  try {
    const result = await getPerformances(req.params.id);
    res.json(result || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//Post

app.post("/signup/student", async (req, res) => {
  try {
    await registerStudent(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password,
      req.body.other_details
    );
    res.send("Registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error on registration");
  }
});

app.post("/signup/teacher", async (req, res) => {
  try {
    await registerTeacher(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password,
      req.body.specialization
    );
    res.send("Registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error on registration");
  }
});

app.post("/login", async (req, res) => {
  const result = await login(req.body.email, req.body.password);
  if (result[0]) {
    res.json(result[0]);
  } else {
    res.status(500).send("Incorrect email or password.");
  }
});

app.post("/create-course", async (req, res) => {
  try {
    await createCourse(
      req.body.title,
      req.body.description,
      req.body.responsibleTeacherId,
      req.body.startDate,
      req.body.endDate
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/enroll", async (req, res) => {
  try {
    await enroll(req.body.studentId, req.body.courseName, req.body.date);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/update-material", async (req, res) => {
  try {
    await uploadMaterial(
      req.body.title,
      req.body.description,
      req.body.fileOrLink,
      req.body.publicationDate,
      req.body.courseId
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
