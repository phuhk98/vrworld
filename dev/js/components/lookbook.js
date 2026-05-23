class LookbookSync extends HTMLElement {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	connectedCallback() {
		this.addEventListener('click', this.onClick);
		this.bindEmbla();
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.onClick);
	}

	bindEmbla() {
		const unitySlider = this.querySelector('unity-slider');
		if (!unitySlider || !unitySlider.thumbSlider) {
			requestAnimationFrame(() => this.bindEmbla());
			return;
		}

		this.thumbSlider = unitySlider.thumbSlider;
	}

	onClick(e) {
		const item = e.target.closest('.item');
		if (!item || !this.contains(item)) return;

		const index = Number(item.dataset.index);
		if (Number.isNaN(index)) return;

		const emblaIndex = index - 1;

		this.syncItems(index);
		this.syncThumbs(index);

		if (this.thumbSlider) {
			this.thumbSlider.scrollTo(emblaIndex, true);
		}
	}

	syncItems(index) {
		const items = this.querySelectorAll('.item');
		items.forEach((el) => {
			el.classList.toggle(
				'active',
				Number(el.dataset.index) === index
			);
		});
	}

	syncThumbs(index) {
		const thumbs = this.querySelectorAll('.unity-thumbs-slide');
		thumbs.forEach((thumb) => {
			const isMatch = Number(thumb.dataset.index) === index;
			thumb.classList.toggle('selected', isMatch);
			thumb.classList.toggle('unity-thumbs-slide-selected', isMatch);
		});
	}
}

customElements.define('lookbook-sync', LookbookSync);
