/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { Collection, Seq } from 'immutable-sorted';

//
// Actions
//
declare type SeqenOperation =
  'FILTER' |
  'SORT' |
  'REDUCE';

declare type SeqenRecipe<K, V, RK, RV> = (Seq<K, V>) => Seq<RK, RV>;

declare class Seqen<K, V, RK, RV> {

  static (collection: Collection, recipe: SeqenRecipe<K, V, RK, RV>): Seqen<K, V, RK, RV>;

  source(): Collection<K, V>;
  result(): Seq<RK, RV>;
}
