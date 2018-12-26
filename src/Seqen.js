/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { Seq, SortedMap } from 'immutable-sorted';

export default class Seqen<K, V, RK, RV> {

  recipe: SeqenRecipe<K, V, RK, RV>;

  constructor(recipe: SeqenRecipe<K, V, RK, RV>) {
    this.recipe = recipe;
  }

  process(collection: Collection<K, V>, props?: SeqenProps): SortedMap<RK, RV> {
    return this.recipe(collection.toKeyedSeq(), props);
  }

  insert(sortedMap: SortedMap<RK, RV>, k: K, v: V, props?: SeqenProps): SortedMap<RK, RV> {
    const seq = Seq.Keyed([[k, v]])

    return this.insertSeq(sortedMap, seq, props)
  }

  insertSeq(sortedMap: SortedMap<RK, RV>, seq: Seq<K, V>, props?: SeqenProps): SortedMap<RK, RV> {
    const seq2 = this.process(seq, props)

    return sortedMap.withMutations((mutable: SortedMap<RK, RV>) => 
      seq2.forEach((v: RV, k: RK) => mutable.set(k, v))
    )
  }

  delete(sortedMap: SortedMap<RK, RV>, k: K, v: V, props?: SeqenProps): SortedMap<RK, RV> {
    const seq = Seq.Keyed([[k, v]])

    return this.deleteSeq(sortedMap, seq, props)
  }

  deleteSeq(sortedMap: SortedMap<RK, RV>, seq: Seq<K, V>, props?: SeqenProps): SortedMap<RK, RV> {
    const seq2 = this.process(seq, props)

    return sortedMap.withMutations((mutable: SortedMap<RK, RV>) => 
      seq2.forEach((v: RV, k: RK) => mutable.delete(k))
    )
  }
}
