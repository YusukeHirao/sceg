const sceg = require('../lib');

sceg.gen('./default/el/*').then((html) => {
	sceg.output(html, './sample/index.html');
});

sceg.gen('./default/el/*', { layout: './default/layout/index.pug' }).then((html) => {
	sceg.output(html, './sample/index-from-pug.html');
});

sceg.get('./default/el/*').then((data) => {
	const json = JSON.stringify(data, null, 2);
	sceg.output(json, './sample/index.json');
});
