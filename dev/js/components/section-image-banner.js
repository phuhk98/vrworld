// class ParallaxBanner extends HTMLElement {
// 	constructor() {
// 		super();
// 		this._raf = null;
// 		this._onScroll = this._onScroll.bind(this);
// 	}

// 	connectedCallback() {
// 		this.speed = parseFloat(this.dataset.speed) || 0.25;
// 		this.scale = parseFloat(this.dataset.scale) || 1.5;

// 		this.image = this.querySelector('.banner-image:not(.hidden-desktop)');
// 		if (!this.image) return;

// 		this.img = this.image.querySelector('img');
// 		if (!this.img) return;

// 		this._prepareImage();
// 		this._onScroll();
// 		window.addEventListener('scroll', this._onScroll, { passive: true });
// 		window.addEventListener('resize', this._onScroll);
// 	}

// 	disconnectedCallback() {
// 		window.removeEventListener('scroll', this._onScroll);
// 		window.removeEventListener('resize', this._onScroll);
// 		cancelAnimationFrame(this._raf);
// 	}

// 	_prepareImage() {
// 		this.style.position = 'relative';
// 		this.style.overflow = 'hidden';

// 		this.image.style.willChange = 'transform';
// 		this.img.style.transform = `scale(${this.scale})`;
// 		this.img.style.transformOrigin = 'center';
// 	}

// 	_onScroll() {
// 		if (this._raf) return;

// 		this._raf = requestAnimationFrame(() => {
// 			this._raf = null;

// 			const rect = this.getBoundingClientRect();
// 			const vh = window.innerHeight;

// 			if (rect.bottom <= 0 || rect.top >= vh) return;

// 			const sectionCenter = rect.top + rect.height / 2;
// 			const distance = sectionCenter - vh / 2;

// 			const maxOffset = rect.height * (this.scale - 1) / 2;
// 			let offset = distance * this.speed;
// 			offset = Math.max(-maxOffset, Math.min(maxOffset, offset));

// 			this.image.style.transform = `translateY(${offset}px)`;
// 		});
// 	}
// }

// customElements.define('parallax-banner', ParallaxBanner);