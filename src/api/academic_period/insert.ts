import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newAcademicPeriod(
    PeriodObject: any,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const academicPeriod = await db.academic_periods.create({
            data: PeriodObject,
        });
        return { success: true };
    } catch (error: any) {
        return { error: "cannot Create academic period" };
    }
}
