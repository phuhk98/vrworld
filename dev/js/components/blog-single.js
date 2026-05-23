class ArticleImageOverlay extends HTMLElement {
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

	applyStylesAndReorder() {
		let header          	= document.querySelector('.header.transparent-header'),
			breadcrumb          = document.querySelector('.breadcrumb-section'),
			breadcrumbScrolling = document.querySelector('.breadcrumb-section .scrolling'),
			articleImage        = document.querySelector('.blog-single-section .cover-image'),
			isArticleTemplate   = document.body.classList.contains('template-article');

		// If there's no article image, remove applied styles
		if (!articleImage) {
			document.body.classList.remove('has-image-cover');

			if (breadcrumb) {
				breadcrumb.classList.remove('transparent');
				breadcrumb.style.top = ''; // Reset to default
			}
			return;
		} else {
			document.body.classList.add('has-image-cover');
		}

		if (breadcrumb && header && articleImage && isArticleTemplate) {
			breadcrumb.classList.add('transparent');
		}
	}
}

// Define custom element with a proper name
customElements.define('article-image', ArticleImageOverlay);
