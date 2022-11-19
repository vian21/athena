import { DatabaseConnection, Logger } from "@api/plugins/interfaces";
/**
 * Get all app users
 * @param{object} db - database connection object
 * @param logger - logging utility object
 * @returns a result object
 */
export default async function getUsers(db: DatabaseConnection, logger: Logger) {
    try {
        const [result] = await db.query("SELECT * FROM users");
        return result[0] || {};
    } catch (error: any) {
        logger.log(error.message);
        return {};
    }
}
