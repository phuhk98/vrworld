/**
 * Product page
 *
 * @package Dev
 */

'use strict';

// Detect model exit.
function btyModelExit() {
	document.addEventListener(
		'click',
		function( e ) {
			let el   = e.target,
				node = document.querySelector( '.product-main-slide' ) ? '.product-main-slide' : '.single-media';

			if ( ! el.closest( node ) ) {
				btyMediaAction();
			}
		}
	);
}

// Product model html structure.
customElements.define(
	'product-model',
	class ProductModel extends HTMLElement {
		constructor() {
			super();

			const poster = this.querySelector( '[id^="deferred-poster-"]' );
			if ( ! poster ) {
				return;
			}

			poster.addEventListener( 'click', this.loadContent.bind( this ) );
		}

		loadContent() {
			if ( ! this.getAttribute( 'loaded' ) ) {
				const content = document.createElement( 'div' );

				content.appendChild( this.querySelector( 'template' ).content.firstElementChild.cloneNode( true ) );

				this.setAttribute( 'loaded', true );

				const deferredElement = this.appendChild( content.querySelector( 'model-viewer' ) );
			}

			Shopify.loadFeatures(
				[
					{
						name: 'model-viewer-ui',
						version: '1.0',
						onLoad: this.setupModelViewerUI.bind( this )
					}
				]
			);
		}

		setupModelViewerUI( errors ) {
			if ( errors ) {
				return;
			}

			this.modelViewerUI = new Shopify.ModelViewerUI( this.querySelector( 'model-viewer' ) );
		}
	}
);

// Product model setup.
window.ProductModel = {
	loadShopifyXR() {
		Shopify.loadFeatures(
			[
				{
					name: 'shopify-xr',
					version: '1.0',
					onLoad: this.setupShopifyXR.bind( this )
				}
			]
		);
	},
	setupShopifyXR( errors ) {
		if ( errors ) {
			return;
		}

		if ( ! window.ShopifyXR ) {
			document.addEventListener( 'shopify_xr_initialized', () => this.setupShopifyXR() );

			return;
		}

		document.querySelectorAll('[id^="ProductJSON-"]').forEach(
			( modelJSON ) => {
				window.ShopifyXR.addModels( JSON.parse( modelJSON.textContent ) );
				modelJSON.remove();
			}
		);

		window.ShopifyXR.setupXRElements();
	}
};

// Photoswipe handle.
function btyPhotoswipeHandle( doc = document ) {
	// parse slide data (url, title, dimension ...) from DOM elements (children of gallerySelector).
	let parseThumbnailElements = function ( el ) {

	let thumbElements = el.querySelectorAll( '.product-main-slide .media-preview-wrap' ),
		items         = [],
		wrapEl, dimension, item;

		if ( ! thumbElements.length ) {
			return;
		}

		for ( let i = 0, ij = thumbElements.length; i < ij; i++ ) {
			wrapEl = thumbElements[ i ];

			// include only element nodes.
			if ( 'BUTTON' !== wrapEl.tagName ) {
				continue;
			}

			dimension = wrapEl.getAttribute( 'data-dimension' );
			if ( ! dimension ) {
				continue;
			}

			dimension = dimension.split( 'x' );

			// create slide object.
			item = {
				src: wrapEl.getAttribute( 'data-zoom' ),
				w: parseInt( dimension[0], 10 ),
				h: parseInt( dimension[1], 10 ),
				index: i
			};

			if ( wrapEl.children.length > 0 ) {
				// <img> thumbnail element, retrieving thumbnail url.
				item.msrc = wrapEl.children[0].getAttribute( 'src' );
			}

			item.el = wrapEl; // save link to element for getThumbBoundsFn.
			items.push( item );
		}

		return items;
	};

	// find nearest parent element.
	let closest = function closest( el, fn ) {
		return el && ( fn( el )?el : closest( el.parentNode, fn ) );
	};

	// triggers when user clicks on thumbnail.
	let onThumbnailsClick = function ( e ) {
		e = e || window.event;
		e.preventDefault?e.preventDefault() : e.returnValue = false;

		let eTarget = e.target || e.srcElement;

		// find root element of slide.
		let clickedListItem = closest(
			eTarget,
			function ( el ) {
				return ( el.tagName && 'BUTTON' === el.tagName );
			}
		);

		if ( ! clickedListItem ) {
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute.
		let clickedGallery = clickedListItem.parentNode.parentNode,
			childNodes     = clickedGallery.childNodes,
			nodeIndex      = 0,
			index;

		for ( let i = 0, j = childNodes.length; i < j; i++ ) {
			if ( childNodes[ i ].nodeType !== 1 ) {
				continue;
			}

			if ( ! childNodes[ i ].querySelector( '[data-dimension]' ) ) {
				continue;
			}

			if ( childNodes[ i ] === clickedListItem.parentNode ) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}

		if ( index >= 0 ) {
			// open PhotoSwipe if valid index found.
			openPhotoSwipe( index, clickedGallery );
		}

		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2).
	let photoswipeParseHash = function () {
		let hash   = window.location.hash.substring( 1 ),
			params = {};

		if ( hash.length < 5 ) {
			return params;
		}

		let vars = hash.split( '&' );
		for ( let i = 0, ij = vars.length; i < ij; i++ ) {
			if ( ! vars[ i ] ) {
				continue;
			}
			let pair = vars[ i ].split( '=' );
			if ( pair.length < 2 ) {
				continue;
			}
			params[ pair[0] ] = pair[1];
		}

		if ( params.gid ) {
			params.gid = parseInt( params.gid, 10 );
		}

		return params;
	};

	// open photoswipe.
	let openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
		let pswpElement = doc.querySelector('.pswp');
		if (!pswpElement) return;

		let items = parseThumbnailElements(galleryElement);
		if (!items || !items.length) return;

		let mediaBox = galleryElement.closest('.product-media-box');
		if (mediaBox) {
			mediaBox.classList.add('has-lightbox');
		}

		let options = {
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			index: index,
			maxSpreadZoom: 2,
			getThumbBoundsFn: function (i) {
				let thumb = items[i].el.querySelector('img');
				if (!thumb) return { x: 0, y: 0, w: 0 };

				let rect = thumb.getBoundingClientRect();
				let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;

				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}
		};

		if (disableAnimation) {
			options.showAnimationDuration = 0;
		}

		let gallery = new PhotoSwipe(
			pswpElement,
			PhotoSwipeUI_Default,
			items,
			options
		);

		gallery.listen('close', function () {
			if (mediaBox) {
				mediaBox.classList.remove('has-lightbox');
			}
		});

		gallery.init();
	};

	// loop through all gallery elements and bind events.
	let galleryElements = doc.querySelectorAll( '.product-main-slide' );
	if ( galleryElements.length ) {
		for ( let i = 0, l = galleryElements.length; i < l; i++ ) {
			galleryElements[ i ].setAttribute( 'data-pswp-uid', i + 1 );
			galleryElements[ i ].onclick = onThumbnailsClick;
		};

		// Parse URL and open gallery if it contains #&pid=3&gid=1.
		let hashData = photoswipeParseHash();
		if ( hashData.pid && hashData.gid ) {
			openPhotoSwipe( hashData.pid, galleryElements[ hashData.gid - 1 ], true, true );
		};
	}
}

// Toggle modal.
function btyToggleModal( doc = document ) {
	let selectors = doc.querySelectorAll( '.modal-toggle-button' ),
		modal     = doc.querySelector( '.product-modal' ),
		close     = modal ? modal.querySelector( '.media-modal-toggle' ) : false;
	if ( ! selectors.length || ! close ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			el.onclick = function() {
				modal.classList.add( 'is-open' );

				let item = modal.querySelector( '[data-media-id="' + el.parentNode.getAttribute( 'data-media-id' ) + '"]' );
				if ( ! item ) {
					return;
				}

				document.documentElement.classList.add( 'overflow-hidden' );
				item.classList.add( 'active' );
			}
		}
	);

	close.onclick = function() {
		let modalActive = modal.querySelector( '.product-model.active' );
		if ( modalActive ) {
			modalActive.classList.remove( 'active' );
		}

		modal.classList.remove( 'is-open' );
		document.documentElement.classList.remove( 'overflow-hidden' );
	}
}

// Sticky add to cart.
function btyStickyAddToCart( doc = document ) {
	let selector = doc.querySelector( '.sticky-add-to-cart' );
	if ( ! selector ) {
		return;
	}

	let image        = selector.querySelector( '.sticky-product-image' ),
		price        = selector.querySelector( '.product-price' ),
		form         = selector.querySelector( '[data-type="add-to-cart-form"]' ),
		formSummary  = selector.closest( '.shopify-section' ).querySelector( '.summary-item .product-buy' ),
		productId    = selector.querySelector( '[name="id"]' ),
		button       = selector.querySelector( '[name="add"]' ),
		qtyInput     = selector.querySelector( '.quantity-input' ),
		variants     = selector.closest( '.shopify-section' ).querySelector( '[data-product-variants]' ),
		quantity     = selector.closest( '.shopify-section' ).querySelector( '[data-inventory-quantity]' ),
		field        = selector.querySelectorAll( '.field-value' ),
		variant_pick = {};

	variants = variants ? btyJsonParse( variants.textContent ) : false;
	quantity = quantity ? btyJsonParse( quantity.textContent ) : false;

	if ( field.length ) {
		field.forEach(
			function( el ) {
				variant_pick[ el.name ] = el.value;

				el.onchange = function() {
					variant_pick[ el.name ] = el.value;

					let selected = variants ? btySelectedVariant( variant_pick, variants ) : false;
					if ( selected ) {
						// Update product variant ID.
						if ( productId ) {
							productId.value = selected.id;
						}

						// Update image on Featured product.
						if ( image && selected.featured_image ) {
							btyImageLoad( image, selected.featured_image.src, selected.featured_media.id, image.parentNode );
						}

						// Update price.
						if ( price ) {
							price.innerHTML = btyPriceHtml( selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement );
						}

						// Set max quantity.
						if ( qtyInput ) {
							let max = quantity ? quantity.filter(
								function ( e ) {
									return e.id === selected.id;
								}
							) : [];

							if ( max.length ) {
								let qty = max[0].qty;

								if ( qty > 0 ) {
									if ( Number( qtyInput.value ) > qty ) {
										qtyInput.value = qty;
									}

									qtyInput.setAttribute( 'max', qty );
								} else {
									qtyInput.removeAttribute( 'max' );
								}
							} else {
								qtyInput.removeAttribute( 'max' );
							}
						}
					}

					// Update add to cart button text.
					if ( button ) {
						if ( selected ) {
							if ( selected.available ) {
								button.innerHTML = btyStrings.product.add_to_cart;
								button.classList.remove( 'disabled' );
							} else {
								button.innerHTML = btyStrings.product.out_of_stock;
								button.classList.add( 'disabled' );
							}
						} else {
							button.classList.add( 'disabled' );
							button.innerHTML = btyStrings.product.unavailable;
						}
					}
				}
			}
		);
	}

	// Scroll to show.
	let summaryAddToCart = doc.querySelector( '.summary-item.add-to-cart' );
	if ( ! summaryAddToCart ) {
		return;
	}

	// Scroll to add to cart.
	const scrollToAddToCart = function() {
		button.addEventListener(
			'click',
			function() {
				if ( window.matchMedia( '(min-width: 768px)' ).matches || ! button.classList.contains( 'add-product-variants' ) || ! formSummary ) {
					return;
				}

				formSummary.scrollIntoView( { behavior: 'smooth', block: 'end', inline: 'end' } );
			}
		);
	}
	scrollToAddToCart();

	const observerSummaryAddToCart = new IntersectionObserver(
		function( entries ) {
			window.addEventListener(
				'resize',
				function() {
					scrollToAddToCart();
				}
			);

			if ( entries[0].intersectionRatio <= 0 ) {
				selector.classList.add( 'active' );
			} else {
				selector.classList.remove( 'active' );
			}
		}
	);

	observerSummaryAddToCart.observe( summaryAddToCart );
}

// Product recommendations.
function btyProductPerformed( doc = document ) {
	let selector = doc.querySelectorAll( '.product-performed [data-source]' );
	if ( ! selector.length ) {
		return;
	}

	selector.forEach(
		function( el ) {
			let url = el.getAttribute( 'data-url' );
			if ( el.innerHTML.trim() || ! url ) {
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
						el.innerHTML = btyGetSectionHtml( res, '[data-source]' );
						el.removeAttribute( 'data-url' );

						btyAddToCart( el );
						btyQuickView( el );
						btySwatch( el );
						btyAnimationImageLoad( el );
						btyHoverMediaVideo( el );
						btyQuickAdd( el );
						btyScrollAnimationTrigger( el );

						// Fire when product card updated.
						document.dispatchEvent( new CustomEvent( 'product-card-updated' ) );
					}
				).catch(
					function( err ) {
						console.log( err );
					}
				);
		}
	);
}

// Block complementary products.
function btyComplementaryProducts( doc = document ) {
	let selector = doc.querySelector( '.complementary-products-container' );
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
				selector.innerHTML = btyGetSectionHtml( res, '.complementary-products-container' );

				btyQuickView( selector );
				btySwatch( selector );
				btyAnimationImageLoad( selector );
				btyAddToCart( selector );
				btyAccordionHandle( selector );
			}
		).catch(
			function( err ) {
				console.log( err );
			}
		);
}

// Block complementary products mobile.
function btyComplementaryProductsMobile( doc = document ) {
	let selector = doc.querySelector( '.complementary-products-container-mobile' );
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
				selector.innerHTML = btyGetSectionHtml( res, '.complementary-products-container-mobile' );

				btyQuickView( selector );
				btySwatch( selector );
				btyAnimationImageLoad( selector );
				btyAddToCart( selector );
				btyAccordionHandle( selector );
			}
		).catch(
			function( err ) {
				console.log( err );
			}
		);
}

// Handle email input state.
function btyHandleEmailInputState(doc = document) {
	const 	emailInput      = doc.querySelector('.email-input'),
			addToCartButton = doc.querySelector('.summary-item.add-to-cart .add-to-cart-button'),
			errorMessage    = doc.querySelector('.error-messages'),
			recipientFields = doc.querySelector('.recipient-fields'),
			dateInput       = doc.querySelector('.recipient-fields .text-body[type="date"]');

	if (!emailInput || !addToCartButton || !recipientFields) return;

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function setButtonDisabled(disabled) {
		addToCartButton.disabled = disabled;
		addToCartButton.classList.toggle('is-disabled', disabled);
		addToCartButton.setAttribute('aria-disabled', disabled ? 'true' : 'false');
	}

	function validateEmail() {
		const isOpen     = recipientFields.classList.contains('open');
		const emailValue = emailInput.value.trim();
		const valid      = isValidEmail(emailValue);

		if (isOpen && !valid) {
			setButtonDisabled(true);
			if (errorMessage) errorMessage.textContent = emailInput.dataset.emailRequired;
		} else {
			const dateValid = validateDate();
			setButtonDisabled(!dateValid);
			if (errorMessage && dateValid) errorMessage.textContent = '';
		}
	}

	function validateDate() {
		if (!dateInput) return true;

		const errorSpan = dateInput.parentNode.querySelector( '.date-limit-message' )
			|| (() => {
				const span = document.createElement('span');
				span.className = 'message error-message date-limit-message';
				dateInput.parentNode.appendChild(span);
				return span;
			})();

		const today    = new Date();
		const selected = new Date(dateInput.value);
		const diffDays = (selected - today) / (1000 * 60 * 60 * 24);
		const msg      = dateInput.dataset.dateRequired;

		if (dateInput.value && diffDays > 90) {
			errorSpan.textContent     = msg;
			errorSpan.style.display   = 'block';
			errorSpan.style.marginTop = '1.4rem';
			return false;
		} else {
			errorSpan.textContent   = '';
			errorSpan.style.display = 'none';
			return true;
		}
	}

	emailInput.addEventListener('input', validateEmail);

	if (dateInput) {
		dateInput.addEventListener('change', () => {
			const dateValid  = validateDate();
			const emailValid = isValidEmail(emailInput.value.trim());
			const isOpen     = recipientFields.classList.contains( 'open' );
			setButtonDisabled(isOpen && (!emailValid || !dateValid));
		});
	}

	const checkbox = doc.querySelector( '.recipient-checkbox-label input[type="checkbox"]' );
	if (checkbox) {
		checkbox.addEventListener('change', validateEmail);
	}

	addToCartButton.addEventListener('click', function (e) {
		const isOpen     = recipientFields.classList.contains('open');
		const emailValid = isValidEmail(emailInput.value.trim());
		const dateValid  = validateDate();

		if (isOpen && (!emailValid || !dateValid)) {
			e.preventDefault();
			e.stopPropagation();
			if (errorMessage && !emailValid) {
				errorMessage.textContent = emailInput.dataset.emailRequired || '';
			}
		}
	});

	validateEmail();
}

document.addEventListener(
	'DOMContentLoaded',
	function() {
		if ( window.ProductModel ) {
			window.ProductModel.loadShopifyXR();
		}

		btyStickyAddToCart();
		btyToggleModal();
		btyPhotoswipeHandle();
		btyProductPerformed();
		btyComplementaryProducts();
		btyComplementaryProductsMobile();
		btyHandleEmailInputState();

		window.addEventListener(
			'resize',
			function() {
				btyHandleEmailInputState();
			}
		);
	}
);

document.addEventListener(
	'shopify:section:load',
	function( e ) {
		let section = e.target.closest( 'section.shopify-section' );

		btyProductPerformed( section );
		btyComplementaryProducts( section );
		btyComplementaryProductsMobile( section );
		btyHandleEmailInputState( section );
	}
);

document.addEventListener(
	'shopify:section:select',
	function( e ) {
		let section = e.target;

		btyProductPerformed( section );
		btyStickyAddToCart( section );
		btyComplementaryProducts( section );
		btyComplementaryProductsMobile( section );
		btyHandleEmailInputState( section );
	}
);

document.addEventListener(
	'shopify:block:select',
	function( e ) {
		let section = e.target.closest( '.shopify-section' );
		if ( ! section ) {
			return;
		}

		btyStickyAddToCart( section );
		btyComplementaryProducts( section );
		btyComplementaryProductsMobile( section );
		btyHandleEmailInputState( section );
	}
);
