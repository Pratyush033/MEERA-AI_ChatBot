import { body, validationResult } from 'express-validator';
const validate = (validations) => {
    return async (req, res, next) => {
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
const loginValidator = [
    body('email').trim().isEmail().withMessage('Please enter a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Please enter a valid password'),
];
const signupValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    ...loginValidator,
];
export { signupValidator, loginValidator, validate };
//# sourceMappingURL=validators.js.map