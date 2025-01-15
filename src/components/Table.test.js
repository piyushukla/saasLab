import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  const mockProjects = [
    { "percentage.funded": 186, "amt.pledged": 15283 },
    { "percentage.funded": 120, "amt.pledged": 10000 },
    { "percentage.funded": 95, "amt.pledged": 8000 },
  ];

  test("renders the table headers correctly", () => {
    render(<Table projects={mockProjects} />);

    // Check for table headers
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  test("renders the correct number of rows", () => {
    render(<Table projects={mockProjects} />);

    // Ensure all rows are rendered (excluding the header row)
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockProjects.length + 1); // 3 data rows + 1 header row
  });

  test("renders project data correctly", () => {
    render(<Table projects={mockProjects} />);

    // Check for specific project data
    expect(screen.getByText("186")).toBeInTheDocument(); // Percentage funded
    expect(screen.getByText("15283")).toBeInTheDocument(); // Amount pledged
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("10000")).toBeInTheDocument();
  });

  test("renders no rows when projects array is empty", () => {
    render(<Table projects={[]} />);

    // Ensure only the header row exists
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1); // Only the header row
  });
});
