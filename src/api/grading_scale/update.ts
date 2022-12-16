import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function updateGradingscale(gradingScaleId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateGradingscale = await db.grading_scale.update({
            where: {
                id: gradingScaleId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "cannot update grading_scale" };
    }
}
