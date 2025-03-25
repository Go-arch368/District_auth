import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/auth/RegisterForm";
import { register } from "@/actions/register";

jest.mock("@/actions/register", () => ({
  register: jest.fn(),
}));

describe("RegisterForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create an Account/i })).toBeInTheDocument();
  });

  test("updates input values correctly", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "johndoe@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");

    expect(screen.getByLabelText(/Name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("johndoe@example.com");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("password123");
  });

  test("displays error message on failed registration", async () => {
    const user = userEvent.setup();
    (register as jest.Mock).mockResolvedValueOnce({ error: "Registration failed" });
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "johndoe@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");

    await user.click(screen.getByRole("button", { name: /Create an Account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });
  });

  test("displays success message on successful registration", async () => {
    const user = userEvent.setup();
    (register as jest.Mock).mockResolvedValueOnce({ success: "Registration successful" });
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "johndoe@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");

    await user.click(screen.getByRole("button", { name: /Create an Account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
    });
  });
});