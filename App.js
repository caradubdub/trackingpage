import React, { useEffect, useState } from "react";
import ReactDOM, { render } from "react-dom";
import styled from "styled-components";
import MapContainer from "./map";
import progress from "./public/assets/progress.png";

const tz = Intl.DateTimeFormat(navigator.language, {
  weekday: "long",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}).format(new Date());
let tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(tz, tzName);

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300))) "Mulish",
    sans-serif;
  margintop: 0 !important;
  padding: 0 !important;
  line-height: 1.5;
`;

const Progress = () => {
  return <img src={progress} alt="Progress bar" height="50px" />;
};
const App = () => {
  const [sendName, setsendName] = useState("");
  const [recName, setrecName] = useState("");
  const [total, setTotal] = useState(0);
  const [delTime, setdelTime] = useState(0);
  const [runLoc, setRunLoc] = useState("");
  const [dropLoc, setdropLoc] = useState("");
  const [status, setstatus] = useState(0);
  const [statusText, setstatusText] = useState("");

  setInterval(() => {
    fetch(
      "https://us-central1-gesture-dev.cloudfunctions.net/track/runners/runner123"
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.runnerLocation != runLoc) {
          console.log(true);
          //create clear interval logic

          setRunLoc(res.data.runnerLocation);
        }
      });
  }, 30000);

  useEffect(() => {
    fetch(
      "https://us-central1-gesture-dev.cloudfunctions.net/track/orders/order123"
    )
      .then((res) => res.json())
      .then((res) => {
        setsendName(res.data.senderName);
        setrecName(res.data.recipientName);
        setTotal(res.data.totalPrice);
        setdelTime(res.data.deliveryTime);
        setRunLoc(res.data.runnerLocation);
        setdropLoc(res.data.dropoffLocation);
        setstatus(res.data.status);
        setstatusText(res.data.statusText);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://us-central1-gesture-dev.cloudfunctions.net/track/runners/runner123"
  //   )
  //     .then((res) => res.json())
  //     .then((res) => console.log("res", res.data));
  // }, [runLoc]);

  // {senderName:"Cara","recipientName":"Daniel","totalPrice":120.57,"deliveryTime":1613602676934,"runnerLocation":"40.749419041103586,-74.00170823565635","dropoffLocation":"40.773354412021924, -73.96172012297022","status":0,"statusText":"Order Accepted."}
  return (
    <StyledPage>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          height: "10vh",
          backgroundColor: "#e2e7f6",
          boxShadow: "0 9px 5px -2px lightgray",
          alignItems: "center",
          marginTop: "0",
        }}
      >
        <img
          src="https://static.wixstatic.com/media/47bf92_a773540645ad40f58c28ea552b841902~mv2.png/v1/fill/w_220,h_68,al_c,q_85,usm_0.66_1.00_0.01/Gesture%20Logo%20with%20Text.webp"
          alt="Gesture Logo with Text.png"
          style={{ height: "5vh" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "51vh",
          marginTop: "2vh",
          marginBottom: "1vh",
        }}
      >
        <MapContainer runLoc={runLoc} dropLoc={dropLoc} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90vw",
          color: "#8585FF",
          margin: "0 auto 0 auto",
        }}
      >
        {
          // <div
          //   style={{
          //     display: "flex",
          //     flexDirection: "row",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     width: "100%",
          //   }}
          // >
          //   <Progress />
          // </div>
        }
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: "#4c42b7",
            paddingBottom: "10px",
          }}
        >
          <img
            width="25"
            height="20"
            padding="0 20 0 0"
            src="https://www.svgrepo.com/show/101623/clock.svg"
          />
          &nbsp;
          <b>Order Status</b>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: "#4c42b7",
            paddingBottom: "20px",
          }}
        >
          {statusText}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: "#4c42b7",
            paddingBottom: "10px",
          }}
        >
          <img
            width="30"
            height="25"
            padding="0 20 0 0"
            src="https://www.svgrepo.com/show/208422/delivery-truck-truck.svg"
          />
          &nbsp;
          <b>Delivery Details</b>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: "#4c42b7",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                color: "#4c42b7",
                paddingBottom: "10px",
                width: "50vw",
              }}
            >
              <b>Sent from</b>
              <br />

              {sendName}
            </div>
            <div
              style={{
                width: "100%",
                color: "#4c42b7",
              }}
            >
              <strong>Recipient</strong>

              <br />
              {recName}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                color: "#4c42b7",
                flexWrap: "wrap",
              }}
            >
              Order Total: ${total} <br />
              Order Time:{" "}
              {Intl.DateTimeFormat(navigator.language, {
                weekday: "long",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(delTime))}
            </div>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default App;
