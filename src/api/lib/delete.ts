import { Id, Logger, iDatabaseTable } from "@api/plugins/interfaces";

export async function deleteRows(id: Id, db: iDatabaseTable, logger: Logger) {
  try {
    await db.delete({
      where: {
        id
      },
    });

    return { success: true };
  } catch (error: any) {
    logger.log(error.message);

    return { error: "Error deleting row" };
  }
}
