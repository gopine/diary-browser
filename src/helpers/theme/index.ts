export enum Theme {
	Dark = 'dark',
	Light = 'light',
}

function getSystemTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? Theme.Dark
		: Theme.Light;
}

function setTheme(themeName: Theme) {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
}

function getTheme(): Theme | null {
	return localStorage.getItem('theme') as Theme | null;
}

function isLightTheme(): boolean {
	return getTheme() === Theme.Light;
}

function isDarkTheme(): boolean {
	return getTheme() === Theme.Dark;
}

function keepTheme() {
	if (getTheme()) {
		if (isDarkTheme()) {
			setTheme(Theme.Dark);
		} else if (isLightTheme()) {
			setTheme(Theme.Light);
		}
	} else {
		document.documentElement.className = getSystemTheme();
	}
}

function removeTheme() {
	localStorage.removeItem('theme');
}

function switchTheme() {
	if (isDarkTheme()) {
		setTheme(Theme.Light);
	} else {
		setTheme(Theme.Dark);
	}
}

export {
	setTheme,
	keepTheme,
	getTheme,
	isLightTheme,
	isDarkTheme,
	removeTheme,
	switchTheme,
};
