import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";
import { useEffect } from "react";

const Page = styled.div``;

const EditListing = () => {
  // /owner/edit-listing
  // allow only profiles that are owners
  // edit a current item for rent that will be displayed on the owners' home page
  // form validation

  const { push } = useHistory();
  const [item, setItem] = useState({
    itemName: "Test",
    ownerName:"Test",
    description: "Test"
  });

  useEffect(() => {
    axiosWithAuth()
      .get("/api/equipment/owner/:id")
      .then((res) => console.log(res))
      .catch((err) => console.log({ err }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth
      .post(`/api/equipment/createEquipment/:id`, item)
      .then((res) => {
        console.log("create");
        push(`/owner/:id`);
      })
      .catch((err) => console.log({ err }));
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const { itemName, ownerName, description} = item;

  return (
    <Page>
      <h1>Edit Listing </h1>
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
          <br></br>
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

export default EditListing;
