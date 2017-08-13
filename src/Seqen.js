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

  recipe: SeqenRecipe<K, V, RK, RV>;

  constructor(recipe: SeqenRecipe<K, V, RK, RV>) {
    this.recipe = recipe;
  }

  process(collection: Collection<K, V>, props?: SeqenProps): Seq<RK, RV> {
    return this.recipe(collection.toKeyedSeq(), props);
  }
}
