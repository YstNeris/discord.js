'use strict';

const { Collection: DDOCollection } = require('@discordoo/collection');

class Collection extends DDOCollection {
  static default = Collection;

  forceSet(key, value) {
    return this.set(key, value);
  }

  /**
   * Maps each item to another value into a collection. Identical in behavior to
   * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
   * @param {Function} fn Function that produces an element of the new collection, taking three arguments
   * @param {*} [thisArg] Value to use as `this` when executing function
   * @returns {Collection}
   */
  mapValues(fn, thisArg) {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    const coll = new this.constructor[Symbol.species]();
    for (const [key, val] of this) coll.set(key, fn(val, key, this));
    return coll;
  }

  /**
   * Removes items that satisfy the provided filter function.
   * @param {Function} fn Function used to test (should return a boolean)
   * @param {*} [thisArg] Value to use as `this` when executing function
   * @returns {number} The number of removed entries
   */
  sweep(fn, thisArg) {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    const previousSize = this.size;
    for (const [key, val] of this) {
      if (fn(val, key, this)) this.delete(key);
    }
    return previousSize - this.size;
  }

  /**
   * Checks if this collection shares identical items with another.
   * This is different to checking for equality using equal-signs, because
   * the collections may be different objects, but contain the same data.
   * @param {Collection} collection Collection to compare with
   * @returns {boolean} Whether the collections have identical contents
   */
  equals(collection) {
    if (!collection) return false; // runtime check
    if (this === collection) return true;
    if (this.size !== collection.size) return false;
    for (const [key, value] of this) {
      if (!collection.has(key) || value !== collection.get(key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Filters out the elements which don't meet requirements and returns collection
   * @param {Function} filter - function to use
   * @param {CollectionFilterOptions} options - filter options
   * @returns {this}
   */
  filter(filter, options = { return: 'collection' }) {
    return super.filter(filter, options);
  }

  /**
   * The sorted method sorts the items of a collection and returns it.
   * The sort is not necessarily stable in Node 10 or older.
   * The default sort order is according to string Unicode code points.
   * @param {Function} [compareFunction] Specifies a function that defines the sort order.
   * If omitted, the collection is sorted according to each character's Unicode code point value,
   * according to the string conversion of each element.
   * @returns {Collection}
   * @example collection.sorted((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
   */
  sorted(compareFunction = Collection.defaultSort) {
    return new this.constructor(this).sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
  }

  /**
   * Collection toJSON is called recursively by JSON.stringify
   * @returns {[*]}
   */
  toJSON() {
    return [...this.values()];
  }

  static defaultSort(firstValue, secondValue) {
    return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
  }
}

module.exports = Collection;

/**
 * The filter returns collection
 * @typedef {Object} CollectionFilterOptions
 * @property {"collection" | "map" | "array"} [return='collection']
 */

/**
 * @external Collection
 * @see {@link https://github.com/Discordoo/collection}
 */
