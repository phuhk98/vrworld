function btyToggleNavMenu ( doc = document ) {
	let selectors = doc.querySelectorAll( '.header-navigation .menu-item .menu-toggle' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function ( el ) {
			let parent = el.parentNode;

			el.onclick = function() {
				parent.classList.toggle( 'open' );
			}

			document.addEventListener(
				'click',
				(event) => {
					if ( ! parent.contains( event.target ) ) {
						parent.classList.remove( 'open' );
					}
				}
			);
		}
	);
}