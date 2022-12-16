import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateAcademicPeriod(periodId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateSAcademicPeriod = await db.academic_periods.update({
            where: {
                id: periodId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export {
    updateAcademicPeriod,
}