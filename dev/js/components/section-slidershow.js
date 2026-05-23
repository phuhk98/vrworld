function setupThumbProgress(section) {
	let $$ = (root, sel) => Array.from(root.querySelectorAll(sel));

	let getEmbla = (el) => {
		if (el.slider) return el.slider;
		let map = window.__vrworldSliderInstances;
		if (map instanceof Map) {
			let id = el.closest('[id^="shopify-section-"]')?.id;
			let inst = id ? map.get(id) : null;
			return inst?.slider || inst || null;
		}
		return null;
	};

	// Add <span class="progress-arc"> into each thumb if missing
	let ensureArcs = (thumbs) => {
		thumbs.forEach((btn) => {
			if (!btn.querySelector('.progress-arc')) {
				let arc = document.createElement('span');
				arc.className = 'progress-arc';
				arc.setAttribute('aria-hidden', 'true');
				btn.prepend(arc);
			}
		});
	};

	// Get the currently active thumb index based on .vrworld-thumbs-slide-selected
	let activeIdxFromDOM = (sliderEl, thumbs) => {
		let slide = sliderEl.querySelector('.vrworld-thumbs-slide-selected');
		if (!slide) return 0;
		let btn = slide.querySelector('.vrworld-thumb-number');
		let i = thumbs.indexOf(btn);
		return i >= 0 ? i : 0;
	};

	// Write progress to the thumb's arc
	let setArc = (btn, ratio) => {
		let arc = btn?.querySelector('.progress-arc');
		if (!arc) return;
		let r = Math.max(0, Math.min(1, ratio));
		arc.style.setProperty('--deg', (r * 360) + 'deg');
	};

	// Fallback manual advance if no embla: just move the .vrworld-thumbs-slide-selected class
	let fallbackAdvanceSelectedThumb = (sliderEl, thumbs) => {
		let cur = activeIdxFromDOM(sliderEl, thumbs);
		let next = cur + 1;
		if (next >= thumbs.length) next = 0;

		// remove current selected class from all slides
		sliderEl.querySelectorAll('.vrworld-thumbs-slide-selected').forEach((n) => {
			n.classList.remove('vrworld-thumbs-slide-selected');
		});

		// add selected class to the next thumb's wrapper
		let targetThumb = thumbs[next];
		if (!targetThumb) return;
		let wrap = targetThumb.closest('.vrworld-thumbs-slide');
		if (wrap) {
			wrap.classList.add('vrworld-thumbs-slide-selected');
		}
	};

	let root = section || document;

	// scope to slideshow-section only
	let sliders = root.querySelectorAll('.slideshow-section vrworld-slider');

	sliders.forEach((sliderEl) => {
		if (sliderEl.__thumbProgressInit) return;
		sliderEl.__thumbProgressInit = true;

		let embla    = getEmbla(sliderEl);
		let viewport = sliderEl.querySelector('.vrworld-slider-viewport');
		let wrap     = sliderEl.querySelector('.vrworld-thumbs-slider-container')
		             || sliderEl.querySelector('.thumb-slider')
		             || sliderEl;
		let thumbs   = $$(sliderEl, '.vrworld-thumb-number');

		// autoplay duration (ms)
		let autoplayMs = Number(sliderEl.options?._autoplay) || 5000;
		if (!thumbs.length || autoplayMs < 1) return;

		ensureArcs(thumbs);

		let raf    = 0;
		let t0     = null;
		let paused = false;

		let clearOthers = () => {
			let a = activeIdxFromDOM(sliderEl, thumbs);
			thumbs.forEach((b, i) => {
				if (i !== a) setArc(b, 0);
			});
		};

		let advanceSlide = () => {
			if (embla && typeof embla.scrollNext === 'function') {
				embla.scrollNext();
			} else {
				fallbackAdvanceSelectedThumb(sliderEl, thumbs);
			}
		};

		let step = (ts) => {
			if (t0 == null) t0 = ts;

			if (!paused) {
				let i = activeIdxFromDOM(sliderEl, thumbs);
				let progress = (ts - t0) / autoplayMs;

				setArc(thumbs[i], progress);

				if (progress >= 1) {
					advanceSlide();
				}
			}

			raf = requestAnimationFrame(step);
		};

		let restart = () => {
			cancelAnimationFrame(raf);
			t0 = null;
			paused = false;
			clearOthers();
			raf = requestAnimationFrame(step);
		};

		// Embla tells us slide actually changed
		if (embla && embla.on) {
			embla.on('select', () => {
				setTimeout(restart, 20);
			});
		}

		// MutationObserver fallback if theme updates .vrworld-thumbs-slide-selected manually
		if (wrap) {
			let mo = new MutationObserver(() => {
				setTimeout(restart, 0);
			});
			mo.observe(wrap, {
				subtree: true,
				childList: true,
				attributes: true,
				attributeFilter: ['class']
			});
			sliderEl.__thumbProgressObserver = mo;
		}

		// Manual thumb click should also restart timer
		sliderEl.addEventListener('click', (e) => {
			if (e.target.closest('.vrworld-thumb-number')) {
				setTimeout(restart, 0);
			}
		});

		// Start the loop
		clearOthers();
		raf = requestAnimationFrame(step);

		// Cleanup if section unloads
		sliderEl.__thumbProgressCleanup = () => {
			cancelAnimationFrame(raf);
			sliderEl.__thumbProgressObserver?.disconnect();
			[viewport, wrap].filter(Boolean).forEach((el) => {
				el.replaceWith(el);
			});
		};
	});
}
