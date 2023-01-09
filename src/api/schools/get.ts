import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSchools(db: PrismaClient, logger: Logger): Promise<any> {
    try {
        return await db.schools.findMany({
            select: {
                id: true,
                name: true,
                motto: true,
                type: true,
                email: true,
                logo: true,
                website: true,
                country: true,
                address: true,
            },
        });
    } catch (error: any) {
        logger.log(error.message);

        return [];
    }
}

async function getSchool(schoolId: number, db: PrismaClient, logger: Logger) {
    try {
        return await db.schools.findUnique({
            where: {
                id: schoolId,
            },
            select: {
                id: true,
                name: true,
                motto: true,
                type: true,
                email: true,
                logo: true,
                website: true,
                country: true,
                address: true,
            },
        });
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export { getSchools, getSchool };
