import { Request, Response, NextFunction } from 'express';
import isEmail from 'validator/lib/isEmail';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export async function validatorCreateCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { fullName, email } = req.body; 

    if (!fullName || fullName.trim() === '') {
        throw new CustomError(400, 'Raw', 'Full name is required'); 
    }

    if (!email || !isEmail(email)) {
        throw new CustomError(400, 'Raw', 'Invalid email format'); 
    }

    return next(); 
}