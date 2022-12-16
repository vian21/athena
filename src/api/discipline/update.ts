import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function updateDiscipline(disciplineId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateDiscipline = await db.discipline.update({
            where: {
                id: disciplineId
            },
            data: newData
        }
        );

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Could not update discipline Record" };
    }
}
