import express from "express";
import { login, registerStudent, registerTeacher } from "./database.js";

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Get

app.get("/login", async (req, res) => {
  const result = await login(req.body.email, req.body.password);
  if (result[0]) {
    res.json(result[0]);
  } else {
    res.status(500).send("Incorrect email or password.");
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
    res.status(500).send("Error on registration");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
