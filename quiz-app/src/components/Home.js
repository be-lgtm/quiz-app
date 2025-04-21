import React from "react";
import "../styles/Home.css"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  const handleStartQuiz = (mode) => {
    console.log(`Le quiz en mode ${mode} va commencer`);
    navigate("/quiz"); 
  };

  return (
    <div className="container">
      <h1 className="title">Quiz Challenge</h1>
      <p className="subtitle">Teste tes connaissances et amuse-toi !</p>

      <div className="card">
        <h2>Prêt ? 🌟</h2>
       

        <div className="buttonGroup">
          <button 
            onClick={() => handleStartQuiz("Solo")} 
            className="startButton"
          >
           Commencer maintenant !
          </button>
          
        </div>
      </div>

      <footer className="footer">© 2025 Quiz App - Tous droits réservés</footer>
    </div>
  );
};

export default Home;
