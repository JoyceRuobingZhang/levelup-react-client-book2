import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([]);

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGameTypes = () => {
        return fetch("http://localhost:8000/gameTypes", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(response => response.json())
        .then(setTypes)
    };

    const getGameById = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(response => response.json())
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
        .then(response => response.json()) //POST: the response is the object you created
        // .then(getGames)  works when the database is not large, otherwise not efficient
        .then((data) => {
            const newGames = [...games, data]
            // newGames.push(data)
            setGames(newGames)
        });
    };
      
    const deleteGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(getGames)
    }

    return (
        <GameContext.Provider value={{ games, gameTypes, getGames, getGameTypes, getGameById, createGame, deleteGame }} >
            { props.children }
        </GameContext.Provider>
    )
}