import { PrismaClient } from "@prisma/client";
import { gradingScale, school, subjects, user, users } from "./data.mjs";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const fields = 5; //default number of dummy fields

//generate hash for password:="123"
const password = () => {
    const saltRounds = 10;

    return bcrypt.hashSync("123", saltRounds);
};

async function createMainUsers() {
    const hash = password();

    users.map(async (user) => {
        user.password = hash;

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
    const hash = password();

    for (let i = 0; i < n; i++) {
        let userData = user(); //create one fake user

        userData.password = hash; //give him a password

        await prisma.users.create({
            data: userData,
        });
    }

    console.log(`✅ Inserted ${n} dummy users into the users table`);
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

async function createGradingScale(n) {
    for (let i = 0; i < n; i++) {
        //insert each interval
        gradingScale.map(async (interval) => {
            interval.school_id = i + 1;

            await prisma.grading_scale.create({
                data: interval,
            });
        });
    }
    console.log(`✅ Inserted Grading scales for ${n} schools in the database`);
}
async function createAcademicPeriods(n) {
    for (let i = 0; i < n; i++) {
        const type = i % 2;
        const n_terms = type ? 2 : 3;

        let period = {};

        for (let j = 0; j < n_terms; j++) {
            //semester
            if (n_terms % 2) {
                switch (j) {
                    case 0:
                        period.start_date = new Date("2022-01-01");
                        period.end_date = new Date("2022-06-30");
                        break;
                    case 1:
                        period.start_date = new Date("2022-09-01");
                        period.end_date = new Date("2022-12-20");
                }
            }
            //term
            else {
                switch (j) {
                    case 0:
                        period.start_date = new Date("2021-09-01");
                        period.end_date = new Date("2022-12-20");
                        break;
                    case 1:
                        period.start_date = new Date("2022-01-08");
                        period.end_date = new Date("2023-03-20");
                        break;
                    case 2:
                        period.start_date = new Date("2022-04-01");
                        period.end_date = new Date("2023-06-30");
                }
            }

            period.type = type;

            await prisma.academic_periods.create({
                data: period,
            });
        }
    }
    console.log(
        `✅ Inserted Academic Periods for ${n} schools in the database`
    );
}
// async function createAcademicEnrollments(fields){}
// async function createAssessments(fields){}
// async function createMarks(fields){}
async function createSubjects(n) {
    for (let i = 0; i < n; i++) {
        //insert each interval
        subjects.map(async (subject, index) => {
            subject.school_id = i + 1;
            //semester
            if (n % 2) {
                if (index % 2) {
                    subject.start = new Date("2022-01-01");
                    subject.end = new Date("2022-06-30");
                } else {
                    subject.start = new Date("2022-09-01");
                    subject.end = new Date("2022-12-20");
                }
            }
            //term
            else {
                if (index % 2) {
                    subject.start = new Date("2021-09-01");
                    subject.end = new Date("2022-06-30");
                } else {
                    subject.start = new Date("2022-09-01");
                    subject.end = new Date("2023-06-30");
                }
            }

            await prisma.subjects.create({
                data: subject,
            });
        });
    }
    console.log(
        `✅ Inserted ${subjects.length} subjects for ${n} schools in the database`
    );
}
// async function createSubjectEnrollments(fields){}
async function main() {
    // /****************
    //  * Seed users' table
    //  */
    await createMainUsers();
    //create other dummy users
    await createUsers(fields);
    // /****************
    //  * Seed schools
    //  */
    await createSchools(fields).then(() => {
        createGradingScale(fields);
    });
    createAcademicPeriods(fields);
    // createAcademicEnrollments(fields);
    // createAssessments(fields);
    // createMarks(fields);
    await createSubjects(fields);
    // createSubjectEnrollments(fields);
}

main().catch((error) => {
    console.log(error);
});
