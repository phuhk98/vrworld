/**
 * Theme js
 *
 * @package Dev
 */

'use strict';

// Set scrollbar width.
function btyScrollBar( doc = document ) {
	let domId = document.getElementById( 'dynamic-variables-theme-css' );
	if ( ! domId ) {
		return;
	}

	let scrollbarWidth = window.innerWidth - document.body.clientWidth,
		megaMenu       = doc.querySelector( '.header-nav .mega-menu-wrap' ),
		currentWidth   = window.innerWidth - document.documentElement.clientWidth;

	// Custom event.
	const scrollbarEvent = new Event( 'scrollbar-width' );

	const observer = new ResizeObserver(() => {
		const newWidth = window.innerWidth - document.documentElement.clientWidth;

		if ( newWidth !== currentWidth ) {
			scrollbarEvent.detail = {
				previous: currentWidth,
				current: newWidth
			};

			currentWidth = newWidth;

			window.dispatchEvent( scrollbarEvent );
		}
	});

	observer.observe( document.documentElement );

	// First load.
	const updateContainerContent = function() {
		const initialWidth = window.innerWidth - document.documentElement.clientWidth;
		domId.innerHTML = ':root{--scrollbar-width:' + initialWidth + 'px;--container-content:' + ( megaMenu ? megaMenu.offsetWidth : 0 ) + 'px}';
	}

	updateContainerContent();
	window.addEventListener( 'resize', updateContainerContent );

	// Start listening for changes.
	window.addEventListener(
		'scrollbar-width',
		function( e ) {
			let newMegaMenu = doc.querySelector( '.header-nav .mega-menu-wrap .container .mega-menu' );
			domId.innerHTML = ':root{--scrollbar-width:' + e.detail.current + 'px;--container-content:' + ( newMegaMenu ? newMegaMenu.offsetWidth : 0 ) + 'px}';
		}
	);

	return observer;
}

// Siblings.
function btySiblings( el, filter ) {
	// create an empty array.
	let siblings = [];

	// if no parent, return empty list.
	if ( ! el || ! el.parentNode ) {
		return siblings;
	}

	// first child of the parent node.
	let sibling = el.parentNode.firstElementChild;

	// loop through next siblings until `null`.
	do {
		// push sibling to array.
		if ( sibling != el && ( ! filter || filter( sibling ) ) ) {
			siblings.push( sibling );
		}
	} while ( sibling = sibling.nextElementSibling );

	return siblings;
}

// Slide up.
function btySlideUp( target, duration = 200 ) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height             = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow      = 'hidden';
	target.style.height        = 0;
	target.style.paddingTop    = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop     = 0;
	target.style.marginBottom  = 0;

	window.setTimeout(
		function() {
			target.style.display = 'none';
			target.style.removeProperty( 'height' );
			target.style.removeProperty( 'padding-top' );
			target.style.removeProperty( 'padding-bottom' );
			target.style.removeProperty( 'margin-top' );
			target.style.removeProperty( 'margin-bottom' );
			target.style.removeProperty( 'overflow' );
			target.style.removeProperty( 'transition-duration' );
			target.style.removeProperty( 'transition-property' );
		},
		duration
	);
}

// Slide down.
function btySlideDown( target, duration = 200 ) {
	target.style.removeProperty( 'display' );
	let display = window.getComputedStyle( target ).display;

	if ( 'none' === display ) {
		display = 'block';
	}

	target.style.display = display;

	let height = target.offsetHeight;

	target.style.overflow      = 'hidden';
	target.style.height        = 0;
	target.style.paddingTop    = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop     = 0;
	target.style.marginBottom  = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height             = height + 'px';

	target.style.removeProperty( 'padding-top' );
	target.style.removeProperty( 'padding-bottom' );
	target.style.removeProperty( 'margin-top' );
	target.style.removeProperty( 'margin-bottom' );

	window.setTimeout(
		function() {
			target.style.removeProperty( 'height' );
			target.style.removeProperty( 'overflow' );
			target.style.removeProperty( 'transition-duration' );
			target.style.removeProperty( 'transition-property' );
		},
		duration
	);
}

// Toggle dropdown.
function btyToggleDropdown( doc = document ) {
	let toggle = doc.querySelectorAll( '.toggle-dropdown .dropdown-summary' );
	if ( ! toggle.length ) {
		return;
	}

	toggle.forEach(
		function( el ) {
			let parent      = el.parentNode,
				title       = el.querySelector( '.summary-info' ),
				mobileTitle = el.parentNode.querySelector( '.dropdown-content-title' );

			const clickAnyWhere = function( e ) {
				let target = e.target;

				if ( target === el || target.classList.contains( 'content' ) || target.closest( '.dropdown-summary' ) ) {
					return;
				}

				if ( target.classList.contains( 'tab-head', 'active' ) ) {
					if ( title ) {
						title.innerText = target.innerText;
					}

					if ( mobileTitle ) {
						mobileTitle.innerText = target.innerText;
					}
				}

				parent.removeAttribute( 'open' );

				document.removeEventListener( 'click', clickAnyWhere );
			}

			el.onclick = function( e ) {
				document.addEventListener( 'click', clickAnyWhere );

				let aria = el.hasAttribute( 'aria-expanded' );

				if ( parent.hasAttribute( 'open' ) ) {
					parent.removeAttribute( 'open' );

					if ( aria ) {
						el.setAttribute( 'aria-expanded', 'false' );
					}
				} else {
					let sibling = parent.parentNode.querySelector( '.toggle-dropdown[open]' );
					if ( sibling ) {
						sibling.removeAttribute( 'open' );

						let sibAria = sibling.querySelector( '.dropdown-summary[aria-expanded]' );
						if ( sibAria ) {
							sibAria.setAttribute( 'aria-expanded', 'false' );
						}
					}

					parent.setAttribute( 'open', '' );

					if ( aria ) {
						el.setAttribute( 'aria-expanded', 'true' );
					}
				}
			}
		}
	);
}

// Update aria expanded for summary <details> tag only.
function btyToggleDetails( doc = document ) {
	let details = doc.querySelectorAll( 'details' );
	if ( ! details.length ) {
		return;
	}

	details.forEach(
		function( el ) {
			let summary = el.querySelector( 'summary' );
			if ( el.classList.contains( 'product-accordion' ) || el.classList.contains( 'collapsible-item' ) || el.classList.contains( 'order-note' ) || ! summary ) {
				return;
			}

			document.addEventListener(
				'click',
				function( e ) {
					let target = e.target;

					if ( target === el || el.contains( target ) || target.closest( '.toggle-dropdown' ) ) {
						return;
					}

					let tmpAria = doc.querySelector( '[open] [aria-expanded]' );
					if ( tmpAria ) {
						tmpAria.setAttribute( 'aria-expanded', 'false' );
					}
				}
			);

			el.onclick = function( e ) {
				let aria = summary.getAttribute( 'aria-expanded' );
				if ( ! aria ) {
					return;
				}

				if ( 'string' === typeof( el.getAttribute( 'open' ) ) ) {
					if ( aria ) {
						summary.setAttribute( 'aria-expanded', 'false' );
					}
				} else {
					let sibling = el.parentNode.querySelector( '[open]' );
					if ( sibling ) {
						let sibAria = sibling.querySelector( '[open] [aria-expanded]' );
						if ( sibAria ) {
							sibAria.setAttribute( 'aria-expanded', 'false' );
						}
					}

					if ( aria ) {
						summary.setAttribute( 'aria-expanded', 'true' );
					}
				}
			}
		}
	);
}

// Json parse.
function btyJsonParse( string ) {
	try {
		return JSON.parse( string.trim() );
	} catch ( e ) {
		return false;
	}
}

// Remove item in array.
function btyRemoveArrayItem( arr = [], item ) {
	if ( ! arr.length || ! item ) {
		return [];
	}

	return arr.filter(
		function( el ) {
			return el != item;
		}
	);
}

// Set delay time when user typing.
const btySearchDelay = function( timer = 0 ) {
	return function( callback, ms ) {
		clearTimeout( timer );
		timer = setTimeout( callback, ms );
	};
}();

// Get image src.
function btyGetImageSrc( img ) {
	// Create canvas.
	let canvas  = document.createElement( 'canvas' ),
		context = canvas.getContext( '2d' );

	// Set width and height.
	canvas.width  = img.width;
	canvas.height = img.height;

	// Draw the image.
	context.drawImage( img, 0, 0 );

	return canvas.toDataURL( 'image/jpeg', 1.0 );
}

// Google map.
function btyGoogleMap( doc = document ) {
	let selectors = doc.querySelectorAll( '.contact-map' );
	if ( ! selectors.length ) {
		return;
	}

	// Map style.
	let styledMapType = new google.maps.StyledMapType(
		[
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [{ "color": "#444444" }]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [{ "color": "#f2f2f2" }]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#052366" },
					{ "saturation": "-70" },
					{ "lightness": "85" }
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{ "visibility": "simplified" },
					{ "lightness": "-53" },
					{ "weight": "1.00" },
					{ "gamma": "0.98" }
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.icon",
				"stylers": [{ "visibility": "simplified" }]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 45 },
					{ "visibility": "on" }
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{ "saturation": "-18" }]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{ "color": "#57677a" },
					{ "visibility": "on" }
				]
			}
		],
		{ name: "Styled Map" }
	);

	// Init.
	selectors.forEach(
		function( el ) {
			let data    = el.querySelector( '[data-options]' ),
				options = data ? btyJsonParse( data.content.textContent ) : false;
			if ( ! options ) {
				return;
			}

			// Remove template.
			data.remove();

			let coordinates = options.coordinates.split( ',' );

			coordinates = { lat: Number( coordinates[0].trim()), lng: Number( coordinates[1].trim()) }

			let map = new google.maps.Map(
				el,
				{
					zoom: options.zoom,
					center: coordinates,
					disableDefaultUI: true,
					mapTypeControlOptions: {
						mapTypeIds: [ 'roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map' ]
					}
				}
			);

			map.mapTypes.set( 'styled_map', styledMapType );
			map.setMapTypeId( 'styled_map' );

			let marker = new google.maps.Marker(
				{
					position: coordinates,
					map: map
				}
			);
		}
	);
}

// Scrolling detect direction.
function btyScrollingDetect() {
	let body = document.body;

	if ( window.oldScroll > window.scrollY ) {
		body.classList.add( 'direction-up' );
		body.classList.remove( 'direction-down' );
	} else {
		body.classList.remove( 'direction-up' );
		body.classList.add( 'direction-down' );
	}

	// Reset state.
	window.oldScroll = window.scrollY;
}

// Set loading animation for image.
function btyImageLoad( image, image_src, image_key, ele_loading ) {
	let newImage = new Image();

	newImage.crossOrigin = 'anonymous';

	// Check local storage first.
	if ( sessionStorage.getItem( image_key ) ) {
		image.src = sessionStorage.getItem( image_key );
		return;
	}

	// Add loading animation.
	image.parentNode.classList.add( 'loading' );

	// Handle.
	newImage.onload = function() {
		ele_loading.classList.remove( 'loading' );
		let renderImage = btyGetImageSrc( newImage );

		// Set final image src.
		image.src = renderImage;

		// Save image to local storage.
		if ( image_key ) {
			sessionStorage.setItem( image_key, renderImage );
		}
	}

	newImage.onerror = function() {
		ele_loading.classList.remove( 'loading' );
	}

	// Set image src for 'newImage.onload' function handle.
	newImage.src = image_src;
}

// Get form data.
function btySerializeForm( form, type = 'string' ) {
	let obj      = {},
		formData = new FormData( form );

	for ( let key of formData.keys() ) {
		obj[ key ] = formData.get( key );
	}

	return 'string' === type ? JSON.stringify( obj ) : obj;
};

// Get price format.
function btyFormatPrice( money = 0, format = false ) {
	if ( 'string' === typeof( money ) ) {
		money = money.replace( '.', '' );
	}

	if ( false === format ) {
		format = btyGlobals.money_format;
	}

	let value            = '',
		placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

	function defaultOption( opt, def ) {
		return 'undefined' === typeof( opt ) ? def : opt;
	}

	function formatWithDelimiters( number, precision, thousands, decimal ) {
		precision = defaultOption( precision, 2 );
		thousands = defaultOption( thousands, ',' );
		decimal   = defaultOption( decimal, '.' );

		if ( isNaN( number ) || number == null ) {
			return 0;
		}

		number = ( number / 100.0 ).toFixed( precision );

		let parts   = number.split( '.' ),
			dollars = parts[0].replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands ),
			money   = parts[1] ? ( decimal + parts[1] ) : '';

		return dollars + money;
	}

	switch ( format.match( placeholderRegex )[1] ) {
		case 'amount':
			value = formatWithDelimiters( money, 2 );
			break;
		case 'amount_no_decimals':
			value = formatWithDelimiters( money, 0 );
			break;
		case 'amount_with_comma_separator':
			value = formatWithDelimiters( money, 2, '.', ',' );
			break;
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters( money, 0, '.', ',' );
			break;
		case 'amount_with_space_separator':
			value = formatWithDelimiters( money, 2, ' ', ',' );
			break;
		case 'amount_with_period_and_space_separator':
			value = formatWithDelimiters( money, 2, ' ', '.' );
			break;
		case 'amount_no_decimals_with_space_separator':
			value = formatWithDelimiters( money, 0, '.', '' );
			break;
		case 'amount_with_apostrophe_separator':
			value = formatWithDelimiters( money, 2, "'", '.' );
			break;
	}

	return format.replace( placeholderRegex, value );
}

// Render price html.
function btyPriceHtml( price, compare_price = false, unit_price = false, unit_price_measurement = {} ) {
	let html         = '',
		regularPrice = btyStrings.product.regular_price;

	if ( compare_price ) {
		const savedPercent = Math.round((1 - price / compare_price) * 100);

		html += '<span class="price">';
		html += '<span class="sr-only">' + btyStrings.product.sale_price + ': </span>';
		html += btyFormatPrice( price );
		html += '</span>';

		html += '<s class="regular-price">';
		html += '<span class="sr-only">' + regularPrice + ': </span>';
		html += btyFormatPrice( compare_price );
		html += '</s>';

		html += '<span class="product-sale-label">';
		html += '<span class="sr-only">' + btyStrings.product.on_sale + ': </span>';
		html += '<span class="sale-total">-' + savedPercent + '%</span>';
		html += '</span>';

	} else {
		html += '<span class="regular-price">';
		html += '<span class="sr-only">' + regularPrice + ': </span>';
		html += btyFormatPrice( price );
		html += '</span>';
	}

	if ( unit_price ) {
		html += '<span class="unit-price">';
		html += btyFormatPrice( unit_price ) + '/' + unit_price_measurement.quantity_unit;
		html += '</span>';
	}

	return html;
}

// Parse html dom.
function btyGetSectionHtml( text = '', selector = '.shopify-section', html = 'inner' ) {
	let el = new DOMParser().parseFromString( text, 'text/html' ).querySelector( selector );

	return el ? ( 'inner' === html ? el.innerHTML : el.outerHTML ) : '';
}

/**
 * Update html dom.
 *
 * @param  array sections The response sections.
 * @param  array modules  The modules need update html dom.
 */
function btyUpdateHtml( sections, modules ) {
	modules.forEach(
		function( mod ) {
			let query = document.querySelectorAll( mod.node );
			if ( ! query.length ) {
				return;
			}

			query.forEach(
				function( el ) {
					el.innerHTML = btyGetSectionHtml( sections[ mod.section ], mod.selector );
				}
			);

			// Re-init function.
			btyAddToCart();
			btySwatch();
			btyQuickAdd();
		}
	);
}

// Countdown time.
function btyCountdownTime( doc = document ) {
	let selectors = doc.querySelectorAll( '.countdown-time' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let time        = el.getAttribute( 'data-time' ),
				dayField    = el.querySelector( '.days' ),
				hourField   = el.querySelector( '.hours' ),
				minuteField = el.querySelector( '.minutes' ),
				secondField = el.querySelector( '.seconds' );

			if ( ! dayField || ! hourField || ! minuteField || ! secondField ) {
				return;
			}

			// Check time first.
			if ( isNaN( Date.parse( time ) ) ) {
				return;
			}

			// Convert to milisecond.
			let interval,
				second = 1000,
				minute = second * 60,
				hour   = minute * 60,
				day    = hour * 24,
				today  = new Date();

			const countDownFn = function() {
				let countDown = new Date( time ).getTime(),
					now       = new Date().getTime(),
					distance  = countDown - now,
					dayInner  = Math.floor( distance / day );

				if ( distance < 0 ) {
					el.parentNode.remove();

					clearInterval( init );

					return;
				}

				if ( 0 == dayInner && dayField ) {
					dayField.parentNode.remove();
				} else {
					dayField.innerText = dayInner;
				}

				hourField.innerText   = ( '0' + Math.floor( ( distance % day ) / hour ) ).slice( -2 );
				minuteField.innerText = ( '0' + Math.floor( ( distance % hour ) / minute ) ).slice( -2 );
				secondField.innerText = ( '0' + Math.floor( ( distance % minute ) / second ) ).slice( -2 );

				// Show countdown.
				el.parentNode.classList.remove( 'hidden' );
			}

			let init = setInterval( countDownFn, 0 );
		}
	);
}

/**
 * Close theme popup
 *
 * @param  string class_name  Class name remove form <html>
 * @return node   parent_node Parent node to implement click overlay.
 */
function btyClosePopup(class_name, parent_node, overlay = true) {
	if (!class_name) return;

	let doc = document.documentElement,
		button = parent_node ? parent_node.querySelector('.close-button, .side-cart-close') : false;

	// CLICK OVERLAY.
	if (parent_node && overlay) {
		const parentHandle = function (e) {
			if (e.target != parent_node) return;

			doc.classList.remove(class_name);

			parent_node._lastFocused?.focus();

			parent_node.removeEventListener('click', parentHandle);
			document.dispatchEvent(new CustomEvent('theme-popup-close'));
		};

		parent_node.addEventListener('click', parentHandle);
	}

	// ESC KEY.
	doc.addEventListener('keyup', function (e) {
		if (e.keyCode !== 27) return;

		doc.classList.remove(class_name);

		parent_node?._lastFocused?.focus();

		document.dispatchEvent(new CustomEvent('theme-popup-close'));
	});

	// CLOSE BUTTON.
	if (button) {
		const buttonHandle = function () {
			doc.classList.remove(class_name);

			parent_node?._lastFocused?.focus();

			button.removeEventListener('click', buttonHandle);
			document.dispatchEvent(new CustomEvent('theme-popup-close'));
		};

		button.addEventListener('click', buttonHandle);
	}
}

// Quick search.
function btyQuickSearch() {
	const actions          = document.querySelectorAll( '.action-search' );
	const dialog           = document.querySelector( '.quick-search' );
	const input            = document.querySelector( '.quick-search .search-input' );
	const button           = document.querySelector( '.quick-search .search-button' );
	const closeBtn         = document.querySelector( '.quick-search .close-search-button' );
	const suggestions      = document.querySelector( '.quick-search .suggestions-product' );
	const predictiveResult = document.querySelector( '#predictive-search' );

	if (!actions.length || !input || !button || !predictiveResult ) {
		return;
	}

	// dialog semantics (safe to repeat).
	dialog.setAttribute('role','dialog');
	dialog.setAttribute('aria-modal','true');
	dialog.setAttribute('inert','');


	const FOCUSABLE = 'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

	if (Shopify.designMode && document.documentElement.classList.contains( 'quick-search-open' )) {
		btyClosePopup( 'quick-search-open', dialog );
	}

	actions.forEach((el) => {
		el.onclick = function (e) {
			e.preventDefault();
			document.documentElement.classList.add( 'quick-search-open' );
			btyClosePopup( 'quick-search-open', dialog );

			// remember opener to restore focus on close.
			dialog._returnFocus = el;

			dialog.removeAttribute('inert');
			input.focus();
			input.removeAttribute( 'tabindex' );

			// one-time focus trap + Esc to close.
			if (!dialog._trap) {
				dialog._trap = true;
				dialog.addEventListener('keydown', (ev) => {
					if (ev.key === 'Escape') {
						ev.preventDefault();
						closeBtn?.click();
						return;
					}
					if (ev.key !== 'Tab') return;
					const els = dialog.querySelectorAll(FOCUSABLE);
					if (!els.length) return;
					const first = els[0], last = els[els.length - 1];
					if (ev.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
						ev.preventDefault(); last.focus();
					} else if (!ev.shiftKey && document.activeElement === last) {
						ev.preventDefault(); first.focus();
					}
				});
			}
		};
	});

	if (closeBtn) {
		closeBtn.addEventListener('click', function () {
			document.documentElement.classList.remove( 'quick-search-open' );
			dialog.setAttribute('inert','');
			(dialog._returnFocus || actions[0])?.focus();
		});
	}

	input.addEventListener('input', function () {
		const value = input.value.trim();
		if (!value) {
			predictiveResult.innerHTML = '';
			suggestions?.classList.remove( 'sr-only' );
			return;
		}

		dialog.classList.add( 'searching' );
		suggestions?.classList.add( 'sr-only' );
		predictiveResult.innerHTML = btyGlobals.card_placeholder;

		const url = `${btyGlobals.search_url}?section_id=predictive-search&type=product&q=${encodeURIComponent(value)}`;

		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.text();
			})
			.then((html) => {
				const temp = document.createElement('div');
				temp.innerHTML = html;

				const section = temp.querySelector( '#shopify-section-predictive-search' );
				if (!section) return;

				predictiveResult.innerHTML = section.innerHTML;

				if (predictiveResult.innerHTML.trim() === '') {
					predictiveResult.classList.add( 'hidden' );
				} else {
					predictiveResult.classList.remove( 'hidden' );
				}

				btyAnimationImageLoad(predictiveResult);
				btyQuickView( predictiveResult );
				btyAddToCart( predictiveResult );
				btyQuickAdd( predictiveResult );
				btySwatch( predictiveResult );
				btyHoverMediaVideo( predictiveResult );
			})
			.catch(console.error)
			.finally(() => {
				dialog.classList.remove( 'searching' );
			});
	});
}

// Quantity button.
function btyQuantityButton( doc = document ) {
	let buttons = doc.querySelectorAll( '.quantity-button' );
	if ( ! buttons.length ) {
		return;
	}

	buttons.forEach(
		function( el ) {
			let eventChange = new Event( 'change', { bubbles: true } );

			el.onclick = function() {
				let input = el.parentNode.querySelector( '.quantity-input' );
				if ( ! input ) {
					return;
				}

				let current = Number( input.value || 0 ),
					step    = Number( input.getAttribute( 'step' ) || 1 ),
					min     = Number( input.getAttribute( 'min' ) || 0 ),
					max     = Number( input.getAttribute( 'max' ) ),
					name    = el.name;

				if ( 'minus' === name && current >= step ) { // Minus button.
					if ( current <= min || ( current - step ) < min ) {
						return;
					}

					input.value = current - step;
				} else if ( 'plus' === name ) { // Plus button.
					if ( max && ( current >= max || ( current + step ) > max ) ) {
						return;
					}

					input.value = current + step;
				}

				// Trigger event.
				input.dispatchEvent( eventChange );
			}
		}
	);
}

// Main menu.
function btyNavMenu( doc = document, event = false ) {
	let toggles = doc.querySelectorAll( '.toggle-panel-button' ),
		panel  = doc.querySelector( '.site-panel' );

	if ( ! toggles.length || ! panel ) {
		return;
	}

	// Close site panel when settings update.
	if ( event && event.detail.load ) {
		btyClosePopup( 'site-panel-open', panel );
	}

	toggles.forEach(
		function( el ) {
			// Toggle site panel.
			el.onclick = function() {
				document.documentElement.classList.add( 'site-panel-open' );

				btyClosePopup( 'site-panel-open', panel );
			}
		})

	// Toggle sub menu.
	let links = doc.querySelectorAll( '.site-panel .has-children' );
	if ( ! links.length ) {
		return;
	}

	links.forEach(
		function( el ) {
			el.onclick = function( e ) {
				if ( e.target.classList.contains( 'menu-text' ) && !el.contains(e.target) ) {
					return;
				}

				e.preventDefault();

				let menu    = el.closest( '.toggle-navigation' ),
					parent  = el.parentNode,
					subMenu = parent.querySelector( '.sub-menu' ) || parent.querySelector( '.sub-mega-menu' );
				if ( ! subMenu ) {
					return;
				}

				parent.classList.add( 'active' );

				// Update current sub menu.
				let level = Number( subMenu.getAttribute( 'data-level' ) || 1 ),
					back  = parent.querySelector( '.back' );
				if ( level ) {
					menu.setAttribute( 'data-level', level );
				}

				// Go back parent level.
				if ( back ) {
					back.onclick = function() {
						parent.classList.remove( 'active' );
						menu.setAttribute( 'data-level', level - 1 );
					}
				}
			}
		}
	);
}

// Split Slider.
function btySplitSlider( doc = document ) {
	let selectors = doc.querySelectorAll( '.split-slider' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let imageCarouselOption, imageCarousel, textCarouselOption, textCarousel,
				imageEl = el.querySelector( '.image-content .swiper' ),
				textEl  = el.querySelector( '.text-content .swiper' ),
				mobile  = window.matchMedia( '(max-width: 991px)' ).matches || window.matchMedia( '(hover: none)' ).matches

			imageCarouselOption = {
				speed: 600,
				spaceBetween: 40,
				scrollbar: {
					el: ".split-slider .swiper-scrollbar",
					draggable: true
				},
				breakpoints: {
					240: {
						slidesPerView: 1
					},
					992: {
						slidesPerView: 1.25
					}
				}
			}

			// Image card.
			if ( imageEl && ! imageEl.classList.contains( 'swiper-initialized' ) ) {
				imageCarousel = new Swiper( imageEl, imageCarouselOption );
			}

			textCarouselOption = {
				speed: 600,
				spaceBetween: 40,
				scrollbar: {
					el: ".split-slider .swiper-scrollbar",
					draggable: true
				},
				breakpoints: {
					240: {
						slidesPerView: 1
					},
					992: {
						slidesPerView: 1
					}
				}
			}

			// Layout.
			if ( el.classList.contains( 'content-layout' ) ) {
				textCarouselOption.centeredSlides = true;
				textCarouselOption.spaceBetween   = 200;

				if ( mobile ) {
					textCarouselOption.autoHeight = true;
				}
			} else {
				textCarouselOption.autoHeight  = true;

				textCarouselOption.navigation = {
					nextEl: el.querySelector( '.text-content .swiper-button-next' ),
					prevEl: el.querySelector( '.text-content .swiper-button-prev' )
				}
			}

			// Text content.
			if ( textEl && ! textEl.classList.contains( 'swiper-initialized' ) ) {
				textCarousel = new Swiper( textEl, textCarouselOption );
			}

			// Sync controls.
			if ( textCarousel && imageCarousel ) {
				textCarousel.controller.control  = imageCarousel;
				imageCarousel.controller.control = textCarousel;
			}
		}
	);
}

// Account popup.
function btyAccountPopup( doc = document ) {
	let selectors = doc.querySelectorAll( '.action-account' ),
		customer  = document.querySelector( '.customer-wraper' );
	if ( ! selectors.length || ! customer || document.body.classList.contains( 'has-account-details' ) ) {
		return;
	}

	// Get display style.
	const getStyles = function( el, property = 'display' ) {
		let obj = window.getComputedStyle( el, null );

		return obj.getPropertyValue( property );
	}

	// Get first input field.
	const getInput = function( parent ) {
		return parent.querySelector( '.field input' );
	}

	// Toggle popup.
	selectors.forEach(
		function( el ) {
			el.onclick = function( e ) {
				if ( el.classList.contains( 'new-customer-accounts' ) ) {
					return;
				}

				e.preventDefault();

				let login    = customer.querySelector( '.login' ),
					loginBox = login ? login.querySelector( '#login-container' ) : false,
					recover  = login ? login.querySelector( '#recover-container' ) : false,
					register = customer.querySelector( '.register' );

				if ( ! recover || ! loginBox || ! register ) {
					return;
				}

				document.documentElement.classList.add( 'customer-open' );

				// Focus input field on desktop.
				if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
					if ( getStyles( register ) === 'block' ) {
						getInput( register ).focus();
					} else if ( getStyles( recover ) === 'block' ) {
						getInput( recover ).focus();
					} else if ( getStyles( loginBox ) === 'block' ) {
						getInput( loginBox ).focus();
					}
				}

				// Close popup.
				btyClosePopup( 'customer-open', customer );

				customer.onclick = function( e ) {
					let target = e.target;

					// Create account.
					if ( target.classList.contains( 'create-account' ) ) {
						e.preventDefault();

						login.classList.add( 'hidden' );
						register.classList.remove( 'hidden' );

						getInput( register ).focus();
					}

					// Sign-in.
					if ( target.classList.contains( 'sign-in' ) ) {
						e.preventDefault();

						login.classList.remove( 'hidden' );
						register.classList.add( 'hidden' );

						getInput( loginBox ).focus();
					}

					// Fogot password.
					if ( target.classList.contains( 'forgot-password' ) ) {
						setTimeout(
							function() {
								getInput( recover ).focus();
							}
						);
					}

					// Cancel login.
					if ( target.classList.contains( 'login-cancel' ) ) {
						setTimeout(
							function() {
								getInput( loginBox ).focus();
							}
						);
					}
				}
			}
		}
	);
}

// Update cart item count.
function btyCartItemCount( items = 1 ) {
	let count = document.querySelectorAll( '.cart-item-count' ),
		label = document.querySelectorAll( '.item-count-label' );
	if ( ! count.length ) {
		return;
	}

	items = Number( items );

	count.forEach(
		function( el ) {
			el.innerHTML = items;

			if ( items < 1 ) {
				el.classList.add( 'hidden' );
			} else {
				el.classList.remove( 'hidden' );
			}
		}
	);

	label.forEach(
		function( el ) {
			if (typeof window.cartText !== 'undefined') {
				el.textContent = items === 1 ? window.cartText.one : window.cartText.other;
			} else {
				el.textContent = items === 1 ? 'item' : 'items';
			}
		}
	);
}

// Find if two arrays contain any common item in Javascript.
function btyDiffObject( haystack, arr ) {
	return arr.every(
		function( v ) {
			return haystack.includes( v );
		}
	);
};

// Selected variant image.
function btySelectedVariant( variant, data, slider ) {
	for ( let opt in data ) {
		if ( btyDiffObject( Object.values( variant ), data[opt].options ) ) {
			if ( 'object' === typeof( slider ) && Object.keys( slider ).length && data[opt].featured_media ) {
				slider.slideTo( ( data[opt].featured_media.position - 1 ), 500, false );
			}

			return data[opt];
		}
	}
}

// Fetch cart data.
function btyFetchCart( obj, modules, item ) {
	let body = JSON.stringify( obj );

	fetch( btyGlobals.cart_change_url, {...btyFetchConfig(), ...{ body } } )
		.then(
			function( r ) {
				return r.json();
			}
		).then(
			function( res ) {
				let warning = item.querySelectorAll( '.product-warning' );
				if ( warning.length ) {
					warning.forEach(
						function( el ) {
							el.innerHTML = '';
						}
					);
				}

				if ( res.errors && warning.length ) {
					warning.forEach(
						function( el ) {
							el.innerHTML = btyGlobals.svg_warning + res.errors;
						}
					);

					let qtyInput = item.querySelectorAll( '.quantity-input' );
					if ( qtyInput.length ) {
						qtyInput.forEach(
							function( el ) {
								el.value = el.getAttribute( 'data-qty' );
							}
						);
					}

					return;
				}

				// Update cart item count first.
				btyCartItemCount( res.item_count );

				// Cart empty.
				if ( ! res.items.length ) {
					let cartTable       = document.querySelector( '.cart-page-section .container' ),
						cartSubtotal    = cartTable ? cartTable.querySelector( '.cart-footer' ) : false,
						sideCartContent = document.querySelector( '.side-cart-content' ),
						sideCartFooter  = document.querySelector( '.side-cart-footer' );

					// Update cart table section.
					if ( cartTable ) {
						cartTable.innerHTML = btyGetSectionHtml( res.sections['main-cart'], '.container' );
					}

					// Remove cart subtotal section.
					if ( cartSubtotal ) {
						cartSubtotal.remove();
					}

					// Update side cart content.
					if ( sideCartContent ) {
						sideCartContent.innerHTML = btyGetSectionHtml( res.sections['side-cart'], '.side-cart-content' );
					}

					// Remove side cart footer.
					if ( sideCartFooter ) {
						sideCartFooter.remove();
					}

					// Open login popup when cart empty.
					btyAccountPopup();
				}

				// Update current item.
				let currentItem = res.items.filter( (e) => e.line === Number( obj.line ) );
				if ( currentItem.length ) {
					let sidecartContent = item.closest( '.side-cart-content' ),
						totalPrice      = item.querySelector( '.totals-item-price' ),
						quantityUnit    = item.querySelectorAll( '[name="quantity"]' );
					if ( totalPrice ) {
						totalPrice.innerHTML = btyGetSectionHtml( res.sections['main-cart'], '[data-line="' + obj.line + '"] .totals-item-price' );
					}

					if ( sidecartContent ) {
						item.innerHTML = btyGetSectionHtml( res.sections['side-cart'], '[data-line="' + obj.line + '"]' );
					}

					if ( quantityUnit.length ) {
						quantityUnit.forEach(
							function( el ) {
								el.setAttribute( 'data-qty', obj.quantity );
							}
						);
					}
				} else {
					item.remove();
				}

				// Update html.
				btyUpdateHtml( res.sections, modules );

				// Re-init quantity button.
				btyQuantityButton();

				// Re-init update product quantity.
				btyUpdateProductQuantity();

				// Update cart progress bar.
				btyUpdateProgressBarCart( res.total_price );

				// Re-init minicart recommendations.
				btyAnimationImageLoad();
				btyScrollAnimationTrigger();
				btyMinicartRecommendations();

				// Re-init cart popup outer.
				btySideCartPopupOuter();

				// Reinit checkbox agree to terms.
				btyAgreeToTerms();
			}
		).catch(
			function( e ) {
				console.error( e );
			}
		).finally(
			function() {
				// Remove loading.
				item.classList.remove( 'updating' );
			}
		);
}

// Update product quantity.
function btyUpdateProductQuantity( doc = document ) {
	let item = doc.querySelectorAll( '.product-item[data-line]' );
	if ( ! item.length ) {
		return;
	}

	// Register dom html need an update when the response available.
	let modules = [
		{
			node: '.cart-totals',
			section: 'main-cart',
			selector: '.cart-totals'
	},
		{
			node: '.agree-to-terms',
			section: 'main-cart',
			selector: '.agree-to-terms'
	},
		{
			node: '.cart-table',
			section: 'main-cart',
			selector: '.cart-table'
	},
		{
			node: '.cart-items',
			section: 'side-cart',
			selector: '.cart-items'
	},
		{
			node: '.minicart-recommendations-wrapper',
			section: 'side-cart',
			selector: '.minicart-recommendations-wrapper'
	},
		{
			node: '.side-cart .sub-total',
			section: 'side-cart',
			selector: '.side-cart .sub-total'
	},
		{
			node: '.side-cart .agree-to-terms',
			section: 'side-cart',
			selector: '.side-cart .agree-to-terms'
	}
	];

	item.forEach(
		function( el ) {
			let line = parseInt( el.getAttribute( 'data-line' ), 10 );

			if ( ! line || isNaN( line ) ) {
				return;
			}

			let removes = el.querySelectorAll( '.product-remove' ),
				inputs  = el.querySelectorAll( '.quantity-input' );

			// Quantity change.
			if ( inputs.length ) {
				inputs.forEach(
					function( input ) {
						input.onchange = function() {
							let data, quantity = Number( input.value.trim() );

							// Loading effect.
							el.classList.add( 'updating' );

							data = {
								line: line,
								quantity: quantity,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							btyFetchCart( data, modules, el );
						}
					}
				);
			}

			// Remove button click.
			if ( removes.length ) {
				removes.forEach(
					function( remove ) {
						remove.onclick = function( e ) {
							e.preventDefault();

							// Loading effect.
							el.classList.add( 'updating' );

							let data = {
								line: line,
								quantity: 0,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							btyFetchCart( data, modules, el );
						}
					}
				);
			}
		}
	);
}

// Variant options.
function btyProductVariants(doc = document, output = false) {
	let data,
		selector = doc.querySelectorAll('.product-variants');
	if (!selector.length) return;

	selector.forEach(function (sl) {
		let variants = sl.parentNode.querySelector('[data-product-variants]'),
			quantity = sl.parentNode.querySelector('[data-inventory-quantity]'),
			field = sl.querySelectorAll('.field-value');
		if (!field.length || !variants || !quantity) return;

		let product      = sl.closest('.main-product'),
			gallery      = product ? product.querySelector('.product-gallery') : false,
			featured     = sl.closest('.featured-product-product'),
			image        = featured ? featured.querySelector('.media-preview') : false,
			summary      = sl.closest('.product-summary'),
			variant_pick = {};

		variants = btyJsonParse(variants.textContent);
		quantity = btyJsonParse(quantity.textContent);

		let price       = summary.querySelector('.product-price'),
			form        = summary.querySelector('[data-type="add-to-cart-form"]'),
			input       = form ? form.querySelector('.quantity-input') : false,
			productId   = form ? form.querySelector('[name="id"]') : false,
			button      = form ? form.querySelector('[name="add"]') : false,
			price_2     = summary.querySelector('.product-price-floated .product-price'),
			form_2      = summary.querySelector('.product-floated-product-form [data-type="add-to-cart-form"]'),
			input_2     = form_2 ? form_2.querySelector('.quantity-input') : false,
			productId_2 = form_2 ? form_2.querySelector('[name="id"]') : false,
			button_2    = form_2 ? form_2.querySelector('[name="add"]') : false,
			productUrl  = sl.getAttribute('data-url'),
			pickup      = summary.querySelector('.pickup-availability'),
			amount      = summary.querySelector('.product-sale-label .sale-total .saved-number');

		field.forEach(function (el) {
			if (el.type === 'radio') {
				if (el.checked) variant_pick[el.name] = el.value;
			} else {
				variant_pick[el.name] = el.value;
			}

			el.onchange = function () {
				variant_pick[el.name] = el.value;
				btyUpdateStockStatusProduct(variants, sl);

				let selected = btySelectedVariant(variant_pick, variants);

				if ( form ) {
					let sellingMessage = form.parentNode.querySelector( '.selling-plan-message' ),
						button         = form.querySelector( '.add-to-cart-button' ),
						paymentButton  = form.querySelector( '.shopify-payment-button' );

					if ( sellingMessage && ! sellingMessage.classList.contains( 'hidden' ) ) {
						sellingMessage.innerHTML = '';
						sellingMessage.classList.add( 'hidden' );
					}

					if ( selected.requires_selling_plan && selected.selling_plan_allocations.length == 0 ) {
						if ( button ) {
							button.classList.add( 'selling-plan-error' );
						}

						if ( paymentButton ) {
							paymentButton.classList.add( 'hidden' );
						}
					} else {
						if ( button ) {
							button.classList.remove( 'selling-plan-error' );
						}

						if ( paymentButton ) {
							paymentButton.classList.remove( 'hidden' );
						}
					}
				}

				if (!selected) {
					if (button) {
						button.classList.add('disabled');
						button.innerHTML = btyStrings.product.unavailable;
					}
					if (button_2) {
						button_2.classList.add('disabled');
						button_2.innerHTML = btyStrings.product.unavailable;
					}
					if (form) form.classList.add('disabled');
					if (form_2) form_2.classList.add('disabled');
					if (pickup) pickup.innerHTML = '';
					if (amount) amount.closest('.product-sale-label').classList.add('hidden');
					return;
				}

				if (productId) productId.value = selected.id;
				if (productId_2) productId_2.value = selected.id;

				if (image && selected.featured_image) {
					image.removeAttribute('srcset');
					btyImageLoad(image, selected.featured_image.src, selected.featured_media.id, image.parentNode);
				}

				if (productUrl && gallery) {
					window.history.replaceState({}, '', productUrl + '?variant=' + selected.id);
				}

				if (price) {
					price.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
				}
				if (price_2) {
					price_2.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
				}

				if (amount) {
					if (selected.compare_at_price) {
						let amountTotal = 100 * (selected.compare_at_price - selected.price) / selected.compare_at_price;
						amount.innerHTML = amountTotal.toFixed(0);
						amount.closest('.product-sale-label').classList.remove('hidden');
					} else {
						amount.closest('.product-sale-label').classList.add('hidden');
					}
				}

				if (input) {
					let max = quantity.filter(e => e.id === selected.id);
					if (max.length) {
						let qty = max[0].qty;
						if (qty > 0) {
							if (Number(input.value) > qty) input.value = qty;
							input.setAttribute('max', qty);
						} else {
							input.removeAttribute('max');
						}
					} else {
						input.removeAttribute('max');
					}
				}

				let groupImage = document.querySelectorAll('.check-group-image .swiper[data-color]');
				if (groupImage.length) {
					let colorName = selected.featured_media && selected.featured_media.alt ? selected.featured_media.alt.split('_')[0] : false;
					if (colorName) {
						groupImage.forEach(function (gi) {
							let label = gi.getAttribute('data-color');
							if (!label) return;
							if (colorName.trim().toLowerCase() == label) gi.classList.remove('group-hidden');
							else gi.classList.add('group-hidden');
						});
					}
				}

				let shopifyPayment = document.querySelector('shopify-payment-terms');
				if (shopifyPayment) shopifyPayment.setAttribute('variant-id', selected.id);

				if (pickup) {
					if (selected.available) btyPickupAvailability(doc, productId.value, pickup);
					else pickup.innerHTML = '';
				}

				let selectedOption = el.closest('.variant-field')?.querySelector('.field-title .selected-value');
				if (selectedOption) selectedOption.innerText = el.value.trim();

				if (form) form.classList.toggle('disabled', !selected.available);
				if (form_2) form_2.classList.toggle('disabled', !selected.available);

				if (button) {
					if (selected.available) {
						if (button.classList.contains('has-price')) {

							let priceHTML = '';
							if (selected.compare_at_price && selected.compare_at_price > selected.price) {
								const discount = Math.round((1 - selected.price / selected.compare_at_price) * 100);
								priceHTML = `
									<span> - </span>
									${btyPriceHtml(
										selected.price,
										selected.compare_at_price,
										selected.unit_price,
										selected.unit_price_measurement
									)}
								`;
							} else {
								priceHTML = `
									<span> - </span>
									${btyPriceHtml(
										selected.price,
										selected.compare_at_price,
										selected.unit_price,
										selected.unit_price_measurement
									)}
								`;
							}

							button.innerHTML = `${btyStrings.product.add_to_cart}${priceHTML}`;
						} else {
							button.innerHTML = btyStrings.product.add_to_cart;
						}

						button.classList.remove('disabled');
					} else {
						button.innerHTML = btyStrings.product.out_of_stock;
						button.classList.add('disabled');
					}
				}

				if (button_2) {
					if (selected.available) {
						button_2.innerHTML = btyStrings.product.add_to_cart;
						button_2.classList.remove('disabled');
					} else {
						button_2.innerHTML = btyStrings.product.out_of_stock;
						button_2.classList.add('disabled');
					}
				}

				document.dispatchEvent(new CustomEvent('product-variant-updated', { detail: { selected } }));
			};

			if (amount?.textContent.trim()) {
				amount.closest('.product-sale-label')?.classList.remove('hidden');
			} else {
				amount?.closest('.product-sale-label')?.classList.add('hidden');
			}
		});

		let firstSelected = btySelectedVariant(variant_pick, variants);

		if (!firstSelected && variants.length) {
			let cheapest = variants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
			firstSelected = cheapest;
			variant_pick = cheapest.options.reduce((obj, val, index) => {
				obj['option' + (index + 1)] = val;
				return obj;
			}, {});

			if (productId) productId.value = cheapest.id;
			if (productId_2) productId_2.value = cheapest.id;
			if (price) price.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);
			if (price_2) price_2.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);

			if (button) {
				if (cheapest.available) {

					if (button.classList.contains('has-price')) {
						button.innerHTML = `
							${btyStrings.product.add_to_cart}
							<span> - </span>
							${btyPriceHtml(
								cheapest.price,
								cheapest.compare_at_price,
								cheapest.unit_price,
								cheapest.unit_price_measurement
							)}
						`;
					} else {
						button.innerHTML = btyStrings.product.add_to_cart;
					}

					button.classList.remove('disabled');
				} else {
					button.classList.add('disabled');
					button.innerHTML = btyStrings.product.out_of_stock;
				}
			}

			if (button_2) {
				if (cheapest.available) {
					button_2.classList.remove('disabled');
					button_2.innerHTML = btyStrings.product.add_to_cart;
				} else {
					button_2.classList.add('disabled');
					button_2.innerHTML = btyStrings.product.out_of_stock;
				}
			}

			field.forEach(el => {
				let value = cheapest.options.find(v => v === el.value);
				if (value) {
					el.checked = true;
					el.dispatchEvent(new Event('change'));
				}
			});
		} else if (firstSelected) {
			let checkedField = sl.querySelector('.field-value:checked');
			if (checkedField) {
				checkedField.dispatchEvent(new Event('change'));
			}
		}

		if (pickup && firstSelected && firstSelected.available) btyPickupAvailability(doc, firstSelected.id, pickup);

		if (input && firstSelected) {
			let max = quantity.filter(e => e.id === firstSelected.id);
			if (max.length) {
				let qty = max[0].qty;
				if (qty > 0) {
					if (Number(input.value) > qty) input.value = qty;
					input.setAttribute('max', qty);
				} else {
					input.removeAttribute('max');
				}
			} else {
				input.removeAttribute('max');
			}
		}

		data = firstSelected;
	});

	if (output) return data;
}

// Quick view variant options.
function btyQuickViewVariants(doc = document, slider = {}) {
	let selector = doc.querySelector('.product-variants');
	if (!selector) return;

	let variants = selector.parentNode.querySelector('[data-product-variants]'),
		quantity = selector.parentNode.querySelector('[data-inventory-quantity]'),
		field    = selector.querySelectorAll('.field-value');
	if (!field.length || !variants || !quantity) return;

	let summary      = selector.closest('.product-summary') || selector.parentNode,
		image        = summary.querySelector('.media-preview'),
		form         = summary.querySelector('[data-type="add-to-cart-form"]'),
		price        = summary.querySelector('.product-price'),
		button       = form ? form.querySelector('[name="add"]') : false,
		productId    = form ? form.querySelector('[name="id"]') : false,
		input        = form ? form.querySelector('.quantity-input') : false,
		pickup       = summary.querySelector('.pickup-availability'),
		amount       = summary.querySelector('.product-sale-label .sale-total .saved-number'),
		productUrl   = selector.getAttribute('data-url'),
		productLink  = summary.querySelector('.product-url'),
		shareInput   = summary.querySelector('.product-share .field-input'),
		variant_pick = {};

	variants = btyJsonParse(variants.textContent);
	quantity = btyJsonParse(quantity.textContent);

	field.forEach((el) => {
		if (el.type === 'radio') {
			if (el.checked) variant_pick[el.name] = el.value;
		} else {
			variant_pick[el.name] = el.value;
		}

		el.onchange = function () {
			variant_pick[el.name] = el.value;
			btyUpdateStockStatusProduct(variants, selector);

			let selected = btySelectedVariant(variant_pick, variants, slider);
			if (!selected) {
				if (button) {
					button.classList.add('disabled');
					button.innerHTML = btyStrings.product.unavailable;
				}
				if (form) form.classList.add('disabled');
				if (pickup) pickup.innerHTML = '';
				if (amount) amount.closest('.product-sale-label')?.classList.add('hidden');
				return;
			}

			// Check variant selling plan.
			if ( form ) {
				let sellingMessage = form.parentNode.querySelector( '.selling-plan-message' );

				if ( sellingMessage && ! sellingMessage.classList.contains( 'hidden' ) ) {
					sellingMessage.innerHTML = '';
					sellingMessage.classList.add( 'hidden' );
				}
			}

			if (productId) productId.value = selected.id;

			if (image && selected.featured_image) {
				image.removeAttribute('srcset');
				btyImageLoad(image, selected.featured_image.src, selected.featured_media?.id, image.parentNode);
			}

			if (productUrl) {
				if (productLink) productLink.href = productUrl + '?variant=' + selected.id;
				if (shareInput) shareInput.value = window.location.origin + productUrl + '?variant=' + selected.id;
			}

			if (price) {
				price.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
			}

			if (amount) {
				if (selected.compare_at_price) {
					let amountTotal = 100 * (selected.compare_at_price - selected.price) / selected.compare_at_price;
					amount.innerHTML = amountTotal.toFixed(0);
					amount.closest('.product-sale-label')?.classList.remove('hidden');
				} else {
					amount.closest('.product-sale-label')?.classList.add('hidden');
				}
			}

			if (input) {
				let max = quantity.find(e => e.id === selected.id);
				if (max) {
					let qty = max.qty;
					if (qty > 0) {
						if (Number(input.value) > qty) input.value = qty;
						input.setAttribute('max', qty);
					} else input.removeAttribute('max');
				} else input.removeAttribute('max');
			}

			if (form) form.classList.toggle('disabled', !selected.available);

			if (button) {
				if (selected.available) {
					let priceHTML = '';
					if (selected.compare_at_price && selected.compare_at_price > selected.price) {
						const discount = Math.round((1 - selected.price / selected.compare_at_price) * 100);
						priceHTML = `
							<span> - </span>
							${btyPriceHtml(
								selected.price,
								selected.compare_at_price,
								selected.unit_price,
								selected.unit_price_measurement
							)}
						`;
					} else {
						priceHTML = `
							<span> - </span>
							${btyPriceHtml(
								selected.price,
								selected.compare_at_price,
								selected.unit_price,
								selected.unit_price_measurement
							)}
						`;
					}
					button.innerHTML = `${btyStrings.product.add_to_cart}${priceHTML}`;
					button.classList.remove('disabled');
				} else {
					button.innerHTML = btyStrings.product.out_of_stock;
					button.classList.add('disabled');
				}
			}

			if (pickup) {
				if (selected.available) btyPickupAvailability(doc, selected.id, pickup);
				else pickup.innerHTML = '';
			}

			let selectedOption = el.closest('.variant-field')?.querySelector('.field-title .selected-value');
			if (selectedOption) selectedOption.innerText = el.value.trim();

			document.dispatchEvent(new CustomEvent('product-variant-updated', { detail: { selected } }));
		};
	});

	let firstSelected = btySelectedVariant(variant_pick, variants, slider);
	if (!firstSelected && variants.length) {
		let cheapest = variants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
		firstSelected = cheapest;
		variant_pick = cheapest.options.reduce((obj, val, index) => {
			obj['option' + (index + 1)] = val;
			return obj;
		}, {});

		if (productId) productId.value = cheapest.id;
		if (price) price.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);

		if (button) {
			if (cheapest.available) {
				button.classList.remove('disabled');
				button.innerHTML = btyStrings.product.add_to_cart;
			} else {
				button.classList.add('disabled');
				button.innerHTML = btyStrings.product.out_of_stock;
			}
		}

		field.forEach(el => {
			let value = cheapest.options.find(v => v === el.value);
			if (value) {
				el.checked = true;
				el.dispatchEvent(new Event('change'));
			}
		});
	} else if (firstSelected) {
		let checkedField = selector.querySelector('.field-value:checked');
		if (checkedField) checkedField.dispatchEvent(new Event('change'));
	}

	if (pickup && firstSelected && firstSelected.available) {
		btyPickupAvailability(doc, firstSelected.id, pickup);
	}

	if (input && firstSelected) {
		let max = quantity.find(e => e.id === firstSelected.id);
		if (max) {
			let qty = max.qty;
			if (qty > 0) {
				if (Number(input.value) > qty) input.value = qty;
				input.setAttribute('max', qty);
			} else input.removeAttribute('max');
		} else input.removeAttribute('max');
	}
}

// Quick view.
function btyQuickView( doc = document ) {
	let box      = document.querySelector( '.quick-view' ),
		content  = box ? box.querySelector( '.quick-view-content' ) : false,
		selector = doc.querySelectorAll( '.product-quick-view' );

	if ( ! content || ! selector.length ) {
		return;
	}

	selector.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();
				let product_id = el.parentNode.getAttribute( 'data-id' );
				if ( product_id == box.getAttribute( 'data-id' ) ) {
					document.documentElement.classList.add( 'quick-view-open' );
					return;
				}

				document.documentElement.classList.add( 'quick-view-open' );
				box.classList.add( 'loading' );
				box.setAttribute( 'data-id', product_id );

				fetch( el.href + '?sections=quickview' )
					.then(
						function( r ) {
							if ( 200 !== r.status ) {
								console.log( 'Status Code: ' + r.status );
								throw r;
							}

							return r.json();
						}
					).then(
						function( res ) {
							content.innerHTML = btyGetSectionHtml( res.quickview );

							let options,
								gallery = document.querySelector( '.quick-view .product-gallery .swiper' );

							if ( gallery ) {
								options = {
									slidesPerView: 1,
									spaceBetween: 10,
									navigation: {
										nextEl: '.quick-view .swiper-button-next',
										prevEl: '.quick-view .swiper-button-prev'
									},
									pagination: {
										el: '.quick-view .swiper-pagination',
										type: 'bullets',
										clickable: true
									}
								}

								let quickViewSlide = new Swiper( gallery, options );

								btyQuickViewVariants( box, quickViewSlide );
							} else {
								btyQuickViewVariants( box, {} );
							}
						}
					).catch(
						function( e ) {
							console.error( e );
						}
					).finally(
						function() {
							// Re-init share.
							btyProductShare();

							// Re-init quantity.
							btyQuantityButton();

							// Update lazy load image.
							btyAnimationImageLoad( box, 0 );

							// Re-init add to cart.
							btyAddToCart();

							// Remove loading.
							box.classList.remove( 'loading' );

							// Close popup.
							btyClosePopup( 'quick-view-open', box );
						}
					);
			}
		}
	);
}

// Update storage.
function btyUpdateStorage( key, array, id, type = 'local' ) {
	let storage = 'local' === type ? localStorage : sessionStorage;

	if ( ! storage.getItem( key ) ) {
		// Set key.
		storage.setItem( key, JSON.stringify( array ) );
	} else if ( ! storage.getItem( key ).includes( id ) ) {
		// Add new id.
		let parseStorage = btyJsonParse( storage.getItem( key ) );
		if ( ! parseStorage ) {
			return;
		}

		parseStorage.push( id );

		storage.setItem( key, JSON.stringify( parseStorage ) );
	}
}

// Update variants on popup.
function btyVariantsPopup( doc = document, popup ) {
	let variants = doc.querySelectorAll( '.product-variants' );
	if ( ! popup || ! variants.length ) {
		return;
	}

	variants.forEach(
		function( el ) {
			let variantData = el.querySelector( '[data-product-variants]' ),
				productId   = el.getAttribute( 'data-id' ),
				select      = el.querySelectorAll( '.field-value' ),
				imageLink   = popup.querySelector( '.preview-image [data-id="' + productId + '"]' ),
				image       = imageLink ? imageLink.querySelector( 'img' ) : false,
				price       = popup.querySelector( '[data-id="' + productId + '"] .product-price' ),
				stock       = popup.querySelector( '[data-id="' + productId + '"] .product-stock-status' ),
				form        = popup.querySelector( '.form-add-to-cart[data-id="' + productId + '"]' ),
				inputId     = form ? form.querySelector( '[name="id"]' ) : false,
				variantPick = {};

			if ( ! select.length ) {
				return;
			}

			variantData = variantData ? btyJsonParse( variantData.textContent ) : false;
			if ( ! variantData ) {
				return;
			}

			// Foreach.
			select.forEach(
				function( sel ) {
					variantPick[ sel.name ] = sel.value;

					// Change event.
					sel.onchange = function() {
						variantPick[ sel.name ] = sel.value;

						let selected = btySelectedVariant( variantPick, variantData );

						// Update image.
						if ( image ) {
							image.removeAttribute( 'srcset' );
							btyImageLoad( image, selected.featured_media.preview_image.src, selected.featured_media.id, image.parentNode );
						}

						// Update current variant id.
						if ( inputId ) {
							inputId.value = selected.id;
						}

						// Update stock status, add to cart button text.
						if ( selected.available ) {
							if ( form ) {
								form.classList.remove( 'disabled' );
							}

							if ( stock ) {
								stock.innerHTML = btyStrings.product.in_stock;
								stock.classList.remove( 'inventory--low' );
								stock.classList.add( 'inventory--high' );
							}
						} else {
							if ( form ) {
								form.classList.add( 'disabled' );
							}

							if ( stock ) {
								stock.innerHTML = btyStrings.product.out_of_stock;
								stock.classList.remove( 'inventory--high' );
								stock.classList.add( 'inventory--low' );
							}
						}

						// Update price.
						if ( price ) {
							price.innerHTML = btyPriceHtml( selected.price, selected.compare_at_price );
						}
					}
				}
			);

			// First matching variants.
			let firstSelected = btySelectedVariant( variantPick, variantData );
			if ( firstSelected.available ) {
				if ( form ) {
					form.classList.remove( 'disabled' );
				}

				if ( stock ) {
					stock.innerHTML = btyStrings.product.in_stock;
					stock.classList.remove( 'inventory--low' );
					stock.classList.add( 'inventory--high' );
				}
			} else {
				if ( form ) {
					form.classList.add( 'disabled' );
				}

				if ( stock ) {
					stock.innerHTML = btyStrings.product.out_of_stock;
					stock.classList.remove( 'inventory--high' );
					stock.classList.add( 'inventory--low' );
				}
			}

			if ( price ) {
				price.innerHTML = btyPriceHtml( firstSelected.price, firstSelected.compare_at_price );
			}
		}
	);
}

// Open side cart.
function btySideCart() {
	let buttons  = document.querySelectorAll( '.action-cart' ),
		sideCart = document.querySelector( '.side-cart' );
	if ( ! buttons.length || ! sideCart ) {
		return;
	}

	buttons.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();

				document.documentElement.classList.add( 'side-cart-open' );

				btyClosePopup( 'side-cart-open', sideCart );

				const closeBtn = sideCart.querySelector('.side-cart-close');
				if (closeBtn) setTimeout(() => closeBtn.focus(), 300);
				if (!sideCart._trap) {
					sideCart._trap = true; // prevent duplicates
					sideCart.addEventListener('keydown', function(ev){
						if (ev.key !== 'Tab') return;

						const els = sideCart.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
						const first = els[0];
						const last  = els[els.length - 1];

						if (ev.shiftKey && document.activeElement === first) {
							ev.preventDefault();
							last.focus();
						} else if (!ev.shiftKey && document.activeElement === last) {
							ev.preventDefault();
							first.focus();
						}
					});
				}
			}
		}
	);
}

// Get fetch config.
function btyFetchConfig( type = 'json' ) {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/' + type
		}
	};
}

// ValidateEmail.
function btyValidateEmail( selector ) {
	let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	selector.focus();

	if ( selector.value.match( mailformat ) ) {
		selector.classList.remove( 'email-invalid' );

		return true;
	} else {
		selector.classList.add( 'email-invalid' );

		return false;
	}
}

function btyCheckInventoryOnLoad(doc = document) {
	let qtyInputs = doc.querySelectorAll('input[name="quantity"][max]');
	qtyInputs.forEach((qtyInput) => {
		let max = parseInt(qtyInput.getAttribute('max') || 0);
		let val = parseInt(qtyInput.value || 1);
		let warning = qtyInput.closest('form')?.querySelector('.product-warning');

		if (max && val > max) {
			qtyInput.value = max;
			if (warning) {
				warning.innerHTML = btyGlobals.svg_warning + `Chỉ còn ${max} sản phẩm trong kho.`;
			}
		}
	});
}

// Ajax add to cart.
function btyAddToCart(doc = document) {
	let buttons = doc.querySelectorAll('.add-to-cart-button');
	if (!buttons.length) return;

	let modules = [
		{
			node: '.side-cart-inner',
			section: 'side-cart',
			selector: '.side-cart-inner'
		},
		{
			section: 'cart-count'
		}
	];

	buttons.forEach(function (button) {
		// Hidden payment button if require selling plan.
		if (button.classList.contains('selling-plan-error')) {
			let formEl = button.closest('[data-type="add-to-cart-form"]');
			if (formEl) {
				let paymentButton = formEl.querySelector('.shopify-payment-button');
				if (paymentButton) paymentButton.classList.add('hidden');
			}
		}

		button.onclick = function (e) {
			let form = button.closest('[data-type="add-to-cart-form"]');
			// Check selling plan
			if (button.classList.contains('selling-plan-error')) {
				if (form) {
					let sellingMessage = form.parentNode?.querySelector('.selling-plan-message');
					if (sellingMessage) {
						sellingMessage.innerHTML = btyStrings.product.selling_plan_message;
						sellingMessage.classList.remove('hidden');
					}
				}
				e.preventDefault();
				return;
			}

			let sideCartNode = document.querySelector('.side-cart');
			if (sideCartNode) sideCartNode._lastFocused = document.activeElement;

			if (button.classList.contains('disabled')) {
				e.preventDefault();
				return;
			}

			if (button.tagName.toUpperCase() === 'A') return;
			e.preventDefault();

			if (
				button.classList.contains('add-product-variants') &&
				window.matchMedia('(max-width: 767px)').matches
			) {
				return;
			}

			button.classList.add('loading');

			if (!form) {
				button.classList.remove('loading');
				return;
			}

			let formData = new FormData(form),
				warning = form.parentNode.querySelector('.product-warning'),
				config = btyFetchConfig('javascript');

			let qtyInput = form.querySelector('input[name="quantity"]');
			let max = parseInt(qtyInput?.getAttribute('max') || 0);
			let val = parseInt(qtyInput?.value || 1);

			// Validate.
			if (max && val > max) {
				if (warning) {
					const msg = btyStrings.product.warning_message.replace('{{max}}', max);
					console.log( msg );
					warning.innerHTML = btyGlobals.svg_warning + msg;
					warning.classList.remove('hidden');
				}

				qtyInput.value = max;
				button.classList.remove('loading');
				return;
			}


			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			formData.append('sections', modules.map((s) => s.section));
			formData.append('sections_url', window.location.pathname);
			config.body = formData;

			fetch(btyGlobals.cart_add_url, config)
				.then((r) => r.json())
				.then((res) => {
					if (warning) {
						warning.innerHTML = res.status
							? btyGlobals.svg_warning + (res.message || res.description)
							: '';
					}

					if (res.status) return;

					const safeModules = modules.filter(
						(m) => res.sections && res.sections[m.section]
					);

					if (safeModules.length) {
						btyUpdateHtml(res.sections, safeModules);
					}
					btyAnimationImageLoad();
					btyScrollAnimationTrigger();
					btyMinicartRecommendations();
					btySideCartPopupOuter();
					if (res.sections && res.sections['cart-count']) {
						btyCartItemCount(
							btyGetSectionHtml(res.sections['cart-count'], '.shopify-section')
						);
					}
					setTimeout(() => {
						document.documentElement.classList.add('side-cart-open');
					});
					btyUpdateProgressBarCart(res.total_price);
				})
				.catch((e) => console.error(e))
				.finally(() => {
					btyQuantityButton();
					btyUpdateProductQuantity();
					button.classList.remove('loading');

					let quickAddLoading = doc.querySelector('.quick-add-box .field-item.loading');
					if (quickAddLoading) quickAddLoading.classList.remove('loading');

					document.documentElement.classList.remove('quick-view-open');

					btyClosePopup('side-cart-open', document.querySelector('.side-cart'));

					let sideCart = document.querySelector('.side-cart'),
						closeButton = sideCart?.querySelector('.side-cart-close');

					if (closeButton) {
						setTimeout(() => closeButton.focus(), 400);
					}

					btyAgreeToTerms();
				});
		};
	});
}

// Ajax add all set to cart.
function btyAddMultiProductToCart(doc = document) {
	let selectors = doc.querySelectorAll('.add-multiple-products');
	if (!selectors.length) return;

	selectors.forEach(function (el) {
		let items = el.parentNode.querySelectorAll('.product-card [name="id"]');
		if (!items.length) return;

		items.forEach(function (item, index) {
			item.addEventListener('change', function () {
				let currentId = el.querySelector('[data-index="' + index + '"]');
				if (currentId) currentId.value = item.value;
			});
		});
	});
}

// Check product inventory.
function btyProductInventory( doc = document, variants = {} ) {
	let variant   = {},
		quickAdds = doc.querySelectorAll( '.quick-add-box .field-swatch .selected' ),
		swatches  = doc.querySelector( '.product-swatches .selected' );
	if ( ! quickAdds.length && ! swatches ) {
		return;
	}

	let selected = btySelectedVariant( variant, variants );
}

/**
 * Update stock status
 *
 * @param  object variants The product variants.
 * @param  node   siblings The product card.
 */
function btyUpdateStockStatus( variants, card ) {
	let getSelected = card.querySelectorAll( '.field-swatch .selected' ),
		swatch      = card.querySelector( '.product-swatches .swatch.selected' );
	if ( getSelected.length ) {
		getSelected.forEach(
			function( el ) {
				let current = {};

				// Check color variant.
				if ( swatch ) {
					current[ swatch.getAttribute( 'data-name' ) ] = swatch.getAttribute( 'data-value' );
				}

				// Get siblings to save 2 fix variant, ex: ABC ABD ABX ABY.
				let siblings = btySiblings(
					el.parentNode,
					function( e ) {
						return e.classList.contains( 'field-swatch' );
					}
				);

				if ( siblings.length ) {
					siblings.forEach(
						function( si ) {
							let siSelected = si.querySelector( '.selected' );
							if ( ! siSelected ) {
								return;
							}

							current[ siSelected.getAttribute( 'data-name' ) ] = siSelected.getAttribute( 'data-value' );
						}
					);
				}

				// Update stock status on quick add.
				let indexSelected = el.parentNode.querySelectorAll( '.field-item' );
				if ( indexSelected.length ) {
					indexSelected.forEach(
						function( is ) {
							current[ is.getAttribute( 'data-name' ) ] = is.getAttribute( 'data-value' );

							let selected = btySelectedVariant( current, variants );
							if ( selected ) {
								if ( selected.available ) {
									is.classList.remove( 'soldout' );
								} else {
									is.classList.add( 'soldout' );
								}
							} else {
								is.classList.add( 'soldout' );
							}
						}
					);
				}
			}
		);
	}

	if ( swatch ) {
		swatch.parentNode.querySelectorAll( '.swatch' ).forEach(
			function( el ) {
				let current = {};

				if ( getSelected.length ) {
					getSelected.forEach(
						function( si ) {
							current[ si.getAttribute( 'data-name' ) ] = si.getAttribute( 'data-value' );
						}
					);
				}

				current[ el.getAttribute( 'data-name' ) ] = el.getAttribute( 'data-value' );

				let selected = btySelectedVariant( current, variants );
				if ( selected ) {
					if ( selected.available ) {
						el.classList.remove( 'soldout' );
					} else {
						el.classList.add( 'soldout' );
					}
				} else {
					el.classList.add( 'soldout' );
				}
			}
		);
	}
}

/**
 * Update stock status for product page
 *
 * @param  object variants The product variants.
 * @param  node   siblings The product card.
 */
function btyUpdateStockStatusProduct( variants, element ) {
	let getSelected = element.querySelectorAll( '.variant-field .field-value:checked' );
	if ( ! getSelected.length ) {
		return;
	}

	getSelected.forEach(
		function( el ) {
			let current = {};

			// Get siblings to save 2 fix variant, ex: ABC ABD ABX ABY.
			let siblings = btySiblings(
				el.closest( '.variant-field' ),
				function( e ) {
					return e.classList.contains( 'variant-field' );
				}
			);

			if ( siblings.length ) {
				siblings.forEach(
					function( si ) {
						let siSelected = si.querySelector( '.field-value:checked' );
						if ( ! siSelected ) {
							return;
						}

						current[ siSelected.getAttribute( 'name' ) ] = siSelected.getAttribute( 'value' );
					}
				);
			}

			// Update stock status on quick add.
			let indexSelected = el.closest( '.variant-field' ).querySelectorAll( '.field-value' );
			if ( indexSelected.length ) {
				indexSelected.forEach(
					function( is ) {
						let inputId = is.getAttribute( 'id' ),
							label   = inputId ? is.parentNode.querySelector( 'label[for="' + inputId + '"]' ) : false;

						if ( ! label ) {
							return;
						}

						current[ is.getAttribute( 'name' ) ] = is.getAttribute( 'value' );

						let selected = btySelectedVariant( current, variants );
						if ( selected ) {
							if ( selected.available ) {
								label.classList.remove( 'soldout' );
							} else {
								label.classList.add( 'soldout' );
							}
						} else {
							label.classList.add( 'soldout' );
						}
					}
				);
			}
		}
	);
}

// Quick add.
function btyQuickAdd( doc = document ) {
	let selectors = doc.querySelectorAll( '.quick-add .field-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			el.onclick = function() {
				let form   = el.closest( '[data-type="add-to-cart-form"]' ),
					submit = form ? form.querySelector( '[type="submit"]' ) : false,
					card   = form.closest( '.product-card' );
				if ( ! card || ! submit ) {
					return;
				}

				// Highlight selected.
				if ( ! el.classList.contains( 'selected' ) ) {
					let oldActive = el.parentNode.querySelector( '.field-item.selected' );
					if ( oldActive ) {
						oldActive.classList.remove( 'selected' );
					}

					el.classList.add( 'selected' );
				}

				// Update swatch.
				let variants  = form.querySelector( '[data-product-variants]' ),
					productId = form.querySelector( '[name="id"]' );

				if ( productId && variants ) {
					// Json parse.
					variants = btyJsonParse( variants.textContent );

					let variant_pick     = {},
						quickAddSelected = card.querySelectorAll( '.quick-add-box .selected' );

					if ( quickAddSelected.length ) {
						quickAddSelected.forEach(
							function( qas ) {
								variant_pick[ qas.getAttribute( 'data-name' ) ] = qas.getAttribute( 'data-value' );
							}
						);
					}

					// Get option from Swatch.
					let selectedSwatch = card.querySelector( '.product-swatches .swatch.selected' );
					if ( selectedSwatch ) {
						variant_pick[ selectedSwatch.getAttribute( 'data-name' ) ] = selectedSwatch.getAttribute( 'data-value' );
					}

					// Found selected variant.
					let selected = btySelectedVariant( variant_pick, variants );
					if ( selected ) {
						productId.value = selected.id;

						// Update stock status.
						btyUpdateStockStatus( variants, card );

						// Update product price.
						let price = card.querySelector( '.product-price' );
						if ( price ) {
							price.innerHTML = btyPriceHtml( selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement );
						}

						if ( selected.available ) {
							el.classList.add( 'loading' );

							submit.click();
						} else {
							alert( 'This item is currently out of stock.' );

							return;
						}
					}
				}
			}

			el.addEventListener('keydown', function(e) {
			// Trigger on Enter or Space
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					el.click();
				}
			});
		}
	);
}

// Swatch list.
function btySwatch( doc = document ) {
	let swatch = doc.querySelectorAll( '.product-card .swatch' );
	if ( ! swatch.length ) {
		return;
	}

	swatch.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();

				if ( el.classList.contains( 'selected' ) ) {
					return;
				}

				let swatchValue = el.parentNode.querySelector( '.swatch-selected' );
				if ( swatchValue ) {
					swatchValue.innerText = el.innerText.trim();
				}

				// Get wrapper.
				let card    = el.closest( '.product-card' ),
					wrapper = card.querySelector( '.product-media-wrap' );
				if ( ! wrapper ) {
					return;
				}

				// Get product image.
				let image = wrapper.querySelector( '.product-image img' );

				// Handle loading image.
				const imageLoadHandle = function( dataSrc, main ) {
					if ( ! image ) {
						return;
					}

					let newImage     = new Image(),
						variationImg = el.getAttribute( 'data-key' ) || false,
						mainImg      = image.getAttribute( 'data-key' ) || false;

					newImage.crossOrigin = 'anonymous';

					// Main image.
					if ( main ) {
						variationImg = mainImg;
					}

					// Check local storage first.
					if ( sessionStorage.getItem( variationImg ) ) {
						image.src = sessionStorage.getItem( variationImg );
						image.removeAttribute( 'srcset' );
						return;
					}

					// Save main product image first.
					if ( 'string' !== typeof( image.getAttribute( 'data-loaded' ) ) && mainImg ) {
						let mainImage = new Image();

						mainImage.crossOrigin = 'anonymous';

						mainImage.onload = function() {
							let renderMainImage = btyGetImageSrc( mainImage );

							if ( mainImg ) {
								sessionStorage.setItem( mainImg, renderMainImage );
							}

							image.setAttribute( 'data-loaded', '' );
						}

						mainImage.src = image.src;
					}

					// Add loading animation.
					wrapper.classList.add( 'loading' );

					// Handle.
					newImage.onload = function() {
						wrapper.classList.remove( 'loading' );
						let renderImage = btyGetImageSrc( newImage );

						// Set final image src.
						image.src = renderImage;
						image.removeAttribute( 'srcset' );

						// Save image to local storage.
						if ( variationImg ) {
							sessionStorage.setItem( variationImg, renderImage );
						}
					}

					newImage.onerror = function() {
						wrapper.classList.remove( 'loading' );
					}

					// Set image src for 'newImage.onload' function handle.
					newImage.src = dataSrc;
				}

				// Get old selected.
				let oldActive = card.querySelector( '.swatch.selected' );
				if ( oldActive ) {
					oldActive.classList.remove( 'selected' );
				}

				// Set swatch selected.
				el.classList.add( 'selected' );

				// Update product image src.
				if ( image ) {
					let src = el.getAttribute( 'data-src' ) || '';
					if ( src && src != image.src ) {
						imageLoadHandle( src );
					}
				}

				// Update swatch.
				let form      = el.closest( '.product-card' ).querySelector( '[data-type="add-to-cart-form"]' ),
					addToCart = form ? form.querySelector( '.add-to-cart-button' ) : false,
					variants  = form ? form.querySelector( '[data-product-variants]' ) : false,
					productId = form ? form.querySelector( '[name="id"]' ) : false;

				if ( productId && variants ) {
					let variant_pick = {},
						dataName     = el.getAttribute( 'data-name' ),
						dataValue    = el.getAttribute( 'data-value' );

					variants = btyJsonParse( variants.textContent );

					variant_pick[ dataName ] = dataValue;

					// Update stock status.
					btyUpdateStockStatus( variants, card );

					// Get quick add value.
					let quickAdd = card.querySelectorAll( '.quick-add .field-item.selected' );
					if ( quickAdd.length ) {
						quickAdd.forEach(
							function( qa ) {
								variant_pick[ qa.getAttribute( 'data-name' ) ] = qa.getAttribute( 'data-value' );
							}
						);
					}

					let selected = btySelectedVariant( variant_pick, variants );
					if ( selected ) {
						productId.value = selected.id;

						// Dispatch 'change' event.
						productId.dispatchEvent( new Event( 'change' ) );

						// Update add to cart button status.
						if ( addToCart ) {
							if ( selected.available ) {
								addToCart.classList.remove( 'disabled' );
							} else {
								addToCart.classList.add( 'disabled' );
							}
						}

						// Update product url.
						let ahref = el.closest( '.product-card' ).querySelectorAll( 'a[href]:not(.swatch)' );
						if ( ahref.length ) {
							ahref.forEach(
								function( link ) {
									link.setAttribute( 'href', link.href.split( '?' )[1] ? link.href.split( '?' )[0] + '?variant=' + selected.id : link.href + '?variant=' + selected.id );
								}
							);
						}
					}
				}
			}
		}
	);
}

// Product tabs.
function btyProductTabs(doc = document, event = {}) {
	let selectors = doc.querySelectorAll('.tabs .tab-head');
	if (!selectors.length) return;

	selectors.forEach(function (el) {
		let wrap   = el.closest('.tabs'),
			index  = el.getAttribute('data-index'),
			tab    = wrap.querySelector('.tab-content[data-index="' + index + '"]'),
			slide  = wrap.querySelector('.product-main-slide:nth-child(' + index + ')'), // slide tương ứng
			arrows = wrap.querySelector('.vrworld-arrows[data-index="' + index + '"]');

		if (!tab) return;

		// Design mode.
		if (Shopify.designMode && Object.keys(event).length) {
			let currentTab = doc.querySelector('.tab-head[data-id="' + event.detail.blockId + '"]');
			if (currentTab) currentTab.click();
		}

		el.addEventListener('click', function () {

			if (el.classList.contains('active')) return;

			let navActived    = wrap.querySelector('.tab-head.active'),
				tabActived    = wrap.querySelector('.tab-content.active'),
				slideActived  = wrap.querySelector('.product-main-slide.active'),
				arrowsActived = wrap.querySelector('.vrworld-arrows.active');

			// Remove active
			if (navActived) navActived.classList.remove('active');
			if (tabActived) tabActived.classList.remove('active');
			if (slideActived) slideActived.classList.remove('active');
			if (arrowsActived) arrowsActived.classList.remove('active');

			// Add active
			el.classList.add('active');
			tab.classList.add('active');
			if (slide) slide.classList.add('active');
			if (arrows) arrows.classList.add('active');
		});
	});

	// Dropdown
	let dropdown = doc.querySelectorAll('.dropdown-content li');
	if (dropdown.length) {
		dropdown.forEach(function (el) {
			el.addEventListener('click', function () {
				let parent  = el.closest('.tabs'),
					current = parent.querySelector('.tab-head[data-index="' + el.getAttribute('data-index') + '"]');
				if (!current) return;

				current.click();
			});
		});
	}
}


// Video.
function btyVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.video-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let imageWrapper = el.querySelector( '.video-image-wrapper' );

			if ( ! imageWrapper ) {
				return;
			}

			let playBtn = el.querySelector('.play-video');
			if (playBtn) {
				playBtn.addEventListener('click', function(e) {
					e.preventDefault();
					imageWrapper.click();
				});
			}

			imageWrapper.addEventListener(
				'click',
				function() {
					let iframe = el.querySelector( 'iframe' ),
						video  = el.querySelector( 'video' );

					if ( iframe ) {
						iframe.src = iframe.getAttribute( 'data-src' );

						btyMediaAction( el, 'play' );
					}

					if ( video ) {
						video.setAttribute( 'data-ready', '' );

						let playPromise = video.play();
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				}
			);
		}
	);
}

// Video background.
function btyBackgroundVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.toggle-popup-bg-video' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			el.addEventListener(
				'click',
				function() {
					let section = el.closest( '.video-background-section' ),
						popup   = section ? section.querySelector( '.background-video-popup' ) : false,
						iframe  = popup ? popup.querySelector( 'iframe' ) : false,
						video   = popup ? popup.querySelector( 'video' ) : false;

					if ( ! popup ) {
						return;
					}

					document.documentElement.classList.add( 'bg-video-popup-open' );
					btyClosePopup( 'bg-video-popup-open', popup );

					if ( iframe ) {
						iframe.src = iframe.getAttribute( 'data-src' );

						btyMediaAction( popup, 'play' );
					}

					if ( video ) {
						video.setAttribute( 'data-ready', '' );

						let playPromise = video.play();
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				}
			);
		}
	);
}

// Action for media.
function btyMediaAction( doc = document, type = 'pause' ) {
	let video = doc.querySelectorAll( '.js-youtube, .js-vimeo, video' );
	if ( ! video.length ) {
		return;
	}

	let youtubeFunc = 'stopVideo';

	switch ( type ) {
		case 'pause':
			youtubeFunc = 'pauseVideo';
			break;
		case 'play':
			youtubeFunc = 'playVideo';
			break;
		case 'stop':
			youtubeFunc = 'stopVideo';
			break;
	}

	if ( video.length ) {
		video.forEach(
			function( vd ) {
				if ( 'video' === vd.tagName.toLowerCase() ) {
					let playPromise = vd.play();

					if ( 'pause' === type ) {
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {
									vd.pause();
								}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					} else {
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				} else if ( vd.classList.contains( 'js-youtube' ) ) {
					vd.contentWindow.postMessage( '{"event":"command","func":"' + youtubeFunc + '","args":""}', '*' );
				} else if ( vd.classList.contains( 'js-vimeo' ) ) {
					vd.contentWindow.postMessage( '{"method":"' + type + '"}', '*' );
				}
			}
		);
	}
}

// Address box section.
function btyAddress( doc =document ) {
	let selectors = doc.querySelectorAll( '.address-box .address-summary' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let items = el.querySelectorAll( '.summary-item' );
			if ( items.length < 2 ) {
				return;
			}

			items.forEach(
				function( im, index ) {
					im.addEventListener(
						'click',
						function( e ) {
							e.preventDefault();

							const mobile = window.matchMedia( '(max-width: 767px)' ).matches;

							let oldActive = el.querySelector( '.summary-item.active' ),
								subBox    = im.querySelector( '.address-sub' ),
								image     = el.parentNode.querySelector( '.address-content-inner' );

							if ( im.classList.contains( 'active' ) ) {
								return;
							}

							if ( oldActive ) {
								let oldSubBox = oldActive.querySelector( '.address-sub' );
								if ( oldSubBox && mobile ) {
									btySlideUp( oldSubBox );
								}
								oldActive.classList.remove( 'active' );
							}

							if ( image ) {
								image.setAttribute( 'data-level', index );
							}

							im.classList.add( 'active' );

							if ( subBox && mobile ) {
								btySlideDown( subBox );
							}
						}
					);
				}
			);
		}
	);
}

// Pickup availability.
function btyPickupAvailability( doc = document, variant_id = false, pickup = false ) {
	let panel = document.querySelector( '.pickup-availability-panel' );
	if ( ! pickup || ! panel ) {
		return;
	}

	fetch( '/variants/' + variant_id + '?section_id=pickup-availability' )
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
				pickup.innerHTML = btyGetSectionHtml( res, '.pickup-availability-info', 'outer' );
				panel.innerHTML  = btyGetSectionHtml( res, '.pickup-availability-modal', 'outer' );

				let toggle = pickup.querySelector( '.toggle-modal' );
				if ( toggle ) {
					toggle.onclick = function() {
						document.documentElement.classList.add( 'pickup-availability-open' );

						btyClosePopup( 'pickup-availability-open', panel );
					}
				}
			}
		).catch(
			function( e ) {
				console.error( e );
			}
		);
}

// Pickup availability for simple product.
function btyPickupAvailabilityInit( doc = document ) {
	let variants = doc.querySelectorAll( '.product-variants' );
	if ( variants.length ) {
		return;
	}

	let inner     = doc.querySelector( '.product-summary-inner[data-selected-id]' ),
		pickup    = doc.querySelector( '.pickup-availability' ),
		productId = inner ? inner.getAttribute( 'data-selected-id' ) : false;

	if ( ! pickup || ! productId ) {
		return;
	}

	btyPickupAvailability( doc, productId, pickup );
}

// Popup content.
function btyProductPopup( doc = document ) {
	let selectors = doc.querySelectorAll( '.product-popup' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let summary = el.closest( '.product-summary' ),
				button  = el.querySelector( '.popup-toggle' ),
				view    = el.querySelector( '.popup-view' ),
				close   = el.querySelector( '.popup-close' );

			if ( ! summary || ! button || ! view || ! close ) {
				return;
			}

			button.onclick = function() {
				summary.classList.add( 'open' );

				// Target.
				view.onclick = function( e ) {
					if ( view !== e.target ) {
						return;
					}

					summary.classList.remove( 'open' );
				}

				// Use ESC key.
				document.addEventListener(
					'keyup',
					function( e ) {
						if ( 27 !== e.keyCode ) {
							return;
						}

						summary.classList.remove( 'open' );
					}
				);

				// Use close button.
				close.onclick = function() {
					summary.classList.remove( 'open' );
				}
			}
		}
	);
}

// Share button.
function btyProductShare( doc = document ) {
	let selector = doc.querySelector( '.product-share[data-os]' );
	if ( ! selector ) {
		return;
	}

	let button  = selector.querySelector( '.share-button' ),
		summary = selector.querySelector( 'summary' ),
		input   = selector.querySelector( '.field-input' ),
		message = selector.querySelector( '.share-message' ),
		copy    = selector.querySelector( '.share-button-copy' ),
		close   = selector.querySelector( '.share-button-close' );

	if ( ! button || ! summary || ! copy || ! close ) {
		return;
	}

	let closeAction = function() {
		summary.parentNode.removeAttribute( 'open' );
		close.classList.add( 'hidden' );
		message.classList.add( 'hidden' );
		message.textContent = '';
	}

	if ( navigator.share ) {
		button.classList.remove( 'hidden' );
		button.onclick = function() {
			navigator.share(
				{
					url: document.location.href,
					title: document.title
				}
			);
		}
	} else {
		summary.classList.remove( 'hidden' );

		copy.onclick = function() {
			navigator.clipboard.writeText( input.value ).then(
				function() {
					message.classList.remove( 'hidden' );
					close.classList.remove( 'hidden' );

					message.textContent = btyStrings.general.share_success;
				}
			);
		}

		// Click any to close.
		document.addEventListener(
			'click',
			function( e ) {
				if ( e.target.closest( '.product-share' ) ) {
					return;
				}

				closeAction();
			}
		);

		// Use ESC key.
		document.addEventListener(
			'keyup',
			function( e ) {
				if ( 27 !== e.keyCode ) {
					return;
				}

				closeAction();
			}
		);

		// Close button.
		close.onclick = closeAction;
	}
}

// Sale notification.
function btySalesNotification( doc = document ) {
	let selector = doc.querySelector( '.sales-notification' );
	if ( ! selector ) {
		return;
	}

	let inner   = selector.querySelector( '.sn-inner' ),
		options = selector.querySelector( '[data-options]' ),
		items   = selector.querySelector( '[data-items]' );
	if ( ! inner || ! options || ! items ) {
		return;
	}

	let parseOptions = btyJsonParse( options.content.textContent ),
		parseItems   = new DOMParser().parseFromString( items.innerHTML, 'text/html' );

	// Remove html template.
	options.remove();
	items.remove();

	let length = parseItems.querySelectorAll( '.sn-item' );
	if ( ! length.length ) {
		return;
	}

	// Get random item in array.
	const randomItem = function( arr = [] ) {
		return arr[ Math.floor( Math.random() * arr.length ) ];
	}

	// Display function.
	const displayFn = function() {
		let item     = randomItem( length ),
			time     = item.querySelector( '.sn-time' ),
			customer = item.querySelector( '.sn-customer' );

		// Append time text.
		if ( time ) {
			time.innerText = randomItem( parseOptions.virtual_times );
		}

		// Append customer text.
		if ( customer ) {
			customer.innerText = randomItem( parseOptions.virtual_customers ) + parseOptions.purchased;
		}

		inner.innerHTML = item.outerHTML;

		let current = inner.querySelector( '.sn-item' );
		if ( ! current ) {
			return;
		}

		// Set animation.
		setTimeout(
			function() {
				current.classList.add( 'active' );
			},
			50
		);

		// Start loading bar when animation end.
		setTimeout(
			function() {
				current.insertAdjacentHTML( 'beforeend', '<span class="underline-animated' + ( parseOptions.loading_bar ? '' : ' visibility-hidden' ) + '"></span>' );

				// Remove notification after animation end.
				let animation = current.querySelector( '.underline-animated' );
				if ( animation ) {
					animation.addEventListener(
						'animationend',
						function() {
							current.classList.add( 'down' );
						}
					);
				}
			},
			300
		);

		// Remove notification by click to Close button.
		let closeBtn = current.querySelector( '.sn-close' );
		if ( closeBtn ) {
			closeBtn.onclick = function() {
				current.classList.add( 'down' );
			}
		}
	}

	let init, timeTotal = parseOptions.time_total * 1000;
	setTimeout(
		function() {
			displayFn();

			init = setInterval( displayFn, timeTotal );
		},
		( parseOptions.time_init * 1000 )
	);
}

// Newsletter popup.
function btyNewsletterPopup( doc = document ) {
	let form = doc.querySelector( '.newsletter-popup-form' );
	if ( ! form ) {
		return;
	}

	let delay = form.getAttribute( 'data-delay' );

	setTimeout(
		function() {
			// Always show popup when Display mode set to Test mode.
			if ( Shopify.designMode && '' === form.getAttribute( 'data-mode' ) ) {
				form.parentNode.classList.add( 'closed' );
			} else {
				if ( 'test' === form.getAttribute( 'data-mode' ) ) {
					form.parentNode.classList.remove( 'closed' );
				} else {
					if ( form.classList.contains( 'first-visit' ) ) {
						const getCookie = new URLSearchParams( document.cookie.replaceAll( '&', '%26' ).replaceAll( '; ', '&' ) );
						if ( ! getCookie.get( 'newsletter-popup-cookie' ) ) {
							form.parentNode.classList.remove( 'closed' );
						}

						function setCookie( cname, cvalue, exdays ) {
							let d = new Date();

							d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000) );

							let expires = 'expires=' + d.toUTCString();

							document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
						}

						setCookie( 'newsletter-popup-cookie', 1, 30 );
					} else {
						form.parentNode.classList.remove( 'closed' );
					}
				}
			}

			const isAgeVerification = form.closest( '.age-verification-section' ) !== null;

			// Click to popup overlay.
			if ( ! isAgeVerification ) {
				form.addEventListener('click', function ( e ) {
					if ( e.target !== form ) return;
					form.parentNode.classList.add( 'closed' );
				});

				// Use ESC key.
				document.addEventListener('keyup', function ( e ) {
					if ( e.keyCode !== 27 ) return;
						form.parentNode.classList.add( 'closed' );
					});
				}

				// Use close buttons.
				const section = form.closest('.newsletter-popup-section');

				form.querySelectorAll('.close-button').forEach(btn => {
					btn.addEventListener('click', function (e) {
						e.preventDefault();
						e.stopPropagation();
						section.classList.add('closed');
					});
				});
			},
		Number( delay )
	);
}

// Age verification popup.
function btyAgeverificationPopup(doc = document) {
	// Function to check the cookies.
	function checkAgeVerification() {
		const cookieString = doc.cookie && doc.cookie.split('; ').find(row => row.startsWith('acceptAgeVerification='));
		if ( ! cookieString || Shopify.designMode ) {
			let allowSection = doc.querySelector( ".age-verification-section .allow" );
			if (allowSection) {
				allowSection.classList.remove( "hidden" );
			}
		}
	}

	// Function to set the cookie.
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = "expires=" + d.toUTCString();
		doc.cookie = `${name}=${value};${expires};path=/`;
	}

	// Check and attach event to the "Yes" button.
	let yesBtn = doc.querySelector( ".age-verification-section .yes-btn" );

	if (yesBtn) {
		yesBtn.addEventListener("click", function () {
			let allowSection = doc.querySelector( ".age-verification-section .allow" );
			if (allowSection) {
				allowSection.classList.add( "hidden" );
			}
			// Add 'closed' class and set cookie when clicking "Yes".
			let form = doc.querySelector( '.age-verification-section .newsletter-popup-form' );
			if (form) {
				form.parentNode.classList.add( 'closed' );
			}
			setCookie( 'acceptAgeVerification', 1, 30 );
		});
	}

	// Check and attach event to the "No" button.
	let noBtn = doc.querySelector( ".age-verification-section .no-btn" );
	if (noBtn) {
		noBtn.addEventListener("click", function () {
			let allowSection    = doc.querySelector( ".age-verification-section .allow" );
			let notAllowSection = doc.querySelector( ".age-verification-section .not-allow" );
			if (allowSection && notAllowSection) {
				allowSection.classList.add( "hidden" );
				notAllowSection.classList.remove( "hidden" );
			}
		});
	}

	// Check and attach event to the "Back" button.
	let backBtn = doc.querySelector( ".age-verification-section .back-btn" );
	if (backBtn) {
		backBtn.addEventListener("click", function () {
			let notAllowSection = doc.querySelector( ".age-verification-section .not-allow" );
			let allowSection    = doc.querySelector( ".age-verification-section .allow" );
			if (notAllowSection && allowSection) {
				notAllowSection.classList.add( "hidden" );
				allowSection.classList.remove( "hidden" );
			}
		});
	}

	// Call the cookie check function.
	checkAgeVerification();
}

// Cookies bar.
function btyCookiesBar( doc = document ) {
	let box    = doc.querySelector( '.cookies-bar' ),
		button = doc.querySelector( '.button-cookies' );

	if ( ! box || ! button || ( Shopify.designMode && '' === box.getAttribute( 'data-mode' ) ) ) {
		return;
	}

	const getCookie = new URLSearchParams( document.cookie.replaceAll( '&', '%26' ).replaceAll( '; ', '&' ) );
	if ( ! getCookie.get( 'acceptCookies' ) ) {
		box.classList.add( 'show' );
	}

	function setCookie( cname, cvalue, exdays ) {
		let d = new Date();

		d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000) );

		let expires = 'expires=' + d.toUTCString();

		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	button.onclick = function () {
		if ( '' === box.getAttribute( 'data-mode' ) ) {
			setCookie( 'acceptCookies', 1, 30 );
		} else {
			document.cookie = 'acceptCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		}

		box.classList.remove( 'show' );
	}
}

// Hover media video.
function btyHoverMediaVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.hover-media-video' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let parent = el.parentNode;

			parent.addEventListener(
				'mousemove',
				function( e ) {
					btyMediaAction( parent, 'play' );

					return;
				}
			);

			parent.addEventListener(
				'mouseleave',
				function( e ) {
					btyMediaAction( parent, 'pause' );

					return;
				}
			);
		}
	);
}

// Animation for image load.
function btyAnimationImageLoad( doc = document, delay = 0 ) {
	let images = doc.querySelectorAll( '.lazy-image img' );
	if ( ! images.length ) {
		return;
	}

	const imgLazyObserver = new IntersectionObserver(
		function( entries, observer ) {
			entries.forEach(
				function( entry ) {
					if ( entry.isIntersecting ) {
						if ( entry.target.dataset.src ) {
							entry.target.src = entry.target.dataset.src;
						}

						if ( entry.target.dataset.srcSet ) {
							entry.target.srcSet = entry.target.dataset.srcSet;
						} else if ( entry.target.dataset.srcset ) {
							entry.target.setAttribute( 'srcset', entry.target.dataset.srcset );
						}

						entry.target.removeAttribute( 'data-src' );
						entry.target.removeAttribute( 'data-srcset' );

						entry.target.addEventListener(
							'load',
							function () {
								entry.target.parentNode.classList.add( 'lazy-loaded' );
							}
						);

						observer.unobserve( entry.target );
					}
				}
			);
		},
		{
			rootMargin: '-20px 0px -20px 0px'
		}
	);

	images.forEach(
		function( img ) {
			if ( img.parentNode.classList.contains( 'lazy-loaded' ) ) {
				return;
			}

			imgLazyObserver.observe( img );
		}
	);
}

// Animation for animated-image-collage.
function btyAnimationCollageLoad(doc = document) {
	const sections = doc.querySelectorAll( '.collection-list-section' );

	if ( sections.length === 0 ) {
		return;
	}

	const observer = new IntersectionObserver(( entries, obs ) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const section = entry.target;

				section.querySelectorAll( '.lazy-image img' ).forEach(( img ) => {
					if (img.dataset.src) {
						img.src = img.dataset.src;
					}
					if (img.dataset.srcset) {
						img.srcset = img.dataset.srcset;
					}
					img.removeAttribute( 'data-src' );
					img.removeAttribute( 'data-srcset' );

					if (img.parentNode) {
						img.parentNode.classList.add( 'lazy-loaded' );
					}
				});

				obs.unobserve( section );
			}
		});
	}, { rootMargin: '50px' });

	sections.forEach(( section ) => observer.observe( section ));
}

// Collection sticky.
function btyCollectionSticky( doc = document ) {
	let items = doc.querySelectorAll( '.collection-sticky' );
	if ( ! items.length ) {
		return
	}

	const stickCollection = function() {
		items.forEach(
			function( el ) {
				let box        = el.querySelector( '.heading-box' ),
					subHeading = box ? box.querySelector( '.sub-heading .dynamic-label' ) : false,
					heading    = box ? box.querySelector( '.heading .dynamic-label' ) : false,
					button     = box ? box.querySelector( '.collection-list-button .dynamic-label' ) : false,
					cards      = el.querySelectorAll( '.card-item' );
				if ( ! cards.length ) {
					return;
				}

				for ( let i = 0, j = cards.length; i < j; i++ ) {
					let rect    = cards[i].getBoundingClientRect(),
						index   = i + 1,
						current = el.querySelector( '.card-item:nth-child(' + index + ')' );

					if ( ! current ) {
						return;
					}

					let title          = current.getAttribute( 'data-title' ),
						dataSubHeading = current.getAttribute( 'data-subheading' ),
						dataHeading    = current.getAttribute( 'data-heading' ),
						href           = current.getAttribute( 'data-href' );
					if ( rect.top <= 1 && ( rect.top >= rect.height * -1 ) ) {
						if ( button && button.innerText != title ) {
							if ( href.trim() ) {
								button.parentNode.href = href;
							}

							if ( title.trim() ) {
								button.innerText = title;
							}

							button.parentNode.classList.add( 'bounce-it' );
							setTimeout(
								function() {
									button.parentNode.classList.remove( 'bounce-it' );
								},
								1000
							);
						}

						if ( dataSubHeading.trim() && subHeading ) {
							subHeading.innerText = dataSubHeading;
						}

						if ( dataHeading.trim() && heading ) {
							heading.innerText = dataHeading;
						}
					}
				}
			}
		);
	}

	stickCollection();

	// Trigger.
	window.addEventListener(
		'scroll',
		function() {
			stickCollection();
		}
	);
}

// Recipient form.
function btyRecipientForm( doc = document ) {
	let input  = doc.querySelector( '.recipient-checkbox-label input[type="checkbox"]' ),
		fields = doc.querySelector( '.recipient-fields' );

	if ( ! input || ! fields ) {
		return;
	}

	input.onchange = function() {
		if ( input.checked ) {
			fields.classList.add( 'open' );
		} else {
			fields.classList.remove( 'open' );
		}
	}
}

// Load media.
function btyLoadMedia( selector = undefined, action = 'play' ) {
	if ( ! selector ) {
		return;
	}

	let wrapper = selector.querySelector( '.media-preview-wrap' ),
		playBtn = selector.querySelector( '.view-media' );

	if ( ! playBtn ) {
		return;
	}

	// Return if media loaded.
	if ( wrapper.classList.contains( 'media-loaded' ) ) {
		btyMediaAction( wrapper, action );

		return;
	}

	// Play current video.
	btyMediaAction( wrapper, action );

	if ( selector.hasAttribute( 'data-model' ) ) {
		return;
	}

	let template = selector.querySelector( 'template' ),
		mediaDiv = wrapper.querySelector( '.media-content' );

	if ( ! mediaDiv ) {
		wrapper.classList.add( 'media-loaded' );

		if ( template ) {
			wrapper.insertAdjacentHTML( 'beforeend', '<div class="media-content">' + template.innerHTML + '</div>' );
		}
	}

	// Remove model after loaded, inside <template> tag.
	if ( template ) {
		template.remove();
	}
}

// Load media on desktop.
function btyMediaDesktop( doc = document ) {
	let selectors = doc.querySelectorAll( '.main-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			if ( el.hasAttribute( 'data-model' ) ) {
				return;
			}

			el.addEventListener(
				'click',
				function() {
					btyLoadMedia( el, 'play' );
				}
			);
		}
	);
}

// Scroll to top.
function btyScrollToTop() {
	let myButton = document.getElementById( 'btnScrollToTop' );

	if ( ! myButton ) {
		return;
	}

	window.onscroll = function() {
		// Display after 400px height.
		if ( window.pageYOffset >= 400 ) {
			myButton.style.display = 'block';
		} else {
			myButton.style.display = 'none';
		}
	}

	// Onclick function.
	myButton.addEventListener(
		'click',
		function() {
			window.scrollTo(
				{
					top: 0,
					left: 0,
					behavior: "smooth"
				}
			);
		}
	);
}

// Open localization form.
function btyToggleLocalization() {
	let toggles = document.querySelectorAll( '.localization-selector' ),
		form    = document.querySelector( '.localization-form-wrapper' );

	if ( ! toggles.length || ! form ) {
		return;
	}

	// Toggle localization form.
	toggles.forEach(
		function ( el ) {
			el.onclick = function ( e ) {
				e.preventDefault();

				document.documentElement.classList.add( 'localization-form-open' );

				btyClosePopup( 'localization-form-open', form );
				let closeButton = form.querySelector( '.close-button' );
				if ( closeButton ) {
					setTimeout(
						function() {
							closeButton.focus();
						},
						400
					);
				}

			}
		}
	);

}

function btySubmitLocalization( doc = document ) {
	let forms = doc.querySelectorAll( '.localization-form' );
	if ( ! forms.length ) {
		return;
	}

	forms.forEach(
		function( form ) {
			let select = form.querySelectorAll( 'select' );
			if ( ! select.length ) {
				return;
			}

			select.forEach(
				function( el ) {
					el.addEventListener(
						'change',
						function() {
							form.submit();
						}
					);
				}
			);
		}
	);
}

// Popup focus.
function btyTrapFocus( container, firstFocusableElement ) {
	const focusableElements = container.querySelectorAll(
		'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
	);

	const firstElement = firstFocusableElement || focusableElements[0];
	const lastElement  = focusableElements[focusableElements.length - 1];

	function handleKeyDown(e) {
		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
	}

	container.addEventListener( 'keydown', handleKeyDown );
}
