import { Logger, Id, iDatabaseTable } from "@api/plugins/interfaces";

export async function getMany(fields: object, db: iDatabaseTable, logger: Logger) {
  try {
    return await db.findMany({ select: fields });
  } catch (error: any) {
    logger.log(error.message);

    return [];
  }
}

export async function getUnique(id: Id, fields: object, db: iDatabaseTable, logger: Logger) {
  try {
    return await db.findUnique({
      where: {
        id: id
      }, select: fields
    });
  } catch (error: any) {
    logger.log(error.message);

    return {};
  }
}
