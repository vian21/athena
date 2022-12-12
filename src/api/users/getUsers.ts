import { Logger, userSelect } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getUsers(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const users = await db.users.findMany({ select: userSelect });

        return users;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
