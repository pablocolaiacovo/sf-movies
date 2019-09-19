import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";

const TypeaheadWrapper = props => {
  const [movies, setMovies] = useState([]);
  async function getMovies() {
    const res = await fetch("/api/movies");
    const titles = await res.json();
    setMovies(titles);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Form className="my-1">
      <Form.Group>
        <Typeahead
          labelKey="movies"
          options={movies}
          placeholder="Movies"
          onChange={selected => {
            props.onMovieChange(selected);
          }}
          selected={props.movie}
        />
      </Form.Group>
    </Form>
  );
};

export default TypeaheadWrapper;
