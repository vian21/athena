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
export { school, user, users };
