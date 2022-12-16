import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSubjects(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const subjects = await db.subjects.findMany({
            select: {
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
            },
        });

        return subjects;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


async function getSubject(
    subjectId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const subject = await db.subjects.findUnique({
            where: {
                id: subjectId,
            },
            select: {
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

            },
        });

        return subject;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getSubjects,
    getSubject
}