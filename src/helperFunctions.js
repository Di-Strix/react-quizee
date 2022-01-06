export const placeDataToLocString = (string = '', data = '') => string.replace('{DATA}', data)
export const getErrorString = (errorObject = {}, dictionary = {}) =>
  placeDataToLocString(dictionary[errorObject.error], errorObject.index + 1)
