import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "@/components/auth/RegisterForm";

import { register } from "@/actions/register";

// Mock the register function
jest.mock("@/actions/register", () => ({
  register: jest.fn(),
}));

describe("RegisterForm Component", () => {
  test("renders the form fields correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create an Account/i })).toBeInTheDocument();
  });

  test("updates input values correctly", async () => {
    render(<RegisterForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "johndoe@example.com");
    await userEvent.type(passwordInput, "password123");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("johndoe@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("displays error message on failed registration", async () => {
    (register as jest.Mock).mockResolvedValue({ error: "Registration failed" });

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Create an Account/i });

    await userEvent.type(emailInput, "johndoe@example.com");
    await userEvent.type(passwordInput, "password123");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument();
  });

  test("displays success message on successful registration", async () => {
    (register as jest.Mock).mockResolvedValue({ success: "Registration successful" });

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Create an Account/i });

    await userEvent.type(emailInput, "johndoe@example.com");
    await userEvent.type(passwordInput, "password123");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Registration successful/i)).toBeInTheDocument();
  });
});
