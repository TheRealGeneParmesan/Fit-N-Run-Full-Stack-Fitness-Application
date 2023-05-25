import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";


const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return <Redirect to="/login" />;
    }

    return (
        <div classname="my fithub">
            <Container className="fitContainer" >
                <h1 className="fitTitle">My FitHub</h1>
                <p className="fitText">Welcome to your FitHub, {user.username}! Let's get those gains! And then maybe celebrate with a donut? 🍩 A gluten free one of course! Made out of cauliflower!
                </p>
            </Container>
        </div>
    );
};

export default Profile;
