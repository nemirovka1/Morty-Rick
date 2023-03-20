import React from 'react'
import { useState } from "react";
import './form.scss'
function Form({title,onSubmitHandler}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='form__wrapper'>
        <form
            className='form__container'
        onSubmit={(e) => onSubmitHandler(e,email,password)}>
            <label
            className='form__container_label'
            htmlFor="email">Enter your e-mail*</label>
            <input
            className='form__container_input'
            required
            type="text"
            name="email"
            id="email"
            placeholder="kateryna.nemirovskay@gmail.com"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}/>
            <label
              className='form__container_label'
              htmlFor="password">Enter your password*</label>
            <input
            className='form__container_input'
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}/>
            <button type="submit" className='form__container_btn' >{title}</button>
        </form>
    </div>
  )
}

export {Form};
