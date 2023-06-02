import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import backHistory from "../images/backHistory.png";
import { REMOVE_CARDIO, REMOVE_STRENGTH } from "../utils/mutations";
import { getCardioHistory, getStrengthHistory } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";

const History = () => {
  const [userData, setUserData] = useState({});
  const [cardioHistory, setCardioHistory] = useState([]);
  const [strengthHistory, setStrengthHistory] = useState([]);
  const [displayCardio, setDisplayCardio] = useState(6);
  const [displayStrength, setDisplayStrength] = useState(6);
  const [removeCardioHistory] = useMutation(REMOVE_CARDIO);
  const [removeStrengthHistory] = useMutation(REMOVE_STRENGTH);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  const { loading, data, error } = useQuery(GET_ME);

  useEffect(() => {
    if (data) {
      setCardioHistory(data.me.cardio);
      setStrengthHistory(data.me.strength);
    }
  }, [data]);

  const handleRemoveCardio = async (cardioId) => {
    console.log(cardioId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeCardioHistory({
        variables: { cardioId },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      const updatedCardioHistory = cardioHistory?.filter(
        (cardio) => cardio._id !== cardioId
      );
      setCardioHistory(updatedCardioHistory);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveStrength = async (strengthId) => {
    console.log(strengthId)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeStrengthHistory({
        variables: { strengthId },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      const updatedStrengthHistory = strengthHistory?.filter(
        (strength) => strength._id !== strengthId
      );
      setStrengthHistory(updatedStrengthHistory);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadMoreCardio = () => {
    setDisplayCardio(displayCardio + 6);
  };

  const handleLoadMoreStrength = () => {
    setDisplayStrength(displayStrength + 6);
  };

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    };
    return (new Date(date)).toLocaleDateString("en-US", options);
  };

  return (
    <main className="historyPage" style={{ backgroundImage: `url(${backHistory})` }}>
      <div className="col-12 col-lg-10">
        <div className="historyContainer card">
          <h4 className="historyHeader">Workout History</h4>
          <div className="workoutHistory card-body">
            <div className="cardioHistory">
              <h5 className="cardioHeader">Cardio</h5>
              {cardioHistory?.length ? (
                <div className="cardioList">
                  {cardioHistory.slice(0, displayCardio).map((cardio) => {
                    if (currentDate !== formatDate(cardio.date)) {
                      currentDate = formatDate(cardio.date);
                      return (
                        <div key={cardio.id}>
                          <h6 className="cardioDate">{currentDate}</h6>
                          <div className="cardioItem">
                            <p className="cardioName">{cardio.name}</p>
                            <p className="cardioDuration">{cardio.duration} minutes</p>
                            <p className="cardioDistance">{cardio.distance} miles</p>
                            <p className="cardioCalories">{cardio.calories} calories</p>
                            <button className="cardioDelete" onClick={() => handleRemoveCardio(cardio._id)}>Delete</button>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="cardioItem" key={cardio.id}>
                          <p className="cardioName">{cardio.name}</p>
                          <p className="cardioDuration">{cardio.duration} minutes</p>
                          <p className="cardioDistance">{cardio.distance} miles</p>
                          <p className="cardioCalories">{cardio.calories} calories</p>
                          <button className="cardioDelete" onClick={() => handleRemoveCardio(cardio._id)}>Delete</button>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <div>
                  <h6 className="cardioDate">Get started!</h6>
                </div>
              )}
              {cardioHistory?.length > 6 && cardioHistory?.length > displayCardio ? (
                <button className="loadMore" onClick={handleLoadMoreCardio}>Load More</button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="strengthHistory">
              <h5 className="strengthHeader">Strength</h5>
              {strengthHistory?.length ? (
                <div className="strengthList">
                  {strengthHistory.slice(0, displayStrength).map((strength) => {
                    if (currentDate !== formatDate(strength.date)) {
                      currentDate = formatDate(strength.date);
                      return (
                        <div key={strength.id}>
                          <h6 className="strengthDate">{currentDate}</h6>
                          <div className="strengthItem">
                            <p className="strengthName">{strength.name}</p>
                            <p className="strengthSets">{strength.sets} sets</p>
                            <p className="strengthReps">{strength.reps} reps</p>
                            <p className="strengthWeight">{strength.weight} lbs</p>
                            <button className="strengthDelete" onClick={() => handleRemoveStrength(strength._id)}>Delete</button>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="strengthItem" key={strength.id}>
                          <p className="strengthName">{strength.name}</p>
                          <p className="strengthSets">{strength.sets} sets</p>
                          <p className="strengthReps">{strength.reps} reps</p>
                          <p className="strengthWeight">{strength.weight} lbs</p>
                          <button className="strengthDelete" onClick={() => handleRemoveStrength(strength._id)}>Delete</button>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <div>
                  <h6 className="strengthDate">Get started!</h6>
                </div>
              )}
              {strengthHistory?.length > 6 && strengthHistory?.length > displayStrength ? (
                <button className="loadMore" onClick={handleLoadMoreStrength}>Load More</button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;