class BtyTimeline extends HTMLElement {
	constructor() {
		super();
		this.eventsMinDistance = 60;
	}

	connectedCallback() {
		this.initTimeline();
		if ( window.Shopify && window.Shopify.designMode ) {
			document.addEventListener('shopify:block:select', ( event ) => {
				const blockId = event.detail?.blockId;

				if ( !this.timelineComponents || !this.timelineComponents.timelineEvents ) {
					setTimeout(() => this.selectEventByBlockId(blockId), 300);
				} else {
					this.selectEventByBlockId(blockId);
				}
			});
		}
	}

	initTimeline() {
		const timeline = this.querySelector( '.timeline-wrapper' );
		if ( ! timeline ) return;

		this.timelineComponents = {
			timelineWrapper: timeline.querySelector( '.events-wrapper' ),
			eventsWrapper: timeline.querySelector( '.events' ),
			fillingLine: timeline.querySelector( '.filling-line' ),
			timelineEvents: timeline.querySelectorAll( '.events a' ),
			timelineNavigation: timeline.querySelector( '.cd-timeline-navigation' ),
			eventsContent: timeline.querySelector( '.events-content' )
		};

		const originalEvents = Array.from(this.timelineComponents.timelineEvents);
		const parsedDates = this.parseDate(originalEvents);

		const zipped = originalEvents.map((el, i) => ({
			date: parsedDates[i],
			el
		})).filter(item => item.date instanceof Date && !isNaN(item.date));

		zipped.sort((a, b) => a.date - b.date);

		this.timelineComponents.timelineDates = zipped.map(item => item.date);
		this.timelineComponents.timelineEvents = zipped.map(item => item.el);

		const eventsContainer = this.timelineComponents.eventsWrapper;
		eventsContainer.innerHTML = '';
		this.timelineComponents.timelineEvents.forEach(el => eventsContainer.appendChild(el));

		this.timelineComponents.eventsMinLapse = this.minLapse(this.timelineComponents.timelineDates);

		this.setDatePosition();
		this.timelineTotWidth = this.setTimelineWidth();
		timeline.classList.add( 'loaded' );

		this.addNavigationHandlers();
		this.addEventSelectionHandler();
		this.addKeyboardNavigation();

		const selectedEvent = this.querySelector( '.events a.selected' ) || this.timelineComponents.timelineEvents[0];

		if (selectedEvent) this.updateFilling(selectedEvent);
	}

	addNavigationHandlers() {
		const { timelineNavigation } = this.timelineComponents;
		if ( !timelineNavigation ) return;

		const nextBtn = timelineNavigation.querySelector( '.next' );
		const prevBtn = timelineNavigation.querySelector( '.prev' );

		if ( nextBtn ) nextBtn.addEventListener('click', (event) => this.updateSlide(event, 'next'));
		if ( prevBtn ) prevBtn.addEventListener('click', (event) => this.updateSlide(event, 'prev'));
	}

	selectEventByBlockId(blockId) {
		const matchedLink = Array.from(this.timelineComponents.timelineEvents).find(
			link => link.dataset.blockId === blockId
		);
		if ( matchedLink ) matchedLink.click();
	}

	addEventSelectionHandler() {
		this.timelineComponents.eventsWrapper.addEventListener('click', (event) => {
			const target = event.target.closest('a');
			if (target) {
				event.preventDefault();

				this.timelineComponents.timelineEvents.forEach(ev => ev.classList.remove('selected'));
				target.classList.add('selected');
				this.updateFilling(target);

				const blockId   = target.dataset.blockId;
				const section   = target.closest('[id^="shopify-section-"]');
				const sectionId = section?.id;
				if (!sectionId) return;

				const unitySliderInstance = window.__unitySliderInstances?.get(sectionId);
				if (!unitySliderInstance || !unitySliderInstance.slider) return;

				const slides     = Array.from(section.querySelectorAll('.unity-slide'));
				const slideIndex = slides.findIndex(el => el.dataset.blockId === blockId);

				if (slideIndex !== -1) {
					unitySliderInstance.slider.scrollTo(slideIndex);
				}
			}
		});

		// 👇 Thêm đoạn này để đồng bộ ngược lại
		const section = this.closest('[id^="shopify-section-"]');
		const sectionId = section?.id;
		const unitySliderInstance = window.__unitySliderInstances?.get(sectionId);

		if (unitySliderInstance?.slider) {
			unitySliderInstance.slider.on('select', () => {
				const index = unitySliderInstance.slider.selectedScrollSnap();
				const slides = Array.from(section.querySelectorAll('.unity-slide'));
				const activeSlide = slides[index];
				if (!activeSlide) return;

				const blockId = activeSlide.dataset.blockId;
				const matchedLink = Array.from(this.timelineComponents.timelineEvents)
					.find(link => link.dataset.blockId === blockId);

				if (matchedLink) {
					this.timelineComponents.timelineEvents.forEach(ev => ev.classList.remove('selected'));
					matchedLink.classList.add('selected');
					this.updateFilling(matchedLink);
				}
			});
		}
	}


	addKeyboardNavigation() {
		document.addEventListener('keyup', (event) => {
			if (!this.elementInViewport(this)) return;
			if (event.key === 'ArrowLeft') this.showNewContent('prev');
			if (event.key === 'ArrowRight') this.showNewContent('next');
		});
	}

	updateSlide(event, direction) {
		event.preventDefault();
		const translateValue = this.getTranslateValue();
		const wrapperWidth = this.timelineComponents.timelineWrapper.clientWidth;
		const newValue = direction === 'next'
			? translateValue - (wrapperWidth - this.eventsMinDistance)
			: translateValue + (wrapperWidth - this.eventsMinDistance);
		this.translateTimeline(newValue, wrapperWidth - this.timelineTotWidth);
	}

	translateTimeline(value, totWidth) {
		const { eventsWrapper, timelineNavigation } = this.timelineComponents;
		value = Math.max(totWidth, Math.min(0, value));
		eventsWrapper.style.transform = `translateX(${value}px)`;

		timelineNavigation.querySelector('.prev').classList.toggle('disabled', value === 0);
		timelineNavigation.querySelector('.next').classList.toggle('disabled', value === totWidth);
	}

	updateFilling(selectedEvent) {
		const eventLeft = selectedEvent.offsetLeft + selectedEvent.offsetWidth / 2;
		const scaleValue = eventLeft / this.timelineTotWidth;
		this.timelineComponents.fillingLine.style.transform = `scaleX(${scaleValue})`;
	}

	setDatePosition() {
		this.timelineComponents.timelineEvents.forEach((event, i) => {
			const distance = this.daydiff(this.timelineComponents.timelineDates[0], this.timelineComponents.timelineDates[i]);
			event.style.left = (Math.round(distance / this.timelineComponents.eventsMinLapse) + 2) * this.eventsMinDistance + 'px';
		});
	}

	setTimelineWidth() {
		const wrapperWidth = this.timelineComponents.timelineWrapper.clientWidth;

		const timeSpan = this.daydiff(
			this.timelineComponents.timelineDates[0],
			this.timelineComponents.timelineDates.at(-1)
		);
		const estimatedWidth = (Math.round(timeSpan / this.timelineComponents.eventsMinLapse) + 4) * this.eventsMinDistance;

		const totalWidth = Math.max(estimatedWidth, wrapperWidth);

		this.timelineComponents.eventsWrapper.style.width = `${totalWidth}px`;
		this.updateFilling(this.timelineComponents.timelineEvents[0]);

		const { timelineNavigation } = this.timelineComponents;
		if (timelineNavigation) {
			const prev = timelineNavigation.querySelector('.prev');
			const next = timelineNavigation.querySelector('.next');

			const shouldDisable = totalWidth <= wrapperWidth;

			if (prev) prev.classList.toggle('disabled', shouldDisable);
			if (next) next.classList.toggle('disabled', shouldDisable);
		}
		return totalWidth;
	}

	getTranslateValue() {
		const transform = window.getComputedStyle(this.timelineComponents.eventsWrapper).transform;
		return transform.includes('(') ? parseFloat(transform.split('(')[1].split(')')[0].split(',')[4]) || 0 : 0;
	}

	parseDate(events) {
		const validDates = [];
		return Array.from(events).map(event => {
			const dateStr = event.dataset.date?.trim();
			if (!dateStr) return null;

			const parts = dateStr.split('/').map(Number);
			let date;
			if (parts.length === 1 && !isNaN(parts[0])) {
				date = new Date(parts[0], 0, 1);
			} else if (parts.length === 3 && parts.every(n => !isNaN(n))) {
				date = new Date(parts[2], parts[1] - 1, parts[0]);
			} else {
				return null;
			}

			validDates.push(date);
			return date;
		});
	}

	daydiff(first, second) {
		const msPerDay = 1000 * 60 * 60 * 24;
		return Math.round((second - first) / msPerDay);
	}

	minLapse(dates) {
		return Math.min(...dates.slice(1).map((date, i) => this.daydiff(dates[i], date)));
	}

	elementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom > 0;
	}
}

customElements.define( 'timeline-carousel', BtyTimeline );
