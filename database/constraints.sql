ALTER TABLE STUDENT_PERFORMANCE
ADD CONSTRAINT evaluation_range_constraint CHECK (evaluation >= 18 AND evaluation <= 30);

ALTER TABLE STUDENT
ADD CONSTRAINT unique_student_email_constraint UNIQUE (email);

ALTER TABLE TEACHER
ADD CONSTRAINT unique_teacher_email_constraint UNIQUE (email);

ALTER TABLE COURSE
ADD CONSTRAINT unique_course_title_constraint UNIQUE (title);

ALTER TABLE ENROLLMENT
ADD CONSTRAINT valid_enrollment_status_constraint CHECK (status IN ('active', 'completed', 'in progress'));