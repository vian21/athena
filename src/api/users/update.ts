import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

/*
 * Updates a user field(s)
 * @param {number} userId - user's id
 * @param {object} newData - object with the field(s) to update and their new values
 * @param {object} db - database object
 * @param {object} logger- logging object
 * @returns {object} - success or error object
 *
 */
export default async function updateUser(
    userId: Id,
    newData: object,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.users.update({
            where: {
                id: userId,
            },
            data: newData,
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
