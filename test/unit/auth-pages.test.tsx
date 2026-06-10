import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";
import ForgotPasswordPage from "@/app/forgotpassword/page";
import VerifyEmailPage from "@/app/verifyemail/page";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    isAxiosError: jest.fn((value: unknown) =>
      Boolean((value as { isAxiosError?: boolean })?.isAxiosError),
    ),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("react-toastify", () => ({
  Bounce: "bounce",
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const axiosMock = axios as jest.Mocked<typeof axios>;
const toastMock = toast as jest.Mocked<typeof toast>;

describe("auth pages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, "", "/");
  });

  it("shows a warning toast when no login account is found", async () => {
    axiosMock.post.mockRejectedValue({
      isAxiosError: true,
      message: "Request failed",
      response: {
        data: {
          error: "No account was found with that email address.",
        },
      },
    });
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(await screen.findByLabelText(/email or username/i), "missing@example.com");
    await user.type(await screen.findByLabelText(/password/i), "supersecure1");
    await user.click(screen.getByRole("button", { name: /login here/i }));

    await waitFor(() => {
      expect(toastMock.warn).toHaveBeenCalledWith(
        "No account found, Sign up first",
        expect.any(Object),
      );
    });
  });

  it("stops signup on short usernames before making a request", async () => {
    const user = userEvent.setup();

    render(<SignupPage />);

    await user.type(screen.getByLabelText(/username/i), "shortname");
    await user.type(screen.getByLabelText(/^email$/i), "person@example.com");
    await user.type(screen.getByLabelText(/password/i), "supersecure1");
    await user.click(screen.getByRole("button", { name: /signup/i }));

    expect(axiosMock.post).not.toHaveBeenCalled();
    expect(toastMock.error).toHaveBeenCalledWith(
      "Username must be at least 11 characters",
      expect.any(Object),
    );
  });

  it("shows a success state after sending a reset link", async () => {
    axiosMock.post.mockResolvedValue({ data: { message: "Reset link sent to your email!" } });
    const user = userEvent.setup();

    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText(/^email$/i), "reset@example.com");
    await user.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() => {
      expect(screen.getByText(/reset link sent to your email/i)).toBeInTheDocument();
    });
  });

  it("shows a missing-token message on the verify-email page", () => {
    render(<VerifyEmailPage />);

    expect(
      screen.getByText(/this verification link is missing required information/i),
    ).toBeInTheDocument();
    expect(axiosMock.post).not.toHaveBeenCalled();
  });

  it("does not show the missing-token message when the verify link includes a token", async () => {
    axiosMock.post.mockResolvedValue({ data: { message: "Email verified successfully" } });
    window.history.pushState({}, "", "/verifyemail?token=abc123");

    render(<VerifyEmailPage />);

    expect(
      screen.queryByText(/this verification link is missing required information/i),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/email verified/i)).toBeInTheDocument();
    });
  });
});