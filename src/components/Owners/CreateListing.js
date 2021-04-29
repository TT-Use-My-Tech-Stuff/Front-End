import React from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "./axiosWithAuth"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

export default function CreateListing(props) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const owner_id = localStorage.getItem("user");

  const onSubmit = data =>{ 
    axiosWithAuth()
      .post(`https://back-end-tt.herokuapp.com/api/equipment/createEquipment/${owner_id}`, data)
      .then(res => {
      console.log(res.data);
      history.push("/owner")
      })
      .catch(err => {
        console.error(err)
      })
    }
  return (
    <Page>
      <h1>RENT YOUR TECH</h1>
      <div className="formContainer">
      <form className="itemForm" onSubmit={handleSubmit(onSubmit)}>

      <h2>Equipment Name:</h2>
      <input type="text" className="name" {...register("equipment_name")} placeholder="Name"/>
      
      <h2>Item Description:</h2>
      <input type="text" className="description"{...register("equipment_description")} placeholder="Insert description here" />
      <br></br>
      <input type="submit" className="submit" />
      <button onClick={() => history.goBack()} className="cb">Cancel</button>
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

  .itemForm {
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
  .cb{
    background-color:#52869a;
    width:50%;
    margin:auto;
  }

  .submit{
    background-color:#52869a;
    width:50%;
    margin:auto;
  }

  .description{
    height:10vh;
  }
`;
