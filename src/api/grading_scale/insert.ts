import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newGradingscale(gradingScaleObject: any, db: PrismaClient, logger: Logger) {
    try {

        await db.grading_scales.create({
            data: gradingScaleObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create grading scale" }
    }

}