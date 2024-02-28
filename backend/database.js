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

export const getCoursesForUser = async (id) => {
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
