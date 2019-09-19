import React, { useState, useEffect } from "react";
import ReactMapboxGl, { ZoomControl, Layer, Feature } from "react-mapbox-gl";
import { mapConfig } from "../config.json";

import Card from "react-bootstrap/Card";

const MapWrapper = props => {
  const Map = ReactMapboxGl({
    accessToken: mapConfig.token
  });

  const [markers, setMarkers] = useState([]);
  const [movie, setMovie] = useState();

  useEffect(() => {
    if (props.movie) {
      fetch(`/api/locations?title=${props.movie}`)
        .then(r => r.json())
        .then(data => {
          const locations = data.locations.join(";");
          fetch(`/api/geocoding?locations=${locations}`)
            .then(r => r.json())
            .then(data => setMarkers(data));

          setMovie(data.movie);
        });
    }
  }, [props.movie]);

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "75vh"
        }}
        center={mapConfig.center}
        zoom={mapConfig.zoom}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15", "icon-size": 5 }}
        >
          {markers.map((m, i) => {
            return <Feature coordinates={m.coordinates} key={i} />;
          })}
        </Layer>
        <ZoomControl />
        {movie && (
          <Card style={{ width: "18rem", position: "abosulte" }}>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {movie.release_year} - {movie.production_company}
              </Card.Subtitle>
              <Card.Text>
                Director: {movie.director}. Writer: {movie.writer}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Map>
    </>
  );
};

export default MapWrapper;
