![seqen](http://applitopia.github.io/seqen/seqen.svg)

SEQEN
=====
[![ghit.me](https://ghit.me/badge.svg?repo=applitopia/seqen)](https://ghit.me/repo/applitopia/seqen)
[![npm version](https://badge.fury.io/js/seqen.svg)](https://badge.fury.io/js/seqen)
[![jest](https://img.shields.io/badge/tested_with-jest-brightgreen.svg)](https://facebook.github.io/jest/)
[![dependencies](https://img.shields.io/david/applitopia/seqen.svg)](https://david-dm.org/applitopia/seqen)
[![devDependencies](https://img.shields.io/david/dev/applitopia/seqen.svg)](https://david-dm.org/applitopia/seqen?type=dev)
[![Gitter](https://img.shields.io/gitter/room/applitopia/seqen.svg)](https://gitter.im/seqen/Lobby)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

High performance sequence engine in Javascript that optimizes execution of sequences in Immutable.js
and provides fast incremental processing of insert, update, and delete operations. Fully integrated with [DUXEN](https://applitopia.github.io/duxen).

See [http://applitopia.github.io/seqen](https://applitopia.github.io/seqen) for detailed documentation.

Installation
------------

```shell
npm install seqen
```

Example
------

```js
const cmp=(a,b)=>(a>b?1:a<b?-1:0)

const recipe = (seq) => seq
  .filter((v, k) => (k % 2 == 1))
  .map((v) => v.toLowerCase())
  .sort((a, b): number => cmp(a, b))

const map = Map().withMutations((map) => {
  map.set(1, "Peter");
  map.set(2, "Xavier");
  map.set(3, "Alex");
  map.set(4, "David");
  map.set(5, "John");
});

const seqen = new Seqen(map, recipe);

const result1 = seqen.result().toIndexedSeq().toJS();

expect(result1).toEqual(["alex", "john", "peter"]);
```

License
-------

MIT
