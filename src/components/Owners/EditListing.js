import styled from 'styled-components'
import {useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'

const Page = styled.div`
border: 1px black dotted;
color: #01303f;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
font-family: impact;
background-color: #e9ebee;
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
    height: 30px;
    flex: 0 0 350px;
    margin-left: 10px;
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
    margin-top: 10%;
    background-color: #02577a;
    border-radius: 7px;
    width: 30%;
    height: 3vh;
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
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    width: 400px;
    line-height: 26px;
    margin-bottom: 10px;
    font-size: large;
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

    return(
        <Page>
            <form onSubmit={submitEditedListing}>
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
                   <label>
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
