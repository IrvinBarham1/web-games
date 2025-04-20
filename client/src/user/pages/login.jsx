import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [authCheck, setAuthCheck] = useState(false);
    const [authUsers, setAuthUsers] = useState([]);
    const [authPass, setAuthPass] = useState([]);
    const [authorized, setAuthStatus] = useState(false);

    useEffect(() => {
        fetch('/authUsers')
        .then(response => response.json())
        .then(data => {setAuthUsers(data.users)})
        fetch('/authPass')
        .then(response => response.json())
        .then(data => {setAuthPass(data.passwords)})
    },[])

 
    const Authorize = () => {
        const navigate = Navigate();
        if(authUsers.includes(document.getElementById('userName').value) && authPass.includes(document.getElementById('password').value)){
            alert("Youre in!");
            return <Navigate to="/home" replace />
        }
        else   
            alert("Incorrect Login");
    }

    return(
        <div className="login">
            <form>
                <h1>Irvin's Web Games</h1>
                <label>Username:</label>
                <input type="text" id="userName" required/>
                <br/>
                <label>Password:</label>
                <input type="password" id="password" required/>
                <br/>
                <button type="submit" onClick={Authorize}>Login</button>
            </form>
        </div>
    )
}
export default Login;