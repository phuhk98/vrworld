class PredictiveSearch extends HTMLElement {
	constructor() {
		super();

		this.input                   = document.querySelector('.quick-search-form input[type="search"]');
		this.predictiveSearchResults = document.querySelector('#predictive-search');
		this.modalSearch             = document.querySelector('.quick-search-form .search-modal');
		this.searchButton            = document.querySelector('.quick-search-form .align-view-all');
		this.resetButton             = document.querySelector('.quick-search .reset-button');
		this.closeButton             = document.querySelector('.quick-search .close-search-button');
		this.container               = document.querySelector('.quick-search-container');

		if (!this.input || !this.predictiveSearchResults) {
			console.warn('[PredictiveSearch] Required DOM elements not found.');
			return;
		}

		this.input.addEventListener(
			'input',
			this.debounce((event) => {
				this.onChange(event);
				this.toggleResetButton();
			}, 300)
		);

		this.input.addEventListener('focus', (event) => this.onFocus(event));

		document.querySelector('.quick-search-form')?.addEventListener('reset', this.onFormReset.bind(this));

		if (this.resetButton) {
			this.resetButton.addEventListener('click', () => {
				this.input.value = '';
				this.input.dispatchEvent(new Event('input', { bubbles: true }));
				this.input.focus();
			});
		}

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => {
				document.documentElement.classList.remove('quick-search-open');
				document.querySelector('.quick-search')?.setAttribute('aria-hidden', 'true');
			});
		}

		window.addEventListener('resize', () => {
			if (this.hasAttribute('results')) {
				this.predictiveSearchResults.style.maxHeight = `${this.getResultsMaxHeight()}px`;
			}
		});

		document.addEventListener('mousedown', (event) => {
			const target = event.target;
			const isInside = target.closest('.quick-search-container');
			const isClose = target.closest('.close-search-button');

			if (!isInside && !isClose && this.hasAttribute('open')) {
				document.documentElement.classList.remove('quick-search-open');
				document.querySelector('.quick-search')?.setAttribute('aria-hidden', 'true');
				this.close();
			}
		});
	}

	getQuery() {
		return this.input.value.trim();
	}

	onFocus() {
		this.open();
	}

	onChange() {
		const searchTerm = this.getQuery();
		const defaultSearch = document.querySelector('.default-search');

		if (searchTerm.length > 0) {
			this.getSearchResults(searchTerm);
			if (defaultSearch) defaultSearch.classList.add('hidden');
		} else {
			this.close();
			if (defaultSearch) defaultSearch.classList.remove('hidden');
		}
	}

	getSearchResults(searchTerm) {
		fetch(`/search/suggest?q=${searchTerm}&resources[type]=query,product,collection,page,article&section_id=predictive-search`)
			.then((response) => {
				if (!response.ok) {
					this.close();
					throw new Error(response.status);
				}
				return response.text();
			})
			.then((text) => {
				const htmlDoc = new DOMParser().parseFromString(text, 'text/html');
				const section = htmlDoc.querySelector('#shopify-section-predictive-search');

				const resultsMarkup = section?.innerHTML;
				if (!resultsMarkup) return;

				this.predictiveSearchResults.innerHTML = '';
				this.predictiveSearchResults.insertAdjacentHTML('beforeend', resultsMarkup);

				// Re-initialize any dynamic JS components.
				btyAnimationImageLoad(this.predictiveSearchResults);
				btyQuickView(this.predictiveSearchResults);
				btyAddToCart(this.predictiveSearchResults);
				btyQuickAdd(this.predictiveSearchResults);
				btySwatch(this.predictiveSearchResults);
				btyHoverMediaVideo(this.predictiveSearchResults);

				this.open();
				document.dispatchEvent(new CustomEvent('product-card-updated'));
			})
			.catch((error) => {
				this.close();
				console.error('PredictiveSearch error:', error);
			});
	}

	getResultsMaxHeight() {
		const inputRect = this.input?.getBoundingClientRect();
		if (!inputRect) return 300;

		const offsetBottom = inputRect.bottom;
		let subtractHeight;

		if (window.innerWidth >= 768) {
			subtractHeight = 32 + 152;
		} else {
			subtractHeight = 32;
		}

		this.resultsMaxHeight = window.innerHeight - offsetBottom - subtractHeight;
		return this.resultsMaxHeight;
	}


	toggleResetButton() {
		const resetIsHidden = this.resetButton?.classList.contains('hidden');
		if (this.input.value.length > 0 && resetIsHidden) {
			this.searchButton?.classList.remove('hidden');
			this.resetButton?.classList.remove('hidden');
		} else if (this.input.value.length === 0 && !resetIsHidden) {
			this.searchButton?.classList.add('hidden');
			this.resetButton?.classList.add('hidden');
		}
	}

	shouldResetForm() {
		return !document.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		event.preventDefault();
		if (this.shouldResetForm()) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
			this.close();
		}
	}

	open() {
		this.setAttribute('results', true);
		this.setAttribute('open', true);
		this.input.setAttribute('aria-expanded', true);
		this.predictiveSearchResults.style.maxHeight = `${this.getResultsMaxHeight()}px`;
	}

	close() {
		this.removeAttribute('results');
		this.input.setAttribute('aria-expanded', false);
		this.resultsMaxHeight = false;
		this.predictiveSearchResults.removeAttribute('style');
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout(t);
			t = setTimeout(() => fn.apply(this, args), wait);
		};
	}
}

customElements.define('predictive-search', PredictiveSearch);

class MainSearch extends HTMLElement {
	constructor() {
		super();

		this.form = this.querySelector('.quick-search-form');
		this.input = this.querySelector('input[type="search"]');
		this.predictiveSearchResults = this.querySelector('#predictive-search');
		this.searchButton = this.querySelector('.align-view-all');
		this.resetButton = this.querySelector('.reset-button');
		this.closeButton = this.querySelector('.close-search-button');
		this.container = this;

		if (!this.input || !this.predictiveSearchResults) {
			console.warn('[MainSearch] Required DOM elements not found.');
			return;
		}

		this.initEvents();
	}

	initEvents() {
		this.input.addEventListener(
			'input',
			this.debounce((event) => {
				this.onChange(event);
				this.toggleResetButton();

				if (this.input.value.length > 0) {
					this.addBodyFocus();
				} else {
					this.removeBodyFocus();
				}
			}, 300)
		);

		this.input.addEventListener('focus', (event) => {
			this.addBodyFocus();
			this.onFocus(event);
		});

		this.form?.addEventListener('reset', this.onFormReset.bind(this));

		if (this.resetButton) {
			this.resetButton.addEventListener('click', () => {
				this.input.value = '';
				this.input.dispatchEvent(new Event('input', { bubbles: true }));
				this.input.focus();
			});
		}

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => {
				this.close();
			});
		}

		window.addEventListener('resize', () => {
			if (this.hasAttribute('results')) {
				this.predictiveSearchResults.style.maxHeight =
					`${this.getResultsMaxHeight()}px`;
			}
		});

		document.addEventListener('mousedown', (event) => {
			const target = event.target;
			const isInside = target.closest('main-search');
			const isClose = target.closest('.close-search-button');

			if (!isInside && !isClose && this.hasAttribute('open')) {
				this.close();
			}
		});
	}

	addBodyFocus() {
		document.body.classList.add('predictive-search--focus');
	}

	removeBodyFocus() {
		document.body.classList.remove('predictive-search--focus');
	}

	getQuery() {
		return this.input.value.trim();
	}

	onFocus() {
		this.open();
	}

	onChange() {
		const searchTerm = this.getQuery();
		const defaultSearch = this.querySelector('.default-search');

		if (searchTerm.length > 0) {
			this.getSearchResults(searchTerm);
			if (defaultSearch) defaultSearch.classList.add('hidden');
		} else {
			this.close();
			if (defaultSearch) defaultSearch.classList.remove('hidden');
		}
	}

	getSearchResults(searchTerm) {
		fetch(
			`/search/suggest?q=${searchTerm}&resources[type]=query,product,collection,page,article&section_id=predictive-search`
		)
			.then((response) => {
				if (!response.ok) {
					this.close();
					throw new Error(response.status);
				}
				return response.text();
			})
			.then((text) => {
				const htmlDoc = new DOMParser().parseFromString(text, 'text/html');
				const section = htmlDoc.querySelector(
					'#shopify-section-predictive-search'
				);

				const resultsMarkup = section?.innerHTML;
				if (!resultsMarkup) return;

				this.predictiveSearchResults.innerHTML = '';
				this.predictiveSearchResults.insertAdjacentHTML(
					'beforeend',
					resultsMarkup
				);

				// Re-initialize dynamic JS components.
				if (typeof btyAnimationImageLoad === 'function')
					btyAnimationImageLoad(this.predictiveSearchResults);

				if (typeof btyQuickView === 'function')
					btyQuickView(this.predictiveSearchResults);

				if (typeof btyAddToCart === 'function')
					btyAddToCart(this.predictiveSearchResults);

				if (typeof btyQuickAdd === 'function')
					btyQuickAdd(this.predictiveSearchResults);

				if (typeof btySwatch === 'function')
					btySwatch(this.predictiveSearchResults);

				if (typeof btyHoverMediaVideo === 'function')
					btyHoverMediaVideo(this.predictiveSearchResults);

				this.open();
				document.dispatchEvent(
					new CustomEvent('product-card-updated')
				);
			})
			.catch((error) => {
				this.close();
				console.error('MainSearch error:', error);
			});
	}

	getResultsMaxHeight() {
		const inputRect = this.input?.getBoundingClientRect();
		if (!inputRect) return 300;

		const offsetBottom = inputRect.bottom;

		let subtractHeight;

		if (window.innerWidth >= 768) {
			subtractHeight = 32 + 152;
		} else {
			subtractHeight = 32;
		}

		this.resultsMaxHeight =
			window.innerHeight - offsetBottom - subtractHeight;

		return this.resultsMaxHeight;
	}

	toggleResetButton() {
		const resetIsHidden =
			this.resetButton?.classList.contains('hidden');

		if (this.input.value.length > 0 && resetIsHidden) {
			this.searchButton?.classList.remove('hidden');
			this.resetButton?.classList.remove('hidden');
		} else if (
			this.input.value.length === 0 &&
			!resetIsHidden
		) {
			this.searchButton?.classList.add('hidden');
			this.resetButton?.classList.add('hidden');
		}
	}

	shouldResetForm() {
		return !this.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		event.preventDefault();
		if (this.shouldResetForm()) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
			this.close();
		}
	}

	open() {
		this.setAttribute('results', true);
		this.setAttribute('open', true);
		this.input.setAttribute('aria-expanded', true);
		this.predictiveSearchResults.style.maxHeight =
			`${this.getResultsMaxHeight()}px`;
	}

	close() {
		this.removeAttribute('results');
		this.removeAttribute('open');
		this.input.setAttribute('aria-expanded', false);
		this.resultsMaxHeight = false;
		this.predictiveSearchResults.removeAttribute('style');

		this.removeBodyFocus();
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout(t);
			t = setTimeout(() => fn.apply(this, args), wait);
		};
	}
}

customElements.define('main-search', MainSearch);