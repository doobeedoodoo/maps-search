import { ValidationError } from '@nestjs/common';

type MappedValidationError = {
  field: string;
  error: string;
};

export const mapValidationErrors = (
  validationErrors: ValidationError[],
): MappedValidationError[] => {
  return validationErrors.map((error) => ({
    field: error.property,
    error: Object.values(error.constraints).join(', '),
  }));
};
