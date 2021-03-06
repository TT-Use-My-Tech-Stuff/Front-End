import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup'

const Page = styled.div`
    background-color: #01303f;
    color: white;
    height: 100vh;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: PressStart2P;
    label {
        padding: 5px;
        display:flex;
        justify-content: center;
    }

    button{
        width: 80%;
        margin: auto;
    }

    input {
        background-color: #02a9f7;
    }
    .registerForm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #02577a;
        padding: 10px;
        border-radius: 5px;
        width:40%;
        margin: auto;
    }
`

const formSchema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
    user_type: yup.string().required('Are you a renter, owner or both?')
});

const initialData = {
    // member: memberID,
    username: '',
    password: '',
    user_type: ''
};

const Signup = () => {

     // /signup
    // create username/email, password, and indicate whether they are a renter or an owner
    // Route to protectedroute after token is received
    // form validation
    // const memberID = parseInt(localStorage.getItem('member'));
    


    const history = useHistory();
    

    const [formState, setFormState] = useState(initialData);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errorState, setErrorState] = useState({
        username: '',
        password: '',
        user_type: ''
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
        axios.post('https://back-end-tt.herokuapp.com/api/users/register', formState)
        .then(res => {
            history.push("/login");
        })
        .catch(err => 
            console.log(err.response))
        setFormState(initialData)
    };
   
    return(
        <Page>
            <form className="registerForm" onSubmit={formSubmit}>
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
                    <input type="radio" id="renter" name="user_type" value="renter" onChange={formChange}/>
                    <label for = "renter">renter</label>
                    <input type="radio" id="owner" name="user_type" value="owner" onChange={formChange}/>
                    <label for = "owner">owner</label>
                    <input type="radio" id="both" name="user_type" value="both" onChange={formChange}/>
                    <label for = "both">both</label>
                     {/* <input
                    name='type'
                    type='text'
                    value={formState.text}
                    onChange={formChange} /> */}
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
