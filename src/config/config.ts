import {Secret} from "jsonwebtoken";

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
const JWT_KEY : Secret = "|+$<SU[*[>RFcX-Bih8IgD;hQG=!=("
const DB_URI: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true`;
const SALT = 10

export {
    JWT_KEY,
    DB_URI,
    SALT
}