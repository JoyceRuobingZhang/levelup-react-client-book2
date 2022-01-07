import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { GameContext, getGames } from "../game/GameProvider"

export const EventForm = () => {
  const history = useHistory();

  const { createEvent } = useContext(EventContext)
  const { games, getGames }= useContext(GameContext)
  const [ currentEvent, setEvent ] = useState({
    name: "",
    time: "",
    // statusId: 0, (default to 1: open for signing up in the back-end)
    gameId: 0
  });

  useEffect(() => {
    // Get all existing games from API
    getGames()
  }, []);


  const handleControlledInputChange = (e) => {
    const newCurrentEvent = {...currentEvent }
    newCurrentEvent[e.target.name] = e.target.value
    setEvent(newCurrentEvent)
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentEvent.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a game...</option>
            {games.map((g) => (
              <option value={g.id} key={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const newEvent = {
            name: currentEvent.name,
            time: new Date(),
            gameId: currentEvent.gameId
          }

          createEvent(newEvent).then(() => history.push("./events"))
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};