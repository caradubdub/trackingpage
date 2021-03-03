import React, { Component, useEffect, useState } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "google-maps-react";
import mapStyle from "./GoogleMapStyle";

const mapStyles = {
  width: "90%",
  height: "50vh",
  maxHeight: "50vh",
  minWidth: "50vw",
  minHeight: "40vh",
  position: "static !important",
  margin: "0 auto 0 auto",
};

function MyDirectionsRenderer(props) {
  const [directions, setDirections] = useState(null);
  const { origin, destination, travelMode } = props;

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    console.log("props", origin, destination);
    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [
    directions,
    destination.lat,
    destination.lng,
    origin.lat,
    origin.lng,
    travelMode,
  ]);

  return (
    <React.Fragment>
      {directions && <DirectionsRenderer directions={directions} />}
    </React.Fragment>
  );
}

const MapContainer = (props) => {
  const [initCenter, setInitCenter] = useState({
    lat: 40.749419041103586,
    lng: -74.0017082356,
  });
  const [runLat, setRunLat] = useState(0);
  const [runLng, setRunLng] = useState(0);
  const [dropLat, setDropLat] = useState(0);
  const [dropLng, setDropLng] = useState(0);
  const [directions, setDirections] = useState({});

  const handleLoc = (loc) => {
    let arr = loc.split(",");
    let lat = Number(arr[0]);
    let long = Number(arr[1]);
    return [lat, long];
  };
  useEffect(() => {
    setInitCenter({
      lat: handleLoc(props.runLoc)[0],
      lng: handleLoc(props.runLoc)[1],
    });
  }, [props.runLoc]);
  console.log("init CENTER", initCenter);

  return (
    <Map
      google={props.google}
      zoom={13}
      styles={props.mapStyle}
      disableDefaultUI={true}
      style={mapStyles}
      center={initCenter}
    >
      <Marker
        title={"Runner"}
        name={"Runner"}
        icon={{
          url: "./public/assets/PinBlue.png",
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(30, 40),
        }}
        position={{
          lat: handleLoc(props.runLoc)[0],
          lng: handleLoc(props.runLoc)[1],
        }}
      />
      <InfoWindow visible={true}>
        <div>
          <h4>Runner</h4>
        </div>
      </InfoWindow>
      <Marker
        icon={{
          url: "./public/assets/PinGold.png",
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(28, 37),
        }}
        position={{
          lat: handleLoc(props.dropLoc)[0],
          lng: handleLoc(props.dropLoc)[1],
        }}
      />
    </Map>
  );
};
MapContainer.defaultProps = mapStyle;
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(MapContainer);
