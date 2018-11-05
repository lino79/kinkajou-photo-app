import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/Title.css';

export class Title extends Kinkajou.Component {

	static get is() {
		return 'Title';
	}

	get section() {
		return this.getAsString('section');
	}

	set section(section) {
		this.set('section', section);
	}

	get title() {
		let title = 'Kinkajou Demo';
		const section = this.section;
		if (section) {
			title += ' > ';
			title += section;
		}
		return title;
	}

	initProps(props, i) {
		i(props, 'section');
	}

	onPropChange() {
		this.element.innerHTML = this.title;
	}

	render() {
		return (
			<span class={this.styleClass}>
				{this.title}
			</span>
		);
	}

}