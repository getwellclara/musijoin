import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Token não informado" })
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            id: number
        };
        
        console.log(decoded.id);

        next();
        
    } catch {
        res.status(401).json({message: "Token inválido"});
    }
}