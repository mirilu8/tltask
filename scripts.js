const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const list = document.querySelector('.list-task');

let minhalistadeitens = [];

function addnewtask() {
    minhalistadeitens.push({
        task: input.value,
        concluida: false
    });
    input.value = '';
    mostrartarefas();
    salvarnoLocalStorage();
}

function mostrartarefas() {
    let novali = '';

    minhalistadeitens.forEach((item, index) => {
        novali += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="img/checked.png" alt="check na tarefa" onclick="tarefaconcluida(${index})">
                <p>${item.task}</p>
                <img src="img/trash.png" alt="deletar tarefa" onclick="deletaritem(${index})">
            </li>
        `;
    });

    list.innerHTML = novali;
}

function deletaritem(index) {
    minhalistadeitens.splice(index, 1);
    mostrartarefas();
    salvarnoLocalStorage();
}

function tarefaconcluida(index) {
    minhalistadeitens[index].concluida = !minhalistadeitens[index].concluida;
    mostrartarefas();
    salvarnoLocalStorage();
}

function recarregarpagina() {
    const tarefasdolocalstorage = localStorage.getItem('lista');
    if (tarefasdolocalstorage) {
        minhalistadeitens = JSON.parse(tarefasdolocalstorage);
    }
    mostrartarefas();
}

function salvarnoLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(minhalistadeitens));
}

recarregarpagina();

button.addEventListener('click', addnewtask);
