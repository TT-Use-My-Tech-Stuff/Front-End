import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MarketplaceHome from './MarketplaceHome'
import { useParams } from 'react-router'



const Page = styled.div``

const MarketItem = (props) => {
    const [item, setItem] = useState([]);
    const { id } = useParams();

    let itemId = id;


    useEffect(() => {
        axios 
        .get(`https://back-end-tt.herokuapp.com/api/equipment/1`)
        .then(response => {
            setItem(response.data)
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }, [itemId]);
   
   

    // /marketplace/:id
    // display the specifics of an item when clicked on the main marketplace page
    // give the option to rent the item
    // give the option to return to marketplace
    // allows renter to go to their cart
    


    return(
        <Page>
           <p>Item {item.equipment_name}</p>
           <p>{item.equipment_description}</p>
        </Page>
    )
}

export default MarketItem