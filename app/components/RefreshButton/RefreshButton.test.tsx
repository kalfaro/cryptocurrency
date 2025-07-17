import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { default as RefreshButton } from './RefreshButton';

// Create a mock of fetcher.Form as a functional component
function MockForm({ children, onSubmit }: any) {
  return <form onSubmit={onSubmit} data-testid="refresh-form">{children}</form>;
}

let baseFetcher: any;

beforeEach(() => {
  baseFetcher = { Form: MockForm, state: "idle" };
});

describe("RefreshButton", () => {
  it("renders correctly and shows default text", () => {
    render(<RefreshButton fetcher={baseFetcher} />);
    const button = screen.getByRole("button", { name: /refresh/i });
    expect(button).toBeInTheDocument();
  });

  it('shows "Refreshing..." when fetcher is loading', () => {
    baseFetcher.state = 'loading'
    render(<RefreshButton fetcher={baseFetcher} />);
    expect(screen.getByRole("button")).toHaveTextContent("Refreshing...");
  });

  it("submits the form on button click", () => {
    const onSubmit = vi.fn((e: any) => e.preventDefault());

    // Replace the form with one with onSubmit
    const CustomForm = (props: any) => <MockForm {...props} onSubmit={onSubmit} />;
    baseFetcher.Form = CustomForm;

    render(<RefreshButton fetcher={baseFetcher} />);
    fireEvent.submit(screen.getByTestId("refresh-form"));

    expect(onSubmit).toHaveBeenCalled();
  });
});
