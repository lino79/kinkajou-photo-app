import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/AppLayout.css';

export class AppLayout extends Kinkajou.Component {

	static get is() {
		return 'AppLayout';
	}

	get styleProps() {
		return [this.opened ? 'opened' : 'closed'];
	}

	get opened() {
		return this.getAsBoolean('opened');
	}

	set opened(value) {
		return this.set('opened', value);
	}

	initProps(props) {
		props.overlay = props.overlay;
		props.opened = props.opened;
	}

	render() {
		const filter = slot => this.children.filter(c => c.attrs.slot === slot);
		return (
			<div ref={e => this._root = e} class={this.styleClass}>
				<main ref={e => this.workspace = e} class="scroll">{filter('workspace')}</main>
				<div class="scrim"></div>
				<nav class="scroll">{filter('drawer')}</nav>
				<header>{filter('header')}</header>
			</div>
		);
	}

	onPropChange() {
		if (this._root)
			this._root.setAttribute('class', this.styleClass);
	}

	toggleDrawer() {
		this.opened = !this.opened;
	}

	closeDrawer() {
		this.opened = false;
	}

}