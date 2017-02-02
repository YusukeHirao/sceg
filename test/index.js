const sceg = require('../lib');

sceg.load().then((html) => {
	sceg.output(html, './sample/index.html');
});

sceg.load({ layout: './default/layout/index.pug' }).then((html) => {
	sceg.output(html, './sample/index-from-pug.html');
});

sceg.get().then((data) => {
	const json = JSON.stringify(data, null, 2);
	sceg.output(json, './sample/index.json');
});
