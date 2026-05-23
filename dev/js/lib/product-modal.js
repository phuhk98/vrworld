document.addEventListener('DOMContentLoaded', () => {
	const thumbnails = document.querySelectorAll('.main-sliders .media-preview');
	const lightbox   = document.getElementById('lightbox');
	const closeBtn   = document.getElementById('close');
	const sliderEl   = lightbox?.querySelector('unity-slider');

	if (!thumbnails.length || !lightbox || !closeBtn || !sliderEl) return;

	let sliderReady = false;

	const mediaBox = lightbox.closest('.product-media-box');

	const setLightboxState = (isOpen) => {
		if (!mediaBox) return;

		if (isOpen) {
			lightbox.style.display = 'flex';
			mediaBox.classList.add('has-lightbox');
		} else {
			lightbox.style.display = 'none';
			mediaBox.classList.remove('has-lightbox');
		}
	};

	const observer = new MutationObserver(() => {
		const slides = sliderEl.querySelectorAll('.unity-slide');
		if (slides.length) {
			sliderReady = true;
			observer.disconnect();
		}
	});
	observer.observe(sliderEl, { childList: true, subtree: true });

	function ensureGoTo(index) {
		let tries = 0;
		const maxTries = 10;

		const tryGo = () => {
			if (typeof sliderEl.goTo === 'function') {
				try {
					sliderEl.goTo(index);
					return;
				} catch (e) {
					console.warn('goTo error:', e);
				}
			}

			const slides = sliderEl.querySelectorAll('.unity-slide');
			slides.forEach((s, i) => {
				s.style.display = i === index ? '' : 'none';
			});

			if (tries++ < maxTries) {
				requestAnimationFrame(tryGo);
			}
		};
		tryGo();
	}

	thumbnails.forEach((thumb, i) => {
		thumb.addEventListener('click', (ev) => {
			ev.preventDefault();
			setLightboxState(true);
			ensureGoTo(i);
		});
	});

	closeBtn.addEventListener('click', () => {
		setLightboxState(false);
	});

	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			setLightboxState(false);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			setLightboxState(false);
		}
	});
});
