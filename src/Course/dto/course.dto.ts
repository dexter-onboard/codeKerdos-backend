export class CreateCourseDto {
  readonly title: string;
  readonly videos: string[];
  readonly documents: string[];
}

export class UpdateCourseDto {
  readonly title?: string;
  readonly videos?: string[];
  readonly documents?: string[];
}