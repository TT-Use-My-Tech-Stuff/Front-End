import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {useHistory} from 'react-router-dom'





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

div {
    border: 1px solid black;
    margin: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
}

button {
    width: 26%;
    margin: 1%;
}

p {
    margin: 1%;
}

`

const Buttons = styled.button`
    margin: 0 2rem;
    background-color: #89d6fb;
    font-family: PressStart2P;
    border: none;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 20px;
    color: #02577a;
`

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
           <Buttons onClick={routeToCart}>Rent</Buttons>
           <Buttons onClick={routeToMarket}>Back to Marketplace</Buttons>
        </Page>
    )
}

export default MarketItem