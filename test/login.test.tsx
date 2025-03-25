import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/LoginForm";
import { login } from "@/actions/login";

jest.mock("@/actions/login", () => ({
  login: jest.fn(),
}));

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("updates input values correctly", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");

    expect(screen.getByLabelText(/Email/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("password123");
  });

  test("displays validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test("displays error message on failed login", async () => {
    const user = userEvent.setup();
    (login as jest.Mock).mockResolvedValueOnce({ error: "Invalid credentials" });
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("displays success message on successful login", async () => {
    const user = userEvent.setup();
    (login as jest.Mock).mockResolvedValueOnce({ success: "Login successful" });
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "correctpassword");
    await user.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });

});