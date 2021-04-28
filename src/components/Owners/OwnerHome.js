import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";
import { useState } from "react";
import { useEffect } from "react";

const Page = styled.div`

`;
const ItemBox = styled.div``;
const Items = styled.p``;
const Button = styled.button``;
const Name = styled.h2``;
const Title = styled.h1``;

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
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const deleteItem = (ItemId) => {
    axiosWithAuth()
      .delete(`/api/equipment/deleteEquipment/${ItemId}`)
      .then((res) => {
        if (res.data != null) {
          alert("Listing has been deleted");
          setUserInfo(userInfo.filter((item) => item.equipment_id !== ItemId));
          push("/owner/:id");
        }
      })
      .catch((err) => console.log({ err }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <Page>
      <Title>Owners Home</Title>
      <Name>Username: </Name>
      {userInfo.map((user) => (
        <ItemBox key={user.equipment_id}>
          <Items>Item: {user.equipment_name} </Items>
          <Items>Owner: {user.owner_id}</Items>
          <Items>Description: {user.equipment_description}</Items>
          <Link to={`/edit-listing`}><Button>Edit</Button></Link>
          <Link to="/owner/:id" onClick={deleteItem}>
           <Button>Delete Item</Button> 
          </Link>
        </ItemBox>
      ))}
      <Link to="/create-listing"><Button>Create Listing</Button></Link>
      <Link to="/" onClick={handleLogout}>
        <Button>Logout</Button>
      </Link>
    </Page>
  );
};

export default OwnerHome;
