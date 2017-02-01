import compile from './fn/compile';
import { optimize, output, render, sceg } from './sceg';

const load = sceg;

export {
	load,
	compile,
	optimize,
	render,
	output,
};
