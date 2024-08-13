import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import { useState } from 'react'
export default function Signup() {
    const[first,setFirst]=useState({name:"",email:"",password:"",location:""})
    const handleClick=async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(first)
            });

            if (!response.ok) {
                // Handle non-200 responses
                const errorText = await response.text();
                console.error("Error:", errorText);
                alert("An error occurred: " + response.statusText);
                return;
            }

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred: " + error.message);
        }
    };
    const onChange=(e)=>{
        setFirst({ ...first, [e.target.id]: e.target.value })
    }
    return (
        
        
        <div>
            <Navbar></Navbar>
            <form onSubmit={handleClick}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name"  value={first.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  value={first.password} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" value={first.email} onChange={onChange}/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="address" className="form-control" id="location"  value={first.location} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="linkto"><Link to="./login">Already a user</Link></button>
            </form>
        </div>
    )
}
