const sceg = require('../lib');

sceg.load().then((html) => {
	sceg.output(html, './sample/index.html');
});
