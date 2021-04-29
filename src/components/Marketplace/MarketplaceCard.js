import {useHistory} from 'react-router-dom'

const MarketplaceCard = props => {

    const {item} = props
    const {push} = useHistory()

    const goTo = () => {
        push(`/marketplace/${item.equipment_id}`)
        console.log(`FHQWGADS`)
    }

    return (
        <div>
        <p onClick={goTo} item={item}> {item.equipment_name} </p>
        <br />
        </div>
    )
}

export default MarketplaceCard