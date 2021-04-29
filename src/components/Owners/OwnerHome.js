import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";
import { useState } from "react";
import { useEffect } from "react";

const Page = styled.div`
color: white;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: #01303f;
`;
const Header =styled.div`
display: flex;


`;
const Table =styled.table`
font-size: 25px;

`;
const Button = styled.button`
color: #fff;
background-color: #6c757d;
padding: .2rem .5rem;
font-size: 1rem;
cursor: pointer;

}
`;
const Name = styled.h2`
font-size: 18px;
`;
const Title = styled.h1`
font-size: 30px;
`;


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
    <Page><Title>Owners Home</Title>
      <Header>
      <Name>Username: </Name>
      <Link to={`/create-listing/:id`}>
        <Button>Create Listing</Button>
      </Link>
      <Link to="/" onClick={handleLogout}>
        <Button>Logout</Button>
        </Link>
      </Header>
      <Table>
        
        <thead>
          <tr>
            <td>Item</td>
            <td>Owner</td>
            <td>Description</td>
          </tr>
        </thead>
        {userInfo.map((user) => (
          <tbody key={user.equipment_id}>
            
              <tr>
                <td>{user.equipment_name} </td>
                <td>{user.owner_id}</td>
                <td>{user.equipment_description}</td>
                <td>
                  <Link to={`/owner/edit-listing/${user.equipment_id}`}>
                    <Button>Edit</Button>
                  </Link>
                </td>
                <td>
                  <Link to="/owner/:id" onClick={deleteItem}>
                    <Button>Delete Item</Button>
                  </Link>
                </td>
              </tr>
            </tbody>
        ))}
        
      </Table>
    </Page>
  );
};

export default OwnerHome;
