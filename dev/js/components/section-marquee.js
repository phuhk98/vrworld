// Marquee.
class MarqueeHandler extends HTMLElement {
	constructor() {
		super();

		this.width = 0;
		this.marquee = this.querySelector( '.marquee-wrapper' );
		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );
		this.querySelectorAll( '[loading]' ).forEach(
			( item ) => {
				item.removeAttribute( 'loading' );
			}
		);
	}
	resizeHandler(){
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.marquee.classList.remove( 'marquee-animation' );
		let boxes = this.querySelectorAll( '.marquee-dup' );

		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let local_width = this.closest( '.marquee-section' ).offsetWidth,
			length      = local_width / this.marquee.offsetWidth,
			dup         = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.marquee.cloneNode( true );
			dup.classList.add( 'marquee-dup', 'marquee-animation' );
			this.prepend( dup );
		}

		this.marquee.classList.add( 'marquee-animation' );
	}
}
customElements.define( 'marquee-section', MarqueeHandler );

// Marquee vertical.
class MarqueeHandlerHeight extends HTMLElement {
	constructor() {
		super();

		this.height  = 0;
		this.marquee = this.querySelector( '.two-marquee .marquee-wrapper' );

		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );

		this.querySelectorAll( '[loading]' ).forEach( ( item ) => {
			item.removeAttribute( 'loading' );
		});
	}

	resizeHandler() {
		if (this.height === window.innerHeight) {
			return;
		}

		this.height = window.innerHeight;
		this.marquee.classList.remove( 'marquee-animation' );

		let boxes = this.querySelectorAll( '.marquee-dup' );
		if (boxes.length) {
			boxes.forEach( ( e ) => e.remove() );
		}

		let marqueeSection = this.closest( '.two-columns' );

		if ( ! marqueeSection ) {
			return;
		}

		let local_height = marqueeSection.offsetHeight,
			length       = local_height / this.marquee.offsetHeight,
			dup          = false;

		length = length === Infinity?5 : Math.ceil( length );

		for (let i = 0; i < length; i++) {
			dup = this.marquee.cloneNode( true );
			dup.classList.add( 'marquee-dup' );
			this.append( dup );
		}

		setTimeout(() => {
			this.querySelectorAll( '.marquee-dup, .marquee-wrapper' ).forEach(( item ) => {
				item.classList.add( 'marquee-animation' );
			});
		}, 50);
	}
}

customElements.define( 'marquee-vertical', MarqueeHandlerHeight );