import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import styled from 'styled-components'
import axios from 'axios'
import img from './wood-bg.jpg'

const formSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Minimum length of 3 characters"),
    password: yup.string().required("Password is required"),
    email: yup.string().required("Email is required"),
    name: yup.string(),
    avatar: yup.string()
})

const CreateUser = () => {

    

    const validate = e => {
        let t = e.target
        yup
            .reach(formSchema, t.name)
            .validate(t.value)
            .then(() => {
                setErrorState({ ...errorState, [t.name]: "" })
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [t.name]: err.errors[0]
                })
            })
    }

    const inputChange = e => {
        e.persist()
        validate(e)

        let t = e.target
        setFormState({ ...formState, [t.name]: t.value })
    }

    return (
        <StyledDiv className='signup-container'>
            <span className='form-container'>
                <header>
                    <h1 className='signup-title'>Register a new user</h1>
                </header>
                <form onSubmit={formSubmit}>
                    <label htmlFor='username'>
                        <h2>Username</h2>
                        <StyledInput name='username' type='text' value={formState.username} onChange={inputChange} />
                    </label>
                    {errorState.username ? <span className='error'>{errorState.username}</span> : null}
                    <label htmlFor='password'>
                        <h2>Password</h2>
                        <StyledInput name='password' type='password' value={formState.password} onChange={inputChange} />
                    </label>
                    {errorState.password ? <span className="error">{errorState.password}</span> : null}
                    <label htmlFor='email'>
                        <h2>Email</h2>
                        <StyledInput name='email' type='email' value={formState.email} onChange={inputChange} />
                    </label>
                    {errorState.email ? <span className="error">{errorState.email}</span> : null}
                    <button disabled={buttonDisabled}>Submit</button>
                </form>
            </span>
        </StyledDiv>
    )
}

export default CreateUser

//color palette
// #333D45
// #4D6E7F
// #7E8D9C
// #D5C9BB
// #C5742C
// #813D18

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    background-image: url(${img});
    background-size: cover;
    padding: 50px;
    height: 100vh;
header {
    background-color: #813D18;
    width: 100%;
    padding: 5% 10%;
    display: flex;
    justify-content: center;
}
.form-container {
    border-radius: 10px;
    padding: 3% 3.2%;
    padding-top: 0%;
    display: flex;
    flex-flow: column;
    align-items: center;
}
form {
    margin-top: 50px;
    display: flex;
    flex-flow: column;
    align-items: center;
}
label {
    display: flex;
    flex-flow: column;
    color: #333D45;
    font-size: 1.2rem;
    font-weight: bold;
}
h1 {
    color: #D5C9BB;
    background-color: #813D18;
    margin: 10px 0px 20px 0px;
    font-size: 2rem;
    font-weight: bold;
}
.error {
    color: white;
}
button {
    border: 2px solid white;
    border-radius: 5px;
    width: 150px;
    margin-top: 30px;
    padding: 7px 15px;
    font-weight: bold;
    letter-spacing: 1px;
}
button:hover {
  color: white;
  background-image: none;
  background-color: #4D6E7F;
  border: 2px solid white;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
}
button:disabled {
  color: #666;
  background-image: none;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  text-shadow: none;
}
`

const StyledInput = styled.input`
border: 2px solid white;
border-radius: 5px;
width: 30vw;
margin: 1.2% auto;
padding: 1.4% 0 1.4% 1.2%;
`