window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		
		e.target.reset();
		DisplayTodos()

	})

	DisplayTodos()
})

const clearTodosButton = document.querySelector('#clear-todos');
clearTodosButton.addEventListener('click', () => {

	todos = [];
	
	localStorage.setItem('todos', JSON.stringify(todos));
	
	DisplayTodos();
});


function generateTimestamp() {
    const timestamp = document.createElement('div');
    timestamp.textContent = new Date().toLocaleString(); // Using current time
    timestamp.classList.add('todo-timestamp');
    return timestamp;
}

// Function to update the clock
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.querySelector('.clock').textContent = formattedTime;
}

// Update the clock every second
setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();






function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoItem.appendChild(generateTimestamp()); // Add timestamp here

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos()

        })

        edit.addEventListener('click', () => {
            const inputField = content.querySelector('input');
            if (edit.innerText === "Edit") {
                // edit.classList.add('save-mode');
                edit.innerText = "Save";
                edit.style.backgroundColor = "green";
                // edit.classList.add('save-mode'); // Add save-mode class
                inputField.removeAttribute('readonly');
                inputField.focus();
            } else {
                edit.innerText = "Edit";
                edit.style.backgroundColor = "#EA40A4"
                // edit.classList.remove('save-mode'); // Remove save-mode class
                inputField.setAttribute('readonly', true);
                todo.content = inputField.value;
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        });

        deleteButton.addEventListener('click', () => {
            const index = todos.findIndex(t => t === todo);
            if (index !== -1) {
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos()
            }
        })

    })
}
