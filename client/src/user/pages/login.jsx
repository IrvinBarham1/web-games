import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"


const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [authUsers, setAuthUsers] = useState([]);
    const [authPass, setAuthPass] = useState([]);
    const [loginAlert, setLoginAlert] = useState('');

    useEffect(() => {
         fetch('/authLogins')
        .then(response => response.json())
        .then(data => {
            setAuthUsers(data.Items?.map(i => i.account?.accountName) ?? ["error fetching usernames"])
            setAuthPass(data.Items?.map(i => i.account?.accountKey) ?? ["error fetching passwords"])
        })

    },[])

    const Authorize = (event) => {
        event.preventDefault();
        if(authUsers.includes(userName) && authPass[authUsers.indexOf(userName)].includes(password)){
            setLoginAlert("Validating account in DynamoDB..."); 
            setTimeout(() => {
                navigate('/home', {replace: true});
            }, 3000);
        }
        else{
            setLoginAlert("Failed Try Again");
            setTimeout(() => {
                setUserName('');
                setPassword(''); 
            }, 1000);   
        }   
    }

    return(
        <div className="login-page">
            <div className="login-card">
                <form onSubmit={Authorize}>
                    <h1 className="login-title">Irvin's Web Games</h1>
                    <label>Username</label>
                    <input type="text" name="userName" value={userName} onChange={user => setUserName(user.target.value)} required/>
                    <br/>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={pass => setPassword(pass.target.value)} required/>
                    <br/>
                    <button className="login-button" type="submit">Login</button>
                    <p className="login-alert">{loginAlert}</p>
                </form>
            </div>
        </div>
        
    )
}
export default Login;