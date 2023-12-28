import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  UserName: yup.string().min(3, 'שם משתמש עם מינימום 3 תווים').required(),
  Password: yup.string().required().min(6, 'הסיסמה צריכה להיות לפחות 6 תווים')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'הסיסמה צריכה לכלול גם אותיות וגם מספרים'),
}).required();
//   export default function Login() {
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm({
//       resolver: yupResolver(schema),
//     })
//     const onSubmit = (data) => {
//       axios.post('http://localhost:8080/api/user/login',data)
//       .then(user=>{
//         dispatch(updateUser(user.data));//to CHECK----------------------------------------------------------------------------
//       })
//       .catch(er=>{
//         alert("שם משתמש או סיסמא לא נכונים")
//       })
//     }

//     return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register("UserName")} />
//         <p>{errors.firstName?.message}</p>

//         <input {...register("Password")} />
//         <p>{errors.age?.message}</p>

//         <input type="submit" />
//       </form>
//     )
//   }

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    console.log("login")
    axios.post('http://localhost:8080/api/user/login', data)
      .then(user => {
        console.log(user)
        //dispatch(updateUser(user.data));//to CHECK----------------------------------------------------------------------------
      })
      .catch(er => {
        alert("שם משתמש או סיסמא לא נכונים")
      })
  }
  return <>
    <Segment placeholder horizonalAlign='middle'>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
            {...register("UserName")}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            {...register("Password")}
          />

          <Button content='Login' primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  </>
}

export default Login