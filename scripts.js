const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const list = document.querySelector('.list-task');

let minhalistadeitens = [];

function addnewtask() {
    const inputValor = input.value.trim(); // remove espaços em branco do início e do fim
    if (inputValor !== '') { // verifica se o input não está vazio
        minhalistadeitens.push({
            task: inputValor,
            concluida: false
        });
        input.value = '';
        mostrartarefas();
        salvarnoLocalStorage();
    } else {
        window.alert('Você precisa digitar algo para adicionar à lista!'); // exibe uma mensagem de alerta se o input estiver vazio
    }
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

