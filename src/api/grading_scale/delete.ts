import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deletegrading_scale(
    gradingscaleId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.grading_scales.delete({
            where: {
                id: gradingscaleId,
            },
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting school" };
    }
}
