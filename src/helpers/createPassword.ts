import bcrypt from "bcrypt";
import { SALT } from "../config/config";

export const hashPassword: any = async (plain_password: string) => {
    const gen_salt: string = await bcrypt.genSaltSync(SALT);
    return await bcrypt.hashSync(plain_password, gen_salt);
};
