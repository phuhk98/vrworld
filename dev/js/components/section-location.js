class LoadMore extends HTMLElement {
	constructor() {
		super();
		this.items          = [...document.querySelectorAll( '.location-grid-section .column-item' )];
		this.loadMoreButton = document.querySelector( '.location-grid-section .load-more' );
		this.currentIndex   = 0;
		this.itemsPerLoad   = this.getItemsPerRow();
		this.handleResize   = this.handleResize.bind( this );
	}

	connectedCallback() {
		this.init();
		window.addEventListener( 'resize', this.handleResize );
	}

	disconnectedCallback() {
		window.removeEventListener( 'resize', this.handleResize );
	}

	getItemsPerRow() {
		return parseInt( document.querySelector( '.location-grid-section .multicolumn-inner' ).getAttribute( 'data-row' ), 10 );
	}

	init() {
		this.itemsPerLoad = this.getItemsPerRow();
		let initialLoad   = this.itemsPerLoad * 2;

		this.items.forEach(( item, index ) => {
			item.style.display = index < initialLoad ? 'block' : 'none';
		});

		this.currentIndex = initialLoad;
		this.updateButtonState();
		this.loadMoreButton.addEventListener( 'click', () => this.loadItems() );
	}

	loadItems() {
		let endIndex = this.currentIndex + this.itemsPerLoad;

		this.items.slice( this.currentIndex, endIndex ).forEach(item => {
			item.style.display = 'block';
		});

		this.currentIndex = endIndex;
		this.updateButtonState();
	}

	updateButtonState() {
		this.loadMoreButton.style.display = (this.currentIndex >= this.items.length) ? 'none' : 'block';
	}

	handleResize() {
		this.itemsPerLoad = this.getItemsPerRow();
	}
}

customElements.define( 'load-more', LoadMore );
document.addEventListener( 'DOMContentLoaded', () => {
    const checkGrid = setInterval(() => {
        if ( document.querySelector( '.location-grid-section .multicolumn-inner' ) ) {
            clearInterval( checkGrid );
            new LoadMore();
        }
    }, 100);
});
