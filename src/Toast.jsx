import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/Toast.css';

export class Toast extends Kinkajou.Component {

	static get is() {
		return 'Toast';
	}

	get styleProps() {
		return [this.visible ? 'visible' : 'hidden'];
	}

	get visible() {
		return this.getAsBoolean('visible');
	}

	set visible(visible) {
		this.set('visible', visible);
	}

	get message() {
		return this.getAsString('message');
	}

	set message(message) {
		this.set('message', message);
	}

	initProps(props, i) {
		i(props, 'visible', 'message');
	}

	onPropChange(key) {
		if (this.rendered) {
			switch (key) {
				case 'visible':
					this.element.setAttribute('class', this.styleClass);
					break;
				case 'message':
					this.element.innerHTML = this.message;
					break;
			}
		}
	}

	render() {
		return (
			<div class={this.styleClass}>
				{this.message}
			</div>
		);
	}

	show(message) {
		this.message = this.$.toString(message);
		this.visible = true;
		setTimeout(() => this.visible = false, 1000 * 3);
	}

}