import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { "percentage.funded": 186, "amt.pledged": 15283 },
          { "percentage.funded": 120, "amt.pledged": 10000 },
          { "percentage.funded": 95, "amt.pledged": 8000 },
          { "percentage.funded": 90, "amt.pledged": 7500 },
          { "percentage.funded": 85, "amt.pledged": 7000 },
          { "percentage.funded": 80, "amt.pledged": 6000 },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("paginates projects correctly", async () => {
  render(<App />);

  // Wait for the projects to load
  await waitFor(() => expect(screen.getByText("186")).toBeInTheDocument());

  // Verify first page content
  expect(screen.getByText("186")).toBeInTheDocument(); // First item
  expect(screen.getByText("85")).toBeInTheDocument(); // Last item on the first page

  // Navigate to the second page
  const nextPageButton = screen.getByRole("button", { name: "2" });
  fireEvent.click(nextPageButton);

  // Verify second page content
  expect(screen.queryByText("186")).not.toBeInTheDocument(); // First page content
  expect(screen.getByText("80")).toBeInTheDocument(); // Content from the second page
});
