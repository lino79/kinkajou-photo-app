import { Kinkajou } from '@kinkajou/kinkajou/Kinkajou';
import { Ajax } from '@kinkajou/ajax/Ajax';
import { LinearProgress } from '@kinkajou/linear-progress/LinearProgress';
import { Person as PersonIcon } from '@kinkajou/icons/svg/social/Person';
import { Home as HomeIcon } from '@kinkajou/icons/svg/action/Home';
import { AjaxRequest } from './AjaxRequest';
import { Locker } from './Locker';
import { AppLayout } from './AppLayout';
import { Logo } from './Logo';
import { Title } from './Title';
import { MenuButton } from './MenuButton';
import { Menu } from './menu/Menu';
import { MenuSection } from './menu/MenuSection';
import { MenuItem } from './menu/MenuItem';
import { Toast } from './Toast';
import { Home } from './pages/Home';
import '@css/App.css';

const xhr = new AjaxRequest();

function _load(app, url, onsuccess) {
	const lockKey = 'App::' + url;
	if (!Locker.isLockedBy(lockKey)) {
		Locker.lock(lockKey);
		Ajax.create('GET', url, xhr)
			.setOnSuccess(ajax => onsuccess(ajax.jsonResponse))
			.setOnError(app._ajaxErrorHandler())
			.setFinally(() => Locker.unlock(lockKey))
			.send();
	}
}

function _importPage(app, url, callback) {
	require([url], callback, app._pageImportErrorHandler);
}

class App extends Kinkajou.Component {

	static get is() {
		return 'App';
	}

	get workspaceElement() {
		return this._layout && this._layout.rendered ? this._layout.workspace : null;
	}

	set title(value) {
		if (this._title) this._title.section = value;
	}

	set loading(value) {
		if (this._progBar) this._progBar.visible = value;
	}

	loadUsers() {
		_load(this, '/users', users => {
			const userItems = this.$.toArray(users).map(user => {
				const label = this.$.getAsString('name', user, '(undefined)');
				return (
					<MenuItem type="user" title={label} data={user} onClick={this.navigate.bind(this)}>
						<PersonIcon class="icon" />
						{label}
					</MenuItem>
				);
			}, this);
			Kinkajou.render(<div>{userItems}</div>, this._users);
		});
	}

	onAttach() {
		Locker.callback = () => this.loading = Locker.locked;
		this.loadUsers();
	}

	render() {
		const toggleDrawer = () => this._layout.toggleDrawer();
		return (
			<div class={this.styleClass}>
				<AppLayout ref={x => this._layout = x}>
					<LinearProgress ref={x => this._progBar = x} slot="header" visible="false" class="progressBar" />
					<MenuButton slot="header" onClick={toggleDrawer} />
					<Logo size="48" slot="header" />
					<Title ref={x => this._title = x} slot="header" section="Home" />
					<Menu ref={x => this._menu = x} slot="drawer">
						<MenuSection>Home</MenuSection>
						<MenuItem type="home" selected="true" onClick={this.navigate.bind(this)}>
							<HomeIcon class="icon" />
							Home
						</MenuItem>
						<MenuSection>Users</MenuSection>
						<div ref={x => this._users = x}></div>
					</Menu>
					<Home slot="workspace" />
				</AppLayout>
				<Toast ref={x => this._toast = x} />
			</div>
		);
	}

	_ajaxErrorHandler() {
		return ajax => {
			try {
				console.error(ajax.error);
				if (this._toast) {
					this._toast.show('Error getting remota data.');
				}
			} catch (_) {
				// Ignored
			}
		};
	}

	_pageImportErrorHandler(url) {
		return error => {
			try {
				console.error(error);
				if (this._toast) {
					this._toast.show('Error importing page.');
				}
			} catch (_) {
				// Ignored
			}
		};
	}

	navigate(menuItem) {
		
		if (this._layout) {
			this._layout.closeDrawer();
		}
		
		if (this._menu) {
			this._menu.selectItem(menuItem);
		}

		const workspace = this.workspaceElement;
		if (workspace) {
			if (menuItem.type === 'user') {
				const userId = this.$.getAsFloat('data.id', menuItem, 0, 0);
				const userName = this.$.getAsString('data.name', menuItem);
				const title = this.title = userName + '\'s albums';
				_importPage(this, '@demo/pages/Albums/index', ctx => {
					_load(this, `/albums?userId=${userId}`, json => {
						const Albums = ctx.Albums;
						const jsonArray = this.$.toArray(json);
						Kinkajou.render(<Albums title={title} albums={jsonArray} />, workspace);
					});
				});
			} else if (menuItem.type === 'home') {
				this.title = 'Home';
				Kinkajou.render(<Home />, workspace);
			}
		}
	}

}

Kinkajou.render(<App />, document.querySelector('body'));