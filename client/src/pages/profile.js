import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { QUERY_USER } from "../utils/queries";
// import Auth from "../utils/auth";
import { Container } from "react-bootstrap";

import backProfile from "../images/backProfile.png";
// import { Redirect } from "react-router-dom";


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
            </Container>
        </div>
    );
};

export default Profile;
