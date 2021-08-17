export default class ObjectUtils {

  /**
   * Does a shallow comparison of two data objects. This may report false negatives, that is to say:
   * two objects that are in fact equal may be determined inequal.
   *
   * @param a first object to compare
   * @param a first object to compare
   */
  static shallowEquals = (a, b) => {
    const encodedA = a !== undefined && a !== null ? JSON.stringify(a) : null;
    const encodedB = b !== undefined && b !== null ? JSON.stringify(b) : null;
    return encodedA === encodedB;
  };

}
