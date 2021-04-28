import styled from 'styled-components'

const cartData = [
    {
        name: "VCR1",
        equipment_id: 1,
        equipment_description: "This is a test",
        owner_id: 2,
       

    },
    {
        name: "VCR2",
        equipment_id: 2,
        equipment_description: "This is a test",
        owner_id: 2,
        

    },
    {
        name: "VCR3",
        equipment_id: 3,
        equipment_description: "This is a test",
        owner_id: 2,
        

    }
]

const Page = styled.div`

display: flex;
flex-direction: column;

align-items: center;
background-color: #02577a;

height: 100vh;




`
const Checkout = styled.div `
 border-radius: 30px 0% 30px 0;
    margin: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    
    
    background-color: #01303f;
button {
    background-color:#02577a;
    color: #01303f;
    margin: 1%
}

`
const Items = styled.div `
border-radius: 30px 0% 30px 0;
    margin: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    background-color: #01303f;
    color: #02a9f7;
button {
    background-color: #02577a;
    color:#01303f;
    margin: 1%
}
p {
    margin: 1%
}

`
const ItemWrapper = styled.div `

width: 100%;
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



const Cart = () => {
    
    
    
    return(
        <>
            <Page>
                
                    
                    
                            <ItemWrapper>
                                {cartData.map(item => {
                                    return (

                                        <Items>
                                            <p>name: {item.name}</p>
                                            <p>description: {item.equipment_description}</p>
                                            <button>Remove</button>

                                        </Items>
                                    )

                                })}
                                
                         
                            </ItemWrapper>
                            <Checkout>
                                <button>Checkout</button>
                            </Checkout>
                    
                   
                    
                

            </Page>
           
        </>
    )
}

export default Cart