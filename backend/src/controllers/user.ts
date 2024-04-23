import { Request, Response } from 'express'; 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

type responseType = {
    name: string,
    email: string,
    password: string
};

export const handleUserSignUp = async(req: Request, res: Response): Promise<Response> =>{
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const response:responseType | null = await prisma.user.findUnique({
        where:{
            email: email
        }
    });
    if(response){
        return res.json({
            message: 'User already exist, please signin',
            status: 401,
        });
    }

    await prisma.user.create({
        data:{
            name: name,
            email: email,
            password: password
        },
    });
    return res.json({
        status: 200
    });
}

export const handleUserSignIn = async(req: Request, res: Response): Promise<Response> =>{
    const email: string = req.body.email;
    const password: string = req.body.password;

    const response:responseType | null = await prisma.user.findUnique({
        where:{
            email: email
        }
    });
    if(response){
        return res.json({
            name: response.name,
            email: response.email,
            password: response.password,
            status: 200
        });
    }
    else{
        return res.json({
            message: 'User does not Exist, please signup',
            status: 401,
        });
    }
}