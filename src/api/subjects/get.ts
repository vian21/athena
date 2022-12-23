import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSubjects(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.subjects.findMany({
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


    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}


async function getSubject(
    subjectId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.subjects.findUnique({
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


    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getSubjects,
    getSubject
}