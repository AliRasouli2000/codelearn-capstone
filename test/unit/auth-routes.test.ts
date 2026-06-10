jest.mock("@/dbConfig/dbConfig", () => ({
  connect: jest.fn(),
}));

jest.mock("@/helpers/mailer", () => ({
  __esModule: true,
  sendEmail: jest.fn(),
}));

jest.mock("@/models/userModel", () => {
  const MockUser = jest.fn().mockImplementation(function MockUser(data) {
    Object.assign(this, data);
    this._id = data._id ?? "user-123";
    this.save = jest.fn().mockResolvedValue(this);
  });

  MockUser.findOne = jest.fn();
  MockUser.find = jest.fn();

  return {
    __esModule: true,
    default: MockUser,
  };
});

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

const bcryptjs = require("bcryptjs").default;
const jwt = require("jsonwebtoken").default;
const User = require("@/models/userModel").default;
const { sendEmail } = require("@/helpers/mailer");
const { POST: signupPOST } = require("@/app/api/users/signup/route");
const { POST: loginPOST } = require("@/app/api/users/login/route");
const { POST: forgotPasswordPOST } = require("@/app/api/users/forgotpassword/route");
const { POST: verifyEmailPOST } = require("@/app/api/users/verifyemail/route");

const jsonRequest = (body: unknown) =>
  new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("auth API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    bcryptjs.genSalt.mockResolvedValue("salt");
    bcryptjs.hash.mockResolvedValue("hashed-password");
    bcryptjs.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("signed-token");
  });

  it("creates a user and sends a verification email on signup", async () => {
    User.findOne.mockResolvedValue(null);
    sendEmail.mockResolvedValue({ messageId: "email-1" });

    const response = await signupPOST(
      jsonRequest({
        username: "newlearner1",
        email: "New@Example.com",
        password: "supersecure1",
      }),
    );

    expect(response.status).toBe(200);
    expect(User.findOne).toHaveBeenCalledWith({ email: "new@example.com" });
    expect(sendEmail).toHaveBeenCalledWith({
      email: "new@example.com",
      emailType: "VERIFY",
      userId: "user-123",
    });
  });

  it("logs a verified user in with username fallback", async () => {
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        _id: "user-1",
        username: "CodeLearner",
        email: "code@example.com",
        password: "hashed-password",
        isVerified: true,
      });

    const response = await loginPOST(
      jsonRequest({
        email: "CodeLearner",
        password: "supersecure1",
      }),
    );

    expect(response.status).toBe(200);
    expect(User.findOne).toHaveBeenNthCalledWith(1, { email: "codelearner" });
    expect(User.findOne).toHaveBeenNthCalledWith(2, { username: "CodeLearner" });
    expect(response.headers.get("set-cookie")).toContain("token=signed-token");
  });

  it("sends a reset email for forgot password", async () => {
    User.findOne.mockResolvedValue({
      _id: "user-3",
      email: "reset@example.com",
    });
    sendEmail.mockResolvedValue({ messageId: "email-2" });

    const response = await forgotPasswordPOST(jsonRequest({ email: "reset@example.com" }));

    expect(response.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledWith({
      email: "reset@example.com",
      emailType: "RESET",
      userId: "user-3",
    });
  });

  it("verifies an email when the token is valid", async () => {
    const user = {
      _id: "user-4",
      isVerified: false,
      verifyToken: "valid-token",
      verifyTokenExpiry: Date.now() + 5000,
      save: jest.fn().mockResolvedValue(undefined),
    };
    User.find.mockResolvedValue([user]);

    const response = await verifyEmailPOST(jsonRequest({ token: "valid-token" }));

    expect(response.status).toBe(200);
    expect(user.isVerified).toBe(true);
    expect(user.save).toHaveBeenCalled();
  });
});