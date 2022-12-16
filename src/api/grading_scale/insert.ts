import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newGradingscale(gradingScaleObject: any, db: PrismaClient, logger: Logger) {
    try {

        const gradingScale = await db.grading_scale.create({
            data: gradingScaleObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create grading scale" }
    }

}