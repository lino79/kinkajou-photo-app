import { Tools as $ } from '@kinkajou/tools/Tools';

export function randomNumber(min, max) {
	min = $.toInteger(min, 0, 0);
	max = $.toInteger(max, min, min);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
