const meta = document.querySelector('head meta[name="version"]');

export function version() {
	return meta ? meta.getAttribute('content') : '';
}