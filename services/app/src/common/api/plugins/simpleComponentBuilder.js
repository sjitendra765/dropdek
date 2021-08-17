/**
 * Default component builder that defines an empty block component with the given type.
 */
export const simpleComponentBuilder = (type) => (text = '') => ({
  type,
  children: [{ text }]
});
