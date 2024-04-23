import express from 'express';
const app = express();
import cors from 'cors';
import {handleGenerateNewShortURL, handleRedirect, handleUserUrl} from './controllers/url';
import { handleUserSignUp, handleUserSignIn } from './controllers/user';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post('/post-url', handleGenerateNewShortURL);
app.get('/:shortId',  handleRedirect);
app.post('/signup', handleUserSignUp);
app.post('/signin', handleUserSignIn);
app.post('/user-url', handleUserUrl);


// async function main() {
//     await prisma.url.deleteMany({});
//     console.log('deleted successfully');
// }

// main()

app.listen(8080, () => console.log("Server started at port 8080"));