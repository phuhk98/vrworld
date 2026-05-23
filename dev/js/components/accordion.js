// Animation for accordion.
class btyAccordion {
	constructor( el, toggle = 'summary', view = '.details-content' ) {
		const accordion = this;

		accordion.el      = el;
		accordion.summary = el.querySelector( toggle );
		accordion.content = el.querySelector( view );

		accordion.animation   = null;
		accordion.isClosing   = false;
		accordion.isExpanding = false;

		if ( ! accordion.content ) {
			return;
		}

		accordion.summary.addEventListener(
			'click',
			function( e ) {
				accordion.onClick( e );
			}
		);
	}

	onClick(e) {
		e.preventDefault();
		const accordion = this;

		accordion.el.style.overflow = 'hidden';

		let aria = accordion.summary.getAttribute( 'aria-expanded' );

		if ( accordion.isClosing || ! accordion.el.open ) {
			accordion.open();

			if ( aria ) {
				accordion.summary.setAttribute( 'aria-expanded', 'true' );
			}
		} else if ( accordion.isExpanding || accordion.el.open ) {
			accordion.shrink();

			if ( aria ) {
				accordion.summary.setAttribute( 'aria-expanded', 'false' );
			}
		}
	}

	shrink() {
		const accordion = this;

		accordion.isClosing = true;

		let startHeight = accordion.el.offsetHeight + 'px',
			endHeight   = accordion.summary.offsetHeight + 'px';

		if ( accordion.animation ) {
			accordion.animation.cancel();
		}

		accordion.animation = accordion.el.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 200,
				easing: 'ease-out'
			}
		);

		accordion.animation.onfinish = function() {
			accordion.onAnimationFinish( false );
		}

		accordion.animation.oncancel = function() {
			accordion.isClosing = false;
		}
	}

	open() {
		const accordion = this;

		accordion.el.style.height = accordion.el.offsetHeight + 'px';
		accordion.el.open         = true;

		window.requestAnimationFrame(
			function() {
				accordion.expand();
			}
		);
	}

	expand() {
		const accordion = this;

		accordion.isExpanding = true;

		let startHeight = accordion.el.offsetHeight + 'px',
			endHeight   = ( accordion.summary.offsetHeight + accordion.content.offsetHeight ) + 'px';

		if (accordion.animation) {
			accordion.animation.cancel();
		}

		accordion.animation = accordion.el.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 200,
				easing: 'ease-out'
			}
		);

		accordion.animation.onfinish = function() {
			accordion.onAnimationFinish( true );
		}

		accordion.animation.oncancel = function() {
			accordion.isExpanding = false;
		}
	}

	onAnimationFinish(open) {
		const accordion = this;

		accordion.el.open     = open;
		accordion.animation   = null;
		accordion.isClosing   = false;
		accordion.isExpanding = false;

		accordion.el.removeAttribute( 'style' );
	}
}

function btyAccordionHandle( doc = document ) {
	let details = doc.querySelectorAll( 'details' );
	if ( ! details.length ) {
		return;
	}

	details.forEach(
		function( el ) {
			// No apply effect for motion reduce node.
			if ( el.hasAttribute( 'data-motion-reduce' ) ) {
				return;
			}

			new btyAccordion( el );
		}
	);
}

// Accordion hover.
function btyAccordionHover( doc = document ) {
	let menus = doc.querySelectorAll( '.menu-map.faq-accordion' );

	if ( ! menus.length ) {
		return;
	}

	menus.forEach(
		function( el ) {
			let section   = el.closest( '.shopify-section' ),
				id        = el.getAttribute( 'data-id' ),
				container = section ? section.querySelectorAll( '.content-map[data-id="' + id + '"]' ) : [];

			el.addEventListener(
				'mouseenter',
				function() {
					if ( window.matchMedia( '(max-width: 991px)' ).matches || window.matchMedia( '(hover: none)' ).matches ) {
						return;
					}

					if ( container.length ) {
						container.forEach(
							function( con ) {
								let sibs = btySiblings( con );
								if ( sibs.length ) {
									sibs.forEach(
										function( sib ) {
											sib.classList.remove( 'active' );
										}
									);
								}

								con.classList.add( 'active' );
							}
						);
					}
				}
			);
		}
	);
}

// Footer accordion.
function btyFooterAccordion( doc = document ) {
	let headings = doc.querySelectorAll( '.ft-block-heading' );
	if ( ! headings.length ) {
		return;
	}

	headings.forEach(
		function ( el ) {
			let block = el.parentNode.querySelector( '.ft-block-content' );
			if ( ! block ) {
				return;
			}

			if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
				el.parentNode.classList.remove( 'open' );
				block.removeAttribute( 'style' );

				return;
			}

			el.onclick = function () {
				if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
					return;
				}

				if ( 'none' === window.getComputedStyle( block ).display ) {
					btySlideDown( block );
					el.parentNode.classList.add( 'open' );
				} else {
					btySlideUp( block );
					el.parentNode.classList.remove( 'open' );
				}
			}
		}
	);
}

// Add class to style footer menu css.
function btyAddElementClass() {
	let elements = document.querySelectorAll('.ft-block-item.ft-block-menu');

	if ( !elements.length ) {
		return;
	}

	let lastElement = elements[elements.length - 1];

	elements[0].classList.add('first', 'open');
	lastElement.classList.add('last');

	if (elements.length === 1) {
		elements[0].classList.remove('first', 'last');
		elements[0].classList.add('has-radius');
	}
}
