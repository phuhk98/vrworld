class BtyAccordionDetails extends HTMLElement {
	constructor() {
		super();
		this.handlePointerDown = this.handlePointerDown.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);

		this._suppressBlurCloseUntil = 0; // guard for right-click & context menu
	}

	connectedCallback() {
		this.detailsElements = this.querySelectorAll("details");
			if (!this.detailsElements.length) return;

			this.detailsElements.forEach((details) => {
				details.addEventListener("toggle", () => {
				const sum = details.querySelector(":scope > summary");
				if (sum) sum.setAttribute("aria-expanded", details.hasAttribute("open") ? "true" : "false");
				this.closeOthers(details);
			});
			const sum = details.querySelector(":scope > summary");
			if (sum && !sum.hasAttribute("aria-expanded")) {
			sum.setAttribute("aria-expanded", details.hasAttribute("open") ? "true" : "false");
			}
		});

		// Close on primary-button click outside (NOT right/middle)
		document.addEventListener("pointerdown", this.handlePointerDown, true);

		// Esc to close deepest open
		document.addEventListener("keydown", this.handleKeydown, true);

		// Mark contextmenu (right-click) inside to avoid closing
		this.addEventListener("contextmenu", this.handleContextMenu, true);
	}

	disconnectedCallback() {
		document.removeEventListener("pointerdown", this.handlePointerDown, true);
		document.removeEventListener("keydown", this.handleKeydown, true);
		this.removeEventListener("contextmenu", this.handleContextMenu, true);
	}

	closeOthers(openedDetails) {
		this.detailsElements.forEach((details) => {
			if (details !== openedDetails) {
				details.removeAttribute("open");
				details.querySelector(":scope > summary")?.setAttribute("aria-expanded", "false");
			}
		});
	}

  	// Only close on primary-button click outside this component
	handlePointerDown(event) {
		if (event.button !== 0) return; // ignore right/middle clicks
		if (this.contains(event.target)) return;

		this.closeAll();
	}

	handleKeydown(event) {
		// ESC: đóng panel đang mở sâu nhất
		if (event.key === "Escape" || event.key === "Esc") {
			const openPanels = this.querySelectorAll("details[open]");
			// Nếu bên trong component có focus hoặc đang có panel mở
			if (!openPanels.length && !this.contains(document.activeElement)) return;

			const deepest = openPanels[openPanels.length - 1];
			if (deepest) {
				event.preventDefault();
				deepest.removeAttribute("open");
				const sum = deepest.querySelector(":scope > summary");
				sum?.setAttribute("aria-expanded", "false");
				sum?.focus();
				event.stopPropagation();
			}
			return;
		}

		// TAB: nếu đang có panel mở mà focus NHẢY RA KHỎI panel → đóng
		if (event.key === "Tab") {
			const openDetails = this.querySelector("details[open]");
			if (!openDetails) {
				return; // không có cái nào mở thì thôi
			}

			// Sau khi browser move focus xong mới kiểm tra
			requestAnimationFrame(() => {
				const root   = this.getRootNode?.() || document;
				const active = root.activeElement || document.activeElement;

				// Nếu focus mới vẫn nằm trong panel đang mở → giữ nguyên
				if (active && openDetails.contains(active)) {
					return;
				}

				// Nếu tới đây: focus đã ra ngoài panel (VD: sang menu khác / icon khác) → đóng
				this.closeAll();
			});
		}
	}

	handleContextMenu(e) {
		// If right-click happens inside the component, suppress blur-closing briefly
		if (this.contains(e.target)) {
			// suppress for a short window to ride out focus/blur churn from context menu
			this._suppressBlurCloseUntil = performance.now() + 400; // ms
		}
	}

	closeAll() {
		this.detailsElements.forEach((details) => {
			details.removeAttribute("open");
			details.querySelector(":scope > summary")?.setAttribute("aria-expanded", "false");
		});
  	}
}

customElements.define('bty-accordion-details', BtyAccordionDetails);
