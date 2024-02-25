CREATE EVENT update_enrollment_status
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE ENROLLMENT e
    INNER JOIN COURSE c ON e.course_id = c.course_id
    SET e.status = 'in progress'
    WHERE CURDATE() = c.start_date;
END;

CREATE EVENT close_enrollment
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE ENROLLMENT e
    INNER JOIN COURSE c ON e.course_id = c.course_id
    SET e.status = 'completed'
    WHERE CURDATE() = c.end_date;
END;