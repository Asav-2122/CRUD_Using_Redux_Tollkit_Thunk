import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addNewUser } from "../../redux/slice/userslice";

const CreateNewUSer = () => {
    const [newUserData,setNewUserData] = useState({
        name : "",
        email : "",
        age : ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCreateUser=(e)=>{
        e.preventDefault()
         dispatch(addNewUser(newUserData))
         navigate("/")
    }
  return (
    <div className="w-100 my-5 d-flex justify-content-center">
      <form>
      <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
              Name
          </label>
          <input
            type="text"
            value={newUserData.name}
            onChange={(e)=>setNewUserData({...newUserData,name:e.target.value})}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={newUserData.email}
            onChange={(e)=>setNewUserData({...newUserData,email:e.target.value})}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
              Age
          </label>
          <input
            type="number"
            value={newUserData.age}
            onChange={(e)=>setNewUserData({...newUserData,age:e.target.value})}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={handleCreateUser} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewUSer;
