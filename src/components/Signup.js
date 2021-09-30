import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
function Signup() {
    const [info, setInfo] = useState({name:"",email:"",password:""})
    let history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = info;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})

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
            <div className="container">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"  name="name"  onChange={onchange} aria-describedby="emailHelp" minLength={4}  required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onchange} aria-describedby="emailHelp"  required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"  onChange={onchange} minLength={3} required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
