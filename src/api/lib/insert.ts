
import { Logger, iDatabaseTable } from "@api/plugins/interfaces";
export async function insertRows(
  data: object | object[],
  db: iDatabaseTable,
  logger: Logger
) {
  try {
    await db.create({
      data
    });

    return { success: true };
  } catch (error: any) {
    logger.log(error.message);
    return { error: "Cannot create user" };
  }
}
