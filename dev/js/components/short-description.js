function btyShortDescription( doc = document ) {
	let button  = doc.querySelector( '.read-more-btn' );
	let short   = doc.querySelector( '.short-content' );
	let content = doc.querySelector( '.full-content' );

	if ( ! short || ! button || ! content ) {
		return;
	}

	if ( button ) {
		const buttonHandle = function() {
			if ( content.style.display === "none" ) {
				short.style.display   = "none";
				content.style.display = "block";
				button.textContent    = btyStrings.product.read_less;
			} else {
				content.style.display = "none";
				short.style.display   = "block";
				button.textContent    = btyStrings.product.read_more;
			}
		}

		button.addEventListener( 'click', buttonHandle );
	}
}
