import React from 'react'
import UserService from '../../Services/user.service';
import { useState } from 'react';
import './SignUp.scss'
import { NavLink, useNavigate } from 'react-router-dom';

function SignUp() {

  const [wrongPassword, setWrongPassword] = useState(false)
  const [noImage, setNoImage] = useState(false)
  const [wrongUsername, setWrongUsername] = useState(false)
  const [wrongEmail, setWrongEmail] = useState(false)
  const [noBirthday, setNoBirthday] = useState(false)

  let navigate = useNavigate()

  const initialUserState = {
    id: null,
    username: "",
    email: "",
    image: "",
    password: "",
    birthdate: undefined,
  };

  const [imgSrc, setImgSrc] = useState("https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleInputFileChange = event => {

    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      console.log("holaaaaaaaaaaa", reader.result)
      setImgSrc(reader.result);
    };

    console.log(url) // Would see a path?

    setUser({ ...user, image: file });
  };

  const onSubmit = (event) => {

    event.preventDefault();

    const params = {
      image: event.target.image.files[0],
      username: event.target.username?.value,
      email: event.target.email?.value,
      password: event.target.password?.value,
      birthdate: event.target.birthdate?.value
    }
    let hasError = false
    let strongPassword = new RegExp('^[a-zA-Z0-9_]{6,}$')
    console.log(strongPassword)
    if(!strongPassword.test(params.password)){
      setWrongPassword(true)
      console.log("hello world")
      hasError = true
    }

    if(!params.image){
      setNoImage(true)
      hasError = true
    }

    let testUsername = new RegExp('^[a-zA-Z0-9_]{6,}$')
    if(!testUsername.test(params.username)){
      setWrongUsername(true)
      hasError = true
    }
    let checkEmail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')
    if(!checkEmail.test(params.email)){
      setWrongEmail(true)
      hasError = true
    }
    if(!params.birthdate){
      setNoBirthday(true)
      hasError = true
    }
    if (hasError){
      return
    }
    
    UserService.signUp(params).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.access_token);
      sessionStorage.setItem('token',response.data.access_token)
      sessionStorage.setItem('userId', response.data.user.id)
      if (response.data.access_token) {
        navigate("/newsfeed")
        console.log(sessionStorage.getItem("token"));
       }
    }).catch(e => {
      console.log(e);
    });
  

  }

  return (
    <section className='sign-up-container'>
      <h1>Sign up!</h1>
      <h2>Please enter your details.</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='image'>Image</label>
          <input 
            style={noImage? {border : "3px solid #D60606", background: "#FFDBDB" }: null} 
            type='file' name='image' onSubmit={handleInputFileChange}>
          </input>
          {noImage ? (<p className='error-text'>Must include a profile image</p>) : null}
          <label htmlFor='username'>Username</label>
          <input 
            style={wrongUsername? {border : "3px solid #D60606", background: "#FFDBDB" }: null}  
            type='text' name='username'
            onSubmit={handleInputChange} placeholder='Please enter your username'>
          </input>
          {wrongUsername ? (<p className='error-text'>Username must include 6 characters and no special ones</p>) : null}
          <label htmlFor='email'>Email</label>
          <input 
             name='email' 
            style={wrongEmail? {border : "3px solid #D60606", background: "#FFDBDB" }: null} 
            onSubmit={handleInputChange} placeholder='Must be a valid email address'>
          </input>
          {wrongEmail ? (<p className='error-text'>Must include email</p>) : null}
          <label htmlFor='password'>Password</label>
          <input 
            style={wrongPassword ? {border : "3px solid #D60606", background: "#FFDBDB" }: null} type="password" name='password' 
            onSubmit={handleInputChange} placeholder='Please enter your password'>
            </input>
            {wrongPassword ? (<p className='error-text'>Password must contain at least 6 characters, numbers, capital letters and lower case letters</p>) : null}
          <label htmlFor='birthdate'>Birth Date</label>
          <input type='date' name='birthdate' 
            style={noBirthday ? {border : "3px solid #D60606", background: "#FFDBDB" }: null}
            onSubmit={handleInputChange} placeholder='Please enter your birth date'>
          </input>
          {noBirthday ? (<p className='error-text'>Must include birthdate</p>) : null}
          <button
            disabled={wrongPassword && noImage && wrongUsername && wrongEmail && noBirthday}
            type='submit' className='submit-btn'>Sign Up!
          </button>
        </form>
    </section>
  )
}

export default SignUp