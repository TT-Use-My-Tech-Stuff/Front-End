import React, { useState, useEffect } from "react";
// import styled from "styled-components";
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

    // /renter/:id
    // + allows the renter to see everything they are currently renting
    // + allows the renter to go to their cart
    // allows the renter to request rent termination(maybe)
    // + allows the renter to go to the marketplace
    // + allows the renter to logout

    return (
        <div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/marketplace">Marketplace</Link>
                <Link to="/renter/cart">Cart</Link>
                <Link to="/" onClick={logout}>
                    Logout
                </Link>
            </div>
            <div>
                <h1>Rentals:</h1>
                <div>
                    {rental.map((item) => {
                        return (
                            <div>
                                <div>
                                    <ul>
                                        <li>Equipment name: {item.equipment_name}</li>
                                        <li>Equipment ID: {item.equipment_id}</li>
                                        <li>Equipment Description: {item.equipment_description}</li>
                                        <li>Owner ID: {item.owner_id}</li>
                                        <li>Renter ID: {item.renter_id}</li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// const Page = styled.div``;

export default RenterHome;
