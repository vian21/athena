import { Pool } from "mysql2";

export type DatabaseConnection = Pool;

export interface User {
    id: number;
    first_name: string;
    last_name: string;
}

export interface Logger {
    log(message: string): void;
}
