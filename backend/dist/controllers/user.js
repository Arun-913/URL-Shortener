"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSignIn = exports.handleUserSignUp = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const handleUserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const response = yield prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (response) {
        return res.json({
            message: 'User already exist, please signin',
            status: 401,
        });
    }
    yield prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
    return res.json({
        status: 200
    });
});
exports.handleUserSignUp = handleUserSignUp;
const handleUserSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const response = yield prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (response) {
        return res.json({
            name: response.name,
            email: response.email,
            password: response.password,
            status: 200
        });
    }
    else {
        return res.json({
            message: 'User does not Exist, please signup',
            status: 401,
        });
    }
});
exports.handleUserSignIn = handleUserSignIn;
