import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

import cables from '../images/cables.jpg'
import cameras from '../images/cameras.jpg'
import computerSetup from '../images/computer-setup.jpg'
import recordingEquipment from '../images/recording-equipment.jpg'

const Page = styled.div`
    background-color: black;
    height: 100vh;
    color: white;
    font-family: PressStart2P;
`
const ImageDiv = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: auto;
    padding-top: 3rem;
`
const Image = styled.img`
    width: 20%;
    border: .75rem solid white;
`
const Header = styled.h1`
    margin: 3rem 0;
    text-align: center;
    font-size: 5rem;
`
const LoginSignUp = styled.div`
    display: flex;
    margin: auto;
    justify-content: center;
`
const Buttons = styled.button`
    margin: 0 2rem;
    font-family: PressStart2P;
    background-color: white;
    border: none;
    font-size: 2rem;
    padding: 1rem;
    border-radius: 20px;
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
        </Page>
    )
}

export default Home