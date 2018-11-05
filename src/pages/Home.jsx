import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import '@css/pages/Home.css';

export class Home extends Kinkajou.Component {

	static get is() {
		return 'page.Home';
	}

	render() {
		return (
			<div class={this.styleClass}>
				<h1 class="Section">Home</h1>
				A simple <a href="#">Kinkajou</a> photo gallery application.
			</div>
		);
	}

}