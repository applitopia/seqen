/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { Collection, Seq, SortedMap } from 'immutable-sorted';

//
// Actions
//
declare type SeqenOpType =
  'FILTER' |
  'MAP' |
  'MAP_KEYS' |
  'SORTED_MAP' |
  'REDUCE';


declare type SeqenProps = {[string]: mixed};
declare type SeqenRecipe<K, V, RK, RV> = (seq: Seq<K, V>, props?: SeqenProps) => SortedMap<RK, RV>;

declare class SeqenParser<K, V, RK, RV> {
  static (recipe: SeqenRecipe<K, V, RK, RV>): SeqenParser<K, V, RK, RV>;
  filter(predicate: (value: V, key: K, iter: this) => boolean, context?: mixed): this;
  map(
    mapper: (value: V, key: K, iter: this) => RV,
    context?: any
    ): Collection<K, RV>;
  mapKeys(
    mapper: (key: K, value: RV, iter: this) => RK,
    context?: any
    ): Collection<RK, RV>;
  toSortedMap(comparator?: (valueA: RK, valueB: RK) => number): SortedMap<RK, RV>;
}

declare class Seqen<K, V, RK, RV> {

  static (recipe: SeqenRecipe<K, V, RK, RV>): Seqen<K, V, RK, RV>;

  process(collection: Collection<K, V>, props?: SeqenProps): SortedMap<RK, RV>;

  insert(sortedMap: SortedMap<RK, RV>, k: K, v: V, props?: SeqenProps): SortedMap<RK, RV>;
  insertSeq(sortedMap: SortedMap<RK, RV>, seq: Seq<K, V>, props?: SeqenProps): SortedMap<RK, RV>;
  delete(sortedMap: SortedMap<RK, RV>, k: K, v: V, props?: SeqenProps): SortedMap<RK, RV>;
  deleteSeq(sortedMap: SortedMap<RK, RV>, seq: Seq<K, V>, props?: SeqenProps): SortedMap<RK, RV>;
}
