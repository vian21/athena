import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteUser(userId: number, db: PrismaClient, logger: Logger) {
    try {
        await db.users.delete({
            where: {
                id: userId
            }
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting user" };
    }
}