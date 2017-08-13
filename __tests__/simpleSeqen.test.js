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
import { Seq, Map } from 'immutable-sorted';

const cast = <T>(value: any): T => (value: T);
const cmp=<T>(a: T, b: T): number=>(a>cast(b)?1:a<cast(b)?-1:0);

test("simple seqen", function() {

  const recipe: SeqenRecipe<number, string, number, string> = (seq: Seq.Keyed<number, string>): Seq.Keyed<number, string> =>
    seq
    .filter((v: string, k: number) => (k % 2 == 1))
    .map((v: string): string => v.toLowerCase())
    .sort((a: string, b: string): number => cmp(a, b))

  const map: Map<number, string> = Map().withMutations((map: Map<number, string>): void => {
    map.set(1, "Peter");
    map.set(2, "Xavier");
    map.set(3, "Alex");
    map.set(4, "David");
    map.set(5, "John");
  });

  const seqen: Seqen<number, string, number, string> = new Seqen(recipe);

  const result1 = seqen.process(map).toIndexedSeq().toJS();

  expect(result1).toEqual(["alex", "john", "peter"]);

});
