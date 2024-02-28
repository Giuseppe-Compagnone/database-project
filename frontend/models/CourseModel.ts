export interface CourseModel {
  course_id: number;
  title: string;
  description: string;
  responsible_teacher_id: number | string;
  num_enrollments: number;
  start_date: string;
  end_date: string;
}
