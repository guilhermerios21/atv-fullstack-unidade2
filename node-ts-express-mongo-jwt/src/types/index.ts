export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface AuthPayload {
    email: string;
    password: string;
}

export interface JwtPayload {
    id: string;
    email: string;
}

// Extensão do tipo Request do Express
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | any;
        }
    }
}