import express, {Request, Response} from 'express';
const app = express();
import cors from 'cors';
import {handleGenerateNewShortURL, handleRedirect, handleUserUrl} from './controllers/url';
import { handleUserSignUp, handleUserSignIn } from './controllers/user';

app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response)=> res.send('Server is running'));
app.post('/post-url', handleGenerateNewShortURL);
app.get('/:shortId',  handleRedirect);
app.post('/signup', handleUserSignUp);
app.post('/signin', handleUserSignIn);
app.post('/user-url', handleUserUrl);

app.listen(8080, () => console.log("Server started at port 8080"));