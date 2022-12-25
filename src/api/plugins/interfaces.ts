/**
 * # Contains:
 *      1. type definitions
 *      2. all Zod object definitions and infered types
 *      3. selection objects for Prisma
 * 
 * # Related definitions are grouped together in the order above
 */
import { z } from 'zod';

export interface Logger {
    log(message: string): void;
}

export interface IParamsId {
    id: number;
}

/*****************
 * Users
 * ***************
 */
export const userSchema = z.object({
    id: z.number().optional(),
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
}).strict();

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
export const subjectSchema = z.object({
    id: z.number().optional(),
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
}).strict();

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
    description: true
};
