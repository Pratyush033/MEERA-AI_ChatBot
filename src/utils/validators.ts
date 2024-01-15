import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';


const validate = (validations: ValidationChain[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
const loginValidator: ValidationChain[] = [
    body('email').trim().isEmail().withMessage('Please enter a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Please enter a valid password'),
];

const signupValidator: ValidationChain[] = [
    body('name').notEmpty().withMessage('Name is required'),
    ...loginValidator,
];

export { signupValidator, loginValidator, validate };
