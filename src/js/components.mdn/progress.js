window.addEventListener('DOMContentLoaded', (event) => {
	const progressItems = [...document.querySelectorAll('.progress')];
	const PROGRESS_CLASSES = {
		init: 'progress--init',
	};

	function makeProgressData(progress, value, max, currency = '₽') {
		return {
			progress,
			value,
			max,
			currency,
		}
	}

	function setProgress(value) {

		this.dataset.value = value
		syncProgressData(this);

		return this;
	}

	function moveIndicator(progress) {
		const max = progress.dataset.max;
		const value = progress.dataset.value;
		let percent = value / max * 100;

		const progressBarNode = progress.querySelector('.progress__bar');
		progressBarNode.style.maxWidth = `${percent}%`;

		const PERCENT_GAP_FIX = 16;
		let valueOffset = 0;
		if (percent > PERCENT_GAP_FIX) {
			valueOffset = percent - PERCENT_GAP_FIX;
		}

		// const valueNode = progress.querySelector('.progress__value');
		// valueNode.style.left = `${valueOffset}%`;

		return progress;
	}

	function appendBarNode(progress) {
		const progressBar = document.createElement('span');
		progressBar.classList.add('progress__bar');
		progress.append(progressBar);

		return progressBar;
	}

	function appendValueNode(progress) {
		const progressBar = progress.querySelector('.progress__bar');
		const valueNode = document.createElement('span');
		valueNode.classList.add('progress__value');
		progressBar.append(valueNode);

		return valueNode;
	}

	function appendMaxNode(progress) {
		const maxNode = document.createElement('span');
		maxNode.classList.add('progress__max');
		progress.append(maxNode);

		return maxNode;
	}

	function syncProgressData(progress) {
		const progressValue = `${progress.dataset.value}${progress.dataset.currency}`
		const progressMax = `${progress.dataset.max}${progress.dataset.currency}`

		let progressValueNode = progress.querySelector('.progress__value');
		let progressMaxNode = progress.querySelector('.progress__max');
		let progressBarNode = progress.querySelector('.progress__bar');

		if (!progressBarNode) {
			progressBarNode = appendBarNode(progress);
		}

		if (!progressValueNode) {
			progressValueNode = appendValueNode(progress);
		}

		if (!progressMaxNode) {
			progressMaxNode = appendMaxNode(progress);
		}


		progressValueNode.innerText = progressValue;
		progressMaxNode.innerText = progressMax;

		moveIndicator(progress);

		return progress;
	}

	function initProgressbar(progress) {
		if (progress.classList.contains(PROGRESS_CLASSES.init)) return;

		syncProgressData(progress);

		progress.makeProgressData = makeProgressData;
		progress.setProgress = setProgress;
		progress.syncProgressData = syncProgressData;
		progress.moveIndicator = moveIndicator;

		progress.classList.add(PROGRESS_CLASSES.init);
	}
	window.initProgressbar = initProgressbar;
	progressItems.forEach(progress => {
		initProgressbar(progress);
	})
});