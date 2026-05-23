// Featured product slider.
function btyFeaturedProductSlider( doc = document ) {
	let selectors = doc.querySelectorAll( '.featured-products-wrapper .product-gallery[data-id="layout-1"]' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let swiper_thumbs,
				swiper_main,
				gallery_media  = el.querySelector( '.gallery-media' ),
				gallery_thumbs = el.querySelector( '.gallery-thumbs' );

			if ( ! gallery_media || ! gallery_thumbs ) {
				return;
			}

			swiper_thumbs = new Swiper(
				gallery_thumbs,
				{
					direction: 'horizontal',
					spaceBetween: 4,
					slidesPerView: 3,
					freeMode: false,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					watchOverflow: true,
					navigation: {
						nextEl: el.querySelector( '.swiper-button-next' ),
						prevEl: el.querySelector( '.swiper-button-prev' )
					},
					breakpoints: {
						992: {
							slidesPerView: 4
						}
					}
				}
			);

			swiper_main = new Swiper(
				gallery_media,
				{
					spaceBetween: 20,
					thumbs: {
						swiper: swiper_thumbs
					}
				}
			);
		}
	);
}