const sceg = require('../lib');

sceg.load().then((html) => {
	sceg.output(html, './sample/index.html');
});

sceg.load({ layout: './default/layout/index.pug' }).then((html) => {
	sceg.output(html, './sample/index-from-pug.html');
});
