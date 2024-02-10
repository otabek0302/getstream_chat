import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie'

import Logo from '../assets/AO.png'
import EnterIcon from '../assets/EnterIcon.svg'
import TeamImage from '../assets/TeamImage.jpeg'
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:8000/auth';
const cookies = new Cookies();

const initialState = {
  userName: "",
  phoneNumber: "",
}

const Login = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { token, userId, userName, phoneNumber } } = await axios.post(`${baseURL}/login`, form);

    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("userName", userName);
    cookies.set("phoneNumber", phoneNumber);

    window.location.reload();
  }

  useEffect(() => {
    if (cookies.get("token")) {
      navigate("/");
    }

  }, [navigate])
  return (
    <div className='login__page-container'>
      <div className="login__page-bg">
        <img src={TeamImage} alt="" />
      </div>
      <div className="login__page-wrapper">
        <form className="login__page-form" onSubmit={handleSubmit}>
          <div className='register__page-form__wrapper'>
            <div className="register__page-form__field logo">
              <img src={Logo} alt="Logo" />
            </div>

            <div className="register__page-form__field inp">
              <input required name="userName" type="text" placeholder='Username' onChange={handleChange} />
            </div>
            <div className="register__page-form__field inp">
              <input required name='phoneNumber' type="text" placeholder='Phone number' onChange={handleChange} />
            </div>

            <div className="register__page-form__field btn center">
              <button type='submit'>
                <img src={EnterIcon} alt="" /> Sing In
              </button>
            </div>
            <div className="register__page-form__field end">
              <p>Don't have an account ? <a href="/register">Register</a></p>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login