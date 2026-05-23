class ScrollingRow extends HTMLElement {
	constructor() {
		super();
		this.onScroll = this.onScroll.bind(this);
	}

	connectedCallback() {
		this.items = this.querySelectorAll('.full-services__item');
		if (!this.items.length) return;

		this.onScroll();
		window.addEventListener('scroll', this.onScroll, { passive: true });
	}

	disconnectedCallback() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll() {
		const viewportHeight = window.innerHeight;

		this.items.forEach((item, index) => {
			if (index === this.items.length - 1) return;

			const nextItem = this.items[index + 1];
			const nextRect = nextItem.getBoundingClientRect();
			const distanceToTop = nextRect.top;

			if (distanceToTop < viewportHeight && distanceToTop > 0) {
				const progress = 1 - distanceToTop / viewportHeight;
				const scale = 1 - progress * 0.05;
				const opacity = 1 - progress * 0.2;

				item.style.transform = `scale(${scale})`;
				item.style.opacity = opacity;
			} else if (distanceToTop >= viewportHeight) {
				item.style.transform = 'scale(1)';
				item.style.opacity = '1';
			}
		});
	}
}

customElements.define('scrolling-row', ScrollingRow);
