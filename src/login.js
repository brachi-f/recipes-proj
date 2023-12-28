import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
    userName: yup.string().min(3,'שם משתמש עם מינימום 3 תווים').required(),
    password: yup.string().required().min(6, 'הסיסמה צריכה להיות לפחות 6 תווים')
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'הסיסמה צריכה לכלול גם אותיות וגם מספרים'),
  }).required();
  export default function Login() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
      axios.post('http://localhost:8080/api/user/login',data)
      .then(user=>{
        dispatch(updateUser(user.data));//to CHECK----------------------------------------------------------------------------
      })
      .catch(er=>{
        alert("שם משתמש או סיסמא לא נכונים")
      })
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userName")} />
        <p>{errors.firstName?.message}</p>
  
        <input {...register("password")} />
        <p>{errors.age?.message}</p>
        
        <input type="submit" />
      </form>
    )
  }