import { Logger, userSelect } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getUser(
    userId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const user = await db.users.findUnique({
            where: {
                id: userId,
            },
            select: userSelect,
        });

        return user;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}
