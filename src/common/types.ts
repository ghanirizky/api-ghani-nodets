import mongoose from "mongoose"

interface TFeed extends mongoose.Document {
    title: string;
    link: string;
    enclosure: any;
    content: string;
    contentSnipper: string;
    guid: string;
    isoDate: string;
}

interface TSettings extends mongoose.Document{
    name: string,
    value: string,
    last_update? : string
}

interface TUser extends mongoose.Document{
    user_name : string,
    email : string,
    password : string,
    is_active : boolean,
    is_verify: boolean,
    generateToken() : string,
    sendConfirmationEmail(token: string) : void
}

interface TList extends mongoose.Document{
    title : string,
    description : string,
    is_resolved : boolean
}

interface JwtPayload { 
    id : string,
    email : string,
    user_name : string,
}

export {
    TFeed,
    TSettings,
    TUser,
    TList,
    JwtPayload
}