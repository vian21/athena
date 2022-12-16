import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateSchool(schoolId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateSchool = await db.schools.update({
            where: {
                id: schoolId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export = {
    updateSchool
}