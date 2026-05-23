class btyUnitySlider extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.slider             = null;
		this.thumbSlider        = null;
		this.options            = this.querySelector('[data-options]');
		this.thumbOptions       = this.querySelector('[data-thumbs-options]');
		this.viewport           = this.querySelector('.unity-slider-viewport');
		this.thumbsViewport     = this.querySelector('.unity-thumbs-slider-viewport');
		this.isVariantScrolling = false;

		this.init();

		if (!window.__unitySliderInstances) window.__unitySliderInstances = new Map();
		const sectionId = this.closest('[id^="shopify-section-"]')?.id;
		if (sectionId) window.__unitySliderInstances.set(sectionId, this);

		this._onSectionEvent = (event) => {
			const currentSectionId = this.closest('[id^="shopify-section-"]')?.id;
			const changedSectionId = `shopify-section-${event.detail.sectionId}`;

			if (currentSectionId !== changedSectionId) return;

			requestAnimationFrame(() => {
				this.cleanup();
				this.init();
			});
		};

		document.addEventListener('shopify:section:load', this._onSectionEvent);
		document.addEventListener('shopify:section:select', this._onSectionEvent);
		document.addEventListener('shopify:block:select', this._onSectionEvent);
		document.addEventListener('product-variant-updated', (e) => this.scrollToVariantImage(e));
	}

	cleanup() {
		try {
			if (this.slider?.destroy) this.slider.destroy();
			if (this.thumbSlider?.destroy) this.thumbSlider.destroy();
		} catch (err) {
			console.warn('[unity-slider] cleanup error:', err);
		}
		this.slider      = null;
		this.thumbSlider = null;
		this.classList.remove('initialized');
	}

	disconnectedCallback() {
		document.removeEventListener('shopify:section:load', this._onSectionEvent);
		document.removeEventListener('shopify:section:select', this._onSectionEvent);
		document.removeEventListener('shopify:block:select', this._onSectionEvent);
		this.cleanup();
	}

 	findControl(selector) {
		if (!selector) return null;

		let el = this.querySelector(selector);
		if (el) return el;

		const section = this.closest('[id^="shopify-section-"]');
		if (section) {
			el = section.querySelector(selector);
			if (el) return el;
		}

		const themeComponent = this.closest('.theme-component');
		if (themeComponent) {
			el = themeComponent.querySelector(selector);
			if (el) return el;
		}

		return null;
	}

	toggleArrows(bsSlider, prevBtn, nextBtn) {
		const arrowState = () => {
			bsSlider.canScrollPrev()
				? prevBtn.removeAttribute('disabled')
				: prevBtn.setAttribute('disabled', 'disabled');
			bsSlider.canScrollNext()
				? nextBtn.removeAttribute('disabled')
				: nextBtn.setAttribute('disabled', 'disabled');
		};
		bsSlider.on('select', arrowState).on('init', arrowState).on('reInit', arrowState);
		return () => {
			prevBtn.removeAttribute('disabled');
			nextBtn.removeAttribute('disabled');
		};
	}

	addArrows(bsSlider, prevBtn, nextBtn) {
		const scrollPrev = () => bsSlider.scrollPrev();
		const scrollNext = () => bsSlider.scrollNext();
		prevBtn.addEventListener('click', scrollPrev, false);
		nextBtn.addEventListener('click', scrollNext, false);
		const removeToggle = this.toggleArrows(bsSlider, prevBtn, nextBtn);
		return () => {
			removeToggle();
			prevBtn.removeEventListener('click', scrollPrev, false);
			nextBtn.removeEventListener('click', scrollNext, false);
		};
	}

	addDots(bsSlider, dotsNode) {
		let dotNodes = [];

		const addDotHandle = () => {
			dotsNode.innerHTML = bsSlider
				.scrollSnapList()
				.map((_, i) => `<button class="unity-dot" type="button" data-id="${i + 1}"></button>`)
				.join('');

			dotNodes = dotsNode.querySelectorAll( '.unity-dot' );

			if (!dotsNode.querySelector('.pagination-current')) {
				const span = document.createElement('span');
				span.className = 'pagination-current';
				span.setAttribute('aria-hidden', 'true');
				dotsNode.appendChild(span);
			}

			dotNodes.forEach((dotNode, index) => {
				dotNode.addEventListener('click', () => bsSlider.scrollTo(index), false);
			});
		};

		const toggleDot = () => {
			const previous = bsSlider.previousScrollSnap();
			const selected = bsSlider.selectedScrollSnap();

			if (dotNodes[previous]) {
				dotNodes[previous].classList.remove( 'selected' );
			}

			if (dotNodes[selected]) {
				dotNodes[selected].classList.add( 'selected' );
			}

			const paginationCurrent = dotsNode.querySelector( '.pagination-current' );
			if (paginationCurrent) {
				paginationCurrent.style.transform = `translateX(${selected * 100}%)`;
			}
		};

		bsSlider
			.on( 'init', addDotHandle )
			.on( 'reInit', addDotHandle )
			.on( 'init', toggleDot )
			.on( 'reInit', toggleDot )
			.on( 'select', toggleDot );

		return () => {
			dotsNode.innerHTML = '';
		};
	}

	init(event) {
		if (this.classList.contains('initialized')) {
			this.cleanup();
		}
		if (!this.options || !this.viewport) return;

		let options = JSON.parse(this.options.content.textContent),
			plugins = [EmblaCarouselClassNames()];

		let prevBtn  = this.findControl(options._prevBtn);
		let nextBtn  = this.findControl(options._nextBtn);
		let dotsNode = this.findControl(options._dotsNode);

		if (!prevBtn || !nextBtn) {
			const section = this.closest('[id^="shopify-section-"]');
			if (section) {
				if (!prevBtn) prevBtn = section.querySelector(options._prevBtn);
				if (!nextBtn) nextBtn = section.querySelector(options._nextBtn);
			}
		}

		if (options._autoplay) {
			plugins.push(
				EmblaCarouselAutoplay({
					delay: Number(options._autoplay || 5000),
					stopOnMouseEnter: true,
					stopOnInteraction: false,
				})
			);
		}

		if (options._autoheight) plugins.push(EmblaCarouselAutoHeight());
		if (options._fade) plugins.push(EmblaCarouselFade());

		this.slider = EmblaCarousel(this.viewport, options, plugins);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.slider && this.slider.reInit();
				setTimeout(() => {
					this.slider?.reInit();
				}, 100);
			});
		});

		this.enableClickToScroll(this.slider);

		if (dotsNode) {
			this.addDots( this.slider, dotsNode );
		}

		if (prevBtn && nextBtn) this.addArrows(this.slider, prevBtn, nextBtn);

		const handleMedia = (slide, isActive) => {

			// HTML5 VIDEO.
			slide.querySelectorAll('video').forEach((video) => {
				const source = video.querySelector('source');

				if (isActive) {
					// Lazy-load source.
					if (source && !source.src && source.dataset.src) {
						source.src = source.dataset.src;
						source.removeAttribute('data-src');
						video.load();
					}

					video.muted = true;
					video.play().catch(() => {});
				} else {
					video.pause();
				}
			});

			// YOUTUBE.
			const yt = slide.querySelector('iframe[src*="youtube"], iframe[src*="youtu.be"]');
			if (yt) {
				yt.contentWindow?.postMessage(
					isActive
						? '{"event":"command","func":"playVideo","args":""}'
						: '{"event":"command","func":"pauseVideo","args":""}',
					"*"
				);
			}

			// VIMEO.
			const vimeo = slide.querySelector('iframe[src*="vimeo"]');
			if (vimeo) {
				vimeo.contentWindow?.postMessage(
					{ method: isActive ? 'play' : 'pause' },
					vimeo.src
				);
			}

			// MODEL VIEWER.
			const model = slide.querySelector('model-viewer, model-viewer[data-shopify-model]');
			if (model) {
				if (isActive) model.play?.();
				else model.pause?.();
			}

			// GENERIC IFRAME RESET.
			const genericIframe = slide.querySelector(
				'iframe:not([src*="youtube"]):not([src*="youtu"]):not([src*="vimeo"])'
			);
			if (genericIframe && !isActive) {
				genericIframe.src = genericIframe.src;
			}
		};

		const handleVideoPlayback = () => {
			if (!this.slider) return;

			const slides = this.slider.slideNodes?.() || [];
			const selectedIndex = this.slider.selectedScrollSnap();

			slides.forEach((slide, i) => {
				handleMedia(slide, i === selectedIndex);
			});
		};

		this.slider.on('init', handleVideoPlayback);
		this.slider.on('select', handleVideoPlayback);

		if (this.thumbsViewport && !this.thumbsViewport.closest(' .slideshow-section' )) {

			const mainViewport = this.viewport;

			if (mainViewport) {
				mainViewport.setAttribute('tabindex', '-1');
				mainViewport.setAttribute('aria-hidden', 'true');

				mainViewport.querySelectorAll('a, button, input, video, iframe, [tabindex]')
				.forEach((el) => {
					el.setAttribute('tabindex', '-1');
					el.setAttribute('aria-hidden', 'true');
				});
			}
		}

		if (this.thumbOptions && this.thumbsViewport) {
			this.initThumbSlider();
			let lastWidth = window.innerWidth;
			window.addEventListener('resize', () => {
				const currentWidth = window.innerWidth;
				if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
					this.initThumbSlider();
				}
				lastWidth = currentWidth;
			});
		}

		this.classList.add('initialized');
	}

	enableClickToScroll(embla) {
		if (!embla) return;

		const slides = embla.slideNodes();

		slides.forEach((slide, index) => {
			slide.addEventListener('click', (e) => {
				if (e.target.closest('a, button, form, input, video')) return;

				const selected = embla.selectedScrollSnap();
				if (index === selected) return;

				embla.scrollTo(index);
			});
		});
	}

	initThumbSlider() {
		if (!this.thumbOptions || !this.thumbsViewport) return;

		const productGallery = this.closest('.product-gallery');
		const isLayout2 = productGallery?.getAttribute('data-id') === 'layout-2';

		if (this.thumbSlider?.destroy) this.thumbSlider.destroy();

		this.thumbSlider = EmblaCarousel(this.thumbsViewport, {
			axis: isLayout2 ? 'x' : window.innerWidth <= 991 ? 'x' : 'y',
			...JSON.parse(this.thumbOptions.content.textContent),
		});

		if (!this.thumbSlider?.slideNodes) return;

		const slidesThumbs = this.thumbSlider.slideNodes();
		const thumbPrev    = this.querySelector('.unity-thumb-prev');
		const thumbNext    = this.querySelector('.unity-thumb-next');

		if (slidesThumbs.length < 4 && thumbPrev && thumbNext) {
			thumbPrev.style.display = 'none';
			thumbNext.style.display = 'none';
		} else if (thumbPrev && thumbNext) {
			thumbPrev.style.display = '';
			thumbNext.style.display = '';
			this.addArrows(this.thumbSlider, thumbPrev, thumbNext);
		}

		const updateSelectedClass = () => {
			if (this.isVariantScrolling) return;
			const slides = this.slider?.slideNodes?.() || [];
			const thumbs = this.thumbSlider?.slideNodes?.() || [];
			if (!slides.length || !thumbs.length) return;

			const selectedIndex = this.slider.selectedScrollSnap?.() || 0;

			slides.forEach((s, i) => s.classList.toggle('selected', i === selectedIndex));
			thumbs.forEach((t, i) => {
				t.classList.toggle('selected', i === selectedIndex);
				t.classList.toggle('unity-thumbs-slide-selected', i === selectedIndex);
			});

			try {
				this.thumbSlider.scrollTo(selectedIndex);
			} catch {}
		};

		slidesThumbs.forEach((thumb, index) => {
			thumb.addEventListener('click', () => {
				this.slider?.scrollTo(index);
				setTimeout(updateSelectedClass, 100);
			});
		});

		this.slider?.on?.('select', updateSelectedClass);

		const fixThumbFocus = () => {
			const thumbs = this.thumbsViewport.querySelectorAll('.unity-thumbs-slide');
			thumbs.forEach((thumb, index) => {
				const button = thumb.querySelector('button');
				const isClone = thumb.hasAttribute('data-embla-clone');

				if (isClone) {
					thumb.setAttribute('tabindex', '-1');
					thumb.setAttribute('aria-hidden', 'true');
					if (button) {
						button.setAttribute('tabindex', '-1');
						button.setAttribute('aria-hidden', 'true');
					}
				} else {
					thumb.removeAttribute('aria-hidden');
					thumb.setAttribute('tabindex', '-1');
					if (button) {
						button.setAttribute('tabindex', '0');
						button.removeAttribute('aria-hidden');
						button.addEventListener('focus', () => {
							this.slider?.scrollTo(index);
							this.thumbSlider?.scrollTo(index);
						});
					}
				}
			});
		};

		this.thumbSlider.on('init', () => {
			updateSelectedClass();
			setTimeout(fixThumbFocus, 150);
		});
		this.thumbSlider.on('reInit', () => setTimeout(fixThumbFocus, 150));
	}

	scrollToVariantImage(e) {
		const selected = e?.detail?.selected;
		if (!selected?.featured_media?.id || !this.slider) return;

		const slides = this.slider.slideNodes?.() || [];
		const thumbs = this.thumbSlider?.slideNodes?.() || [];
		if (!slides.length) return;

		const mediaId = selected.featured_media.id;
		let index = slides.findIndex((s) => Number(s.dataset.mediaId) === mediaId);
		if (index < 0) index = 0;

		this.isVariantScrolling = true;

		try {
			this.slider.scrollTo(index, true);
			this.thumbSlider?.scrollTo(index, true);
		} catch (err) {
			console.warn('[unity-slider] scrollToVariantImage error:', err);
		}

		setTimeout(() => {
			slides.forEach((s, i) => s.classList.toggle('selected', i === index));
			thumbs.forEach((t, i) => t.classList.toggle('selected', i === index));
			this.isVariantScrolling = false;
		}, 600);
	}
}

customElements.define('unity-slider', btyUnitySlider);