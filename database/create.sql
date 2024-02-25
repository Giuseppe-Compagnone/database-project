CREATE TABLE STUDENT (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    surname VARCHAR(64),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(64),
    performance_avg DECIMAL,
    other_details TEXT
);

CREATE TABLE TEACHER (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    surname VARCHAR(64),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(64),
    specialization VARCHAR(64)
);

CREATE TABLE COURSE (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(64),
    description TEXT,
    responsible_teacher_id INT,
    num_enrollments INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (responsible_teacher_id) REFERENCES TEACHER(teacher_id)
);

CREATE TABLE COURSE_MATERIAL (
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(64),
    description TEXT,
    file_or_link VARCHAR(255),
    publication_date DATE,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);

CREATE TABLE ENROLLMENT (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    status VARCHAR(64),
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);

CREATE TABLE STUDENT_PERFORMANCE (
    performance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    evaluation DECIMAL,
    completion_date DATE,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);