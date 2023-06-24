import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/slice/userslice";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewUserData, setViewUserData] = useState([]);
  const usersData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleViewPopUp = (id) => {
    const viewUser = usersData?.allUsers?.filter((ele) => ele.id === id);
    setViewUserData(viewUser);
    setIsViewOpen(true)
  };
  
  const handleDeleteUser=(id)=>{
    dispatch(deleteUser(id))
  }
  if (usersData.isLoading) {
    return <h1>Loading Data...</h1>;
  }

  return (
    <div className="d-flex flex-row justify-content-center flex-wrap">
      {usersData?.allUsers?.map((ele) => (
        <div className="card m-2" style={{ width: "20rem" }} key={ele.id}>
          <div className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Age: {ele.age}</h6>
            <p className="card-text">Email: {ele.email}</p>
            <button onClick={() => handleViewPopUp(ele.id)}>View</button>
            <button><Link to={"/updateuser/"+ele.id}>Update</Link></button>
            <button onClick={()=>handleDeleteUser(ele.id)}>Delete</button>
          </div>
        </div>
      ))}

      {isViewOpen && viewUserData?.length > 0 && (
        <div>
          {viewUserData.map((ele) => (
            <div className="card m-2 bg-secondary text-dark" style={{ width: "20rem",zIndex:"1" }} key={ele.id}>
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2">
                  Age: {ele.age}
                </h6>
                <p className="card-text">Email: {ele.email}</p>
                <button onClick={()=>setIsViewOpen(false)}>close</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
