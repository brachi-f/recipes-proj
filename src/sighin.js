import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios";
import { useDispatch } from 'react-redux';
import * as actionsName from './action';

const schema = yup.object().shape({
    UserName: yup.string().min(3,'שם משתמש עם מינימום 3 תווים').required(),
    PassWord: yup.string().required().min(6, 'הסיסמה צריכה להיות לפחות 6 תווים')
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'הסיסמה צריכה לכלול גם אותיות וגם מספרים'),
    Name: yup.string().min(3,'').required(),
    Phone: yup.string().matches(/^[0-9]{10}$/, 'מספר הפלאפון חייב להיות מורכב מ-10 ספרות').required('שדה זה הינו חובה'), 
    Email: yup.string().email('כתובת המייל אינה תקינה').required(),
    Tz: yup.string().matches(/^\d{9}$/, 'מספר תעודת הזהות צריך להיות מורכב מ-9 ספרות').required('שדה זה הינו חובה'),
  }).required();
  export default function Sighin() {
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
      axios.post('http://localhost:8080/api/user/sighin',data)
      .then(user=>{
        dispatch(actionsName.updateUser(user.data));//to CHECK----------------------------------------------------------------------------
      })
      .catch(er=>{
        alert(er.message)
      })
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("UserName")} />
        <p>{errors.UserName?.message}</p>
  
        <input {...register("PassWord")} />
        <p>{errors.PassWord?.message}</p>
        
        <input {...register("Name")} />
        <p>{errors.Name?.message}</p>
        
        <input {...register("Phone")} />
        <p>{errors.Phone?.message}</p>
        
        <input {...register("Email")} />
        <p>{errors.Email?.message}</p>
        
        <input {...register("Tz")} />
        <p>{errors.Tz?.message}</p>
        
        
        <input type="submit" />
      </form>
    )
  }