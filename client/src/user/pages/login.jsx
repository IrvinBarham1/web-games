import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [authUsers, setAuthUsers] = useState([]);
    const [authPass, setAuthPass] = useState([]);

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
        const form = event.target;
        if(authUsers.includes(userName) && authPass.includes(form.password.value)){
            alert("Youre in!");
            navigate('/home', {replace: true});
        }
        else{
            alert("Incorrect Login");
            setUserName('');
            setPassword('');     
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;