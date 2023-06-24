import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../redux/slice/userslice";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const allUsers = useSelector((store) => store.user.allUsers);
  const userData = allUsers.filter((ele) => ele.id === id);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: userData[0]?.name,
    age: userData[0]?.age,
    email: userData[0]?.email,
  });
  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser({id,userDetails}))
     navigate("/")
  };
  return (
    <div className="w-100 my-5 d-flex justify-content-center">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
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
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
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
            value={userDetails.age}
            onChange={(e) =>
              setUserDetails({ ...userDetails, age: e.target.value })
            }
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={handleUpdateUser} className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
