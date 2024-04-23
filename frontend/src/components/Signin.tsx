import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    
    const handleUserSignin = async() =>{
        if(email === '' || password === ''){
            setMessage("Fill the details");
            return;
        }
        const response = await axios.post('http://localhost:8080/signin',{
            email: email,
            password: password
        });
        console.log(response);
        if(response.data.status === 401){
            setMessage(response.data.message);
            return;
        }
        else if(response.data.password !== password){
            setMessage("Password is incorrect");
            return;
        }
        console.log('here');
        Cookies.set('email', email);
        navigate('/url');
    }

    return <>
        <span>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input 
            type="email"
            placeholder="Enter Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
        /> <br />
        <span>Password: </span>
        <input 
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        /> <br />
        {message !== '' && <div>{message}</div>}
        <button className='btn' onClick={handleUserSignin}>Singin</button>
    </>
}