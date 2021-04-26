import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

const Page = styled.div``;

const initialFormValues = {
	username: "",
	password: "",
};

const initialFormErrors = {
	username: "Please enter a valid username.",
	password: "Your password was incorrect.",
};

const Login = () => {
	// /login
	// Accept a username/email and password
	// Route to protectedroute after token is received
	// form validation

	const [username, setUsername] = useState([]);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const onChangeHandler = (username, value) => {
		yup
			.reach(schema, username)
			.validate(value)
			.then(() => {
				setFormErrors({
					...formErrors,
					[username]: " ",
				});
			})
			.catch((err) => {
				setFormErrors({
					...formErrors,
					[username]: err.errors[0],
				});
			});
		setFormValues({ ...formValues, [username]: value });
	};

	const submitHandler = (e) => {
		const newUser = {
			username: formValues.username.trim(),
			email: formValues.email.trim(),
		};
		setUsername([...username, newUser]);
	};

	useEffect(() => {
		schema.isValid(formValues).then((valid) => {
			setSubmitDisabled(!valid);
		});
	}, [formValues]);

    const onSubmit = (e) => {
		e.preventDefault();
		submitHandler();
	};


	return <Page>
        <div>
            <form onSubmit={onSubmit}>
                <label className='name'>
                    {' '}
                    Username:
                    <input
                    type="text"
                    name='username'
                    value={formValues.username}
                    onChange={onChange}
                    />
                </label>
                <label className='password'>
					{" "}
					Password:
					<input
						type="password"
						name="password"
						value={formValues.password}
						onChange={onChange}
					/>
				</label>

                <button disabled={submitDisabled}> Submit </button>
            </form>
        </div>
    </Page>;
};

export default Login;
