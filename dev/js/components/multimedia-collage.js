class btfMultimediaCollage extends HTMLElement {

	constructor() {
		super();
		this.observers = [];
	}

	connectedCallback() {
		this.init();

		this._onSectionLoad = () => {
			this.destroy();
			this.init();
		};

		document.addEventListener(
			'shopify:section:load',
			this._onSectionLoad
		);
	}

	disconnectedCallback() {
		document.removeEventListener(
			'shopify:section:load',
			this._onSectionLoad
		);

		this.destroy();
	}

	destroy() {
		this.observers.forEach(o => o.disconnect());
		this.observers = [];
	}

	init() {

		const items = this.querySelectorAll('.video-item');

		items.forEach(item => {

			const isAutoplay =
				item.dataset.autoplay === "true";

			const playBtn =
				item.querySelector('.play-video');

			const localVideo =
				item.querySelector('.js-local-video');

			const iframe =
				item.querySelector('.js-video-embed');

			const removeOverlay = () => {
				item.querySelector('.video-image-wrapper')?.remove();
				playBtn?.remove();
			};

			/* =====================
					CLICK PLAY (MP4)
			===================== */
			if (playBtn && localVideo) {

				playBtn.addEventListener('click', () => {

					const source =
						localVideo.querySelector('source');

					if (source?.dataset.src && !source.src) {
						source.src = source.dataset.src;
						localVideo.load();
					}

					localVideo.muted = false;
					localVideo.play().catch(()=>{});
					localVideo.style.display = 'block';

					removeOverlay();

				}, { once:true });
			}

			/* =====================
					AUTOPLAY
			===================== */
			if (isAutoplay) {

				const observer =
					new IntersectionObserver(entries => {

						entries.forEach(entry => {

							if (!entry.isIntersecting) return;

							/* MP4 */
							if (localVideo) {

								const source =
									localVideo.querySelector('source');

								if (source?.dataset.src && !source.src) {
									source.src = source.dataset.src;
									localVideo.load();
								}

								localVideo.muted = true;
								localVideo.play().catch(()=>{});

								removeOverlay();
							}

							/* Youtube / Vimeo */
							if (iframe &&
									iframe.dataset.src &&
									!iframe.src) {

								iframe.src = iframe.dataset.src;
								removeOverlay();
							}

						});

					}, { threshold: 0.4 });

				observer.observe(item);
				this.observers.push(observer);
			}

		});
	}
}

customElements.define(
	'btf-multimedia-collage',
	btfMultimediaCollage
);