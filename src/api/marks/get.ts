import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getMarks(db: PrismaClient, logger: Logger): Promise<any> {
    try {
        return await db.marks.findMany();
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

async function getMark(markId: number, db: PrismaClient, logger: Logger) {
    try {
        return await db.marks.findUnique({
            where: {
                id: markId,
            },
            select: {
                id: true,
                subject_id: true,
                student_id: true,
                mark: true,
                academic_period_id: true,
                assessment_id: true,
            },
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export { getMark, getMarks };
