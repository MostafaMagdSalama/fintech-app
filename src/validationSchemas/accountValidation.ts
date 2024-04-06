import { body } from 'express-validator';

export const depositevalidation = [body('amount').isNumeric(), body('accountId').isUUID().notEmpty()];

// depositevalidation duplicated in the withdrawValidation because if i want to add new validation to the withdrawValidation i will not need to add it to the depositevalidation
export const withdrawValidation = [body('amount').isNumeric(), body('accountId').isUUID().notEmpty()];
