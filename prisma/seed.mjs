import { PrismaClient } from "@prisma/client";
import { school, user, users } from "./data.mjs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const fields = 5; //default number of dummy fields

//generate hash for password:="123"
const password = async () => {
    const saltRounds = 10;

    await bcrypt.hash("123", saltRounds).then(async (hash) => {
        return hash;
    });
};

async function createMainUsers() {
    password().then(async (hash) => {
        users.map((user) => {
            user.password = hash;
        });

        await prisma.users.createMany({
            data: users,
            skipDuplicates: true,
        });

        console.log(
            `✅ Inserted ${users.length} given users into the users table`
        );
    });
}
async function createUsers(n = 0) {
    password().then(async (hash) => {
        for (let i = 0; i < n; i++) {
            let userData = user(); //create one fake user
            userData.password = hash; //give him a password

            await prisma.users.create({
                data: userData,
            });
        }

        console.log(`✅ Inserted ${n} dummy users into the users table`);
    });
}
/**
 *
 * @param {int} n - number of schools you want ton generate. Default 5
 */
async function createSchools(n = 5) {
    for (let i = 0; i < n; i++) {
        await prisma.schools.create({
            data: school(),
        });
    }

    console.log(`✅ Inserted ${n} schools in the database`);
}

async function main() {
    /****************
     * Seed users' table
     */
    createMainUsers();
    //create other dummy users
    createUsers(fields);
    /****************
     * Seed schools
     */
    createSchools(fields);
    // createGradingScale(fields);
    // createAcademicPeriods(fields);
    // createAcademicEnrollments(fields);
    // createAssessments(fields);
    // createMarks(fields);
    // createSubjects(fields);
    // createSubjectEnrollments(fields);
}

main().catch((error) => {
    console.log(error);
});
