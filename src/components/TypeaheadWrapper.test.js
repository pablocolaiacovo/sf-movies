import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TypeaheadWrapper from "./TypeaheadWrapper";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("displays correct selected movie", () => {});

jest.mock("react-bootstrap-typeahead");

it("displays movies list", async () => {
  const fakeMoviesList = ["180", "Star Wars"];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMoviesList)
    })
  );

  await act(async () => {
    render(<TypeaheadWrapper />, container);
  });

  console.log(container);
  expect(container.querySelector("rbt ul li").length).toBe(2);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
