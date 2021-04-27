import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Page = styled.div``

const MarketItem = (props) => {
    const [item, setItem] = useState();
    const { itemId } = useParams();

    let id = itemId;

    useEffect(() => {
        axios 
        .get(`https://back-end-tt.herokuapp.com/marketplace/${id}`)
        .then(response => {
            setItem(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [id]);

    if (!item) {
        return <div>Loading item information...</div>
    }

   

   

    // /marketplace/:id
    // display the specifics of an item when clicked on the main marketplace page
    // give the option to rent the item
    // give the option to return to marketplace
    // allows renter to go to their cart
    


    return(
        <Page>
            
        </Page>
    )
}

export default MarketItem