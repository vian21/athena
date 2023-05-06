
import { Id, Logger, iDatabaseTable } from "@api/plugins/interfaces";

export async function updateRows(
  id: Id,
  newData: object,
  db: iDatabaseTable,
  logger: Logger
) {
  try {
    await db.update({
      where: {
        id,
      },
      data: newData,
    });

    return { success: true };
  } catch (error: any) {
    logger.log(error.message);

    return {};
  }
}
