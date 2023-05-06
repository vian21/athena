import { Logger, Id } from "@api/plugins/interfaces";

interface Table {
  findMany(fields: object): any;
  findUnique(criteria: object): any;
}
export async function getMany(fields: object, db: Table, logger: Logger) {
  try {
    return await db.findMany({ select: fields });
  } catch (error: any) {
    logger.log(error.message);

    return [];
  }
}

export async function getUnique(id: Id, fields: object, db: Table, logger: Logger) {
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
