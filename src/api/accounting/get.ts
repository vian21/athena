import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getAccountings(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const accounting = await db.accounting.findMany({
            select: {
                id: true,
                user_id: true,
                amount: true,
                date: true,
                item: true,
                academic_period_id: true,
                academic_periods: true,
                users: true
            }
        });

        return accounting;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
async function getAccounting(
    accountingId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const accountings = await db.accounting.findUnique({
            where: {
                id: accountingId,
            },
            select: {
                id: true,
                user_id: true,
                amount: true,
                item: true,
                academic_period_id: true,
                academic_periods: true,
                users: true

            },
        });

        return accountings;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
export {
    getAccountings,
    getAccounting
}
