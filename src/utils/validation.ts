export const mapValidationErrors = (validationErrors) => {
  // TODO: type
  return validationErrors.map((error) => ({
    field: error.property,
    error: Object.values(error.constraints).join(', '),
  }));
};
