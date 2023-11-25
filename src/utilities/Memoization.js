
/**
 * @classdesc Memoization class for caching data using the Cache API.
 * @class
 */
class Memoization {
  /**
   * @description The name of the cache database.
   * @type {string}
   */
  #cacheName;

  /**
   * @description Initializes the Memoization instance and clears previous cache.
   * @param {string} cacheName - The name of the cache database.
   * @constructor
   */
  constructor(cacheName) {
    this.#cacheName = cacheName;

    if (!this.supported) console.warn('Cache API is not supported in this environment');

    if (!sessionStorage.getItem(`${this.#cacheName}Initialized`) && this.supported) {
      sessionStorage.setItem(`${this.#cacheName}Initialized`, 'true');
      this.deleteCache();
    }
  }

  /**
   * @description Indicates whether Cache API is supported.
   * @returns {boolean} Returns `true` if Cache API is supported, `false` otherwise.
   * @readonly
   */
  get supported() {
    return !!window.caches;
  }

  /**
   * @description The name of the cache database.
   * @returns {string} The name of the cache database.
   * @readonly
   */
  get databaseName() {
    return this.#cacheName;
  }

  /**
   * @description Retrieves data from the cache for a given key.
   * @param {string} key - The key associated with the cached data.
   * @returns {Promise<unknown>} A Promise that resolves to the cached data or null if not found.
   */
  async getCacheData(key) {
    if (!this.supported) return Promise.resolve(null);

    const cacheStorage = await caches.open(this.#cacheName);
    const cachedResponse = await cacheStorage.match(new Request(key));

    if (!cachedResponse || !cachedResponse.ok) return Promise.resolve(null);

    return await cachedResponse.json();
  }

  /**
   * @description Updates the cache with the provided data for a given key.
   * @param {string} key - The key associated with the data to be cached.
   * @param {any} data - The data to be cached.
   * @returns {Promise<void>} A promise that resolves when the cache is successfully updated.
   */
  async updateCacheData(key, data) {
    if (!this.supported) return Promise.resolve();

    const cacheStorage = await caches.open(this.#cacheName);
    return cacheStorage.put(new Request(key), new Response(JSON.stringify(data)));
  }

  /**
   * @description Clears the cached data for a given key.
   * @param {string} key - The key associated with the cached data to be cleared.
   * @returns {Promise<boolean>} A promise that resolves when the cache data is successfully cleared.
   */
  async clearCacheData(key) {
    if (!this.supported) return Promise.resolve(false);

    const cacheStorage = await caches.open(this.#cacheName);
    return cacheStorage.delete(new Request(key));
  }

  /**
   * @description Deletes the entire cache database.
   * @returns {Promise<boolean>}A promise that resolves when the cache is successfully deleted.
   */
  async deleteCache() {
    if (!this.supported) return Promise.resolve(false);

    return caches.delete(this.#cacheName);
  }
}

export default new Memoization('CarServiceCacheDatabase');