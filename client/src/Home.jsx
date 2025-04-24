import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import useWebSocket from "react-use-websocket";

import { Cursor } from "./components/Cursor";
const renderCursor = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const renderUsersList = (users) => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        return <li key={uuid}>{JSON.stringify(users[uuid])}</li>;
      })}
    </ul>
  );
};

export function Home({ username }) {
  const WS_URL = "ws://localhost:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 1000;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    //asking the server to send everyone's state the second we load the components
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (lastJsonMessage) {
    return(
    <>
      {renderCursor(lastJsonMessage)}
      {renderUsersList(lastJsonMessage)}
    </>);
  }

  return <h1> Hello, {username}</h1>;
}
