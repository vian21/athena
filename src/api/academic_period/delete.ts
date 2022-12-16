import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteAcademicPeriod(periodId: number, db: PrismaClient, logger: Logger) {
    try {
        const academic = await db.academic_periods.delete({
            where: {
                id: periodId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting academic period" };
    }
}