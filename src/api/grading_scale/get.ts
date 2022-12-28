import { gradingScaleSelect, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getGradingscales(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.grading_scales.findMany({
            select: gradingScaleSelect
        });

    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}
async function getGradingscale(
    grading_scaleId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        return await db.grading_scales.findUnique({
            where: {
                id: grading_scaleId,
            },
            select: gradingScaleSelect
        });


    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export {
    getGradingscale,
    getGradingscales
}