const registros = [];
const tabela_section = document.getElementById('tabela-section');
const tabela = document.getElementById('tabela-registro');
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="linguagens"]');

document.getElementById('formulario-cadastro').addEventListener('submit', handleSubmit);
addRequiredCheckboxes();

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    const registro = {
        nome: formData.get('nome'),
        endereco: formData.get('endereco'),
        moradia: formData.get('moradia'),
        telefone: formData.get('telefone'),
        linguagens: formData.getAll('linguagens'),
        observacao: formData.get('observacao')
    };
    
    if(!registro.nome || !registro.endereco || !registro.moradia || !registro.telefone || !registro.linguagens || !registro.observacao) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    registros.push(registro);
    writeTabela();
    form.reset();
    addRequiredCheckboxes();
}

function addRequiredCheckboxes() {
    checkboxes.forEach(checkbox => {
        checkbox.required = true;
        checkbox.addEventListener('change', () => {
            const isChecked = Array.from(checkboxes).some(cb => cb.checked);
            checkboxes.forEach(cb => cb.required = !isChecked);
        });
    });
}

function writeTabela() {
    tabela.innerHTML = '';

    const tabela_header = `
        <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Tipo de Moradia</th>
            <th>Telefone</th>
            <th>Linguagens Preferidas</th>
            <th>Observação</th>
            <th>Ação</th>
        </tr>
    `;
    tabela.innerHTML = tabela_header;

    if(registros.length === 0) {
        tabela_section.style.display = 'none';
        return;
    }else{
        tabela_section.style.display = 'block';
    }

    registros.forEach((registro, i) => {
        const novaLinha = `
            <tr>
                <td>${registro.nome}</td>
                <td>${registro.endereco}</td>
                <td>${registro.moradia}</td>
                <td>${registro.telefone}</td>
                <td>${registro.linguagens.join(', ')}</td>
                <td class="break-anywhere">${registro.observacao}</td>
                <td><button class="delete-button" onclick="deletarRegistro(${i})">Excluir</button></td>
            </tr>
        `;
        tabela.innerHTML += novaLinha;
    });
}

function deletarRegistro(index) {
    registros.splice(index, 1);
    writeTabela();
}
