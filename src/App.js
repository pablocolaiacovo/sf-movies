import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import MapWrapper from "./components/MapWrapper";
import TypeaheadWrapper from "./components/TypeaheadWrapper";

const App = () => {
  const [title, setTitle] = useState("");
  function setMovieTitle(movie) {
    if (movie) {
      setTitle(movie);
    }
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">SF Movies</Navbar.Brand>
      </Navbar>
      <TypeaheadWrapper
        onMovieChange={t => setTitle(t)}
        movie={title}
      ></TypeaheadWrapper>
      <MapWrapper movie={title}></MapWrapper>
    </Container>
  );
};

export default App;
