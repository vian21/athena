import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateSchoolTransaction(transactionId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const transaction = await db.school_transactions.update({
            where: {
                id: transactionId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Error updating schoolTransactions" };
    }
}

export {
    updateSchoolTransaction
}
