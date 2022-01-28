import {CryptoServices} from "../services/index"
import {Request, Response} from "express"

export default class CryptoController {


    static getList = async(req:Request, res: Response) => {

        try {
            const list = await CryptoServices.getList()

            if(typeof list === 'boolean') return res.status(400).send({
                status : "Error",
                error : "There's something wrong from the called services"
            })

            return res.status(200).send({
                status : "Ok",
                data : list
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }

}