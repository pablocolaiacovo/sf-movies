import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("./components/MapWrapper", () => {
  return function DummyMapWrapper(props) {
    return <div data-testid="map">{props.movie}</div>;
  };
});

jest.mock("./components/TypeaheadWrapper", () => {
  return function DummyTypeahead(props) {
    return <div data-testid="typeahead">{props.movie}</div>;
  };
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
