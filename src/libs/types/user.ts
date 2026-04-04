export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  is_active: boolean;
  register_date: string;
}

export interface RegisterDTO {
  email: string;
  name: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  register_date: string;
}