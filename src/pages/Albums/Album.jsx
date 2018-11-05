import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import { Locker } from '@demo/Locker';
import { Gallery } from '../../data/Gallery';
import { randomNumber } from '../../Utils';
import { version } from '../../Version';
import { Photo as PhotoIcon } from '@kinkajou/icons/svg/image/Photo';
import { PlayArrow as PlayArrowIcon } from '@kinkajou/icons/svg/av/PlayArrow';
import { Photo } from './Photo';
import '@css/pages/Albums/Album.css';

const V = version();

export class Album extends Kinkajou.Component {

	static get is() {
		return 'Album';
	}

	get data() {
		return this.get('data');
	}

	get id() {
		return this.getAsFloat('data.id');
	}

	get title() {
		return this.getAsString('data.title');
	}

	get loaded() {
		return this.getAsBoolean('loaded');
	}

	get expanded() {
		return this.getAsBoolean('expanded');
	}

	set expanded(value) {
		this.set('expanded', value);
	}

	get styleProps() {
		const props = [];
		props.push(this.expanded ? 'expanded' : 'collapsed');
		props.push(this.loaded ? 'loaded' : '');
		return props;
	}

	get head() {
		return this.element ? this.element.querySelector('.head') : null;
	}

	get body() {
		return this.element ? this.element.querySelector('.body') : null;
	}

	get loaded() {
		return this.$.getAsFloat('body.children.length', this) > 0;
	}

	constructor(attrs) {
		super(attrs);
		this._click = this.click.bind(this);
	}

	initProps(props, i) {
		i(props, 'expanded', 'loaded');
	}

	onAttach() {
		this.head.addEventListener('click', this._click, false);
	}

	onPropChange(key) {
		if (key === 'expanded' || key === 'loaded') {
			this.element.setAttribute('class', this.styleClass);
		}
	}

	onDetach() {
		this.head.removeEventListener('click', this._click, false);
	}

	render() {
		return (
			<div class={this.styleClass}>
				<div class="head">
					<PhotoIcon class="icon" />
					<span class="title">{this.title}</span>
					<PlayArrowIcon class="arrow" size="20" />
				</div>
				<div class="body"></div>
			</div>
		);
	}

	loadPhotos() {
		if (this.rendered && !Locker.locked) {
			try {
				
				Locker.lock(this);

				Kinkajou.clear(this.body);

				setTimeout(() => {
					try {
						const photos = [];
						const IMAGES = require.toUrl('@images').split('?')[0];
						const MAX_COUNT = randomNumber(3, 20);
						const version = V ? '?v=' + V : '';
						let index = randomNumber(0, Gallery.length);
						for (let i = 0; i < MAX_COUNT; i++, index++) {
							if (index >= Gallery.length) index = 0;
							const item = Gallery[index];
							photos.push({
								thumbnailUrl: `${IMAGES}/gallery/${item.id}.${item.format}${version}`,
								imageUrl: item.url,
								author: item.author,
							});
						}
						const components = photos.map(p => <Photo data={p} />);
						const newBody = (<div class="body">{components}</div>).render();
						const oldBody = this.body;
						this.element.replaceChild(newBody, oldBody);
						this.set('loaded', true);
					} finally {
						Locker.unlock(this);
					}
				}, 100 * randomNumber(1, 10));

			} catch(error) {
				Locker.unlock(this);
				throw error;
			}
		}

	}

	click(/** @type {Event} */ e) {

		e.stopPropagation();
		
		this.expanded = !this.expanded;
		
		if (!this.loaded) {
			setTimeout(() => this.loadPhotos(), 10);
		}
	}

}