import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    email: string;
}

export const createToken = (id: string, email: string, expiresIn: string): string => {
    const payload: TokenPayload = { id, email };

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,  
    });

    return token;
};
