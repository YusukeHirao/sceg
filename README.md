sceg
===

[![NPM version](https://badge.fury.io/js/sceg.svg)](http://badge.fury.io/js/sceg)

Styled content elements guide.

## Sample

[Element Guide (bootstrap sample)](https://yusukehirao.github.io/sceg/sample/)

## Usage

```sh
$ npm install -D sceg
```

```javascript
import * as sceg from 'sceg';

sceg.load().then((html) => {
  sceg.output(html, './sample/index.html');
});

sceg.load({
  layout: './default/layout/index.pug',
}).then((html) => {
  sceg.output(html, './sample/index-from-pug.html');
});

sceg.get().then((data) => {
  const json = JSON.stringify(data, null, 2);
  sceg.output(json, './sample/index.json');
});
```

## Plugins

- [gulp-sceg](https://github.com/YusukeHirao/gulp-sceg)

* * *

&copy;YusukeHirao([@cloud10designs](https://twitter.com/cloud10designs)), MIT license.
