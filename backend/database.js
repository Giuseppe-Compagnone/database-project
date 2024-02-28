import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

export const registerStudent = async (
  name,
  surname,
  email,
  password,
  other_details
) => {
  const [rows] = await pool.query(
    `
      INSERT INTO STUDENT ( name, surname, email, password, performance_avg, other_details)
    VALUES (?, ?, ?, ?, 0, ?)
      `,
    [name, surname, email, password, other_details]
  );
  return rows;
};

export const registerTeacher = async (
  name,
  surname,
  email,
  password,
  specialization
) => {
  const [rows] = await pool.query(
    `
    INSERT INTO TEACHER ( name, surname, email, password, specialization)
    VALUES ( ?, ?, ?, ?, ?)
  `,
    [name, surname, email, password, specialization]
  );
  return rows;
};

export const login = async (email, password) => {
  let [rows] = await pool.query(
    `
    SELECT * FROM STUDENT
    WHERE email = ?
    AND password = ?
  `,
    [email, password]
  );
  if (rows.length <= 0) {
    [rows] = await pool.query(
      `
      SELECT * FROM TEACHER
      WHERE email = ?
      AND password = ?
    `,
      [email, password]
    );
  }

  return rows;
};

export const getCoursesForStudent = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT c.course_id,c.title,c.description,c.num_enrollments,c.start_date,c.end_date,CONCAT(t.name , ' ', t.surname)  as responsible_teacher_id 
		FROM TEACHER as t       
    INNER JOIN COURSE as c
    ON t.teacher_id = c.responsible_teacher_id
    INNER JOIN ENROLLMENT as e
    ON c.course_id = e.course_id
    WHERE e.student_id = ?
  `,
    [id]
  );

  return rows;
};

export const getCoursesForTeacher = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT c.course_id,c.title,c.description,c.num_enrollments,c.start_date,c.end_date,CONCAT(t.name , ' ', t.surname)  as responsible_teacher_id 
		FROM TEACHER as t       
    INNER JOIN COURSE as c
    ON t.teacher_id = c.responsible_teacher_id
    WHERE c.responsible_teacher_id = ?
  `,
    [id]
  );
  return rows;
};

export const createCourse = async (
  title,
  description,
  responsibleTeacherId,
  startDate,
  endDate
) => {
  await pool.query(
    `
    INSERT INTO COURSE (title, description, responsible_teacher_id, num_enrollments, start_date, end_date) 
    VALUES 
    ( ?, ? , ?, 0, ?, ?)
  `,
    [title, description, responsibleTeacherId, startDate, endDate]
  );
};

export const enroll = async (studentId, courseName, date) => {
  const [rows] = await pool.query(
    `
    SELECT course_id FROM COURSE
    WHERE title = ?
      `,
    [courseName]
  );

  console.log("ID:", rows);

  await pool.query(
    `
    INSERT INTO ENROLLMENT ( student_id, course_id, enrollment_date, status)
    VALUES ( ?, ?, ?, 'active')
  `,
    [studentId, rows[0].course_id, date]
  );
};

export const getCourseByTitle = async (title) => {
  const [rows] = await pool.query(
    `
    SELECT c.course_id,c.title,c.description,c.num_enrollments,start_date,end_date,CONCAT(t.name," ",t.surname) as responsible_teacher_id  
FROM COURSE as c
INNER JOIN TEACHER as t
ON t.teacher_id = c.responsible_teacher_id
WHERE title = ?
  `,
    [title]
  );

  return rows[0];
};

export const getMaterials = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM COURSE_MATERIAL
    WHERE material_id = ?
    `,
    [id]
  );

  return rows;
};

export const uploadMaterial = async (
  title,
  description,
  fileOrLink,
  publicationDate,
  courseId
) => {
  await pool.query(
    `
  INSERT INTO COURSE_MATERIAL ( title, description, file_or_link, publication_date, course_id) 
  VALUES( ?, ?, ?, ?, ?)
  `,
    [title, description, fileOrLink, publicationDate, courseId]
  );
};

export const getPerformances = async (id) => {
  const [rows] = await pool.query(
    `
  SELECT p.performance_id,p.student_id,p.evaluation,p.completion_date,c.title as course_id 
  FROM STUDENT_PERFORMANCE as p
  INNER JOIN COURSE as c
  ON c.course_id = p.course_id
  WHERE student_id = ?
  `,
    [id]
  );

  return rows;
};
