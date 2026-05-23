// DOM Loaded.
document.addEventListener(
	'DOMContentLoaded',
	function() {
		btyAccordionHover();
		btyScrollBar();
		btyRecipientForm();
		btyNewsletterPopup();
		btyAgeverificationPopup();
		btyToggleDetails();
		btyQuickAdd();
		btyHoverMediaVideo();
		btyCollectionSticky();
		btyAnimationImageLoad();
		btyAnimationCollageLoad();
		btyAccountPopup();
		btySplitSlider();
		btyProductTabs();
		btyCountdownTime();
		btyNavMenu();
		btyCookiesBar();
		btyQuantityButton();
		btySideCart();
		btyQuickSearch();
		btyCheckInventoryOnLoad();
		btyAddToCart();
		btyAddMultiProductToCart();
		btyUpdateProductQuantity();
		btyQuickView();
		btyQuickViewVariants();
		btySwatch();
		btyAccordionHandle();
		btyToggleDropdown();
		btyVideo();
		btyBackgroundVideo();
		btyAddress();
		btyPickupAvailabilityInit();
		btyProductVariants();
		btyProductPopup();
		btyProductShare();
		btyScrollAnimationTrigger();
		btyHeaderSticky();
		btyMediaDesktop();
		btyMinicartRecommendations();
		btySideCartPopupOuter();
		btyFeaturedProductSlider();
		btyShortDescription();
		btyScrollToTop();
		btyAgreeToTerms();
		btyUpdateProgressBarCart();
		btyToggleNavMenu();
		btyToggleLocalization();
		btySubmitLocalization();
		btyFooterAccordion();
		btyAddElementClass();
		setupThumbProgress();

		window.addEventListener(
			'resize',
			function() {
				btyHeaderSticky();
				btyFooterAccordion();
				btyAddElementClass();
				btySplitSlider();
				btyMediaDesktop();
			}
		);

		window.addEventListener(
			'scroll',
			function() {
				btyHeaderSticky();
				btyScrollingDetect();
				btyAnimationImageLoad();
				btyAnimationCollageLoad();
			}
		);
	}
);

// Design mode event.
document.addEventListener(
	'shopify:section:load',
	function( e ) {
		let section = e.target;

		btySplitSlider( section );
		btyAccordionHover( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyCountdownTime( section );
		btyProductTabs( section );
		btyAccordionHandle( section );
		btyToggleDropdown( section );
		btyVideo( section );
		btyBackgroundVideo( section );
		btyAddress( section );
		btyProductVariants( section );
		btyProductPopup( section );
		btyProductShare( section );
		btyCollectionSticky( section );
		btyQuantityButton( section );
		btyScrollAnimationTrigger( section, true );
		btyMinicartRecommendations( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btySideCartPopupOuter( section );
		btyFeaturedProductSlider( section );
		btyToggleNavMenu( section );
		btyToggleLocalization( section );
		btySubmitLocalization( section );
		btyQuickView();
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
		setupThumbProgress( section );

		console.log( 'Section load.' );
	}
);
document.addEventListener(
	'shopify:section:select',
	function( e ) {
		let section = e.target;

		btySplitSlider( section );
		btyAccordionHover( section );
		btyQuickSearch();
		btyCookiesBar( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyNavMenu( section, e );
		btyToggleDropdown( section );
		btyProductTabs( section );
		btyCountdownTime( section );
		btyAccordionHandle( section );
		btyVideo( section );
		btyBackgroundVideo( section );
		btyAddress( section );
		btyProductVariants( section );
		btyProductPopup( section );
		btyProductShare( section );
		btyAccountPopup( section );
		btyQuickAdd( section );
		btyScrollBar( section );
		btyHoverMediaVideo( section );
		btySwatch( section );
		btyCollectionSticky( section );
		btyCheckInventoryOnLoad( section );
		btyAddToCart( section );
		btyAddMultiProductToCart( section );
		btyQuantityButton( section );
		btyMinicartRecommendations( section );
		btySideCartPopupOuter( section );
		btyFeaturedProductSlider( section );
		btyShortDescription( section );
		btyToggleNavMenu( section );
		btyToggleLocalization( section );
		btySubmitLocalization( section );
		setupThumbProgress( section );
		btyQuickView();
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
		console.log( 'Section select.' );
	}
);
document.addEventListener(
	'shopify:block:select',
	function( e ) {
		console.log( 'Block select.' );

		let section = document.getElementById( 'shopify-section-' + e.detail.sectionId );
		if ( ! section ) {
			return;
		}

		btySplitSlider( section );
		btyAccordionHover( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyProductVariants( section );
		btyProductTabs( section, e );
		btyCollectionSticky( section );
		btyMinicartRecommendations( section );
		btySideCartPopupOuter( section );
		btyShortDescription( section );
		btyQuickView( section );
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
	}
);
document.addEventListener(
	'shopify:section:reorder',
	function( e ) {
		let section = e.target;

		btyScrollAnimationTrigger( section, true );

		console.log( 'Section reorder.' );
	}
);
