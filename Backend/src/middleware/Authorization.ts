import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "";

export const Authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwtToken = req.cookies.jwt;

    if (!jwtToken) {
        res.status(420).json({
            success: false,
            message: "No Cookie Found",
            redirect: "/login"
        })
        return;
    }

    try {
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        console.log("This is the decoded JWT Token: ", decoded);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(411).json({
            success: false,
            message: "Error Verifying JWT Token"
        });
    }
};
