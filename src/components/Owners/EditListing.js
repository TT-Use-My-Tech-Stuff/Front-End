import styled from 'styled-components'
import {useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'

const Page = styled.div`
border: 1px black dotted;
color: #01303f;
height: 40vh;
margin-top: 10%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 3px #89d6fb solid;
    padding: 2%;
    border-radius: 4px;
    height: 30vh;
    width: 50vh;
    background-color: #d4f0fc;

}
.formDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
input {
    margin-top: 5%;
}
button {
    margin-top: 5%;
}
body {
    background-color: green;
}

h2 {
    font-size: x-large;
}
`

const EditListing = () => {
    const [listing, setListing] = useState({equipment_name: '', equipment_description: ''})
    const [disabled, setDisabled] = useState(true)
    const {push}=useHistory()
    const { id } = useParams()

    let listingId = id

    useEffect(() => {
        axios
          .get(`https://back-end-tt.herokuapp.com/api/equipment/1`) // /id
          .then(response => {
            console.log(response.data)
            setListing(response.data)
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const onChange = (evt) => {
        const { name, value } = evt.target;
        setListing({...listing, [name]: value})
      };

      const submitEditedListing = () => {
        axios
        .put('https://back-end-tt.herokuapp.com/api/equipment/1', listing)
        .then(res => {
            push('/owner/:id')
        })
        .catch((error) => {
            console.log(error)
        })
      }

    // /owner/edit-listing/:id
    // allow only profiles that are owners
    // edit a current item for rent that will be displayed on the owners' home page
    // form validation
    // axios.get

    return(
        <Page>
            <form onSubmit={submitEditedListing}>
               <h2>Edit Listing:</h2>
               <div className='formDiv'>
                   <label>
                       Edit equipment name:
                       <input
                       type="text"
                       name="equipment_name"
                       value={listing.equipment_name}
                       onChange={onChange}
                       />
                   </label>
                   <label>
                       Edit equipment description:
                       <input
                       type="text"
                       name="equipment_description"
                       value={listing.equipment_description}
                       onChange={onChange}
                       />
                   </label>
                    <button>submit changes</button>
               </div>
            </form>
        </Page>
    )
}


export default EditListing;
