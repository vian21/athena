import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteAccounting(accountingId: number, db: PrismaClient, logger: Logger) {
    try {
        const discipline = await db.discipline.delete({
            where: {
                id: accountingId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting school" };
    }
}