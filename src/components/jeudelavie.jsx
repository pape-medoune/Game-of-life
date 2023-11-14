import React, { useState, useEffect } from "react";
import "./style.css";

const nombreLignes = 30;
const nombreColonnes = 50;

const creerGrilleVide = () => {
  const grille = [];
  for (let i = 0; i < nombreLignes; i++) {
    grille[i] = Array.from(Array(nombreColonnes), () => 0);
  }
  return grille;
};

const genererGrilleAleatoire = () => {
  const grille = [];
  for (let i = 0; i < nombreLignes; i++) {
    grille[i] = Array.from(Array(nombreColonnes), () =>
      Math.random() > 0.7 ? 1 : 0
    );
  }
  return grille;
};

const JeuDeLaVie = () => {
  const [grille, setGrille] = useState(() => genererGrilleAleatoire());
  const [enCours, setEnCours] = useState(false);

  const etapeSuivante = () => {
    const nouvelleGrille = creerGrilleVide();

    for (let i = 0; i < nombreLignes; i++) {
      for (let j = 0; j < nombreColonnes; j++) {
        const voisins = [
          grille[i - 1]?.[j - 1],
          grille[i - 1]?.[j],
          grille[i - 1]?.[j + 1],
          grille[i]?.[j - 1],
          grille[i]?.[j + 1],
          grille[i + 1]?.[j - 1],
          grille[i + 1]?.[j],
          grille[i + 1]?.[j + 1],
        ].filter((voisin) => voisin !== undefined);

        const nombreVoisinsVivants = voisins.reduce(
          (acc, cellule) => acc + cellule,
          0
        );

        if (grille[i][j] === 1) {
          if (nombreVoisinsVivants === 2 || nombreVoisinsVivants === 3) {
            nouvelleGrille[i][j] = 1;
          }
        } else {
          if (nombreVoisinsVivants === 3) {
            nouvelleGrille[i][j] = 1;
          }
        }
      }
    }

    setGrille(nouvelleGrille);
  };

  useEffect(() => {
    let intervalId;
    if (enCours) {
      intervalId = setInterval(etapeSuivante, 10);
    }

    return () => clearInterval(intervalId);
  }, [enCours]);

  const toggleCellule = (i, j) => {
    if (!enCours) {
      const nouvelleGrille = [...grille];
      nouvelleGrille[i][j] = 1 - nouvelleGrille[i][j];
      setGrille(nouvelleGrille);
    }
  };

  const demarrerJeu = (e) => {
    e.preventDefault();
    setEnCours(true);
    window.alert(
      "Appuyer s'il vous plaît sur le button SUIVANT pour suivre l'évolution "
    );

    window.location.reload(false);
  };

  const arreterJeu = () => {
    setEnCours(false);
  };

  const reinitialiserJeu = () => {
    setGrille(creerGrilleVide());
    setEnCours(false);
  };

  return (
    <div className="py-3 px-10 md:w-full W-fit gap-x-5 md:h-screen h-fit bg-yellow-500 flex flex-row items-center">
      <div className="h-fit p-8">
        {grille.map((ligne, i) => (
          <div key={i} style={{ display: "flex" }}>
            {ligne.map((cellule, j) => (
              <div
                key={j}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: cellule ? "black" : "white",
                  border: "1px solid gray",
                  cursor: !enCours ? "pointer" : "default",
                }}
                onClick={() => toggleCellule(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        className="w-[300px] px-5 py-3 h-[500px] flex flex-col flex-wrap justify-around rounded-xl items-center bg-black"
        style={{ marginBottom: "10px" }}
      >
        <h1 className="texte text-2xl uppercase text-white">Jeu de la vie</h1>
        <button
          className="bg-sky-600 min-w-[200px] min-h-[50px] text-white px-4 py-1 text-xl rounded-lg"
          onClick={demarrerJeu}
        >
          Démarrer
        </button>
        <button
          className="bg-red-600 min-w-[200px] min-h-[50px] text-white px-4 py-1 text-xl rounded-lg"
          onClick={arreterJeu}
        >
          Arrêter
        </button>
        <button
          className="bg-sky-600 min-w-[200px] min-h-[50px] text-white px-4 py-1 text-xl rounded-lg"
          onClick={etapeSuivante}
        >
          Suivant
        </button>
        <button
          className="bg-gray-600 min-w-[200px] min-h-[50px] text-white px-4 py-1 text-xl rounded-lg"
          onClick={reinitialiserJeu}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default JeuDeLaVie;
