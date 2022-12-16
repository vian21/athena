import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSchoolTransactions(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const schoolTransactions = await db.school_transactions.findMany({
            select: {
                id: true,
                school_id: true,
                date: true,
                period: true,
                end_date: true,
            }
        });

        return schoolTransactions;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


async function getSchoolTransaction(
    school_id: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const school = await db.school_transactions.findUnique({
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

        return school;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export {
    getSchoolTransactions,
    getSchoolTransaction
}
