import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newAccounting(
    accountingObject: any,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.accounting.create({
            data: accountingObject,
        });
        return { success: true };
    } catch (error: any) {
        return { error: "cannot Create accounting" };
    }
}
