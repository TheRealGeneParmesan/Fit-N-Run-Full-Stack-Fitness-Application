// get workout history
export const getCardioHistory = () => {
  const cardioHistory = localStorage.getItem("cardioHistory")
    ? JSON.parse(localStorage.getItem("cardioHistory"))
    : [];

  return cardioHistory;
};

export const getStrengthHistory = () => {
  const strengthHistory = localStorage.getItem("strengthHistory")
    ? JSON.parse(localStorage.getItem("strengthHistory"))
    : [];

  return strengthHistory;
};

// add workout history
export const addCardioHistory = (cardio) => {
  if (cardio.length) {
    localStorage.setItem("cardioHistory", JSON.stringify(cardio));
  } else {
    localStorage.setItem("cardioHistory", JSON.stringify([cardio]));
  }
};

export const addStrengthHistory = (strength) => {
  if (strength.length) {
    localStorage.setItem("strengthHistory", JSON.stringify(strength));
  } else {
    localStorage.setItem("strengthHistory", JSON.stringify([strength]));
  }
};

// remove workout history
export const removeCardioHistory = (id) => {
  const cardioHistory = localStorage.getItem("cardioHistory")
    ? JSON.parse(localStorage.getItem("cardioHistory"))
    : null;

  if (!cardioHistory) {
    return false;
  }

  const updatedCardioHistory = cardioHistory?.filter(
    (cardio) => cardio.id !== id
  );
  localStorage.setItem("cardioHistory", JSON.stringify(updatedCardioHistory));

  return true;
};

export const removeStrengthHistory = (id) => {
  const strengthHistory = localStorage.getItem("strengthHistory")
    ? JSON.parse(localStorage.getItem("strengthHistory"))
    : null;

  if (!strengthHistory) {
    return false;
  }

  const updatedStrengthHistory = strengthHistory?.filter((strength) => strength.id !== id);
  localStorage.setItem("strengthHistory", JSON.stringify(updatedStrengthHistory));

  return true;
};
