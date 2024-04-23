"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const url_1 = require("./controllers/url");
const user_1 = require("./controllers/user");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/post-url', url_1.handleGenerateNewShortURL);
app.get('/:shortId', url_1.handleRedirect);
app.post('/signup', user_1.handleUserSignUp);
app.post('/signin', user_1.handleUserSignIn);
app.post('/user-url', url_1.handleUserUrl);
// async function main() {
//     await prisma.url.deleteMany({});
//     console.log('deleted successfully');
// }
// main()
app.listen(8080, () => console.log("Server started at port 8080"));
