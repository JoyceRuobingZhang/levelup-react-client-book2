import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { GameContext } from "./GameProvider.js"
import "./Game.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const loginGamerId = parseInt(localStorage.getItem("lu_login_gamer"))
    
    const history = useHistory()
    
    return (
        <article className="games">
            {
                games.map(game => {
                    return (
                    <section key={`game--${game.id}`} className="game">
                        {/*game.created_by is an object  */}
                        <div className="game__title">{game.name} by {game.created_by.user.first_name}</div>
                        <div className="game__players">{game.player_limit} players needed</div>
                        {/* <div className="game__skillLevel">Skill level is {game.skill_level}</div> */}
                        {
                        game.created_by.user.id === loginGamerId
                        ? <button>Delete</button>
                        : null
                        }
                    </section>)
                })
            }
            <button
            className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" });
            }}
            >
            Register New Game
            </button>
        </article>
    )
}