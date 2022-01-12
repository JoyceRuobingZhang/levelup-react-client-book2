import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const GameForm = () => {
    const history = useHistory();
    const { createGame, getGameTypes, gameTypes, getGameById } = useContext(GameContext);

  // Get game types on initialization so that the <select> element presents game type choices to the user. 
    useEffect(() => {
    getGameTypes();
    }, []);

    const {gameId} = useParams()
  
  /*  Since the input fields are bound to the values of the properties of this state variable, 
      you need to provide some default values.  */
    const [currentGame, setCurrentGame] = useState({gametype: {}});

  // Get game from API when component initializes
    useEffect(() => {
      if(gameId){
        getGameById(parseInt(gameId))
        .then(game => {
          // cleanGame = {...game,  }
          // cleanGame.playerLimit = game.player_limit
          setCurrentGame(game)}) /* getGameById is Async!!! */
      } else {
        setCurrentGame(
          {
            // skillLevel: 1,
            playerLimit: 0,
            name: "",
            gameTypeId: 0,
        }
        )
      }
    }, [gameId, gameTypes]) 

 
  /*  REFACTOR CHALLENGE START
  Can you refactor this code so that all property state changes can be handled with a single function
  instead of five functions that all, largely, do the same thing?  One hint: [event.target.name]
  */
    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame };
        newGameState[event.target.name] = event.target.value;
        setCurrentGame(newGameState);
    };


  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentGame.name}
            // dv: be there when <input> loads
            // v: current state of the value
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Player Limit: </label>
          <input
            type="number"
            name="playerLimit"
            required
            autoFocus
            className="form-control"
            value={currentGame.playerLimit}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Game Type: </label>
          <select value={currentGame.gametype.id} name="gameTypeId" id="customerAnimal" 
          className="form-control" onChange={handleControlledInputChange} >
              <option value="0">Please Select a Game Type</option>
              {
                  gameTypes.map(t => {
                      return <option value={t.id} key={t.id}> {t.label} </option>})
              }
          </select>
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            name: currentGame.name,
            player_limit: parseInt(currentGame.playerLimit),
            // gameTypeId:  parseInt(currentGame.gameTypeId)
            gametype: {
              id: parseInt(currentGame.gameTypeId)
            },
          };
          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};