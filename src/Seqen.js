/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { Seq } from 'immutable-sorted';

export default class Seqen<K, V, RK, RV> {

  collection: Collection<K, V>;
  recipe: SeqenRecipe<K, V, RK, RV>;

  constructor(collection: Collection<K, V>, recipe: SeqenRecipe<K, V, RK, RV>) {
    this.collection = collection;
    this.recipe = recipe;
  }

  source(): Collection<K, V> {
    return this.collection;
  }

  result(): Seq<RK, RV> {
    return this.recipe(this.collection.toKeyedSeq());
  }
}
