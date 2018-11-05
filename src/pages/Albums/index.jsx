import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import { Album } from './Album';
import '@css/pages/Albums/index.css';

export class Albums extends Kinkajou.Component {

	static get is() {
		return 'page.Albums';
	}

	get title() {
		return this.getAsString('title', 'Albums');
	}

	get albums() {
		return this.getAsArray('albums');
	}

	set albums(value) {
		this.set('albums', value);
	}

	render() {
		
		const items = this.albums.map(album => {
			return <Album data={album} />;
		});

		return (
			<div class={this.styleClass}>
				<h1 class="Section">{this.title}</h1>
				{items}
			</div>
		);
	}

}