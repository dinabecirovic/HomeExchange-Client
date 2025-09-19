export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  roles: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  roles: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  id: number;
  roles: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  users: UserResponse;
  token: string;
  role: string;
}
