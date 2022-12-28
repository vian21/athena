import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deleteDiscipline(disciplineId: Id, db: PrismaClient, logger: Logger) {
    try {
        await db.discipline.delete({
            where: {
                id: disciplineId
            }
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting school" };
    }
}