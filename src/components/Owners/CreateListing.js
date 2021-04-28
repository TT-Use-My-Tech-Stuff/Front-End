import React from "react";
import { useForm } from "react-hook-form";
import {axiosWithAuth} from "./axiosWithAuth"
import {useParams} from "react-router-dom"

export default function CreateListing(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();



  const onSubmit = data => 
    axiosWithAuth()
      .post(`https://back-end-tt.herokuapp.com/api/equipment/createEquipment/${id}`, data)
      .then(res => {
      console.log(res.data);
      })
      .catch(err => {
        console.error(err)
      })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("equipment_name")} placeholder="equipmentName"/>
      <input type="text" {...register("equipment_description")} placeholder="description" />
      <input type="submit" />
    </form>
  );
}

