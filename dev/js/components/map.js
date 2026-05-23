class PopupHandler extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const dots      = this.querySelector( '.dot' );
		const itemInner = this.querySelector( '.item-inner' );
		const body      = document.body;

		if (!dots || !itemInner) return;

		dots.addEventListener('click', (e) => {
			e.stopPropagation();
			body.classList.add( 'popup-map' );
			itemInner.classList.add( 'show-inner' );
		});

		itemInner.addEventListener('click', (e) => {
			e.stopPropagation();
		});

		document.addEventListener('click', () => {
			body.classList.remove( 'popup-map' );
			itemInner.classList.remove( 'show-inner' );
		});
	}
}

customElements.define( 'popup-handler', PopupHandler );
