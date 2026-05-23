function btyHeaderSticky() {
	let header = document.querySelector( '.header.is-sticky' );
	if ( ! header ) {
		return;
	}

	let doc            = document.documentElement,
		top            = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
		regular        = header.dataset.colorScheme || '',
		transparent    = header.dataset.transparentScheme || '',
		hasTransparent = header.dataset.hasTransparent === 'true'
		threshold      = header.offsetHeight || 1,
		atTop          = top <= threshold;

	// Clean any prior color classes, then apply only what's allowed
	header.classList.remove(regular, transparent);
	if (hasTransparent && atTop) {
		header.classList.add(transparent);
	} else {
		header.classList.add(regular);
	}

	// Your existing solid state after scroll
	header.classList.toggle('solid-sticky', !atTop);
	header.classList.toggle('is-scrolled', !atTop);
}
