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
/* border: 2px solid black; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

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
    width: 15%;
    margin: 1%;
    

}
p {
    margin: 1%;
}

`


const Cart = () => {
    
    
    
    return(
        <Page>
            {cartData.map(item => {
                return (
                    <div>
                        <p>name: {item.name}</p>
                        <p>description: {item.equipment_description}</p>
                        <button>Remove</button>
                         
                    </div>
                   
                )
            })}

        </Page>
    )
}

export default Cart