import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSchoolTransactions(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.school_transactions.findMany({
            select: {
                id: true,
                school_id: true,
                date: true,
                period: true,
                end_date: true,
            },
        });
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

async function getSchoolTransaction(
    school_id: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.school_transactions.findUnique({
            where: {
                id: school_id,
            },
            select: {
                id: true,
                school_id: true,
                date: true,
                period: true,
                end_date: true,
            },
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export { getSchoolTransactions, getSchoolTransaction };
