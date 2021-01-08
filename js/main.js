let dragItems = document.querySelectorAll(".task");
let boxes = document.querySelectorAll(".list_container");
let completeCounter = document.querySelector(".task-completed-counter");
let taskBoxDone = document.querySelectorAll("#done_block .task");
completeCounter.innerText = `${taskBoxDone.length} / ${dragItems.length} done`;

for (let item of dragItems) {
	item.draggable = true;
	item.addEventListener("mouseenter", () => {
		item.classList.add("hover");
	});
	item.addEventListener("mouseleave", () => {
		item.classList.remove("hover");
	});
	item.addEventListener("dragstart", () => {
		item.classList.add("selected");
	});
	item.addEventListener("dragend", () => {
		item.classList.remove("selected");
		let taskBoxDoneCur = document.querySelectorAll("#done_block .task");
		completeCounter.innerText = `${taskBoxDoneCur.length} / ${dragItems.length} done`;
	});
}

boxes.forEach((box) => {
	box.addEventListener("dragover", (e) => {
		e.preventDefault();
		const dragging = document.querySelector(".task.selected");
		const taskBox = box.querySelector(".task_box");
		const afterElement = getDragAfterElement(box, e.clientY);
		dragItems.forEach((el) => {
			el.classList.remove("hover");
		});

		if (!afterElement) {
			taskBox.appendChild(dragging);
		} else {
			taskBox.insertBefore(dragging, afterElement);
		}
	});
});

function getDragAfterElement(container, y) {
	let draggingElements = [
		...container.querySelectorAll(".task:not(.selected)"),
	];
	return draggingElements.reduce(
		(closest, child) => {
			let box = child.getBoundingClientRect();
			let offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}
