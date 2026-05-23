// Update Progress Bar Cart.
function btyUpdateProgressBarCart( cartTotal, itemCount  ) {
	const progressWrapper = document.getElementById( 'cart-progress-wrapper' );

	if ( ! progressWrapper ) {
		return;
	}

	const moneyFormat            = progressWrapper.dataset.moneyFormat;
	const preGoalMessageTemplate = progressWrapper.dataset.preGoalMessageTemplate;
	const postGoalMessage        = progressWrapper.dataset.postGoalMessage;

	const progressBar        = document.getElementById( 'cart-progress-bar' );
	const goalMessageElement = document.querySelector( '.goal-message' );

	let progressThreshold = Math.round(progressWrapper.dataset.threshold * (Shopify.currency.rate || 1));

	if ( ! moneyFormat || ! progressThreshold || ! preGoalMessageTemplate || ! postGoalMessage || ! progressBar || ! goalMessageElement ) {
		return;
	}

	if ( itemCount === 0 || cartTotal === 0 ) {
		if ( progressWrapper ) {
			progressWrapper.style.display = 'none';
		}
		if ( goalMessageElement ) {
			goalMessageElement.style.display = 'none';
		}
	} else {
		if ( progressWrapper ) {
			progressWrapper.style.display = 'block';
			progressWrapper.setAttribute( 'data-threshold-selected-currency', progressThreshold );
		}

		if ( progressBar ) {
			progressBar.style.display = 'block';

			let progressPercentage = null;

			// console.log( cartTotal );

			if ( cartTotal ) {
				progressPercentage = Math.min( ( cartTotal / progressThreshold ) * 100, 100 );
			} else {
				let sideCartPrice = document.querySelector( '.side-cart-footer .total-price' );
				if ( sideCartPrice ) {
					let total_price_str    = sideCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						progressPercentage = Math.min( ( total_price_number * 100 / progressThreshold ) * 100, 100 );
					} else {
						progressPercentage = Math.min( ( total_price_number / progressThreshold ) * 100, 100 );
					}
				}

				let mainCartPrice = document.querySelector( '.cart-page-section .cart-totals .totals-price' );
				if ( mainCartPrice ) {
					let total_price_str    = mainCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						progressPercentage = Math.min( ( total_price_number * 100 / progressThreshold ) * 100, 100 );
					} else {
						progressPercentage = Math.min( ( total_price_number / progressThreshold ) * 100, 100 );
					}
				}
			}

			progressBar.style.width = `${progressPercentage}%`;

			if ( progressPercentage >= 100 ) {
				progressWrapper.classList.add( 'full' );
			} else {
				progressWrapper.classList.remove( 'full' );
			}
		}

		if ( goalMessageElement ) {
			goalMessageElement.style.display = 'block';

			let remainingForGoal = null;

			if ( cartTotal ) {
				remainingForGoal = progressThreshold - cartTotal;
			} else {
				let sideCartPrice = document.querySelector( '.side-cart-footer .total-price' );
				if ( sideCartPrice ) {
					let total_price_str    = sideCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						remainingForGoal = progressThreshold - Math.min( total_price_number * 100 );
					} else {
						remainingForGoal = progressThreshold - total_price_number;
					}
				}

				let mainCartPrice = document.querySelector( '.cart-page-section .cart-totals .totals-price' );
				if ( mainCartPrice ) {
					let total_price_str    = mainCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						remainingForGoal = progressThreshold - Math.min( total_price_number * 100 );
					} else {
						remainingForGoal = progressThreshold - total_price_number;
					}
				}
			}

			if ( remainingForGoal < 0 ) {
				remainingForGoal = 0;
			}

			let remainingAmount = remainingForGoal;

			let remainingAmountFormatted = btyFormatPrice(remainingAmount);

			const preGoalMessage = preGoalMessageTemplate.replace( '[remainingForGoalFormatted]', remainingAmountFormatted );

			goalMessageElement.innerHTML = remainingForGoal > 0 ? preGoalMessage : postGoalMessage;
		}
	}
}

// Minicart recommendations.
function btyMinicartRecommendations( doc = document ) {
	let selector = doc.querySelector( '.minicart-recommendations[data-source]' );
	if ( ! selector ) {
		return;
	}

	let url = selector.getAttribute( 'data-url' );

	if ( selector.innerHTML.trim() || ! url ) {
		return;
	}

	fetch( url )
		.then(
			function( r ) {
				if ( 200 !== r.status ) {
					console.log( 'Status Code: ' + r.status );
					throw r;
				}

				return r.text();
			}
		).then(
			function( res ) {
				selector.innerHTML = btyGetSectionHtml( res, '.minicart-recommendations[data-source]' );

				btyAddToCart( selector );
				btyQuickView( selector );
				btySwatch( selector );
				btyAnimationImageLoad( selector );
				btyHoverMediaVideo( selector );
				btyQuickAdd( selector );
				btyScrollAnimationTrigger( selector );

				// Fire when product card updated.
				document.dispatchEvent( new CustomEvent( 'product-card-updated' ) );
			}
		).catch(
			function( err ) {
				console.log( err );
			}
		);
}

// Side cart click outer popup.
function btySideCartPopupOuter( doc = document ) {
	let selector = doc.querySelector( '.side-cart-inner' ),
		overlay  = selector ? selector.querySelector( '.mini-cart-overlay' ) : false,
		popup    = selector ? selector.querySelectorAll( '.popup-toolDown' ) : false;

	if ( ! popup.length || ! overlay) {
		return;
	}

	popup.forEach(
		function( el ) {
			selector.addEventListener(
				'mousedown',
				function( e ) {
					if ( ! el.contains( e.target ) ) {
						if ( el.classList.contains( 'open' ) && overlay.classList.contains( 'open' ) ) {
							el.classList.remove( "open" );
							overlay.classList.remove( "open" );
						}
					}
				}
			);
		}
	);
}

// Cart checkbox agree to terms.
function btyAgreeToTerms( doc = document ) {
	let selector = document.querySelectorAll( '.agree-to-terms' );

	if ( ! selector.length ) {
		return;
	}

	selector.forEach(
		function( el ) {
			let agreeCheckbox = el.querySelector( '#agree' );
			let checkoutButton = el.parentNode.querySelector( 'button[name="checkout"]' );

			if ( ! agreeCheckbox || ! checkoutButton ) {
				return;
			}

			// Disable the checkout button initially
			checkoutButton.disabled = true;

			agreeCheckbox.addEventListener('change', function() {
				checkoutButton.disabled = !this.checked;
			});
		}
	);
}

// Side cart update product item when apply discount.
function btyUpdateDiscountSideCartItem( doc = document ) {
	let item = doc.querySelectorAll( '.side-cart .product-item[data-id]' );
	if ( ! item.length ) {
		return;
	}

	// Register dom html need an update when the response available.
	let modules = [
		{
			node: '.side-cart .cart-items',
			section: 'side-cart',
			selector: '.side-cart .cart-items'
		},
		{
			node: '.side-cart .sub-total',
			section: 'side-cart',
			selector: '.side-cart .sub-total'
		}
	];

	item.forEach(
		function( el ) {
			let id = el.getAttribute( 'data-id' );

			if ( ! id ) {
				return;
			}

			let discountApplyButton = el.closest( '.side-cart' ).querySelector( '.side-cart-footer [data-update-coupon]' );

			if ( ! discountApplyButton ) {
				return;
			}

			discountApplyButton.onclick = function() {
				let inputs  = el.querySelectorAll( '.quantity-input' );

				if ( inputs.length ) {
					inputs.forEach(
						function( input ) {
							let data;

							data = {
								id: id,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							setTimeout(() => {
								btyFetchCart( data, modules, el );
							}, "500");
						}
					);
				}
			}
		}
	);
}