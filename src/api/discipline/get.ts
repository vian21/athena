import { Id, disciplineSelect, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getDisciplineRecords(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.discipline.findMany({
            select: disciplineSelect,
        });
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}
async function getDisciplineRecord(
    schoolId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.discipline.findUnique({
            where: {
                id: schoolId,
            },
            select: disciplineSelect,
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export { getDisciplineRecord, getDisciplineRecords };
