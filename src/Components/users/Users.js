import React from 'react'
import './Users.css'
import { useState,useEffect } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {set, useForm} from 'react-hook-form'



function Users() {

  let{register,handleSubmit,formState:{errors},setValue,getValues}=useForm()

 


  //use state
  let[users,setusers]=useState([])
  let [err,seterr]=useState("")

  //user to edit state
  let[usertoedit,setusertoedit]=useState({})

  let[usertodelete,setusertodelete]=useState({})

  // modal state

  let[show,setshow]=useState(false);

  let showModal=()=>setshow(true);
  let closeModal=()=>setshow(false);



  // edit user

  let edituser=(userobjtobeEdited)=>{
    showModal();
    setusertoedit(userobjtobeEdited)
    setusertodelete(userobjtobeEdited)
    

    //fill input fields with userobjs
    setValue("name",userobjtobeEdited.name)
    setValue("email",userobjtobeEdited.email)
    setValue("dateofbirth",userobjtobeEdited.dateofbirth)
    setValue("image",userobjtobeEdited.image)


  }

  //save user

  let saveuser=()=>{
    closeModal();
    let modifieduser=getValues();
  
    //set id for modied user
    modifieduser.id= usertoedit.id;
    axios.put("http://localhost:4000/users/"+modifieduser.id,modifieduser)
    .then(res=>{
      if(res.status===200)
      {
         getuser()
      }
    })
    .catch(err=>{

    })
    

    

  }

  //get user
  let getuser=()=>{
    axios.get("http://localhost:4000/users?timestamp=" + Date.now())

    .then(response=>{
      if(response.status===200)
      {
        setusers(response.data)
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


  let deleteuser=(userobjtobedeleted)=>{
    console.log(userobjtobedeleted)
    
    setusertodelete(userobjtobedeleted)
    
  
    axios.post(" http://localhost:4000/removedusers",userobjtobedeleted)
    .then(response=>{
      if(response.status===200)
      {

      }
    })
    .catch(err=>{
      console.log("error is",err)
      
    })
    
    axios.delete("http://localhost:4000/users/"+userobjtobedeleted.id)
    .then(res=>{
      if(res.status===200)
      {
         getuser()
      }
    })
    .catch(err=>{

    })
    

  }

  // use effect
  useEffect(()=>{
    //fetchusers
    
getuser()


  },[])




  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Users</h2>
      
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 card-container ">
            
             <div className='card card-content mt-0'>
             <div className="card-body">
              <img src={user.image} className="card-img-top profile-image" alt={user.name} />
                <h5 className="card-title mt-3">Name:{user.name}</h5>
                <h5 className="card-title mt-3">AllotedId:{user.id}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p> DOB:{user.dateofbirth}</p>

                {/* edit button */}
                <button className='btn btn-primary'  onClick={()=>edituser(user)}>Edit</button>

                {/* delete button */}
                <button className='btn btn2 btn-danger' onClick={()=>deleteuser(user)}>Delete</button>
              </div>
             </div>
              
            
          </div>
        ))}
      </div>

      {/* modal to edit user */}
      <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal'>
        {/* modal header */}
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>

        </Modal.Header>

        {/* modal body */}
        <Modal.Body>

          {/* form to edit */}
          <form >
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
            <input className='form-control' type="url" name="" id="image" placeholder='image'  {...register("image",{required:true})} disabled />

          </div>
         
         
          </form>



        </Modal.Body>

        {/* modal footer */}

        <Modal.Footer>
          <button onClick={saveuser}>Save</button>

        </Modal.Footer>

      </Modal>


    </div>
  )
}

export default Users