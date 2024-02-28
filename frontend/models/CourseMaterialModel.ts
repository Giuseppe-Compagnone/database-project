export interface CourseMaterialModel {
  material_id: number;
  title: string;
  description: string;
  file_or_link: string;
  publication_date: string;
  course_id: number | string;
}
