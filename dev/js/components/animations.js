// Scroll in animation logic.
function btyIntersection( elements, observer ) {
	const offscreen = 'scroll-trigger-offscreen';

	elements.forEach(
		( el, index ) => {
			if ( el.isIntersecting ) {
				const target = el.target;

				if ( target.classList.contains( offscreen ) ) {
					target.classList.remove( offscreen );

					target.setAttribute( 'style', '--animation-order: ' + index + ';' );
				}

				observer.unobserve( target );
			} else {
				el.target.classList.add( offscreen );
			}
		}
	);
}

// Scroll trigger.
function btyScrollAnimationTrigger( doc = document, designMode = false ) {
	const selectors = Array.from( doc.getElementsByClassName( 'scroll-trigger' ) );
	if ( ! selectors.length ) {
		return;
	}

	if ( designMode ) {
		selectors.forEach(
			( el ) => {
				el.classList.add( 'scroll-trigger-design-mode' );
			}
		);

		return;
	}

	const observer = new IntersectionObserver(
		btyIntersection,
		{
			rootMargin: '0px 0px -20px 0px',
		}
	);

	selectors.forEach( ( el ) => observer.observe( el ) );
}
