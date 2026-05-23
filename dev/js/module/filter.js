/**
 * Main collection
 *
 * @package Dev
 */

'use strict';
// Check element inviewport.
function btyInViewport( el ) {
	if ( ! el ) {
		return;
	}

	let rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
		rect.right <= ( window.innerWidth || document.documentElement.clientWidth )
	);
};

let lastFocusedFilterElement = null;
let filterUpdateInProgress = false;

// Toggle nav menu.
function btyToggleNavList( doc = document ) {
	let selectors = doc.querySelectorAll( '.link-arrow' );
	if ( ! selectors.length || 'function' !== typeof( btySlideUp ) || 'function' !== typeof( btySlideDown ) ) {
		return;
	}

	selectors.forEach(
		function ( el ) {
			el.onclick = function ( e ) {
				e.preventDefault();

				let linkItem = el.parentNode.parentNode,
					linkSub  = linkItem.querySelector( '.link-sub' );
				if ( ! linkSub ) {
					return;
				}

				if ( linkItem.classList.contains( 'active' ) ) {
					btySlideUp( linkSub );
					linkItem.classList.remove( 'active' );
				} else {
					btySlideDown( linkSub );
					linkItem.classList.add( 'active' );
				}

				// Remove active siblings.
				for ( let i = 0, j = linkItem.parentNode.children.length; i < j; i++ ) {
					let sb = linkItem.parentNode.children[i];
					if ( ! sb.classList.contains( 'active' ) || linkItem === sb || sb.nodeName !== linkItem.nodeName ) {
						continue;
					}

					sb.classList.remove( 'active' );
					let siblingsSub = sb.querySelector( '.link-sub' );
					if ( ! siblingsSub ) {
						continue;
					}

					btySlideUp( siblingsSub );
				}
			}
		}
	);
}

// Range slider.
function btyRangeSlider(doc = document) {
	let selectors = doc.querySelectorAll('.price-slider');
	if (!selectors.length || typeof window.noUiSlider === 'undefined') return;

	selectors.forEach(function (el) {
		let template = el.querySelector('template');
		if (!template || typeof btyJsonParse !== 'function' || typeof el.noUiSlider === 'object') return;

		let options = btyJsonParse(template.content.textContent),
			input = el.parentNode.querySelectorAll('.price-value');

		options.format = {
			from(value) {
				return options.range.min == value ? value : Math.round(value);
			},
			to(value) {
				return options.range.max == value ? value : Math.round(value);
			}
		};

		window.btyRangePrice = noUiSlider.create(el, options);

		const handles = el.querySelectorAll('.noUi-handle');
		handles.forEach((h, idx) => {
			h.setAttribute('tabindex', '0');
			h.dataset.handleIndex = String(idx);
			h.setAttribute('role', 'slider');
			if (!h.getAttribute('aria-label')) {
				h.setAttribute('aria-label', idx === 0 ? 'Minimum price' : 'Maximum price');
			}

			h.addEventListener('focus', () => {
				lastFocusedFilterElement = { type: 'slider-handle', handleIndex: idx };
			});

			// Custom Tab behavior between handles
			h.addEventListener('keydown', (e) => {
				if (e.key !== 'Tab') return;

				if (!e.shiftKey && idx === 0 && handles[1]) {
					e.preventDefault();
					handles[1].focus();
				} else if (e.shiftKey && idx === 1 && handles[0]) {
					e.preventDefault();
					handles[0].focus();
				}
			});
		});

		template.remove();

		let minValue = 0,
			maxValue = 0;

		// Slider events
		btyRangePrice.on('slide', function (values) {
			if (input.length) {
				input.forEach(function (ip) {
					let inputType = ip.getAttribute('data-type');
					if (inputType === 'min') {
						ip.value = values[0];
						minValue = Number(values[0]);
					} else if (inputType === 'max') {
						ip.value = values[1];
						maxValue = Number(values[1]);
					}
				});
			}

			const handles = el.querySelectorAll('.noUi-handle');
			handles.forEach(function (handle, index) {
				handle.setAttribute('aria-valuenow', values[index]);
			});
		});

		btyRangePrice.on('update', function (values) {
			const handles = el.querySelectorAll('.noUi-handle');
			handles.forEach(function (handle, index) {
				handle.setAttribute('aria-valuenow', values[index]);
			});
		});

		btyRangePrice.on('change', function () {
			if (input.length) {
				const activeElement = document.activeElement;
				if (activeElement && activeElement.classList.contains('price-value')) {
					lastFocusedFilterElement = {
						type: 'price-input',
						dataType: activeElement.getAttribute('data-type'),
						id: activeElement.id
					};
				}
				let eventChange = new Event('change', { bubbles: true });
				input[0].dispatchEvent(eventChange);
			}
		});

		// Input events
		if (input.length) {
			input.forEach(function (ip) {
				let inputType = ip.getAttribute('data-type'),
					inputValue = Number(ip.value || 0);

				if (inputType === 'min') minValue = inputValue;
				else if (inputType === 'max') maxValue = inputValue;

				ip.addEventListener('focus', function () {
					lastFocusedFilterElement = {
						type: 'price-input',
						dataType: this.getAttribute('data-type'),
						id: this.id
					};
				});

				// Only trigger filter on Enter
				ip.addEventListener('keydown', function (e) {
					if (e.key === 'Enter') {
						e.preventDefault();
						lastFocusedFilterElement = {
							type: 'price-input',
							dataType: this.getAttribute('data-type'),
							id: this.id
						};
						validateAndSyncInput(this);
						this.dispatchEvent(new Event('change', { bubbles: true }));
						this.blur();
					}
				});

				// Blur just validate, don't trigger filter
				ip.addEventListener('blur', function () {
					validateAndSyncInput(this);
				});

				// Optional: debounce validation while typing
				let inputTimeout;
				ip.addEventListener('input', function () {
					clearTimeout(inputTimeout);
					inputTimeout = setTimeout(() => {
						let currentValue = Number(ip.value || 0);
						let minInput = Number(ip.getAttribute('min') || 0);
						let maxInput = Number(ip.getAttribute('max') || 0);
						if (currentValue < minInput || currentValue > maxInput) {
							ip.setAttribute('aria-invalid', 'true');
						} else {
							ip.removeAttribute('aria-invalid');
						}
					}, 500);
				});

				// Validation & sync function
				function validateAndSyncInput(inputElement) {
					let minInput = Number(inputElement.getAttribute('min') || 0);
					let maxInput = Number(inputElement.getAttribute('max') || 0);
					let newInputValue = Number(inputElement.value || 0);

					if (newInputValue < minInput) inputElement.value = minInput;
					if (newInputValue > maxInput) inputElement.value = maxInput;

					newInputValue = Number(inputElement.value || 0);

					if (inputElement.getAttribute('data-type') === 'min') {
						minValue = newInputValue;
					} else if (inputElement.getAttribute('data-type') === 'max') {
						maxValue = newInputValue;
					}

					const minEmpty = input[0].value === '' || isNaN(Number(input[0].value));
					const maxEmpty = input[1].value === '' || isNaN(Number(input[1].value));
					if (minEmpty || maxEmpty) {
						return;
					}

					if (minValue > maxValue) {
						const temp = minValue;
						minValue = maxValue;
						maxValue = temp;
						input.forEach((inp) => {
							if (inp.getAttribute('data-type') === 'min') inp.value = minValue;
							if (inp.getAttribute('data-type') === 'max') inp.value = maxValue;
						});
					}

					if (minValue < maxValue) {
						btyRangePrice.set([minValue, maxValue]);
					}

					inputElement.removeAttribute('aria-invalid');
				}
			});
		}
	});
}

// Function to restore focus after filter updates.
function restoreFocusAfterFilterUpdate(wrapper) {
	if (!lastFocusedFilterElement) {
		return;
	}

	setTimeout(function() {
		let elementToFocus = null;

		if (lastFocusedFilterElement.type === 'slider-handle') {
			// Find the slider and its handles.
			const priceSlider = wrapper.querySelector('.price-slider');
			if (priceSlider) {
				// Method 1: Use the class we added.
				if (lastFocusedFilterElement.handleClass) {
					elementToFocus = priceSlider.querySelector('.' + lastFocusedFilterElement.handleClass);
				}

				// Method 2: Use data-handle-index attribute.
				if (!elementToFocus && typeof lastFocusedFilterElement.handleIndex !== 'undefined') {
					elementToFocus = priceSlider.querySelector('[data-handle-index="' + lastFocusedFilterElement.handleIndex + '"]');
				}

				// Method 3: Use position in handles array.
				if (!elementToFocus) {
					const handles = priceSlider.querySelectorAll('.noUi-handle');
					if (handles[lastFocusedFilterElement.handleIndex]) {
						elementToFocus = handles[lastFocusedFilterElement.handleIndex];
					}
				}

				// Method 4: Check if it's specifically the lower (min) or upper (max) handle.
				if (!elementToFocus) {
					if (lastFocusedFilterElement.handleIndex === 0) {
						elementToFocus = priceSlider.querySelector('.noUi-handle-lower');
					} else {
						elementToFocus = priceSlider.querySelector('.noUi-handle-upper');
					}
				}
			}
		} else if (lastFocusedFilterElement.type === 'price-input') {
			// Try to find the exact input by ID first.
			if (lastFocusedFilterElement.id) {
				elementToFocus = wrapper.querySelector('#' + lastFocusedFilterElement.id);
			}

			// Fallback to data-type attribute.
			if (!elementToFocus && lastFocusedFilterElement.dataType) {
				elementToFocus = wrapper.querySelector(
					'.price-value[data-type="' + lastFocusedFilterElement.dataType + '"]'
				);
			}
		}

		if (elementToFocus) {
			elementToFocus.focus();

			// Announce to screen readers.
			announceFilterUpdate();
		} else {
			// Fallback: focus the price filter summary.
			const priceSummary = wrapper.querySelector('.filter-item[data-index] .details-summary');
			if (priceSummary) {
				priceSummary.focus();
				announceFilterUpdate();
			}
		}

		filterUpdateInProgress = false;
	}, 200); // Increased delay slightly to ensure DOM is ready.
}

function refocusSliderHandleAfterReinit(wrapper) {
	if (!lastFocusedFilterElement || lastFocusedFilterElement.type !== 'slider-handle') return;

	const interval = setInterval(() => {
		const slider = wrapper.querySelector('.price-slider');
		if (!slider || !slider.noUiSlider) return;

		const handles = slider.querySelectorAll('.noUi-handle');
		if (!handles.length) return;

		let targetHandle = handles[lastFocusedFilterElement.handleIndex] || handles[0];
		if (targetHandle) {
			targetHandle.focus();

			targetHandle.dispatchEvent(new Event('focus', { bubbles: true }));
			clearInterval(interval);
		}
	}, 150);

	setTimeout(() => clearInterval(interval), 2000);
}

// Announce filter updates to screen readers.
function announceFilterUpdate() {
	// Create or update ARIA live region
	let liveRegion = document.getElementById('filter-status-announce');

	if (!liveRegion) {
		liveRegion = document.createElement('div');
		liveRegion.id = 'filter-status-announce';
		liveRegion.className = 'sr-only';
		liveRegion.setAttribute('role', 'status');
		liveRegion.setAttribute('aria-live', 'polite');
		liveRegion.setAttribute('aria-atomic', 'true');
		document.body.appendChild(liveRegion);
	}

	// Update the announcement.
	liveRegion.textContent = 'Price filter applied. Products updated.';

	// Clear the announcement after a delay.
	setTimeout(function() {
		liveRegion.textContent = '';
	}, 1000);
}

// Remove params on string.
function btyRemoveParam( key, url ) {
	let param,
		rtn         = url.split( '?' )[0],
		paramsArr   = [],
		queryString = url.includes( '?' ) ? url.split( '?' )[1] : '';
	if ( '' !== queryString ) {
		paramsArr = queryString.split( '&' );

		for ( let i = paramsArr.length - 1; i >= 0; i -= 1 ) {
			param = paramsArr[i].split( '=' )[0];

			if ( param === key ) {
				paramsArr.splice( i, 1 );
			}
		}

		if ( paramsArr.length ) {
			rtn = rtn + '?' + paramsArr.join( '&' );
		}
	}

	return rtn;
}

// Pagination.
function btyPagination( callback, currentUrl ) {
	let pag = document.querySelectorAll( '.pagination a' );
	if ( ! pag.length ) {
		return;
	}

	pag.forEach(
		function ( el ) {
			el.onclick = function ( e ) {
				e.preventDefault();

				let page = el.getAttribute( 'data-page' ) || 2;
				currentUrl.searchParams.set( 'page', Number( page ) );

				callback( currentUrl );
			}
		}
	);
}

// Search field.
function btyMiniSearch( doc = document ) {
	let searchField = doc.querySelector( '[name="q"]' );
	if ( ! searchField ) {
		return;
	}

	let miniResults = searchField.parentNode.querySelector( '.mini-results' );
	if ( ! miniResults ) {
		return;
	}

	searchField.oninput = function () {
		let value = searchField.value.trim();
		if ( ! value ) {
			miniResults.innerHTML = '';

			return;
		}

		btySearchDelay(
			function () {
				searchField.parentNode.classList.add( 'searching' );

				let url = btyGlobals.search_url + '?section_id=mini-search&type=' + btyGlobals.search_type + '&options[prefix]=last&options[unavailable_products]=' + btyGlobals.search_unavailable + '&limit=4&q=' + value;
				fetch( url )
					.then(
						function ( r ) {
							if ( 200 !== r.status ) {
								console.log( 'Status Code: ' + r.status );
								throw r;
							}

							return r.text();
						}
					).then(
						function ( res ) {
							// Update html.
							miniResults.innerHTML = btyGetSectionHtml( res, '.fetch-search' );
						}
					).catch(
						function ( e ) {
							console.error( e );
						}
					).finally(
						function () {
							searchField.parentNode.classList.remove( 'searching' );
						}
					);
			},
			300
		)
	}

	searchField.onfocus = function () {
		miniResults.classList.remove( 'hidden' );
	}

	searchField.onblur = function () {
		setTimeout(
			function () {
				miniResults.classList.add( 'hidden' );
			},
			200
		);
	}
}

// ToggleSidebar.
function btyToggleSidebar( doc = document ) {
	let checkbox  = doc.querySelector( ".show-filter input[type='checkbox']" ),
		container = checkbox?.closest( ".layout-collection .action-layout" );

	if ( !checkbox || !container ){
		return;
	}

	const wrapper = checkbox.closest('.show-filter');
	if (wrapper && !wrapper.hasAttribute('tabindex')) wrapper.setAttribute('tabindex', '0');

	// Function to check and update the container class.
	const updateContainerClass = () => {
		if (checkbox.checked) {
			container.classList.add( "has-sidebar" );
			container.classList.remove( "no-sidebar" );
		} else {
			container.classList.remove( "has-sidebar" );
			container.classList.add( "no-sidebar" );
		}
		checkbox.setAttribute('aria-expanded', checkbox.checked ? 'true' : 'false');
	};

	// Check initial state and apply the appropriate class.
	updateContainerClass();

	// Listen for changes in checkbox state and update class accordingly.
	checkbox.addEventListener( "change", updateContainerClass );

	if (wrapper) {
		wrapper.addEventListener('keydown', (e) => {
			if (document.activeElement === checkbox) return;
			if (e.key === ' ' || e.key === 'Enter') {
				e.preventDefault();
				checkbox.click();
			}
		});
	}
}

// ColumnChange.
function btyColumnChange(doc = document) {
	let gridCollection = doc.querySelector('.layer-last .products');
	let selectors      = doc.querySelectorAll('.change-column-product .item');

	if (!gridCollection || !selectors.length) return;

	const updateGridLayout = (column) => {
		if (column) {
			gridCollection.style.gridTemplateColumns = `repeat(${column}, minmax(0, 1fr))`;
		}
	};

	const handleColumnChange = (el) => {
		const column = el.getAttribute('data-column');
		if (!column) return;

		const oldActive = el.parentNode.querySelector('.item.active');
		if (oldActive) oldActive.classList.remove('active');
		el.classList.add('active');

		gridCollection.classList.add('is-switching');

		setTimeout(() => {
			updateGridLayout(column);
			gridCollection.classList.remove('is-switching');
		}, 250);
	};

	const activeItem = doc.querySelector('.change-column-product .item.active');
	if (activeItem) {
		updateGridLayout(activeItem.getAttribute('data-column'));
	}

	selectors.forEach((el) => {
		el.onclick = () => handleColumnChange(el);
	});
}

// Desktop filter.
function btyDesktopFilters( doc = document ) {
	let currentUrl    = new URL( window.location.href ),
		wrapper       = doc.querySelector( '.has-product-filters' ),
		filterContent = wrapper ? wrapper.querySelector( '.content' ) : false;

	if ( ! filterContent ) {
		return;
	}

	let form = wrapper ? wrapper.querySelector( '.filter-form' ) : false;

	// Toggle filters.
	let toggleFilters = function () {
		let items = form ? form.querySelectorAll( '.filter-item[data-motion-reduce]' ) : [];
		if ( ! items.length ) {
			return;
		}

		items.forEach(
			function ( el ) {
				el.addEventListener(
					'click',
					function () {
						let sibling = el.parentNode.querySelector( '.filter-item[open]' );
						if ( ! sibling || sibling === el ) {
							return;
						}

						sibling.removeAttribute( 'open' );
					}
				);
			}
		);

		document.addEventListener(
			'click',
			function ( e ) {
				let target = e.target,
					parent = target.closest( '.filter-item' );

				if ( parent ) {
					return;
				}

				let active = form.querySelector( '.filter-item[open]' );
				if ( active ) {
					active.removeAttribute( 'open' );
				}
			}
		);
	}

	// Sort by.
	let sortBy = function () {
		let select = wrapper.querySelector( 'select[name="sort_by"]' );
		if ( ! select ) {
			return;
		}

		select.onchange = function () {
			if ( ! select.value.trim() ) {
				return;
			}

			currentUrl = new URL( window.location.href );
			currentUrl.searchParams.set( 'sort_by', select.value );

			desktopFiltering( currentUrl, 'sort_by' );
		}
	}

	// Filters.
	let sidebarFilters = function () {
		let filters = form ? form.querySelectorAll( '[name^="filter."]' ) : [];
		if ( ! filters.length ) {
			return;
		}

		filters.forEach(
			function ( el ) {
				el.onchange = function () {
					let formData           = new FormData( form ),
						searchParamsString = window.location.pathname + '?' + new URLSearchParams( formData ).toString();

					currentUrl = new URL( searchParamsString, window.location.origin );

					desktopFiltering( currentUrl, 'filters' );
				}
			}
		);
	}

	// Reset filter.
	let resetFilters = function () {
		let selectors = wrapper.querySelectorAll( '.active-filter .active-filter-item, .item-reset' );
		if ( ! selectors.length ) {
			return;
		}

		selectors.forEach(
			function ( el ) {
				el.addEventListener(
					'click',
					function ( e ) {
						e.preventDefault();

						const cleanUrl = new URL(window.location.pathname, window.location.origin);

						desktopFiltering(cleanUrl, 'filters');
					}
				);
			}
		);
	}

	// Remove empty filter.
	let removeEmptyFilter = function ( wrapper ) {
		let list = wrapper.querySelectorAll( '.item-list' );
		if ( ! list.length ) {
			return;
		}

		list.forEach(
			function ( el ) {
				if ( el.innerHTML === '' ) {
					el.parentNode.parentNode.remove();
				}
			}
		);
	}

	// Scroll to filters.
	let scrollToFilters = function () {
		let selector = wrapper.querySelector( '.filter-form-wrapper' );
		if ( ! selector ) {
			return;
		}

		let rect = selector.getBoundingClientRect();

		if ( rect.top < 0 ) {
			selector.scrollIntoView( { behavior: 'smooth' } );
		}
	}

	// Seach field.
	btyMiniSearch( wrapper );

	// Filtering.
	let desktopFiltering = function ( currentUrl, dataType = false ) {
		let loadingBar = document.querySelector( '.loading-bar' );
		filterUpdateInProgress = true;

		// (Optionally, also expose desktopFiltering if you want).
		window.desktopFiltering = desktopFiltering;

		if ( loadingBar ) {
			loadingBar.classList.add( 'active' );
			loadingBar.style.transform = 'scaleX(0.7)';
		}

		// For search results page.
		let searchField = wrapper.querySelector( '[name="q"]' );
		if ( searchField ) {
			currentUrl.searchParams.set( 'q', searchField.value.trim() );
			currentUrl.searchParams.set( 'type', btyGlobals.search_type );
			currentUrl.searchParams.set( 'options[prefix]', 'last' );
			currentUrl.searchParams.set( 'options[unavailable_products]', btyGlobals.search_unavailable );
		}

		// Add loading animation.
		document.documentElement.setAttribute( 'data-filtering', '' );

		// Update current url.
		if ( currentUrl ) {
			// Remove 'page' param when using infinite scroll.
			let string = currentUrl.toString();
			if ( filterContent && filterContent.classList.contains( 'infinite-scroll' ) && ['infinite-scroll', 'filters', 'sort_by'].includes( dataType ) ) {
				string = btyRemoveParam( 'page', string );
			}

			window.history.pushState({ path: string }, '', string );
		}

		let paramsUrl  = currentUrl && currentUrl.search ? '&' + currentUrl.search.slice( 1 ) : '',
			sectionUrl = window.location.pathname + '?section_id=' + wrapper.getAttribute( 'data-id' ) + paramsUrl;

		fetch( sectionUrl )
			.then(
				function ( r ) {
					if ( 200 !== r.status ) {
						console.log( 'Status Code: ' + r.status );

						throw r;
					}

					return r.text();
				}
			).then(
				function ( res ) {
					let activeFilters  = wrapper.querySelector( '.active-filter' ),
						filterForm     = wrapper.querySelector( '.filter-form' ),
						resultsCount   = wrapper.querySelectorAll( '.results-count' ),
						products       = wrapper.querySelector( '.products' ),
						pagination     = wrapper.querySelector( '.pagination' ),
						infiniteScroll = wrapper.querySelector( '.infinite-loading' ),
						productList    = wrapper.querySelector( '.layer-last' );

					// Infinite scrolling.
					if ( filterContent.classList.contains( 'infinite-scroll' ) ) {
						// Active filter.
						if ( activeFilters ) {
							activeFilters.innerHTML = btyGetSectionHtml( res, '.active-filter' );
						}

						// Resuls count.
						if ( resultsCount.length ) {
							resultsCount.forEach(
								function ( el ) {
									el.innerHTML = btyGetSectionHtml( res, '.results-count' );

									if ( filterContent.classList.contains( 'infinite-scroll' ) && el.querySelector( '.from-count' ) ) {
										el.querySelector( '.from-count' ).innerText = 1;
									}
								}
							);
						}

						// Product pagination.
						if ( pagination ) {
							pagination.innerHTML = btyGetSectionHtml( res, '.pagination' );
						}

						// Products.
						if ( 'infinite-scroll' === dataType ) {
							let tmpRes   = new DOMParser().parseFromString( res, 'text/html' ),
								tmpCards = tmpRes.querySelectorAll( '.product-card' );

							if ( tmpCards.length ) {
								tmpCards.forEach(
									function ( el ) {
										el.classList.add( 'ready' );

										if ( products ) {
											products.insertAdjacentHTML( 'beforeend', el.outerHTML );
										}
									}
								);
							}

							// Scroll to animation image.
							let scrollAnimationImage = function () {
								let itemsReady = filterContent.querySelectorAll( '.product-card.ready' );
								if ( ! itemsReady.length ) {
									return;
								}

								const onIntersectionChange = new IntersectionObserver(
									function ( entries, observer ) {
										entries.forEach(
											function ( entry ) {
												if ( entry.isIntersecting ) {
													let el = entry.target;
													if ( el.classList.contains( 'animate' ) ) {
														return;
													}

													el.classList.add( 'animate' );

													observer.unobserve( el );
												}
											}
										);
									},
									{
										rootMargin: '-20px 0px -20px 0px'
									}
								);

								itemsReady.forEach(
									function ( el ) {
										onIntersectionChange.observe( el );
									}
								);
							}

							scrollAnimationImage();
							window.addEventListener( 'scroll', scrollAnimationImage );

							// Collapse/enpand filter group.
							if ( filterForm ) {
								let div     = document.createElement( 'div' ),
									filters = filterForm.querySelectorAll( '.filter-item' );

								div.innerHTML = btyGetSectionHtml( res, '.filter-form', 'outer' );

								// Loop each filter.
								if ( filters.length ) {
									filters.forEach(
										function ( el ) {
											let tmpIndex = el.getAttribute( 'data-index' ) || 0,
												item     = div.querySelector( '.filter-item[data-index="' + tmpIndex + '"]' );

											if ( ! item ) {
												return;
											}

											// Set open state.
											if ( 'string' === typeof( el.getAttribute( 'open' ) ) ) {
												item.setAttribute( 'open', '' );
											}
										}
									);
								}

								// Remove empty filter.
								removeEmptyFilter( div );

								// Update html.
								filterForm.innerHTML = btyGetSectionHtml( div.innerHTML, '.filter-form' );
							}
						}
						else {
							if ( products ) {
								products.innerHTML = btyGetSectionHtml(res, '.products');
							}
							const newSidebar = btyGetSectionHtml(res, '.filter-wrapper');
							const curSidebar = document.querySelector('.filter-wrapper');

							if (curSidebar && newSidebar) {
								curSidebar.innerHTML = newSidebar;
							}

							// Reset infinite state.
							if (infiniteScroll) {
								infiniteScroll.classList.remove('visible');
							}
						}

						// Infinite scroll loading.
						let tmpInfiniteScroll = btyGetSectionHtml( res, '.infinite-loading' );
						if ( infiniteScroll ) {
							if ( tmpInfiniteScroll ) {
								infiniteScroll.innerHTML = tmpInfiniteScroll;
								infiniteScroll.classList.remove( 'visible' );
							} else {
								infiniteScroll.remove();
							}
						} else if ( products && tmpInfiniteScroll ) {
							products.insertAdjacentHTML( 'afterend', '<div class="infinite-loading">' + tmpInfiniteScroll + '</div>' );
						}
					} else {
						// Update resultsCount.
						resultsCount?.forEach?.( el => {
							el.innerHTML = btyGetSectionHtml( res, '.toolbar-inner .results-count' );
						});

						// Update activeFilters.
						if ( activeFilters ) {
							activeFilters.innerHTML = btyGetSectionHtml( res, '.active-filter' );
						}

						// Update sidebar.
						const nextWrapper = document.createElement( 'div' );
						nextWrapper.innerHTML = btyGetSectionHtml( res, '.filter-wrapper' );

						const curWrapper  = document.querySelector( '.filter-wrapper' );
						if ( curWrapper ) {
							curWrapper.querySelectorAll( '.filter-item' ).forEach( curItem => {
								if ( curItem.matches('[data-type="price_range"]')) {
									return;
								}

								const idx    = curItem.getAttribute( 'data-index' );
								let nextItem = idx ? nextWrapper.querySelector( `.filter-item[data-index="${ idx }"]` ) : null;
								if ( nextItem ) {
									const isOpen      = curItem.hasAttribute( 'open' );
									const replacement = nextItem.cloneNode( true );
									if ( isOpen ) {
										replacement.setAttribute( 'open', '' );
									}

									curItem.replaceWith( replacement );
								}
							});
						}

						// Update products list.
						if ( productList ) {
							productList.innerHTML = btyGetSectionHtml( res, '.layer-last' );
						}
					}

					// Re-init some functions.
					toggleFilters();
					sidebarFilters();
					btyPagination( desktopFiltering, currentUrl );
					btyAnimationImageLoad( wrapper );
					sortBy();
					resetFilters();
					btyRangeSlider( wrapper );
					btyDesktopFilters( document );
					btyToggleDetails( wrapper );
					btyHoverMediaVideo( wrapper );
					btyQuickView( wrapper );
					btyQuickAdd( wrapper );
					btySwatch( wrapper );
					btyAccordionHandle( wrapper );
					btyAddToCart( wrapper );

					// Fire when product card updated.
					document.dispatchEvent( new CustomEvent( 'product-card-updated' ) );

					// Restore focus after DOM updates
					restoreFocusAfterFilterUpdate(wrapper);
					refocusSliderHandleAfterReinit(wrapper);
				}
			).catch(
				function ( e ) {
					console.error( e );
					filterUpdateInProgress = false;
				}
			).finally(
				function () {
					btyColumnChange();
					btyToggleSidebar();

					// Remove animation.
					document.documentElement.removeAttribute( 'data-filtering' );

					// Scroll to filters.
					if ( 'infinite-scroll' !== dataType ) {
						scrollToFilters();
					}

					// Loading bar.
					if ( loadingBar ) {
						loadingBar.style.transform = 'scaleX(1)';
						loadingBar.setAttribute( 'data-finished', '' );

						loadingBar.addEventListener(
							'transitionend',
							function ( e ) {
								if ( 'transform' === e.propertyName && 'string' === typeof( loadingBar.getAttribute( 'data-finished' ) ) ) {
									loadingBar.classList.remove( 'active' );
									loadingBar.removeAttribute( 'data-finished' );
									loadingBar.style.transform = 'scaleX(0)';
								}
							}
						);
					}
				}
			);
	}

	btyRangeSlider(doc);

	// Infinite scroll.
	let infiniteScroll = function () {
		let selector = filterContent ? filterContent.querySelector( '.infinite-loading' ) : false;
		if ( ! selector || selector.classList.contains( 'visible' ) ) {
			return;
		}

		if ( btyInViewport( selector ) ) {
			selector.classList.add( 'visible' );

			let dataPage = selector.querySelector( 'span[data-page]' );
			if ( ! dataPage ) {
				return;
			}

			// Fetching.
			currentUrl = new URL( window.location.href );
			currentUrl.searchParams.set( 'page', Number( dataPage.getAttribute( 'data-page' ) ) );
			desktopFiltering( currentUrl, 'infinite-scroll' );
		}
	}

	window.addEventListener(
		'scroll',
		function () {
			infiniteScroll();
		}
	);

	toggleFilters();
	infiniteScroll();
	sidebarFilters();
	sortBy();
	resetFilters();
	removeEmptyFilter( wrapper );

	if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
		btyPagination( desktopFiltering, currentUrl );
	}
}

// Mobile filters.
function btyMobileFilters(doc = document) {
	let wrapper       = doc.querySelector('.has-product-filters'),
		filterContent = wrapper ? wrapper.querySelector('.filter-content') : false,
		mobileFilter  = wrapper ? wrapper.querySelector('.mobile-filter') : false,
		open          = mobileFilter ? mobileFilter.querySelector('.filter-sort') : false,
		close         = mobileFilter ? mobileFilter.querySelector('.close-button') : false,
		back          = mobileFilter ? mobileFilter.querySelector('.back-button') : false,
		active        = mobileFilter ? mobileFilter.querySelector('.mobile-active-filter') : false,
		modal         = mobileFilter ? mobileFilter.querySelector('.mobile-filter-modal') : false,
		form          = mobileFilter ? mobileFilter.querySelector('.mobile-filter-form') : false,
		items         = form ? form.querySelectorAll('.filter-item') : [],
		reset         = form ? form.querySelector('.form-footer .active-filter-item') : false,
		submit        = form ? form.querySelector('[type="submit"]') : false;

	if (!open || !close || !back || !items.length || !modal || !reset || !submit) {
		return;
	}

	let currentUrl = new URL(window.location.href);

	// Initialize mini search field.
	btyMiniSearch(wrapper);

	// =====================
	// Helper functions.
	// =====================
	const removeFilter = function () {
		let selectors = mobileFilter.querySelectorAll('a.active-filter-item');
		if (!selectors.length) return;

		selectors.forEach(function (el) {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				currentUrl = new URL(el.href, window.location.origin);
				mobileFiltering(currentUrl);
			});
		});
	};

	// Bind toggle for each filter item.
	const bindFilterItems = function (formElement = form) {
		let filterItems = formElement.querySelectorAll('.filter-item');
		filterItems.forEach(function (el) {
			let heading = el.querySelector('.filter-heading'),
				content = el.querySelector('.filter-content');
			if (!heading || !content) return;
			heading.onclick = function () {
				el.classList.toggle('active');
			};
		});
	};

	// Scroll smoothly to filters section.
	const scrollToFilters = function () {
		let selector = wrapper.querySelector('.mobile-filter');
		if (!selector) return;
		let rect = selector.getBoundingClientRect();
		if (rect.top < 0) selector.scrollIntoView({ behavior: 'smooth' });
	};

	// =====================
	// Filtering (fetch).
	// =====================
	let mobileFiltering = function (currentUrl, dataType = false) {
		let loadingBar = document.querySelector('.loading-bar');
		if (loadingBar) {
			loadingBar.classList.add('active');
			loadingBar.style.transform = 'scaleX(0.7)';
		}

		// Handle search query parameters.
		let searchField = wrapper.querySelector('[name="q"]');
		if (searchField) {
			currentUrl.searchParams.set('q', searchField.value.trim());
			currentUrl.searchParams.set('type', btyGlobals.search_type);
			currentUrl.searchParams.set('options[prefix]', 'last');
			currentUrl.searchParams.set('options[unavailable_products]', btyGlobals.search_unavailable);
		}

		document.documentElement.setAttribute('data-filtering', '');

		// Update URL parameters.
		if (currentUrl) {
			let string = currentUrl.toString();
			if (filterContent && filterContent.classList.contains('infinite-scroll') && ['infinite-scroll', 'filters', 'sort_by'].includes(dataType)) {
				string = btyRemoveParam('page', string);
			}
			window.history.pushState({ path: string }, '', string);
		}

		// Build section URL for fetch request.
		let paramsUrl  = currentUrl && currentUrl.search ? '&' + currentUrl.search.slice(1) : '',
			sectionUrl = window.location.pathname + '?section_id=' + wrapper.getAttribute('data-id') + paramsUrl;

		fetch(sectionUrl)
			.then(function (r) {
				if (200 !== r.status) throw r;
				return r.text();
			})
			.then(function (res) {
				let pagination     = wrapper.querySelector('.pagination'),
					products       = wrapper.querySelector('.products'),
					resultsCount   = wrapper.querySelectorAll('.results-count'),
					infiniteScroll = wrapper.querySelector('.infinite-loading');

				// Update active filter section.
				if (active) {
					active.innerHTML = btyGetSectionHtml(res, '.mobile-active-filter');
				}

				// Update results count.
				if (resultsCount.length) {
					resultsCount.forEach(function (el) {
						el.innerHTML = btyGetSectionHtml(res, '.results-count');
						if (filterContent.classList.contains('infinite-scroll') && el.querySelector('.from-count')) {
							el.querySelector('.from-count').innerText = 1;
						}
					});
				}

				// Update modal filter content.
				if (modal) {
					modal.innerHTML = btyGetSectionHtml(res, '.mobile-filter-modal');
				}

				// Update pagination.
				if (pagination) {
					pagination.innerHTML = btyGetSectionHtml(res, '.pagination');
				}

				// Update product grid.
				if (filterContent) {
					if (filterContent.classList.contains('infinite-scroll')) {
						if ('infinite-scroll' === dataType) {
							let scrollAnimationImage = function () {
								let itemsReady = wrapper.querySelectorAll('.product-card.ready');
								if (!itemsReady.length) return;
								const onIntersectionChange = new IntersectionObserver(function (entries, observer) {
									entries.forEach(function (entry) {
										if (entry.isIntersecting) {
											let el = entry.target;
											if (!el.classList.contains('animate')) {
												el.classList.add('animate');
											}
											observer.unobserve(el);
										}
									});
								});
								itemsReady.forEach(function (el) {
									onIntersectionChange.observe(el);
								});
							};
							scrollAnimationImage();
							window.addEventListener('scroll', scrollAnimationImage);
						} else {
							products.innerHTML = btyGetSectionHtml(res, '.products');
						}
					} else if (products) {
						products.innerHTML = btyGetSectionHtml(res, '.products');
					}
				} else if (wrapper.parentNode.classList.contains('search-page-section') && products) {
					products.innerHTML = btyGetSectionHtml(res, '.products');
				}

				// Update infinite loading.
				let tmpInfiniteScroll = btyGetSectionHtml(res, '.infinite-loading');
				if (infiniteScroll) {
					if (tmpInfiniteScroll) {
						infiniteScroll.innerHTML = tmpInfiniteScroll;
						infiniteScroll.classList.remove('visible');
					} else {
						infiniteScroll.remove();
					}
				} else if (products && tmpInfiniteScroll) {
					products.insertAdjacentHTML('afterend', '<div class="infinite-loading">' + tmpInfiniteScroll + '</div>');
				}

				// Re-bind filter items inside modal after reload.
				let newForm = mobileFilter.querySelector('.mobile-filter-form');
				if (newForm) {
					bindFilterItems(newForm);
				}

				// Reinitialize necessary components.
				btyAnimationImageLoad(wrapper);
				btyRangeSlider(wrapper);
				removeFilter();
				btyPagination(mobileFiltering, currentUrl);

				if (typeof btyToggleDetails === 'function') btyToggleDetails(wrapper);
				if (typeof btyQuickView === 'function') btyQuickView(wrapper);
				if (typeof btySwatch === 'function') btySwatch(wrapper);
				if (typeof btyQuickAdd === 'function') btyQuickAdd(wrapper);
				if (typeof btyAccordionHandle === 'function') btyAccordionHandle(wrapper);
				if (typeof btyAddToCart === 'function') btyAddToCart(wrapper);

				document.dispatchEvent(new CustomEvent('product-card-updated'));
			})
			.catch(console.error)
			.finally(function () {
				document.documentElement.removeAttribute('data-filtering');

				// Scroll to filters after update.
				if ('infinite-scroll' !== dataType) scrollToFilters();

				// Handle loading bar animation.
				let loadingBar = document.querySelector('.loading-bar');
				if (loadingBar) {
					loadingBar.style.transform = 'scaleX(1)';
					loadingBar.setAttribute('data-finished', '');
					loadingBar.addEventListener('transitionend', function (e) {
						if (e.propertyName === 'transform' && typeof loadingBar.getAttribute('data-finished') === 'string') {
							loadingBar.classList.remove('active');
							loadingBar.removeAttribute('data-finished');
							loadingBar.style.transform = 'scaleX(0)';
						}
					});
				}
			});
	};

	let heading     = mobileFilter.querySelector('.form-header .heading'),
		headingText = heading ? heading.innerHTML : '';

	// =====================
	// Event handling.
	// =====================
	mobileFilter.onclick = function (e) {
		let target = e.target;

		// Open modal.
		if (open === target) {
			modal.triggerElement = open;
			mobileFilter.classList.add('is-open');
			document.documentElement.classList.add('filter-open');
			if (close) setTimeout(() => close.focus(), 400);
			btyTrapFocus(modal, close);
			return;
		}

		// Close modal.
		if (close === target || modal === target) {
			e.preventDefault();
			mobileFilter.classList.remove('is-open');
			document.documentElement.classList.remove('filter-open');
			if (modal.triggerElement) modal.triggerElement.focus();
			return;
		}

		// Handle filter heading click.
		if (target.classList.contains('filter-heading') && heading) {
			let currentHeadingText = target.querySelector('.heading-text');
			if (currentHeadingText) {
				if (currentHeadingText.hasAttribute('data-helptext')) {
					heading.innerHTML = currentHeadingText.innerHTML + '<span class="item-helptext">' + currentHeadingText.getAttribute('data-helptext') + '</span>';
				} else {
					heading.innerHTML = currentHeadingText.innerHTML;
				}
			}
			return;
		}

		// Handle back and reset button.
		if (back === target || reset === target) {
			let activeItem = form.querySelector('.filter-item.active');
			if (activeItem) activeItem.classList.remove('active');
			mobileFilter.classList.remove('transform');
			if (headingText) heading.innerHTML = headingText;
			return;
		}

		// Handle submit button.
		if (submit === target) {
			e.preventDefault();
			let formData = new FormData(form);
			let searchParamsString = window.location.pathname + '?' + new URLSearchParams(formData).toString();
			currentUrl = new URL(searchParamsString, window.location.origin);
			mobileFilter.classList.remove('is-open');
			document.documentElement.classList.remove('filter-open');
			mobileFiltering(currentUrl);
			return;
		}
	};

	// Bind filter toggle events (on first load).
	bindFilterItems();

	// Bind remove active filter events.
	removeFilter();

	// Bind pagination for mobile.
	if (window.matchMedia('(max-width: 991px)').matches) {
		btyPagination(mobileFiltering, currentUrl);
	}
}

// DOM Loaded.
document.addEventListener(
	'DOMContentLoaded',
	function () {
		btyToggleNavList();
		btyRangeSlider();
		btyColumnChange();
		btyToggleSidebar();
		btyDesktopFilters();
		btyMobileFilters();
	}
);

document.addEventListener(
	'shopify:section:select',
	function ( e ) {
		btyToggleNavList( e.target );
		btyRangeSlider( e.target );
		btyColumnChange( e.target );
		btyToggleSidebar( e.target );
		btyDesktopFilters( e.target );
		btyMobileFilters( e.target );
	}
);
