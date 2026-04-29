const registros = [];
const formulario = document.getElementById('formulario-cadastro');
const tabela_section = document.getElementById('tabela-section');
const tabela = document.getElementById('tabela-registro');
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="linguagens"]');

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

    if(registros.length === 0) {
        tabela_section.style.display = 'block';
    }
    
    registros.push(registro);

    const novaLinha = `
        <tr>
            <td>${registro.nome}</td>
            <td>${registro.endereco}</td>
            <td>${registro.moradia}</td>
            <td>${registro.telefone}</td>
            <td>${registro.linguagens.join(', ')}</td>
            <td class="break-anywhere">${registro.observacao}</td>
        </tr>
    `;
    tabela.innerHTML += novaLinha;    

    form.reset();
    resetCheckboxes();
}

function resetCheckboxes() {
    checkboxes.forEach(checkbox => {
        checkbox.required = true;
        checkbox.addEventListener('change', () => {
            const isChecked = Array.from(checkboxes).some(cb => cb.checked);
            checkboxes.forEach(cb => cb.required = !isChecked);
        });
    });
}

resetCheckboxes();

this.formulario.addEventListener('submit', handleSubmit);