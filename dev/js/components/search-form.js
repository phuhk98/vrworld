class SearchForm extends HTMLElement {
	constructor() {
		super();
		this.input        = this.querySelector('.quick-search-form input[type="search"]');
		this.searchButton = this.querySelector( '.quick-search-form .search-button' );
		this.resetButton  = this.querySelector('.quick-search-form .reset-button');

		if (this.input) {
			this.input.form.addEventListener( 'reset', this.onFormReset.bind( this ) );
			this.input.addEventListener(
				'input',
				this.debounce(
					(event) => {
						this.onChange(event);
					},
					300
				).bind( this )
			);
		}
	}

	toggleResetButton() {
		const resetIsHidden = this.resetButton.classList.contains( 'hidden' );
		if ( this.input.value.length > 0 && resetIsHidden ) {
			this.searchButton.classList.add( 'hidden' );
			this.resetButton.classList.remove( 'hidden' );
		} else if ( this.input.value.length === 0 && !resetIsHidden ) {
			this.searchButton.classList.remove( 'hidden' );
			this.resetButton.classList.add( 'hidden' );
		}
	}

	onChange() {
		this.toggleResetButton();
	}

	shouldResetForm() {
		return !document.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		// Prevent default so the form reset doesn't set the value gotten from the url on page load
		event.preventDefault();
		// Don't reset if the user has selected an element on the predictive search dropdown
		if ( this.shouldResetForm() ) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
		}
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout( t );
			t = setTimeout( () => fn.apply( this, args ), wait );
		};
	}
}

customElements.define('search-form', SearchForm);
