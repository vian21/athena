/**
 * Contains:
 *      1. type definitions
 *      2. all Zod object definitions and infered types
 *      3. selection objects for Prisma
 * Related definitions are grouped together in the order above
 *
 *      Definitions:
 * 1. Schema: a schema is like a class definition which defines the values that should be expected in an object and their respective types
 * 2. Interface/type alias: an interface is the type definition used to tell typescript the expected type of a variables. But this does no validation, it just warns you if you pass wrong value e.g const a: string = "hello"
 * 3. Selection Object: These are objects used to tell prisma which fields to display and which to ignore
 *
 * */
import { z } from "zod";

//Type definition for the logger which is injected into the routes
export interface Logger {
  log(message: string): void;
}

export interface Table
//interface for record's id in database. change this value if you change the type of `id` in database
export const idSchema = z.coerce.number().min(1);
export type Id = z.infer<typeof idSchema>;
export const IParamsIdSchema = z.object({ id: idSchema });
export type IParamsId = z.infer<typeof IParamsIdSchema>;

/*****************
 * Users
 * ***************
 */
export const userSchema = z
  .object({
    id: idSchema.optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    DOB: z.coerce.date().optional(),
    gender: z.number().optional(),
    email: z.string().optional(),
    tel: z.string().optional(),
    address: z.string().optional(),
    nationality: z.string().optional(),
    account_type: z.number().optional(),
    status: z.boolean().optional(),
  })
  .strict();

export type User = z.infer<typeof userSchema>;

export const userSelect = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
  DOB: true,
  gender: true,
  tel: true,
  address: true,
  nationality: true,
  account_type: true,
  status: true,
  password: false,
};

/*****************
 * Subjects
 * ***************
 */
export const subjectSchema = z
  .object({
    id: idSchema.optional(),
    school_id: z.number().optional(),
    teacher_id: z.number().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    archived: z.boolean().optional(),
    language: z.string().optional(),
    subject_code: z.string().max(5).optional(),
    course_number: z.string().max(5).optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    room: z.string().optional(),
  })
  .strict();

export type Subject = z.infer<typeof subjectSchema>;

export const subjectSelect = {
  id: true,
  school_id: true,
  teacher_id: true,
  start: true,
  end: true,
  archived: true,
  language: true,
  subject_code: true,
  course_number: true,
  name: true,
  description: true,
};

/*****************
 * Subject Enrollments
 * ***************
 */
export const subjectEnrollmentSchema = z
  .object({
    id: idSchema.optional(),
    subject_id: z.number().optional(),
    student_id: z.number().optional(),
    academic_period_id: z.number().optional(),
    finished: z.boolean().optional().default(false),
  })
  .strict();

export type SubjectEnrollment = z.infer<typeof subjectSchema>;

export const subjectEnrollmentSelect = {
  id: true,
  subject_id: true,
  student_id: true,
  academic_period_id: true,
  finished: true,
};

/*****************
 * Schools
 * ***************
 */
export const schoolSchema = z
  .object({
    id: idSchema.optional(),
    name: z.string().nullable(),
    motto: z.string().optional().nullable(),
    type: z.number().optional().nullable(),
    email: z.string().email().optional().nullable(),
    logo: z.string().optional().nullable(),
    website: z.coerce.string().url().optional().nullable(),
    country: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
  })
  .strict();

export type School = z.infer<typeof subjectSchema>;

export const schoolSelect = {
  id: true,
  name: true,
  motto: true,
  type: true,
  email: true,
  logo: true,
  website: true,
  country: true,
  address: true,
};

/*****************
 * School Transactions
 * ***************
 */
export const schoolTransactionSchema = z
  .object({
    id: idSchema.optional(),
    school_id: idSchema.optional(),
    date: z.coerce.date().optional(),
    period: z.number().optional(),
    end_date: z.coerce.date().optional(),
  })
  .strict();

export type schoolTransaction = z.infer<typeof subjectSchema>;

export const schoolTransactionSelect = {
  id: true,
  school_id: true,
  date: true,
  period: true,
  end_date: true,
};

/*****************
 * Marks
 * ***************
 */
export const markSchema = z
  .object({
    id: idSchema.optional(),
    subject_id: z.number().optional(),
    student_id: z.number().optional(),
    mark: z.number().optional(),
    academic_period_id: idSchema.optional(),
    assessment_id: idSchema.optional(),
  })
  .strict();

export type Mark = z.infer<typeof subjectSchema>;

export const markSelect = {
  id: true,
  subject_id: true,
  student_id: true,
  mark: true,
  academic_period_id: true,
  assessment_id: true,
};

/*****************
 * Grading scales
 * ***************
 */
export const gradingScaleSchema = z
  .object({
    id: idSchema.optional(),
    school_id: idSchema.optional(),
    max: z.number().optional(),
    min: z.number().min(0).optional(),
    grade: z.string().length(2).optional(),
    gpa: z.number().optional(),
  })
  .strict();

export type GradingScale = z.infer<typeof subjectSchema>;

export const gradingScaleSelect = {
  id: true,
  school_id: true,
  max: true,
  min: true,
  grade: true,
  gpa: true,
};

/*****************
 * Grades
 * ***************
 */
export const gradeSchema = z
  .object({
    id: idSchema.optional(),
    school_id: idSchema.optional(),
    academic_period_id: idSchema.optional(),
  })
  .strict();

export type Grade = z.infer<typeof subjectSchema>;

export const gradeSelect = {
  id: true,
  school_id: true,
  academic_period_id: true,
};

/*****************
 * Discipline
 * ***************
 */
export const disciplineSchema = z
  .object({
    id: idSchema.optional(),
    student_id: idSchema.optional(),
    academic_period_id: idSchema.optional(),
    points: z.number().optional(),
    infraction: z.string().optional(),
    invigilator: idSchema.optional(),
  })
  .strict();

export type Discipline = z.infer<typeof subjectSchema>;

export const disciplineSelect = {
  id: true,
  student_id: true,
  academic_period_id: true,
  points: true,
  infraction: true,
  invigilator: true,
};

/*****************
 * Assessments
 * ***************
 */
export const assessmentSchema = z
  .object({
    id: idSchema.optional(),
    subject_id: idSchema.optional(),
    type: z.number().optional(),
  })
  .strict();

export type Assessment = z.infer<typeof subjectSchema>;

export const assessmentSelect = {
  id: true,
  subject_id: true,
  type: true,
};

/*****************
 * Accounting
 * ***************
 */
export const accountingSchema = z
  .object({
    id: idSchema.optional(),
    user_id: idSchema.optional(),
    amount: z.number().optional(),
    date: z.coerce.date().optional(),
    item: z.string().optional(),
    academic_period_id: idSchema.optional(),
  })
  .strict();

export type Accounting = z.infer<typeof subjectSchema>;

export const accountingSelect = {
  id: true,
  user_id: true,
  amount: true,
  date: true,
  item: true,
  academic_period_id: true,
};

/*****************
 * Academic periods
 * ***************
 */
export const academicPeriodSchema = z
  .object({
    id: idSchema.optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
    type: z.number().optional(),
  })
  .strict();

export type AcademicPeriod = z.infer<typeof subjectSchema>;

export const academicPeriodSelect = {
  id: true,
  start_date: true,
  end_date: true,
  type: true,
};

/*****************
 * Academic enrollments
 * ***************
 */
export const academicEnrollmentSchema = z
  .object({
    id: idSchema.optional(),
    student_id: idSchema.optional(),
    academic_period_id: idSchema.optional(),
    grade: z.number().optional(),
  })
  .strict();

export type AcademicEnrollment = z.infer<typeof subjectSchema>;

export const academicEnrollmentSelect = {
  id: true,
  student_id: true,
  academic_period_id: true,
  grade: true,
};
