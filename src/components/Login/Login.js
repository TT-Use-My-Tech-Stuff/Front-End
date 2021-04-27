import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import schema from "./formSchema";
import axios from "axios";

const Page = styled.div`
	color: red;
	display: flex;
	justify-content: space-between;


`;

const initialFormValues = {
	username: "",
	password: "",
};

const initialFormErrors = {
	username: "Please enter a valid username.",
	password: "Please enter a valid password.",
};

const Login = (props) => {
	// /login
	// Accept a username/email and password
	// Route to protectedroute after token is received
	// form validation
	const history = useHistory();
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
					[username]: "",
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
			password: formValues.password.trim(),
		};
		setUsername([...username, newUser]);
	};

	useEffect(() => {
		schema.isValid(formValues).then((valid) => {
			setSubmitDisabled(!valid);
		});
	}, [formValues]);

	const onChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
		// console.log(formValues);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
		axios
			.post("https://back-end-tt.herokuapp.com/api/users/login", formValues)
			.then((res) => {
				console.log("res data", res.data);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", res.data.id);
				history.push("/profile");
			})
			.catch((err) => {
				console.log("ERROR:", err);
			});

		submitHandler();
	};

	return (
		<Page>
			<div>
				<form onSubmit={onSubmit}>
					<label className="name">
						{" "}
						Username:
						<input
							type="text"
							name="username"
							placeholder="username"
							value={formValues.username}
							onChange={onChange}
						/>
					</label>
					<label className="password">
						{" "}
						Password:
						<input
							type="password"
							name="password"
							placeholder="password"
							value={formValues.password}
							onChange={onChange}
						/>
					</label>

					<button disabled={submitDisabled}> Log in </button>
				</form>

				{formValues.username.length < 5 ||
					(formValues.password.length < 5 && (
						<div>
							<p> {formErrors.username} </p> <p> {formErrors.password} </p>
						</div>
					))}
			</div>
		</Page>
	);
};

export default Login;
