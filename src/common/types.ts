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
    password : string,
    is_active : boolean
}

export {
    TFeed,
    TSettings,
    TUser
}