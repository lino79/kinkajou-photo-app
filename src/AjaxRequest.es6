import { Tools as $ } from '@kinkajou/tools/Tools';
import { randomNumber as random } from './Utils';
import { Users } from './data/Users';
import { Albums } from './data/Albums';

function _getQueryParam(name, url) {
	const query = url.split('?')[1];
	if (!query) return undefined;
	const params = query.split('&');
	for (let i = 0; i < params.length; i++) {
		const couple = params[i];
		const keyval = couple.split('=');
		if (keyval[0] === name) {
			return keyval[1];
		}
	}
	return undefined;
}

export class AjaxRequest {
	
	constructor() {
		this._url = '';
		this._listeners = {};
		this.status = 0;
		this.responseText = '';
	}

	setRequestHeader() {}

	open() {
		this._url = arguments[1];
	}

	addEventListener(eventType, listener) {
		this._listeners[eventType] = listener;
	}

	removeEventListener(eventType, listener) {
		this._listeners[eventType] = listener;
	}

	send() {
		
		const wait = 100 * random(1, 10);
		setTimeout(() => {

			if (/\/users/.test(this._url)) {
				this.responseText = JSON.stringify(Users);
			} else if (/\/albums/.test(this._url)) {
				const userId = $.toInteger(_getQueryParam('userId', this._url), 0, 0);
				const albums = Albums.filter(x => x.userId === userId);
				this.responseText = JSON.stringify(albums);
			} else {
				this.status = 404;
			}

			this._listeners['loadend']();
			
		}, wait);
	}

}