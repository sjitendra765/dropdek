import * as Cookies from "js-cookie";

const buildNamespace = (namespace, key) => `dropdeck.${namespace}${key !== undefined ? `.${key}` : ""}`;

/**
 * Store transient preferences for a user in a cookie.
 * Cookie expires after 30 days.
 *
 * @author stefan
 */
class TransientPreferences {

  /**
   * Create a namespace, default is "transient_preferences".
   *
   * @param namespace
   * @param key
   * @param defaults
   */
  constructor(namespace = "transient_preferences", key, defaults = {}) {
    this.namespace = namespace;
    this.key = key;

    const stored = Cookies.get(buildNamespace(namespace, key));
    if (stored !== undefined) {
      this.preferences = JSON.parse(stored);
    } else {
      this.preferences = { ...defaults };
      Cookies.set(buildNamespace(namespace, key), JSON.stringify(this.preferences), { expires: 30 });
    }
  }

  /**
   * Set a value in this namespace and persist in the cookie.
   * @param key
   * @param value
   */
  set = (key, value) => {
    this.preferences[key] = value;
    Cookies.set(buildNamespace(this.namespace, this.key), JSON.stringify(this.preferences), { expires: 30 });
  }

  /**
   * Get a value from the namespace, or the default value if it doesn't exist.
   *
   * @param key
   * @param defaultValue
   * @param conditions
   * @returns {*}
   */
  get = (key, defaultValue, conditions = {}) => {
    if (conditions && !Object.entries(conditions).every((entry) => this.preferences[entry[0]] === entry[1])) {
      return defaultValue;
    }
    return this.preferences[key] || defaultValue;
  }

  del = (key) => {
    delete this.preferences[key];
    Cookies.set(buildNamespace(this.namespace, this.key), JSON.stringify(this.preferences), { expires: 30 });
  }
}

export { TransientPreferences };
