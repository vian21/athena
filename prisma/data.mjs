import { faker } from "@faker-js/faker";

let school = () => {
    return {
        name: faker.company.name(),
        motto: faker.company.catchPhrase(),
        type: 1,
        email: faker.internet.email(),
        website: faker.internet.domainName(),
        country: faker.address.country(),
        address: faker.address.streetAddress(),
    };
};
let user = () => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        DOB: faker.date.birthdate({ min: 12, max: 30 }),
        gender: 0,
        email: faker.internet.email(),
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: faker.address.country(),
        account_type: Math.floor(Math.random() * (4 - 0 + 1) + 0), //Math.floor(Math.random() * (max - min + 1) + min)
        status: true, //true for active, false for inactive
    };
};
let users = [
    {
        first_name: "Root",
        last_name: "Base",
        DOB: new Date("2000-01-01"),
        gender: 0,
        email: "root@gmail.com",
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: "Root",
        account_type: 0, //root
        status: true, //true for active, false for inactive
    },
    {
        first_name: "Admin",
        last_name: "Root",
        DOB: new Date("2000-01-01"),
        gender: 0,
        email: "admin@gmail.com",
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: "Root",
        account_type: 1, //admin
        status: true, //1 for active, 0 for inactive
    },
    {
        first_name: "Martin",
        last_name: "Teaches",
        DOB: new Date("2000-01-01"),
        gender: 0,
        email: "teacher@gmail.com",
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: "Canadian",
        account_type: 2, //teacher
        status: true, //1 for active, 0 for inactive
    },
    {
        first_name: "Tina",
        last_name: "Money",
        DOB: new Date("2000-01-01"),
        gender: 1,
        email: "accountant@gmail.com",
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: "Canadian",
        account_type: 3, //accountant
        status: true, //1 for active, 0 for inactive
    },
    {
        first_name: "Patrick",
        last_name: "Igiraneza",
        DOB: new Date("2000-01-01"),
        gender: 0,
        email: "patrick@gmail.com",
        tel: faker.phone.number("+# ###-###-####"),
        address: faker.address.streetAddress(),
        nationality: "Burundian",
        account_type: 4, //student
        status: true, //1 for active, 0 for inactive
    },
];

let gradingScale = [
    {
        max: 100,
        min: 97,
        gpa: 4.0,
        grade: "A+",
    },
    {
        max: 96,
        min: 93,
        gpa: 4.0,
        grade: "A",
    },
    {
        max: 90,
        min: 92,
        gpa: 3.7,
        grade: "A-",
    },
    {
        max: 89,
        min: 87,
        gpa: 3.3,
        grade: "B+",
    },
    {
        max: 86,
        min: 83,
        gpa: 3.0,
        grade: "B",
    },
    {
        max: 82,
        min: 80,
        gpa: 2.7,
        grade: "B-",
    },
    {
        max: 79,
        min: 77,
        gpa: 2.3,
        grade: "C+",
    },
    {
        max: 76,
        min: 73,
        gpa: 2.0,
        grade: "C",
    },
    {
        max: 72,
        min: 70,
        gpa: 1.7,
        grade: "C-",
    },
    {
        max: 69,
        min: 67,
        gpa: 1.3,
        grade: "D+",
    },
    {
        max: 66,
        min: 63,
        gpa: 1.0,
        grade: "D",
    },
    {
        max: 62,
        min: 60,
        gpa: 0.7,
        grade: "D-",
    },

    {
        max: 60,
        min: 0,
        gpa: 0.0,
        grade: "F",
    },
];

let subjects = [
    {
        teacher_id: faker.datatype.number({ min: 1, max: 10 }),
        archived: faker.datatype.boolean(),
        name: "English",
        language: "English",
        description: "Intro to english literature",
        subject_code: "ENG",
        course_number: String(faker.datatype.number()),
    },
    {
        teacher_id: faker.datatype.number({ min: 1, max: 10 }),
        archived: faker.datatype.boolean(),
        name: "Math 1",
        language: "English",
        description: "Intro to calculus",
        subject_code: "MAT",
        course_number: String(faker.datatype.number()),
    },
    {
        teacher_id: faker.datatype.number({ min: 1, max: 10 }),
        archived: faker.datatype.boolean(),
        name: "Physics 1",
        language: "French",
        description: "Intro to Physics",
        subject_code: "PHY",
        course_number: String(faker.datatype.number()),
    },
    {
        teacher_id: faker.datatype.number({ min: 1, max: 10 }),
        archived: faker.datatype.boolean(),
        name: "Geography",
        language: "English",
        description: "Intro to Earth science",
        subject_code: "GEO",
        course_number: String(faker.datatype.number()),
    },
    {
        teacher_id: faker.datatype.number({ min: 1, max: 10 }),
        archived: faker.datatype.boolean(),
        name: "Biology I",
        language: "English",
        description: "Intro to Anatomy",
        subject_code: "BIO",
        course_number: String(faker.datatype.number()),
    },
];
export { gradingScale, school, subjects, user, users };
