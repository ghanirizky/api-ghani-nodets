import {Secret} from "jsonwebtoken";

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME, PORT} = process.env;
const JWT_KEY : Secret = process.env.JWT_KEY as string
const SESSION_EXPIRES = process.env.SESSION_EXPIRES as string
const API_KEY = process.env.API_KEY as string
const DB_URI: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true`;
const SALT = 10

export {
    JWT_KEY,
    DB_URI,
    SALT,
    SESSION_EXPIRES,
    API_KEY,
    PORT
}