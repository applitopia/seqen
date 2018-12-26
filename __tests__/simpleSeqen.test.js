/**
 *  Copyright (c) 2017, Applitopia, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { Seqen } from '../src';
import { Seq, Map, SortedMap } from 'immutable-sorted';

const cast = <T>(value: any): T => (value: T);
const cmp=<T>(a: T, b: T): number=>(a>cast(b)?1:a<cast(b)?-1:0);

test("simple seqen", function() {

  const recipe: SeqenRecipe<number, string, string, string> = (seq: Seq.Keyed<number, string>): SortedMap<string, string> =>
    seq
    .filter((v: string, k: number) => (k % 2 == 1))
    .map((v: string): string => v.toLowerCase())
    .mapKeys((k: number, v: string) => v)
    .toSortedMap((a: string, b: string): number => cmp(a, b))

  const map: Map<number, string> = Map().withMutations((map: Map<number, string>): void => {
    map.set(1, "Peter");
    map.set(2, "Xavier");
    map.set(3, "Alex");
    map.set(4, "David");
    map.set(5, "John");
  });

  const seqen: Seqen<number, string, string, string> = new Seqen(recipe);

  const sortedMap = seqen.process(map);
  const result1 = sortedMap.toIndexedSeq().toJS();
  expect(result1).toEqual(["alex", "john", "peter"]);

  const sortedMap2 = seqen.insert(sortedMap, 7, "Mary");
  const result2 = sortedMap2.toIndexedSeq().toJS();
  expect(result2).toEqual(["alex", "john", "mary", "peter"]);

  const sortedMap3 = seqen.delete(sortedMap2, 3, "Alex");
  const result3 = sortedMap3.toIndexedSeq().toJS();
  expect(result3).toEqual(["john", "mary", "peter"]);
});
