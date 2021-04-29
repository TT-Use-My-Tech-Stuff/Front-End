import styled from 'styled-components'
import {useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Page = styled.div`
color: #01303f;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
font-family: impact;
background-color: #01303f;
form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 5px #89d6fb outset;
    padding: 2%;
    border-radius: 7px;
    height: 40vh;
    width: 40vw;
    background-color: #d4f0fc;
    background: linear-gradient(-45deg, #d4f0fc, #02a9f7, #e9ebee);
    background-size: 400% 400%;
    animation: gradient 8s ease infinite;
}
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
.formDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
input {
    flex: 0 0 20px;

    border-radius: 7px;
    border: 1px black solid;
    &:hover {
        transform: scale(1.01);
        transition: all .3s ease-in-out;
        box-shadow: 5px 5px 4px #888888;
      }
      transition: all .1s ease-in-out;
    }
}
button {
    color: white;
    margin-top: 5%;
    background-color: #02577a;
    border-radius: 7px;
    width: 35%;
    height: 3vh;
    font-family: PressStart2P;
    font-size: .7rem;
    &:hover {
        transform: scale(1.1);
        transition: all .3s ease-in-out;
        background-color: #89d6fb;
        box-shadow: 10px 10px 8px #888888;
        color: #01303f;
      }
      transition: all .3s ease-in-out;
    }
}
body {
    background-color: green;
}

h2 {
    font-size: x-large;
    padding-bottom: 5%;
    animation-duration: 5s;
    font-family: PressStart2P;
}

label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    width: 30vw;
    line-height: 26px;
    margin-bottom: 10px;
    font-size: small;
    font-family: PressStart2P;
}
@media(max-width: 1080px) {
    h2 {
        font-size: large;
        margin-bottom: 15%;
        margin-top: -8%;
    }
    button {
        margin-top: 15%;
    }
  }
@media(max-width: 830px) {
    h2 {
        font-size: small;
    }
    button {
        width: 100%;
    }
  }
`

const EditListing = () => {
    const [listing, setListing] = useState({equipment_name: '', equipment_description: ''})
    const {push}=useHistory()
    const { id } = useParams()

    let listingId = id

    const onSubmit = evt => {
        evt.preventDefault()
        submitEditedListing()
    }

    useEffect(() => {
        axios
          .get(`https://back-end-tt.herokuapp.com/api/equipment/${listingId}`)
          .then(response => {
            console.log(response.data)
            setListing(response.data)
          })
          .catch(error => {
            console.error(error);
          });
      }, [listingId]);

      const onChange = (evt) => {
        const { name, value } = evt.target;
        setListing({...listing, [name]: value})
      };

      const submitEditedListing = () => {
        axios
        .put(`https://back-end-tt.herokuapp.com/api/equipment/${id}`, listing)
        .then(res => {
            push('/owner/:id')
        })
        .catch((error) => {
            console.log(error)
        })
      }

    return(
        <Page>
            <form onSubmit={onSubmit}>
               <h2>-- Edit Listing --</h2>
               <div className='formDiv'>
                   <label>
                       Name:
                       <input
                       type="text"
                       name="equipment_name"
                       value={listing.equipment_name}
                       onChange={onChange}
                       />
                   </label>
                   <label id='desc_label'>
                       Description:
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
