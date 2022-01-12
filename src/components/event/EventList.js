import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EventContext } from "./EventProvider.js";

export const EventList = (props) => {
  const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext);

  useEffect(() => {
    getEvents();
  }, []);

  const history = useHistory()

  return (
    <article className="events">
      <header className="events__header">
        <h1>Level Up Game Events</h1>
      </header>
      {events.map((event) => {
        return (
        <div>
            <h3>{event.name}</h3>
            <section key={event.id} className="registration">
                <div className="registration__game">Game: {event.game.name}</div>
                <div>Hosted By: {event.host.user.firstName}</div>
                <div>Game Time: {event.title}</div>
                <div>
                  {new Date(event.time).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })}
                  {/* @ {event.time} */}
                </div>
                <div>Status: {event.status.title}</div>
                {event.joined ? (
                <button
                  className="btn btn-3"
                  onClick={() => leaveEvent(event.id)}
                >
                  Leave
                </button>
              ) : (
                <button className="btn btn-2" 
                onClick={() => joinEvent(event.id)}>
                  Join
                </button>
              )}
            </section>
        </div>
        );
      })}
      <button className="btn btn-2 btn-sep icon-create" onClick={() => {history.push({ pathname: "/events/new" })}}>
        Create New Event
      </button>
    </article>
  );
};