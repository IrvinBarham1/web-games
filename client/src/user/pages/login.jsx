import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"


const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [authUsers, setAuthUsers] = useState([]);
    const [authPass, setAuthPass] = useState([]);
    const [loginAlert, setLoginAlert] = useState(null);

    useEffect(() => {
        fetch('/authUsers')
        .then(response => response.json())
        .then(data => {setAuthUsers(data.users)})
        fetch('/authPass')
        .then(response => response.json())
        .then(data => {setAuthPass(data.passwords)})
    },[])

    const Authorize = (event) => {
        event.preventDefault();
        if(authUsers.includes(userName) && authPass.includes(password)){
            setLoginAlert("Validating account in S3 Database..."); //Placeholder for database validation
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
        <div className="login">
            <form onSubmit={Authorize}>
                <h1>Irvin's Web Games</h1>
                <label>Username:</label>
                <input type="text" name="userName" value={userName} onChange={user => setUserName(user.target.value)} required/>
                <br/>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={pass => setPassword(pass.target.value)} required/>
                <br/>
                <button class="login-button" type="submit">Login</button>
                <p class="login-alert">{loginAlert}</p>
            </form>
        </div>
    )
}
export default Login;