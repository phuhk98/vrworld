class ImageSpotlightSection extends HTMLElement {
	connectedCallback() {
		this.items = Array.from(this.querySelectorAll('.item'));
		this.isDesignSelecting = false;

		this.items.forEach(item => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();

				const id = item.dataset.id;
				if (!id) return;

				const isActive = item.classList.contains('active');

				this.clearActive();

				if (!isActive) {
					item.classList.add('active');

					if (window.innerWidth <= 991) {
						const dot = this.querySelector(
							`.vrworld-dot[data-id="${id}"]`
						);
						if (dot) dot.click();
					}
				}
			});
		});

		this.addEventListener('click', (e) => {
			const dot = e.target.closest('.vrworld-dot');
			if (!dot) return;

			e.stopPropagation();

			const id = dot.dataset.id;
			if (!id) return;

			this.clearActive();

			const targetItem = this.querySelector(
				`.item[data-id="${id}"]`
			);
			if (targetItem) {
				targetItem.classList.add('active');
			}
		});

		this.handleOutsideClick = (e) => {
			if (this.isDesignSelecting) return;

			const clickedItem = e.target.closest('.item');

			if (!clickedItem || !this.contains(clickedItem)) {
				this.clearActive();
			}
		};

		document.addEventListener('click', this.handleOutsideClick);

		if (Shopify.designMode) {
			document.addEventListener('shopify:block:select', (e) => {
				const blockId = e.detail.blockId;

				const selectedItem = this.querySelector(
					`.item[data-block-id="${blockId}"]`
				);
				if (!selectedItem) return;

				this.isDesignSelecting = true;

				const id = selectedItem.dataset.id;

				this.clearActive();
				selectedItem.classList.add('active');

				setTimeout(() => {
					this.isDesignSelecting = false;
				}, 0);
			});

			document.addEventListener('shopify:block:deselect', () => {
				this.clearActive();
			});
		}
	}

	disconnectedCallback() {
		document.removeEventListener(
			'click',
			this.handleOutsideClick
		);
	}

	clearActive() {
		this.items.forEach(el => el.classList.remove('active'));
	}
}

customElements.define(
	'image-spotlight-section',
	ImageSpotlightSection
);
