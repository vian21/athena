import { PrismaClient } from "@prisma/client";
import { Logger, userSelect } from "@api/plugins/interfaces";

async function getUser(
    userId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const user = await db.users.findUnique({
            where: {
                id: userId,
            },
            select: userSelect
        });

        return user;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

async function getUsers(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const users = await db.users.findMany({ select: userSelect });

        return users;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}

export {
    getUsers,
    getUser
}