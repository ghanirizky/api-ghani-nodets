import { List } from "../model/";
import { TList } from "../common/types";
import {Request, Response} from "express"

export default class CryptoController {


    static getList = async(req: Request, res: Response) => {

        try {
            const data: TList[] = await List.find({}).exec()

            return res.status(200).send({
                status : "Ok",
                data : data
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }

    static getListById = async(req: Request, res: Response) => {

        try {
            
            const {id: _id} = req.params


            const data: TList|null = await List.findById({_id }).exec()

            if(!data) return res.status(400).send({
                status : "Error",
                msg : "Data not found!"
            })

            return res.status(200).send({
                status : "Ok",
                data : data
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }

    static create = async(req: Request, res: Response) => {
        const {title, description} = req.body

        try {

            const data: TList|null = await List.create({title, description})

            if(!data) return res.status(400).send({
                status : "Error",
                msg : "Data not found!"
            })

            return res.status(200).send({
                status : "Ok",
                msg : "Data created!"
            })

        } catch (error :  any) {
            return res.status(200).send({
                status : "Error",
                error : error?.message
            })
        }

    }

    static update = async(req: Request, res: Response) => {

        try {

            const {id : _id, title, description} = req.body
            

            const data: TList|null = await List.findByIdAndUpdate({ _id}, {title, description}).exec()

            if(!data) return res.status(400).send({
                status : "Error",
                msg : "Data not found!"
            })

            return res.status(200).send({
                status : "Ok",
                msg: "Data Updated!"
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }

    static deleteById = async(req: Request, res: Response) => {

        try {

            const {id : _id} = req.params

            const data: TList|null = await List.findByIdAndDelete({_id}).exec()

            if(!data) return res.status(400).send({
                status : "Error",
                msg : "Data not found!"
            })

            return res.status(200).send({
                status : "Ok",
                msg: "Data Deleted!"
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }

    static resolvedData = async(req: Request, res: Response) => {

        try {

            const {id: _id} = req.params

            const data: TList|null = await List.findById({_id}).exec()


            if(!data) return res.status(400).send({
                status : "Error",
                msg : "Data not found!"
            })

            data.is_resolved = !data.is_resolved

            data.save()

            return res.status(200).send({
                status : "Ok",
                msg: "Data updated!"
            })

        } catch (error) {
            return res.status(200).send({
                status : "Error",
                error : error
            })
        }

    }


}