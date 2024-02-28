export interface StudentPerformanceModel {
  performance_id: number;
  student_id: number | string;
  course_id: number | string;
  evaluation: number;
  completion_date: string;
}
