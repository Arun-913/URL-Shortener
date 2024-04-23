// import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const Signup = () =>{
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleUserSignup = async() =>{
        if(name === '' || email === '' || password === ''){
            setMessage('Fill the details');
            return;
        }

        const response = await axios.post('http://localhost:8080/signup',{
            name: name,
            email: email,
            password: password
        });

        if(response.data.status === 401){
            setMessage(response.data.message);
            return;
        }
        Cookies.set('email', email);
        navigate('/url');
    }

    return <>
        <span>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input 
            type="email"
            placeholder="Enter Email" 
            value={name}
            onChange={e => setName(e.target.value)}
        /> <br />
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
        {message !== '' ? <div>{message}</div> : <></>}
        <button className='btn' onClick={handleUserSignup}>Singup</button>
    </>
}