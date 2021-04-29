import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../axiosWithAuth.js";

const RenterHome = () => {
    const history = useHistory();
    const [rental, setRental] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axiosWithAuth()
            .get(`https://back-end-tt.herokuapp.com/api/equipment/renter/${id}`)
            .then((res) => {
                setRental(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.res);
            });
    }, [id]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        history.push("/");
    };

    return (
        <Page>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/marketplace">Marketplace</Link>
                <Link to="/renter/cart">Cart</Link>
                <Link to="/" onClick={logout}>
                    Logout
                </Link>
            </Nav>
            <div>
                <Title>Current rentals:</Title>
                <Cards>
                    {rental.map((item) => {
                        return (
                            <EquipmentCards>
                                <div>
                                    <ul>
                                        <li>
                                            Equipment name:{" "}
                                            {item.equipment_name}
                                        </li>
                                        <li>
                                            Equipment ID: {item.equipment_id}
                                        </li>
                                        <li>
                                            Equipment Description:{" "}
                                            {item.equipment_description}
                                        </li>
                                        <li>Owner ID: {item.owner_id}</li>
                                        <li>Renter ID: {item.renter_id}</li>
                                    </ul>
                                </div>
                            </EquipmentCards>
                        );
                    })}
                </Cards>
            </div>
        </Page>
    );
};

const Nav = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 2.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background-color: #02577a;
    a:link {
        text-decoration: none;
        color: white;
    }
    a:visited {
        text-decoration: none;
        color: white;
    }
`;

const Title = styled.h1`
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #01303f;
    font-weight: 1000;
    font-size: 2.5rem;
    line-height: 50px;
    letter-spacing: 2px;
    padding-top: 4rem;
    padding-bottom: 2rem;
`;

const Page = styled.div`
    background-color: #89d6fb;
    padding-bottom: 30rem;
`;

const EquipmentCards = styled.div`
    background: #ffffff;
    border: 1px solid #b8b8b8;
    border-radius: 20px;
    padding: 20px;
    padding-left: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.4);
`;

const Cards = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
`;

export default RenterHome;
