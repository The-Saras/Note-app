import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login() {
    const [info, setInfo] = useState({email:"",password:""})
    let history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:info.email,password:info.password})

        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            //save token in local storage
            localStorage.setItem('token',json.authtoken)
            history.push("/")
        }
        else{
            alert("Wrong user details")
        }
    }
    const onchange=(e)=>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={info.email} onChange={onchange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={info.password} onChange={onchange} className="form-control" name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
