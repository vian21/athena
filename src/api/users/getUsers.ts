import { Logger } from "@api/plugins/interfaces";
import { PrismaClientOptions } from "@prisma/client/runtime";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getUsers(db: any, logger: Logger) {
    try {
        const result = await db.users.findMany();

        return result;
    } catch (error: any) {
        logger.log(error.message);
        return {};
    }
}
