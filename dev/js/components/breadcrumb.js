class BreadcrumbOverlay extends HTMLElement {
	constructor() {
		super();
		this.applyStylesAndReorder = this.applyStylesAndReorder.bind(this);
	}

	connectedCallback() {
		this.applyStylesAndReorder();

		window.addEventListener('resize', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:load', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:select', this.applyStylesAndReorder);
		document.addEventListener('shopify:block:select', this.applyStylesAndReorder);
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.applyStylesAndReorder);
		document.removeEventListener('shopify:section:load', this.applyStylesAndReorder);
		document.removeEventListener('shopify:section:select', this.applyStylesAndReorder);
		document.removeEventListener('shopify:block:select', this.applyStylesAndReorder);
	}

	applyStylesAndReorder() {
		let header            = document.querySelector('.header.transparent-header'),
			breadcrumbWrapper = document.querySelector('.breadcrumb-section .section-wrapper');

		if (!header || !breadcrumbWrapper) {
			return;
		}

		if (window.innerWidth > 1) {
			let headerHeight = header.offsetHeight;
			breadcrumbWrapper.style.paddingTop = headerHeight + 'px';
		} else {
			breadcrumbWrapper.style.paddingTop = null;
		}
	}
}

// Define custom element with a proper name
customElements.define('header-breadcrumb-overlay', BreadcrumbOverlay);
