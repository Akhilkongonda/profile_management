import React,{useState} from 'react'
import './Adduser.css';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Adduser() {

  let navigate=useNavigate();

  let{register,handleSubmit,formState:{errors},}=useForm()

  //http req error state
  let [err,seterr]=useState("")

  

  function submitform(newuser){
  
    // save new user in json server
    //save the new user make http post request
    axios.post("http://localhost:4000/users",newuser)
    .then(response=>{
      if(response.status===201)
      {
        seterr("");
        //navigate to user component
        navigate("/Users")
      }
    })
    .catch(err=>{
      console.log("error is",err)

      //the client was given an error responce (4xx 5xx)
      if(err.response){
        seterr(err.message);

      }
      //client received a response and the req was nevelleft
      else if(err.request)
      {
        seterr(err.message)

      }
      //other
      else{

        seterr(err.message)
      }
    })





  }
  return (
    <div>
      <h4  style={{fontFamily:"bold"}} className='text-center mt-4 mb-3 '>Adduser</h4>
      {/* http err message */}
      {err.length!==0 &&<p className="text-danger">{err}</p> }
      <div className='row add-user'>
        <div className='col-11 col-sm-8 col-md-6 mx-auto'>
          <form onSubmit={handleSubmit(submitform)} >
          <div className='mb-3'>
            <input className='form-control' type="text"  id="name"placeholder='username' autoComplete='off' {...register("name",{required:true})} />
            {/* validation error for name */}
            {errors.name?.type==="required" && <p className='text-danger'>*user name is required</p>}
          </div>
          <div className='mb-3'>
            <input className='form-control' type="email" name="email" id="email"placeholder='email'  {...register("email",{required:true})} />

          </div>
          <div className='mb-3'>
            <input className='form-control' type="date" name="dateofbirth" id="email"placeholder=''  {...register("dateofbirth",{required:true})} />

          </div>
          <div className='mb-3'>
            <input className='form-control' type="url" name="" id="image" placeholder='image'  {...register("image",{required:true})} />

          </div>
          {/* submit button */}
          <button type="submit" className='btn btn-success'>create new User

          </button>
         
          </form>

        </div>

      </div>
    </div>
  )
}

export default Adduser