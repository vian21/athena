import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getDisciplineRecords(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.discipline.findMany({
            select: {
                id: true,
                student_id: true,
                points: true,
                invigilator: true,
                infraction: true
            }
        });


    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}
async function getDisciplineRecord(
    schoolId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.discipline.findUnique({
            where: {
                id: schoolId,
            },
            select: {
                id: true,
                points: true,
                student_id: true,
                invigilator: true,
                infraction: true,

            },
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getDisciplineRecord,
    getDisciplineRecords
}
