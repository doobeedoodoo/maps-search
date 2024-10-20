import { mapValidationErrors } from '.';

describe('mapValidationErrors', () => {
  it('maps ValidationError objects to MappedValidationError objects when constraints are present', () => {
    const validationErrors = [
      {
        property: 'limit',
        constraints: {
          isNumber:
            'limit must be a number conforming to the specified constraints',
        },
      },
    ];

    const expected = [
      {
        field: 'limit',
        error: 'limit must be a number conforming to the specified constraints',
      },
    ];

    const result = mapValidationErrors(validationErrors);

    expect(result).toEqual(expected);
  });
});
