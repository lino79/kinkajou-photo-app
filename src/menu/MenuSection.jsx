import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/menu/MenuSection.css';

export class MenuSection extends Kinkajou.Component {

	static get is() {
		return 'MenuSection';
	}

	render() {
		return (
			<div class={this.styleClass}>
				{this.children}
			</div>
		);
	}

}