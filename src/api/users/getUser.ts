import { DatabaseConnection, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getUser(userId: number, db, logger: Logger) {
    try {
        const result = await db.users.findUnique({
            where: {
                user_id: userId,
            },
        });
        return result;
    } catch (error: any) {
        logger.log(error);
        return {};
    }
}
