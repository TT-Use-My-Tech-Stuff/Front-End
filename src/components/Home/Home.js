import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

import cables from '../images/cables.jpg'
import cameras from '../images/cameras.jpg'
import computerSetup from '../images/computer-setup.jpg'
import recordingEquipment from '../images/recording-equipment.jpg'


const Page = styled.div`
    background-color: #01303f;
    color: white;
    font-family: PressStart2P;
    padding: 3rem 0 1rem;
`
const ImageDiv = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: auto;
    
`
const Image = styled.img`
    width: 20%;
    border: .75rem solid white;
`
const Header = styled.h1`
    margin: 1.5rem 0;
    text-align: center;
    font-size: 5rem;
`
const LoginSignUp = styled.div`
    display: flex;
    margin: 0 auto 1.5rem;
    justify-content: center;
`
const Buttons = styled.button`
    margin: 0 2rem;
    font-family: PressStart2P;
    background-color: #89d6fb;
    border: none;
    font-size: 2rem;
    padding: 1rem;
    border-radius: 20px;
    color: #02577a;
`
const TagLine = styled.h2`
    font-size: 1.5rem;
    width: 80%;
    text-align: center;
    margin: 1rem auto 1.5rem;
`
const InfoDiv = styled.div`
    width: 80%;
    border: .25rem solid white;
    margin: 1rem auto;
    padding: 1rem;
`
const InfoTitle = styled.h3`
    font-size: 1.5rem;
`
const Info = styled.p`
    padding: .5rem 0;
    text-align: justify;

`

const Home = () => {

    const {push} = useHistory()

    const login = () => {
        push('/login')
    }

    const signup = () => {
        push('/signup')
    }

   

    return (
        <Page>
            <ImageDiv>
                <Image src={cables} alt="cables"/>
                <Image src={cameras} alt="cameras"/>
                <Image src={computerSetup} alt="computer setup"/>
                <Image src={recordingEquipment} alt="old-fashioned recording equipment"/>
            </ImageDiv>
            <Header>Use My Tech Stuff</Header>
            <LoginSignUp>
                <Buttons onClick = {login}>Log In</Buttons>
                <Buttons onClick = {signup}>Sign Up</Buttons>
            </LoginSignUp>
            <TagLine>Tired fo paying ridiculous fees for camera and other equipment rentals? Bypass the middleman and rent from a real person!</TagLine>
            <InfoDiv>
                <InfoTitle>What Is "Use My Tech Stuff"?</InfoTitle>
                <Info>
                    Tech stuff is EXPENSIVE. Tech stuff that's only needed once or twice isn't worth the cost. Talk to equipment owners directly and get the tech you need faster. 
                </Info>
                <Info>
                    We cut out the middleman. That means your rentals are cheaper and the owners keep more of the profits! Rent for a day, a week, even a month or more - extend your rental at any time.
                </Info>
            </InfoDiv>
        </Page>
    )
}

export default Home