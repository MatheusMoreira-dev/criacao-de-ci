const dbJson = async () => await fetch("./db.json")
.then(res => res.json());

const unidades = await dbJson().then(r => r.unidades); 
const setores = await dbJson().then(r => r.setores);
const prestadores = await dbJson().then(r => r.prestadores);

function upperCase () {
    const allInput = document.querySelectorAll('input[type="text"], textarea');
    Array.from(allInput).forEach(i => {
        i.addEventListener('input', function(event){
            event.target.value = String(event.target.value).toUpperCase();
        });
    });
}

function resizeInput (idInput) {
    const input = document.getElementById(idInput);
    const inputContainer = input.parentElement;

    const spanMirror = document.createElement('span');
}

import {createDropdown} from './scripts/dropdown.js';
import {createChecklist, checkitem} from './scripts/checklist.js';

createDropdown('drop-unidades', {
    items: unidades.map(u => u.nome),
    onInput: function (event) {
        const item = unidades.find(u => u.nome == event.target.value);

        const cnpj = document.querySelector('#cnpj-unidade');
        cnpj.textContent = item.cnpj;

        const codigo = document.querySelector('#codigo-unidade');
        codigo.textContent = item.codigo;
    }
});

createDropdown('drop-setores', {
    items: setores.map(s => s.nome),
    onInput: function (event) {
        document.querySelector('#drop-colaboradores').innerHTML = '';
        let setor = setores.find(s => s.nome == event.target.value);
        
        createDropdown('drop-colaboradores', {
            items: setor.colaboradores,
            label: "SOLICITANTE:",
            isSearchable: true
        })
        document.querySelector('#ramal').value = setor.ramal;
    }
});

createDropdown('drop-prestadores', {
    items: prestadores.map(p => `${p.nomeEmpresarial} - ${p.nomeFantasia}`),
    isSearchable: true,
    onInput: function (event) {
        document.querySelector('#drop-cnpj-cpf').innerHTML = '';
        document.querySelector('#drop-banco').innerHTML = '';

        const prestador = prestadores.find(p => event.target.value.includes(p.nomeEmpresarial));

        if(prestador != null){
            createDropdown('drop-cnpj-cpf', {
                items: Object.values(prestador.codigo)
            });

            createDropdown('drop-banco', {
                items: prestadores.map(p => p.nomeEmpresarial)
            });
        }
    }
});

createChecklist({
    id: 'check-anexos',
    items: [
        checkitem({label: 'Nota Fiscal ou Recibo'}),
        checkitem({label: 'Orçamento Aprovado'}),
        checkitem({label: 'Ordem de Pagamento/Recisões/indenizações'}),
        checkitem({label: 'Contrato Assinado/Pagamento Mensal'}),
        checkitem({label: 'Acordo Judicial'}),
        checkitem({label: 'Água/Luz/Telefone/Celular/Internet/Tributos'}),
        checkitem({label: 'Outros: _________________'})
    ]
});

createChecklist({
    id: 'tipos-de-pagamento',
    items: [
        checkitem({label: 'DEPÓSITO ONLINE'}),
        checkitem({label: 'CHEQUE'}),
        checkitem({label: 'CAIXA'}),
        checkitem({label: 'BOLETO'})
    ]
});

createChecklist({
    id: 'tipos-de-conta',
    items: [
        checkitem({label: 'CORRENTE'}),
        checkitem({label: 'POUPANÇA'})
    ]
});

function todayDate(){
    // DEFINIR A DATA DE SOLICITAÇÃO E DATA DE PAGAMENTO
    const today = new Date();
    const dateToString = (date = today) => date.toISOString().split("T")[0]; 
    
    document.getElementById('data-solicitacao').value = dateToString();
    document.getElementById('data-limite-pagamento').value = dateToString();
}

todayDate();