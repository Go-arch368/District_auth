import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/auth/RegisterForm";
import { register } from "../actions/register"
import { useRouter } from "next/navigation";

jest.mock("../actions/register");
jest.mock("next/navigation");

const mockRegister = register as jest.Mock;
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;

describe("RegisterForm Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create an account/i })).toBeInTheDocument();
  });

  test("updates input values correctly", async () => {
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");

    expect(screen.getByLabelText(/Name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("password123");
  });

  test("shows validation errors for empty fields", async () => {
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test("shows error for invalid email format", async () => {
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Email/i), "invalid-email");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });

  test("displays error message on failed registration", async () => {
    mockRegister.mockResolvedValueOnce({ error: "Registration failed" });
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });
  });

  test("displays success message and redirects on successful registration", async () => {
    mockRegister.mockResolvedValueOnce({ success: true });
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    }, { timeout: 3000 });
  });

  test("shows loading state during submission", async () => {
    let resolvePromise: (value?: any) => void;
    mockRegister.mockImplementation(() => new Promise((resolve) => {
      resolvePromise = resolve;
    }));

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    expect(screen.getByText(/Creating account.../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create an account/i })).toBeDisabled();

    // Cleanup
    resolvePromise!({ success: true });
  });

  test("resets form after successful submission", async () => {
    mockRegister.mockResolvedValueOnce({ success: true });
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue("");
    });
  });

 /*  test("rejects weak passwords", async () => {
    render(<RegisterForm />);
    
    await user.type(screen.getByLabelText(/Name/i), "Test");
    await user.type(screen.getByLabelText(/Email/i), "test@test.com");
    await user.type(screen.getByLabelText(/Password/i), "123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
    });
  }); */

  test("handles API exceptions", async () => {
    mockRegister.mockRejectedValue(new Error("API down"));
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    await waitFor(() => {
      expect(screen.getByText(/An unexpected error occurred/i)).toBeInTheDocument();
    });
  });

  test("disables inputs during submission", async () => {
    let resolvePromise: (value?: any) => void;
    mockRegister.mockImplementation(() => new Promise((resolve) => {
      resolvePromise = resolve;
    }));

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Create an account/i }));

    expect(screen.getByLabelText(/Name/i)).toBeDisabled();
    expect(screen.getByLabelText(/Email/i)).toBeDisabled();
    expect(screen.getByLabelText(/Password/i)).toBeDisabled();

    // Cleanup
    resolvePromise!({ success: true });
  });
});