import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import { Menu as MenuIcon } from '@kinkajou/icons/svg/navigation/Menu';
import '@css/MenuButton.css';

export class MenuButton extends Kinkajou.Component {

	static get is() {
		return 'MenuButton';
	}

	get onClick() {
		return this.getAsFunction('onClick');
	}

	render() {
		return (
			<button class="MenuButton" style={this.style} onclick={this.onClick}>
				<MenuIcon size="32" />
			</button>
		);
	}

}