import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/menu/MenuItem.css';

export class MenuItem extends Kinkajou.Component {

	static get is() {
		return 'MenuItem';
	}

	get type() {
		return this.getAsString('type');
	}

	get selected() {
		return this.getAsBoolean('selected');
	}

	set selected(selected) {
		this.set('selected', selected);
	}

	get styleProps() {
		return [this.selected ? 'selected' : ''];
	}

	get title() {
		return this.getAsString('title');
	}

	get data() {
		return this.get('data');
	}

	get onClick() {
		return this.getAsFunction('onClick');
	}

	initProps(attrs, i) {
		i(attrs, 'selected');
	}

	onPropChange(key) {
		if (this.rendered) {
			switch (key) {
				case 'selected':
					this.element.setAttribute('class', this.styleClass);
					break;
			}
		}
	}

	render() {
		return (
			<div class={this.styleClass} title={this.title} onclick={this.click.bind(this)}>
				{this.children}
			</div>
		);
	}

	click(/** @type {Event} */ e) {
		e.stopPropagation();
		const handler = this.onClick;
		if (handler) {
			handler(this);
		}
	}

}