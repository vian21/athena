import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function getSchools(
    db: PrismaClient,
    logger: Logger
): Promise<any> {
    try {
        const schools = await db.schools.findMany({
            select: {
                id: true,
                name: true,
                motto: true,
                type: true,
                email: true,
                logo: true,
                website: true,
                country: true,
                address: true
            },
        });

        return schools;
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}


async function getSchool(
    schoolId: number,
    db: PrismaClient,
    logger: Logger
) {
    try {
        const school = await db.schools.findUnique({
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
                address: true
            },
        });

        return school;
    } catch (error: any) {
        logger.log(error);

        return {};
    }
}

export = {
    getSchools,
    getSchool
}