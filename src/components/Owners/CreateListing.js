import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";
import { useState } from "react";

const Page = styled.div``;

const CreateListing = () => {
  // /owner/create-listing
  // allow only profiles that are owners
  // create a new object for rent that will be displayed on the owners' home page
  // form validation

  const { push } = useHistory();
  const [item, setItem] = useState({
    itemName: "Test",
    ownerName:"Test",
    description: "Test"
  });

  const handleChange = (e) => {
    setItem({
        ...item,
        [e.target.name]: e.target.value
    });
}

const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth
    .post(`/api/equipment/createEquipment/:id`, item)
    .then((res) => {
      console.log('create')
      push(`/owner/:id`);
    })
    .catch((err) => console.log({ err }));
}

const { itemName, ownerName, description} = item;

  return (
    <Page>
      <h1>Create Listing </h1>
      <form onSubmit={handleSubmit}>
        <div>
          
          <div>
          <label>Item Name: </label>
          <input
            value={itemName}
            onChange={handleChange}
            name="itemname"
            type="text"
          />
          </div>
          <br></br>
          <div>
          <label>Owner Name: </label>
          <input
            value={ownerName}
            onChange={handleChange}
            name="ownername"
            type="text"
          />
          </div>
          <div>
          <label>Description: </label>
          <input
            value={description}
            onChange={handleChange}
            name="description"
            type="text"
          />
          </div>
        </div>
        <input type="submit" className="inputbutton" value="Save"/>
        <Link to={"/owner/:id"}><input type="button" className="inputbutton" value="Cancel"/></Link>
      </form>
      
    </Page>
  );
};

export default CreateListing;
