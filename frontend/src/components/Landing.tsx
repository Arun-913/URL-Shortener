import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface UrlElement {
    mainUrl: string;
    shortUrl: string;
    email: string
}

export const Landing = () =>{
    const email: string | undefined = Cookies.get('email');
    const navigate = useNavigate();
    if(email === undefined){
        navigate('/signup');
    }
    const [url, setUrl] = useState<UrlElement[] | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string>('');

    const handleGenerateShortURL = async() =>{
        await axios.post('http://localhost:8080/post-url', {
            email: email,
            url: redirectUrl
        });
    }


    useEffect(() =>{
        const fetechUserUrl = async():Promise<void> =>{
            const response = await axios.post('http://localhost:8080/user-url', {
                email: email
            })
            setUrl(response.data);
        }

        fetechUserUrl();
    },[])

    return (
        <>
            <div>Create Short Url</div>
            <input 
                type="text"
                value={redirectUrl}
                onChange={e => setRedirectUrl(e.target.value)}
                placeholder="Enter the URL"
            />
            <button onClick={handleGenerateShortURL}>Create</button>
            {!url && <div>Loading...</div>}
            <table>
                {url && 
                    <tbody>
                        <tr>
                            <th>Redirect Url</th>
                            <th>Short Url</th>
                        </tr>
                        {url.map((element, index) => (
                            <tr key={index}>
                                <td>{element.mainUrl} &nbsp;</td>
                                <td>
                                    <a href={`http://localhost:8080/${element.shortUrl}`} target="_blank">
                                        http://localhost:8080/{element.shortUrl}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
        </>
    );    
};