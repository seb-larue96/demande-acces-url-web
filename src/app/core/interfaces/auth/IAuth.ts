export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserInfoResponse {
    name: string;
    surname: string;
    role: string;
}