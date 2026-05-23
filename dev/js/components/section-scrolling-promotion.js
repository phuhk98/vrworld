// Marquee.
class ScrollingTextHandler extends HTMLElement {
	constructor() {
		super();

		this.width = 0;
		this.scrolling = this.querySelector( '.scrolling-wrapper' );
		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );
		this.querySelectorAll( '[loading]' ).forEach(
			( item ) => {
				item.removeAttribute( 'loading' );
			}
		);
	}

	connectedCallback() {
		this.width   = 0;
		this.wrapper = this.parentNode;
		this.item    = this.querySelector( '.scrolling-animation' );

		window.addEventListener( 'DOMContentLoaded', this.resizeHandler.bind( this ) );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ) );

		document.addEventListener( 'shopify:section:load', this.resizeHandler.bind( this ) );
		document.addEventListener( 'shopify:section:select', this.resizeHandler.bind( this ) );
		document.addEventListener( 'shopify:block:select', this.resizeHandler.bind( this ) );
	}

	resizeHandler(){
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.scrolling.classList.remove( 'scrolling-animation' );
		let boxes = this.querySelectorAll( '.scrolling-dup' );

		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let local_width = this.offsetWidth,
			length      = local_width / this.scrolling.offsetWidth,
			dup         = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.scrolling.cloneNode( true );
			dup.classList.add( 'scrolling-dup', 'scrolling-animation' );
			this.prepend( dup );
		}

		this.scrolling.classList.add( 'scrolling-animation' );
	}
}
customElements.define( 'scrolling-promotion-section', ScrollingTextHandler );