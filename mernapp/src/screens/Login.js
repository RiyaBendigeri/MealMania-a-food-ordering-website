import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate=useNavigate();

  const [first, setFirst] = useState({ email: "", password: "" })
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:first.email,password:first.password})
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
      if(json.success){
        localStorage.setItem("userEmail",first.email);//
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        
        navigate("/")
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };
  const onChange = (e) => {
    setFirst({ ...first, [e.target.id]: e.target.value })
  }
  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleClick}>
       
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={first.password} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="email" value={first.email} onChange={onChange} />
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        

        <button type="submit" className="btn btn-primary">Submit</button>
        <button className="linkto"><Link to="./signup">Create Account</Link></button>
      </form>
    </div>
  )
}
