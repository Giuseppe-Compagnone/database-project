CREATE TRIGGER update_num_enrollments_after_enrollment
AFTER INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
    UPDATE COURSE
    SET num_enrollments = num_enrollments + 1
    WHERE course_id = NEW.course_id;
END;

CREATE TRIGGER update_performance_avg_after_performance
AFTER INSERT ON STUDENT_PERFORMANCE
FOR EACH ROW
BEGIN
    DECLARE total_eval DECIMAL;
    DECLARE num_performance INT;
    SET total_eval = (SELECT SUM(evaluation) FROM STUDENT_PERFORMANCE WHERE student_id = NEW.student_id);
    SET num_performance = (SELECT COUNT(*) FROM STUDENT_PERFORMANCE WHERE student_id = NEW.student_id);
    IF num_performance > 0 THEN
        SET total_eval = IFNULL(total_eval, 0);
        SET total_eval = total_eval / num_performance;
    ELSE
        SET total_eval = 0;
    END IF;
    UPDATE STUDENT
    SET performance_avg = total_eval
    WHERE student_id = NEW.student_id;
END;

CREATE TRIGGER enrollment_date_trigger
BEFORE INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
    DECLARE course_start_date DATE;
    DECLARE course_end_date DATE;

    SELECT start_date, end_date INTO course_start_date, course_end_date
    FROM COURSE
    WHERE course_id = NEW.course_id;

    IF NEW.enrollment_date < course_start_date OR NEW.enrollment_date > course_end_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Enrollment date is not within course dates';
    END IF;
END;