import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {useHistory} from 'react-router-dom'





const Page = styled.div``

const MarketItem = (props) => {
    const [item, setItem] = useState([]);
    const { id } = useParams();
    const {push} = useHistory()

    let itemId = id;

    console.log(item)


    useEffect(() => {
        axios 
        .get(`https://back-end-tt.herokuapp.com/api/equipment/${itemId}`)
        .then(response => {
            setItem(response.data)
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }, [itemId]);

    const routeToCart = () => {
        localStorage.setItem('cart', item)
        console.log(localStorage.cart)
        push('/renter/cart')
    }

    const routeToMarket = () => {
        push('/marketplace')
    }
   
   

    // /marketplace/:id
    // display the specifics of an item when clicked on the main marketplace page
    // give the option to rent the item
    // give the option to return to marketplace
    // allows renter to go to their cart
    


    return(
        <Page>
           <p>{item.equipment_name}</p>
           <p>{item.equipment_description}</p>
           <button onClick={routeToCart}>Rent</button>
           <button onClick={routeToMarket}>Back to Marketplace</button>
        </Page>
    )
}

export default MarketItem