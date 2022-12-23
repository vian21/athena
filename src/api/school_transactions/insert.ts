import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newschoolTransaction(schoolTransactionObject: any, db: PrismaClient, logger: Logger) {
    try {

        await db.school_transactions.create({
            data: schoolTransactionObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create school transaction" }
    }

}