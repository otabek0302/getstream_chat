import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie'

import TeamImage from '../assets/TeamImage.jpeg'
import Logo from '../assets/AO.png'
import EnterIcon from '../assets/EnterIcon.svg'
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:8000/auth';
const cookies = new Cookies();

const initialState = {
  picture: "",
  userName: "",
  fullName: "",
  phoneNumber: "",
}

const Register = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { token, userId, userName, fullName, phoneNumber, picture } } = await axios.post(`${baseURL}/register`, form);

    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("userName", userName);
    cookies.set("fullName", fullName);
    cookies.set("phoneNumber", phoneNumber);
    cookies.set("picture", picture);

    window.location.reload();
  }

  useEffect(() => {
    if (cookies.get("token")) {
        navigate("/");
    }

  },[navigate])

  return (
    <div className='register__page-container'>
      <div className="register__page-wrapper">
        <div className="register__page-slider">
          <img src={TeamImage} alt="Team Images" />
        </div>
        <div className="register__page-form">
          <form className='register__page-form__wrapper' onSubmit={handleSubmit}>
            <div className="register__page-form__field logo">
              <img src={Logo} alt="Logo" />
            </div>

            <div className="register__page-form__field inp">
              <input name='picture' type="text" placeholder='Picture' onChange={handleChange} />
            </div>
            <div className="register__page-form__field inp">
              <input name='userName' required type="text" placeholder='Username' onChange={handleChange} />
            </div>
            <div className="register__page-form__field inp">
              <input name='fullName' type="text" placeholder='Full Name' onChange={handleChange} />
            </div>
            <div className="register__page-form__field inp">
              <input name='phoneNumber' required type="text" placeholder='Phone number' onChange={handleChange} />
            </div>

            <div className="register__page-form__field start">
              <p>By singing up, You agree to our <a href="/">Terms & Conditions</a></p>
            </div>
            <div className="register__page-form__field btn end">
              <button type='submit'>
                <img src={EnterIcon} alt="" /> Sing Up
              </button>
            </div>
            <div className="register__page-form__field end">
              <p>Already have an account ? <a href="/login">Login</a></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register