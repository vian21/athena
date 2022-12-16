import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getAcademicPeriod(
    periodId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const period = await db.academic_periods.findUnique({
            where: {
                id: periodId,
            },
            select: {
                id: true,
                start_date: true,
                end_date: true,
                type: true

            },
        });

        return period;
    } catch (error: any) {
        logger.log(error);

        return { error: "Error getting academic period" };
    }
}


async function getAcademicPeriods(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const periods = await db.academic_periods.findMany();

        return periods;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}

export {
    getAcademicPeriods,
    getAcademicPeriod,
}