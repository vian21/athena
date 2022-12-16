import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getDisciplineRecords(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const discipline = await db.discipline.findMany({
            select: {
                id: true,
                student_id: true,
                points: true,
                invigilator: true,
                infraction: true
            }
        });

        return discipline;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
async function getDisciplineRecord(
    schoolId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const disciplines = await db.discipline.findUnique({
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

        return disciplines;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getDisciplineRecord,
    getDisciplineRecords
}
