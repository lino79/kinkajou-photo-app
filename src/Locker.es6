import { Tools as $ } from '@kinkajou/tools/Tools';

const LOCKERS = [];
let __callback__;

function notifyChange() {
	if (__callback__) {
		__callback__();
	}
}

export class Locker {

	static set callback(callback) {
		$.assertIsFunction(callback, 'callback');
		__callback__ = callback;
	}

	static get locked() {
		return LOCKERS.length > 0;
	}

	static isLockedBy(locker) {
		return LOCKERS.indexOf(locker) >= 0;
	}

	static lock(locker) {
		if (!Locker.isLockedBy(locker)) {
			LOCKERS.push(locker);
			notifyChange();
		}
	}

	static unlock(locker) {
		const i = LOCKERS.indexOf(locker);
		if (i >= 0) {
			LOCKERS.splice(i, 1);
			notifyChange();
		}
	}

}