import React from 'react'
import './Removeduser.css';
import { useEffect,useState } from 'react';
import axios from 'axios'


function Removeduser() {
  let [users,setusers]=useState([])
  let [err,seterr]=useState()


  let deleteuser=(userobjtobedeleted)=>{

    axios.delete("http://localhost:4000/removedusers/"+userobjtobedeleted.id)
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
    axios.get("http://localhost:4000/removedusers?timestamp=" + Date.now())

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


  useEffect(()=>{
    
    getuser();


  },[])
  return (
   
    <div className='container mt-4'>
      <h5 className='text-center mt-3 mb-3'>RemovedUsers</h5>

      <div className='row'>
      {
        users.map(user => (
          <div key={user.id} className="col-sm-12 col-md-6 col-lg-4 mb-4 card-container ">
            
             <div className='card card-content mt-0'>
             <div className="card-body">
              <img src={user.image} className="card-img-top profile-image" alt={user.name} />
                <h5 className="card-title mt-3">Name:{user.name}</h5>
                <h5 className="card-title mt-3">AllotedId:{user.id}</h5>

                <p className="card-text">Email: {user.email}</p>
                <p> DOB:{user.dateofbirth}</p>
                <button className='btn btn2 btn-danger' onClick={()=>deleteuser(user)}>Delete</button>

                
              </div>
             </div>
              
            
          </div>
        ))}

      </div>
      
      

      



    </div>
  )
}

export default Removeduser