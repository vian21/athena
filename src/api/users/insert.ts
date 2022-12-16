import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newUser(UserObject: any, db: PrismaClient, logger: Logger) {
    try {

        const user = await db.users.create({
            data: UserObject,
        })

        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create user" }
    }

}