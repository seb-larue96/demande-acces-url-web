export interface UserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UserResponse {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    isActive: boolean;   
}