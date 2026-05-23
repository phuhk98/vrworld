class ScrollingHandler extends HTMLElement {
	constructor() {
		super();

		this.width     = 0;
		this.scrolling = this.querySelector( '.scrolling-inner' );

		window.addEventListener( 'DOMContentLoaded', this.handler.bind( this ) );
		window.addEventListener( 'resize', this.handler.bind( this ) );

		document.addEventListener( 'shopify:section:load', this.handler.bind( this ) );
		document.addEventListener( 'shopify:section:select', this.handler.bind( this ) );
		document.addEventListener( 'shopify:block:select', this.handler.bind( this ) );
		document.addEventListener( 'product-card-updated', this.handler.bind( this ) );
	}

	handler() {
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.scrolling.classList.remove( 'scrolling-animation' );
		let boxes = this.querySelectorAll( '.scrolling-dup' );
		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let localWidth = this.closest( '.scrolling-wrapper' ).offsetWidth,
			length     = localWidth / this.scrolling.offsetWidth,
			dup        = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.scrolling.cloneNode( true );
			dup.classList.add( 'scrolling-dup', 'scrolling-animation' );
			this.prepend( dup );
		}

		this.scrolling.classList.add( 'scrolling-animation' );
	}
}
customElements.define( 'scrolling-item', ScrollingHandler );