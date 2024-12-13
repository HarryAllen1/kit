import { getContext } from 'svelte';

function context() {
	return getContext('__request__');
}

/** @param {string} name */
function context_dev(name) {
	try {
		return context();
	} catch {
		throw new Error(
			`Cannot retrieve '${name}' on the server outside of a Svelte component, as it is bound to the current request via component context. This prevents state from leaking between users.` +
				'For more information, see https://svelte.dev/docs/kit/state-management#avoid-shared-state-on-the-server'
		);
	}
}

// TODO we're using DEV in some places and __SVELTEKIT_DEV__ in others - why? Can we consolidate?
export const page = {
	get data() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.data') : context()).page.data;
	},
	get error() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.error') : context()).page.error;
	},
	get form() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.form') : context()).page.form;
	},
	get params() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.params') : context()).page.params;
	},
	get route() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.route') : context()).page.route;
	},
	get state() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.state') : context()).page.state;
	},
	get status() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.status') : context()).page.status;
	},
	get url() {
		return (__SVELTEKIT_DEV__ ? context_dev('page.url') : context()).page.url;
	}
};

export const navigating = {
	get current() {
		return (__SVELTEKIT_DEV__ ? context_dev('navigating.current') : context()).navigating;
	}
};

export const updated = {
	get current() {
		return false;
	},
	check: () => {
		throw new Error('Can only call updated.check() in the browser');
	}
};
