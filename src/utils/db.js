/**
 * @description It takes a string and a search term, and returns a string that can be used as a query parameter in a URL.
 * @param {string} query - The search query.
 * @param {string} [search=''] - The field you want to search in.
 * @returns {string} A string that is a URI-encoded JSON object.
 */
export function createQuery(query, search = '') {
  return encodeURIComponent(
    JSON.stringify({
      [search]: {
        $regex: `(?i)${query}`
      }
    })
  );
}

/**
 * @description It takes a field name, a class name, and an object id, and returns a pointer object.
 * @param {string} field - The field name in the class you're updating.
 * @param {string} className - The name of the class you want to point to.
 * @param {string} id - The id of the object you want to point to.
 * @returns {object} A pointer object.
 */

export function createPointer(field, className, id) {
  return {
    [field]: {
      __type: 'Pointer',
      className: className,
      objectId: id
    }
  };
}