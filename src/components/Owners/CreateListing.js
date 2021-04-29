import React from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "./axiosWithAuth"
import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components"

export default function CreateListing(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const history = useHistory();

  const onSubmit = data => 
    axiosWithAuth()
      .post(`https://back-end-tt.herokuapp.com/api/equipment/createEquipment/${id}`, data)
      .then(res => {
      console.log(res.data);
      history.push("/profile")
      })
      .catch(err => {
        console.error(err)
      })
  return (
    <Page>
      <h1>RENT YOUR TECH</h1>
      <div className="formContainer">
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>

      <h2>Equipment Name:</h2>
      <input type="text" className="name" {...register("equipment_name")} placeholder="Name"/>
      
      <h2>Item Description:</h2>
      <input type="text" className="description"{...register("equipment_description")} placeholder="Insert description here" />
      
      <input type="submit" /><button className="cb">Cancel</button>
    </form>
    </div>
    </Page>
  );
}


const Page = styled.div`
	background-color: #01303f;
	color: white;
	height: 100vh;
	margin: auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	font-family: PressStart2P;

	h1 {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 90%;
		margin: 10px auto;
	}

	.loginForm {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #02577a;
		padding: 10px;
		border-radius: 5px;
		width: 60%;
		margin: auto;
	}
	label {
		padding: 5px;
	}

	input {
		background-color: #02a9f7;
	}

  button{
    background-color:red;
  }

  .cb{
    background-color:white;
  }
`;
