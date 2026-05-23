document.addEventListener('click', e => {
	const trigger = e.target.closest('.has-popup');
	if (!trigger) return;

	e.preventDefault();

	const sourcePopup = trigger.nextElementSibling;
	if (!sourcePopup || !sourcePopup.classList.contains('popup')) return;

	closeGlobalPopup();

	const overlay = document.createElement('div');
	overlay.className = 'global-popup-overlay';

	const popup = document.createElement('div');
	popup.className = 'global-popup';
	popup.innerHTML = sourcePopup.innerHTML;

	const closeBtn = document.createElement('button');
	closeBtn.className = 'global-popup-close';
	closeBtn.type = 'button';
	closeBtn.innerHTML = '×';

	closeBtn.addEventListener('click', closeGlobalPopup);
	overlay.addEventListener('click', ev => {
		if (ev.target === overlay) closeGlobalPopup();
	});

	popup.appendChild(closeBtn);
	overlay.appendChild(popup);
	document.body.appendChild(overlay);
	document.body.classList.add('popup-open');

	requestAnimationFrame(() => {
		document.dispatchEvent(new Event('scroll'));
		window.dispatchEvent(new Event('resize'));
	});
});

function closeGlobalPopup() {
	const overlay = document.querySelector('.global-popup-overlay');
	if (overlay) overlay.remove();
	document.body.classList.remove('popup-open');
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeGlobalPopup();
});
