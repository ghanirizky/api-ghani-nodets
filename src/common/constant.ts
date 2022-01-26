const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

const DB_URI: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true`;

export { DB_URI };
