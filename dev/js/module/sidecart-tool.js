/**
 * Cart Side
 *
 * @package Dev
 */

'use strict';

class CartTool extends HTMLElement{
	constructor(){
		super(),
		this.querySelectorAll( ".cartTool-item" ).forEach(
			button => {
				button.addEventListener(
					"click",
					event => {
						const id = event.target.dataset.popup;
						document.getElementById( id ).classList.add( "open" ),
						document.querySelector( ".mini-cart-overlay" ).classList.add( "open" )

						// Save the element that opens the popup.
						this.lastFocusedElement = event.target;

						btyCartTrapFocus( document.getElementById( id ) );
					}
				)
			}
		)
	}
}

customElements.define( "cart-item-tool", CartTool );

class CartCancel extends HTMLElement{
	constructor(){
		super(),
		this.querySelector( "button" ).addEventListener(
			"click",
			event => {
				document.querySelector( ".popup-toolDown.open" ).classList.remove( "open" ),
				document.querySelector( ".mini-cart-overlay" ).classList.remove( "open" )

				// Refocus on the element that opened the popup.
				const lastFocusedElement = document.querySelector("cart-item-tool")?.lastFocusedElement;
				if ( lastFocusedElement ) {
					lastFocusedElement.focus();
				}
			}
		)
	}
}

customElements.define( "cart-cancel-popup", CartCancel );

class CartNote extends HTMLElement{
	constructor(){
		super(),
		this.querySelector( "[data-update-note]" ).addEventListener(
			"click",
			event => {
				this.val   = this.querySelector( ".text-area" ).value;
				const body = JSON.stringify( { note:this.val } );

				fetch(
					btyGlobals.cart_update_url,
					{...btyFetchConfig(), ...{ body } }
				).then(
					function( r ) {
						return r.json();
					}
				).catch(
					function( e ) {
						console.error( e );
					}
				).finally(
					function() {
						document.querySelector( ".mini-cart-body.open" ).classList.remove( "open" ),
						document.querySelector( ".mini-cart-overlay.open" ).classList.remove( "open" )
					}
				);
			}
		)
	}
}

customElements.define( "cart-note", CartNote );

class CouponCode extends HTMLElement{
	constructor(){
		super(),
		localStorage.getItem( "storedDiscount" ) && ( this.querySelector( 'input[name="discount"]' ).value = localStorage.getItem( "storedDiscount" ) ),
		this.querySelector( "[data-update-coupon]" ).addEventListener(
			"click",
			event => {
				this.val = this.querySelector('input[name="discount"]').value,
				localStorage.setItem( "storedDiscount", this.val ),
				fetch( `/discount/${this.val}` )
				.then(
					response=>response.text()
				).then(
					responseText => {}
				),

				document.querySelector( ".mini-cart-body.open" ).classList.remove( "open" ),
				document.querySelector( ".mini-cart-overlay.open" ).classList.remove( "open" )
			}
		)
	}
}

customElements.define( "coupon-code", CouponCode );

/**
 * Trap focus inside the opened cart modal
 */
function btyCartTrapFocus( modal ) {
	const focusableElements = modal.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);

	if ( focusableElements.length === 0 ) {
		return;
	}

	const firstElement = focusableElements[0];
	const lastElement  = focusableElements[focusableElements.length - 1];

	function handleKeydown(event) {
		if (event.key === "Tab") {
			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		}
	}

	modal.addEventListener( "keydown", handleKeydown );

	setTimeout(
		function () {
			firstElement.focus();
		},
		100
	);
}