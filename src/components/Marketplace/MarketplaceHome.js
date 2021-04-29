import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import MarketplaceCard from './MarketplaceCard'



const Page = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #01303f;
    color: white;
    font-family: PressStart2P;
    padding: 3rem 0 1rem;   
position: absolute;
top: 1px; 
bottom: 1px; 
width: 100%;
}

h1 {
    border-bottom: 1px solid white;
    font-size: 25px;
}

div {
    padding: 1px;
    margin: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
}

p {
    margin: 0.5%;
}

`


const MarketplaceHome = (props) => {
    const [items, setItems] = useState([]);

    const {push} = useHistory()
    
    useEffect(() => {
        axios 
        .get(`https://back-end-tt.herokuapp.com/api/equipment`)
        .then(response => {
            setItems(response.data)
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);


    // /marketplace
    // display all items available for rent
    // if chosen to display all items regardless of availability, RENTED needs to be marked on items that cannot currently be rented
    // each item should be able to be routed to a new page that displays all of that items information, where the option to rent will be.
  
    
    return (
       
      
        <Page>
            <h1>Marketplace Items</h1>
            <br/>
            <br/>
            <br/>
           {items.map(item => {
             return (
               <MarketplaceCard key={item.equipment_id} item={item}/>
             )
           })}
        </Page>
      
      
    )
}

export default MarketplaceHome