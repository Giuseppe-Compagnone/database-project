export interface Course {
  id: number;
  title: string;
  desc: string;
  teacher: number | string;
  enrollments: number;
  startDate: string;
  endDate: string;
}
