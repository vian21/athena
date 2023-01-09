import { Logger, subjectSelect } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSubjects(db: PrismaClient, logger: Logger): Promise<any> {
    try {
        return await db.subjects.findMany({
            select: subjectSelect,
        });
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

async function getSubject(subjectId: number, db: PrismaClient, logger: Logger) {
    try {
        return await db.subjects.findUnique({
            where: {
                id: subjectId,
            },
            select: subjectSelect,
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export { getSubjects, getSubject };
