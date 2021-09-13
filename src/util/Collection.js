'use strict';

const { Collection: DDOCollection } = require('@discordoo/collection');

class Collection extends DDOCollection {
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
  filter(filter, options = { return: "collection" }) {
    return super.filter(filter, options);
  }

  /**
   * Collection toJSON is called recursively by JSON.stringify
   * @returns {[*]}
   */
  toJSON() {
    return [...this.values()];
  }
}

module.exports = Collection;

/**
 * The filter returns collection
 * @typedef {Object} CollectionFilterOptions
 * @property {"collection" | "map" | "array"} return
 */

/**
 * @external Collection
 * @see {@link https://github.com/Discordoo/collection}
 */