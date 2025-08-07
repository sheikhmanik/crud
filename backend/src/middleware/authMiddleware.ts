import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not defined");
    
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token." });
        }
        
        req.userId = (decoded as JwtPayload).id as number;
        next();
    });
};