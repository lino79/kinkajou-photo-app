import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/pages/Albums/Photo.css';

export class Photo extends Kinkajou.Component {

	static get is() {
		return 'Photo';
	}

	get data() {
		return this.get('data');
	}

	get thumb() {
		return this.getAsString('data.thumbnailUrl');
	}

	get imageUrl() {
		return this.getAsString('data.imageUrl');
	}

	get author() {
		return 'by ' + this.getAsString('data.author');
	}

	constructor(attrs) {
		super(attrs);
		this._load = this.onload.bind(this);
	}

	onAttach() {
		this._img.addEventListener('load', this._load, false);
	}

	onDetach() {
		this._img.removeEventListener('load', this._load, false);
	}

	render() {
		return (
			<a class={this.styleClass} href={this.imageUrl} target="_blank">
				<img ref={x => this._img = x} src={this.thumb} style="visibility: hidden;" />
				<span class="author-bg"></span>
				<span class="author">{this.author}</span>
			</a>
		);
	}

	onload() {
		this._img.style.visibility = '';
	}

}