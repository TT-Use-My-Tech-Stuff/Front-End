import styled from 'styled-components'
import {useHistory, useRouteMatch, Link } from 'react-router-dom'
import React from 'react'


const Page = styled.div``

const MarketplaceHome = (props) => {
    const { items } = props
    const { path } = useRouteMatch()

    // /marketplace
    // display all items available for rent
    // if chosen to display all items regardless of availability, RENTED needs to be marked on items that cannot currently be rented
    // each item should be able to be routed to a new page that displays all of that items information, where the option to rent will be.
    
    
    return(
        <Page>
            {items.map(item => (
                <div 
                className='item-card'
                key={item.id}
                >
             <Link to={`${path}cd ..
          /${item.id}`}>
            <img
              className='items-list-image'
              src={item.imageUrl}
              alt={item.name}
            />
            <p>{item.name}</p>
          </Link>

              <p>${item.price}</p>
            </div>
            ))}
        </Page>
    )
}

export default MarketplaceHome