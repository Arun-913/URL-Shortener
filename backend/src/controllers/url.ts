import shortid from "shortid";
import { Request, Response } from 'express'; 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

type responseType = {
    shortUrl: String,
    mainUrl: String
};

export const handleGenerateNewShortURL = async(req:Request, res:Response): Promise<Response> =>{
    const url: string = req.body.url;
    const email: string = req.body.email;

    let shortId:string;
    while(true){
        shortId = shortid();
        const response: responseType | null = await prisma.url.findUnique({
            where:{
                shortUrl: shortId
            },
        });
        if(response == null)
            break;
    }

    await prisma.url.create({
        data:{
            shortUrl: shortId,
            mainUrl: url,
            email: email
        },
    });
    return res.json({url: `http://localhost:8080/${shortId}`});
}

export const handleRedirect = async(req:Request, res:Response): Promise<void> =>{
    const url:string = req.params.shortId;

    const response: responseType | null = await prisma.url.findUnique({
        where:{
            shortUrl: url
        },
    });

    if (response) {
        return res.redirect(response.mainUrl.toString());
    } else {
        res.status(404).send("URL not found");
    }
}

export const handleUserUrl = async(req: Request, res: Response): Promise<Response>=>{
    const email = req.body.email;

    const response = await prisma.url.findMany({
        where:{
            email: email
        },
    });

    return res.json(response);
}