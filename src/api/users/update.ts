import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateUser(userId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateUser = await db.users.update({
            where: {
                id: userId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export = {
    updateUser
}