import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { QUERY_USER } from "../utils/queries";
// import Auth from "../utils/auth";
import { Container } from "react-bootstrap";

import { GiWeightLiftingUp } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { IoIosNutrition } from "react-icons/io";
import { ImStopwatch } from "react-icons/im";

import backProfile from "../images/backProfile.png";

import { Link } from "react-router-dom";


const Profile = () => {
    // const { loading, data } = useQuery(QUERY_USER);
    // const user = data?.user || {};

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!Auth.loggedIn()) {
    //     return <Redirect to="/login" />;
    // }

    return (
        <div className="myFithub" style={{ backgroundImage: `url(${backProfile})` }}>
            <Container className="fitContainer" >
                <h1 className="fitTitle">My FitHub</h1>
                {/* Add user.username */}
                <p className="fitText">Welcome to your FitHub! Let's put in that work and celebrate with a 🍩
                </p>
                <div className="cardContainer">
                    <div className="card">
                        <Link className="card-link" to="/strength">Strength &nbsp;&nbsp; <GiWeightLiftingUp /></Link>
                    </div>
                    <div className="card">
                        <a href="/cardio">Cardio &nbsp;&nbsp; <GiRunningNinja /></a>
                    </div>
                    <div className="card">
                        <a href="/page3">Nutrition &nbsp;&nbsp; <IoIosNutrition /></a>
                    </div>
                    <div className="card">
                        <a href="/page4">Stopwatch &nbsp;&nbsp; < ImStopwatch /></a>
                    </div>
                </div>
            </Container>


        </div>
    );
};

export default Profile;
