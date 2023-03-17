import React from 'react'
import './SignIn.scss'
import userService from '../../Services/user.service'
import { useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom"



function SignIn() {
  const [inputWrong, setInputWrong] = useState(false)

let navigate = useNavigate()
  const initialUserState = {
    id: null,
    username: "",
    password: ""
  };


  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = (event) => {
   

    event.preventDefault();
    const params = {
      username: event.target.username?.value,
      password: event.target.password?.value,
    }
    let hasError = false

    let strongPassword = new RegExp('^[a-zA-Z0-9_]{6,}$')
    if(!strongPassword.test(params.password)){
      setInputWrong(true)
    }

    if (hasError){
      
      return
    }


    userService.logIn(params).then((response) => {
    
      sessionStorage.setItem('token',response.data.access_token)
      sessionStorage.setItem('userId', response.data.user.id)
      if (response.data.access_token) {
        navigate("/newsfeed")
       }
       
    }).catch(e => {
      alert("Your info wasn't right, try again")
      console.log(e);
    });

  }

  return (
    <section className='sign-in-container'>
      <h1>Welcome!</h1>
      <h2>Please enter your details.</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' onSubmit={handleInputChange} placeholder='Please enter your email'></input>
        <label htmlFor='password'>Password</label>
        <input style={inputWrong ? {border : "3px solid #D60606", background: "#FFDBDB" }: null}
        type='password' name='password'  onSubmit={handleInputChange} placeholder='Please enter your password'></input>
        {inputWrong ? (<p className='error-text'>Password must contain at least 8 characters, numbers, capital letters and lower case letters</p>) : null}
        <button disabled={inputWrong} type='submit' className='submit-btn'>Sign in!</button>
     
      </form>
      <h3>Don’t have a account yet?</h3>
      <NavLink to="/signUp">
        <h4>Sign up here!</h4>
      </NavLink>
    </section>
  )
}

export default SignIn