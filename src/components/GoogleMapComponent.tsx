"use client";
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import Loader from "./Loader";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "20px",
};

const center = {
  lat: -8.1356229,
  lng: -63.7369498,
};

interface IGoogleMapComponent {
  markers: {
    lat: string;
    lng: string;
  }[];
}

const GoogleMapComponent = ({ markers }: IGoogleMapComponent) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const center = { lng: "-61.0098647", lat: "-5.5871199" };

  if (!isLoaded) return <div>Loading....</div>;
  return (
    <GoogleMap
      options={{
        mapTypeId: "satellite",
        zoomControl: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
      mapContainerStyle={containerStyle}
      center={{
        lat: Number(center.lat),
        lng: Number(center.lng),
      }}
      zoom={6}
    >
      {markers.map((marker, key) => (
        <Marker
          key={key}
          icon={{
            url: "/marker-icon.png",
      scale: 22
          }}
          position={{
            lat: Number(marker.lat),
            lng: Number(marker.lng),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
