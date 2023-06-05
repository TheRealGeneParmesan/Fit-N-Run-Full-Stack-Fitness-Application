import React from "react";
import Auth from "../utils/auth";
import { Container } from "react-bootstrap";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { ImStopwatch } from "react-icons/im";
import { FaWeightHanging } from "react-icons/fa";

import backProfile from "../images/backProfile.png";

import { Link } from "react-router-dom";

import { GET_ME } from '../utils/queries'
import { useQuery } from "@apollo/client";




const Profile = () => {
    const { data, loading, error } = useQuery(GET_ME);
    const username = data?.me?.username;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!Auth.loggedIn()) {
        return <Link to="/login" />;
    }

    return (
        <div className="myFithub" style={{ backgroundImage: `url(${backProfile})` }}>
            <Container className="fitContainer" >
                <h1 className="fitTitle">My FitHub</h1>
                <p className="fitText"> Welcome to your FitHub, <span className="userName"> {username} </span>! Let's put in that work and celebrate with a 🍩
                </p>
                <div className="cardContainer">
                    <div className="card">
                        <Link className="card-link" to="/strength">Strength &nbsp;&nbsp; <GiWeightLiftingUp /></Link>
                    </div>
                    <div className="card">
                        <Link className="cardio-link" to="/cardio"> Cardio &nbsp;&nbsp; <GiRunningNinja /></Link>
                    </div>
                    <div className="card">
                        <Link className="nutrition-link" to="/exercises"> Exercises &nbsp;&nbsp; <FaWeightHanging /></Link>
                    </div>
                    <div className="card">
                        <Link className="stopwatch-link" to="/stopwatch"> Stopwatch <ImStopwatch /></Link>
                    </div>
                </div>
            </Container>


        </div>
    );
};

export default Profile;
