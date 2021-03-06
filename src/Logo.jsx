import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import { SvgIcon } from '@kinkajou/svg-icon/SvgIcon';
import '@css/Logo.css';

export class Logo extends SvgIcon {

	static get is() {
		return 'Logo';
	}

	get viewBox() {
		return 12.7;
	}

	renderSVG() {
		return (
			<g transform="translate(0 -284.3)">
				<path d="m16.172 180.2v-52.917h105.83v105.83h-105.83z" fill="#fcfcfc"/>
				<g transform="matrix(1 0 0 1 0 -.012395)">
					<path d="m6.3828 286.29 3.2808-1.9908 0.53212 6.7649z" fill="#8be34e"/>
					<path d="m4.0922 286.77 2.2906-0.475 4.4595 2.2323-4.2663 1.1516z" fill="#ff6500"/>
					<path d="m6.5759 289.68 4.2663-1.1516 1.8578 5.9574-2.2106 0.56834z" fill="#ffa900"/>
					<path d="m10.489 295.05 2.2106-0.56834-1.9219 2.4237-0.84777 0.0952z" fill="#8be34e"/>
					<path d="m9.9303 297-6.1452-2.2705 2.7908-5.0542 3.9135 5.3741z" fill="#ff6500"/>
					<path d="m3.7852 294.73 2.7908-5.0542-2.4837-2.9089-1.6543 3.7406z" fill="#ffa900"/>
					<path d="m2.7908 291.5 1.3014-4.7322-4.0922-0.29c0.28831 0.51884 2.7908 5.0222 2.7908 5.0222z" fill="#8be34e"/>
					<ellipse cx="7.8947" cy="291.22" rx="1.2475" ry="1.2441" fill="#8ed9ff"/>
					<ellipse cx="11.138" cy="290.19" rx="1.0871" ry="1.0841" fill="#8ed9ff"/>
					<ellipse cx="8.1156" cy="291.34" rx=".41701" ry=".41586" fill="#0d0d0d"/>
					<ellipse cx="11.339" cy="290.3" rx=".33682" ry=".33588" fill="#0d0d0d"/>
				</g>
			</g>
		);
	}

}