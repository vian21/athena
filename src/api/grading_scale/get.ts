import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getGradingscales(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        return await db.grading_scale.findMany({
            select: {
                id: true,
                min: true,
                max: true,
                grade: true
            }
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
        return await db.grading_scale.findUnique({
            where: {
                id: grading_scaleId,
            },
            select: {
                id: true,
                min: true,
                max: true,
                grade: true


            },
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