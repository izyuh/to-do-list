const addBtn = document.querySelector('.add-btn');
const input = document.getElementById('input');
const list = document.querySelector('.list');
const deleteAllBtn = document.querySelector('.deleteAllBtn')

getItem();

//add button to push task to list
addBtn.addEventListener('click', () => addTask(input.value.trim()));

//delete all button to clear list
deleteAllBtn.addEventListener('click', deleteAll)

// Allow pressing Enter to add a task
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask(input.value.trim());
    }
});

// Add task to list
function addTask(taskText) {

    // Check if input is empty
    if (taskText !== '') {

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteTask'
        
        list.appendChild(listItem);
        listItem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            list.removeChild(listItem);
            saveItem();
        })

        listItem.scrollIntoView({ behavior: 'smooth' });

        input.value = '';
        input.focus();
        saveItem();

    } else alert('Can not enter empty value')
}

function saveItem() {
    let tasks = [];
    list.querySelectorAll('li').forEach(element => {
        tasks.push(element.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('list', JSON.stringify(tasks));
}

function getItem() {
    const jsonData = localStorage.getItem('list');

    if(!jsonData) {
        console.warn('No data found');
        return;
    }

    const tasks = JSON.parse(jsonData);

    tasks.forEach(data => addTask(data));
}

function deleteAll() {
    localStorage.setItem('list', [])

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}