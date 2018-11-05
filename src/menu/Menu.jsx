import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/menu/Menu.css';

export class Menu extends Kinkajou.Component {

	static get is() {
		return 'Menu';
	}

	render() {
		return (
			<menu class={this.styleClass}>
				{this.children}
			</menu>
		);
	}

	selectItem(item) {
		
		this.checkRendered();

		const currentSelected = this.element.querySelector('.selected');
		if (currentSelected) {
			if (item.element === currentSelected) {
				return;
			}
			const comp = Kinkajou.Component.from(currentSelected);
			if (comp) {
				comp.selected = false;
			}
		}

		item.selected = true;
	}

}