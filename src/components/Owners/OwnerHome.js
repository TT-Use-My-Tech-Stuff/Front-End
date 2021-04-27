import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";
import { useState } from "react";
import { useEffect } from "react";

const Page = styled.div``;

const OwnerHome = () => {
  // /owner/:id
  // []owner's profile page //get username
  // []display all items that they are renting and what is currently rented by whom // item with owners name
  // []allows the owner to create new items for rent // create form
  // []allows the owner to edit current items for rent // edit form
  // []allows the owner to terminate a renter contract // remove item
  // []allows the owner to logout // logout link

  const [userInfo, setUserInfo] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/equipment")
      .then((res) => {setUserInfo(res.data) 
        console.log(res.data)})
      .catch((err) => console.log({ err }));
  }, []);

  const deleteItem = (id) => {
    axiosWithAuth()
      .delete("/api/equipment/deleteEquipment/:id")
      .then((res) => {
        setUserInfo(userInfo.filter((item) => item.id !== id));
        console.log('delete')
      })
      .catch((err) => console.log({ err }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <Page>
      <div>
        <h1>Owners Home</h1>
        <p>Username:    </p>

        {userInfo.map((user) => ( 
        <div key={user.equipment_id}>
        <p>Item: {user.equipment_name} </p>
        <p>Owner: {user.owner_id}</p>
        <p>Description: {user.equipment_description}</p>
        <Link to={`/edit-listing`}>Edit</Link>
        <br></br>
        <Link to="/owner/:id"onClick={deleteItem}>Delete Item </Link>
        </div>
        ))}
        
        <br></br>
        <Link to="/create-listing">Create Listing</Link><br></br>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </Page>
  );
};

export default OwnerHome;