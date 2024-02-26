import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

const getStudents = async () => {
  const [rows] = await pool.query("SELECT * FROM STUDENT");
  return rows;
};

const students = await getStudents();
console.log("ALL STUDENTS:", students);
