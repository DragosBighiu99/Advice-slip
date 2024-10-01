import { useState } from "react";
import "./App.css";
import dice from "./assets/dice.svg";
import { initialAdvice } from "./initialAdvice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteAdvicesModal from "./components/FavoriteAdvicesModal/FavoriteAdvicesModal";

const App = () => {
  const [advice, setAdvice] = useState(initialAdvice); // hook
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentAdviceIsAddedToFavorite =
    favoriteAdvices.findIndex(
      (favoriteAdvice) => favoriteAdvice.id === advice.id
    ) === -1
      ? false
      : true;

  const generateAdvice = async () => {
    setIsLoading(true);

    try {
      // block-scoped variables
      const serverResponse = await fetch("https://api.adviceslip.com/advice");
      const {
        slip: { id, advice },
      } = await serverResponse.json();

      setAdvice({
        id,
        content: advice,
      });
    } catch (e) {
      alert("An error occurred, try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    const indexOfCurrentAdvice = favoriteAdvices.findIndex(
      (favoriteAdvice) => favoriteAdvice.id === advice.id
    );

    if (indexOfCurrentAdvice === -1) {
      // Adaugam advice-ul la favorite
      // Mereu cand avem in state o variabila egala cu un obiect sau un array trebuie sa:
      // 1. Cream un nou obiect / array in care copiem continutul variabilei
      const newFavoriteAdvices = [...favoriteAdvices];
      // 2. Modificam noul obiect / array cum vrem noi
      newFavoriteAdvices.push(advice);
      // 3. Adaugam noul obiect / array in state
      setFavoriteAdvices(newFavoriteAdvices);
    } else {
      // Eliminam advice-ul de la favorite
      const newFavoriteAdvices = [...favoriteAdvices];
      newFavoriteAdvices.splice(indexOfCurrentAdvice, 1);
      setFavoriteAdvices(newFavoriteAdvices);
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  // Cand o functie este create intr- componenta, ea nu poate fi exportata
  // Cand o functie contine ceva din state-ul componentei atunci nu putem sa o scoatem din ea
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="app-container">
      <button onClick={handleOpenModal} className="show-favorites-button">
        {" "}
        Show favorites{" "}
      </button>

      {modalIsOpen === true ? (
        <FavoriteAdvicesModal
          closeModal={handleCloseModal}
          advices={favoriteAdvices}
        />
      ) : null}

      <div className="advice-card-container">
        <button
          onClick={handleAddToFavorites}
          className="add-to-favorites-button"
        >
          {currentAdviceIsAddedToFavorite === true ? (
            <FavoriteIcon sx={{ color: "var(--lightGreen)" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "var(--lightGreen)" }} />
          )}
        </button>

        <p className="advice-id"> ADVICE #{advice.id} </p>
        <p className="advice-content"> “{advice.content}” </p>

        {/* --- separator ---*/}
        <div className="separator-container">
          <hr className="horizontal-line" />
          <div className="vertical-lines-container">
            <div className="vertical-line" />
            <div className="vertical-line" />
          </div>
          <hr className="horizontal-line" />
        </div>

        <button
          disabled={isLoading === true ? true : false}
          onClick={generateAdvice}
          className="generate-advice-button"
        >
          {isLoading === true ? (
            <div className="spinner"></div>
          ) : (
            <img src={dice} />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
