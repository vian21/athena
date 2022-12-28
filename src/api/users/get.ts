import { PrismaClient } from "@prisma/client";
import { Id, Logger, userSelect } from "@api/plugins/interfaces";

/*
 * Fetches all users
 * @param {object} db - database connection object
 * @param {object} logger- logging object
 * @returns {array} - all users
 *
 */
async function getUsers(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.users.findMany({ select: userSelect });

    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

/*
 * Fetches a user's info
 * @param {number} userid - user's id
 * @param {object} db - database object
 * @param {object} logger- logging object
 * @returns {object} - user object
 *
 */
async function getUser(
    userId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.users.findUnique({
            where: {
                id: userId,
            },
            select: userSelect
        });

    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getUsers,
    getUser
}