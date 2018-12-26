/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

export default class SeqenParser<K, V, RK, RV> {
  recipe: SeqenRecipe<K, V, RK, RV>;
  ops: Array<{}>;
  comparator: ?(valueA: RK, valueB: RK) => number;

  constructor(recipe: SeqenRecipe<K, V, RK, RV>) {
    this.recipe = recipe
    this.ops = []
    recipe(this)
  }

  filter(predicate: (value: V, key: K, iter: this) => boolean, context?: mixed): this {
    this.ops.push({op: 'FILTER', predicate, context})
    return this
  }

  map(
    mapper: (value: V, key: K, iter: this) => RV,
    context?: any
    ): Collection<K, RV> {
    this.ops.push({op: 'MAP', mapper, context})
    return this
  }

  mapKeys(
    mapper: (key: K, value: RV, iter: this) => RK,
    context?: any
    ): Collection<RK, RV> {
    this.ops.push({op: 'MAP_KEYS', mapper, context})
    return this
  }

  toSortedMap(comparator?: (valueA: RK, valueB: RK) => number, options?: Object): this {
      if(this.comparator) {
        throw new Error("Only one sorted map operation allowed in a recipe");
      }
      this.comparator = comparator
      this.ops.push({op: 'SORTED_MAP', comparator, options})
      return this
  }

}
