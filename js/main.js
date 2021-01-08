let dragItems = document.querySelectorAll('.task');
let boxes = document.querySelectorAll('.list_container')
let todoBlock = document.querySelector('#todo_block');
let processBlock = document.querySelector('#progress_block');
let doneBlock = document.querySelector('#done_block');
let tasksListElement = document.querySelector('#todo_block .task_box');

for (let task of dragItems) {
	task.draggable = true;
}

boxes.forEach(el => {
	el.addEventListener('dragstart', dragStart);
	el.addEventListener('dragend', dragEnd)
	el.addEventListener('dragenter', dragEnter,false);
	// el.addEventListener('dragover', dragOver, false);
	el.addEventListener('dragleave', dragLeave,false);
	// el.addEventListener('drop', drop, false);
})

function dragStart(e) {
	e.target.classList.add(`selected`);
	e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd(e) {
	e.target.classList.remove(`selected`);
}

tasksListElement.addEventListener('dragover', (e) => {
	e.preventDefault();
	const activeElement = tasksListElement.querySelector('.selected');
	const currentElement = e.target;
	const isMovable = activeElement !== currentElement &&
		currentElement.classList.contains('task');

	if (!isMovable) {
		return false;
	}
	const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;

	tasksListElement.insertBefore(activeElement, nextElement)
})


//
//
// function dragStart(e) {
// 	e.dataTransfer.setData('text/plain', e.target.id);
// 	setTimeout(() => {
// 		e.target.classList.add('hide');
// 	}, 0)
//
// }
//
function dragEnter(e) {
	const target = e.target;
	const targetContainer = target.parentElement ===
	e.preventDefault();
	e.target.classList.add('drag-over');
}
// function dragOver(e) {
// 	e.preventDefault();
// 	e.target.classList.add('drag-over');
//
// }
function dragLeave(e) {
	e.target.classList.remove('drag-over')
}
//
// function drop(e) {
// 	e.target.classList.remove('drag-over');
//
// 	const id = e.dataTransfer.getData('text/plain');
// 	const draggable = document.getElementById(id);
//
// 	e.target.appendChild(draggable);
//
// 	draggable.classList.remove('hide')
// }