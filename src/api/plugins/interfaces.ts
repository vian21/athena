export interface User {
    id: number;
    first_name: string;
    last_name: string;
}

export interface Logger {
    log(message: string): void;
}

export const userSelect = {
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    DOB: true,
    gender: true,
    tel: true,
    address: true,
    nationality: true,
    account_type: true,
    status: true,
    password: false,
};
