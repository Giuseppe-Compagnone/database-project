export interface Enrollment {
  id: number;
  student: number | string;
  course: number | string;
  date: string;
  status: EnrollmentStatus;
}

export type EnrollmentStatus = "active" | "in progress" | "completed";
