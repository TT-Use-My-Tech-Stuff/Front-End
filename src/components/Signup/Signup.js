import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as yup from 'yup'
import axios from 'axios';

const Page = styled.div``

const formSchema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
    type: yup.string().required('Are you a renter, owner or both?')
});

const Signup = () => {

     // /signup
    // create username/email, password, and indicate whether they are a renter or an owner
    // Route to protectedroute after token is received
    // form validation
    const memberID = parseInt(localStorage.getItem('member'));
    const initialData = {
        member: memberID,
        username: '',
        password: '',
        type: ''
    };


    const history = useHistory();
    

    const [formState, setFormState] = useState(initialData);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errorState, setErrorState] = useState({
        username: '',
        password: '',
        type: ''
    })


    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [formState]);

    const valid = evt => {
        let target = evt.target
        yup.reach(formSchema, target.name)
        .validate(target.value)
        .then(() => {
            setErrorState({...errorState, [target.name]: ''})
        })
        .catch (err => {
            setErrorState({
                ...setErrorState,
                [target.name]: err.errors[0]
            })
        })
    }

    const formChange = evt => {
        evt.persist()
        valid(evt)
        let target = evt.target
        setFormState({...formState, [target.name]: target.value})
    }

    const formSubmit = evt => {
        evt.preventDefault();
        axios.post('/api/users/register', formState)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            history.push('/profile')
        })
        .catch(err => 
            console.log(err.response))
        setFormState(initialData)
    };







   
    return(
        <Page>
            <form onSubmit={formSubmit}>
                <label htmlFor='username'>
                    <h3>Username</h3>
                    <input 
                    name='username'
                    type='text'
                    value={formState.username}
                    onChange={formChange} />
                </label>
                <label htmlFor='password'>
                    <h2>Password</h2>
                    <input
                    name='password'
                    type='password'
                    value={formState.password}
                    onChange={formChange} />
                </label>
                <label>
                    <h3>What kind of user are you? A renter? An owner? Both??</h3>
                     <input
                    name='type'
                    type='text'
                    value={formState.text}
                    onChange={formChange} />
                </label>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
        </Page>
    )
}

export default Signup

// localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('user', res.data.id);
//                 props.history.push('/profile')
