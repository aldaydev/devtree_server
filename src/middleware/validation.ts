import type { Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422).json(errors.array());
        return;
    }

    next();
}