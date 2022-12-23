import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function updateAccounting(accountingId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.accounting.update({
            where: {
                id: accountingId
            },
            data: newData
        }
        );

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Could not update accounting " };
    }
}
