import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/signup.tsx"),
  route("/forgot-password", "routes/forgot-password.tsx"),
  route("/verify-email", "routes/verify-email.tsx"),
  route("/activate-2fa", "routes/activate-2fa.tsx"),
  route("/activate-mfa", "routes/activate-mfa.tsx"),
  route("/otp-mfa", "routes/otp-mfa.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/transactions", "routes/transactions.tsx"),
  route("/reports", "routes/reports.tsx"),
  route("/profile", "routes/profile.tsx")
] satisfies RouteConfig;
