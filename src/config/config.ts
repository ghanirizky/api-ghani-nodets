const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_NAME,
  PORT,
  EMAIL,
  EMAIL_PASS,
  API_KEY,
  JWT_KEY,
  SESSION_EXPIRES,
  SALT,
} = process.env;

const DB_URI: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true`;

export {
  JWT_KEY,
  DB_URI,
  SALT,
  SESSION_EXPIRES,
  API_KEY,
  PORT,
  EMAIL,
  EMAIL_PASS,
};
