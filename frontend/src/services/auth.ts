import { LoginUserType, RegisterUserType } from "../types";

export const registerUser: RegisterUserType = async (data) => {
  const res = await fetch(`http://localhost:5000/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Registration failed");
  }
  return await res.json();
};

export const loginUser: LoginUserType = async (data) => {
  const res = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Login failed");
  }
  const json = await res.json();
  sessionStorage.setItem("token", json.token);
  return json;
};
