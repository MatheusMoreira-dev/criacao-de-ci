const unidades = [
    {
        "nome": "UNIMED CARIRI",
        "cnpj": "07.583.396/0001-96",
        "codigo": "53466-8"
    },
   
    {
        "nome": "NAS I - HOSPITAL INFANTIL",
        "cnpj": "25.001.332/0001-11",
        "codigo": "60180-2"
    },

    {
        "nome": "NAS II - HUC",
        "cnpj": "25.001.332/0002-00",
        "codigo": "61800-4"
    },

    {
        "nome": "NAS III - ESPAÇO SAÚDE",
        "cnpj": "25.001.332/0003-83",
        "codigo": "72103-4"
    }
]

const setores = [
    {
        'nome': 'MARKETING',
        'ramal': '2018',
        'colaboradores': [
            'MATHEUS MOREIRA MARCELINO',
            'ANA BEATRIZ MARQUES',
            'SUYANNE SANTOS SOUSA',
            'FELIPE LUIZ TAVARES',
        ]
    }
];

const prestadores = [
    {
        'nomeEmpresarial': 'SUBLIME GRÁFICA LTDA',
        'nomeFantasia': 'BSG',
        'codigo': {
            'cnpj': '12.12.12.12.12',
            'cpf': '11.1.1.1.1.1.'
        },
        'valorPadrao': '',
        'descricaoPadrao': '',
        'dataPadrao': '',
        'pagamentoPadrao': '',
    }
]
const today = new Date();
const dateToString = (date = today) => date.toISOString().split("T")[0]; 

document.getElementById('data-solicitacao').value = dateToString();
document.getElementById('data-limite-pagamento').value = dateToString();

import {createDropdown} from './scripts/dropdown.js';
import {createChecklist, checkitem} from './scripts/checklist.js';

createDropdown('drop-unidades',{
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
        const prestador = prestadores.find(p => event.target.value.includes(p.nomeEmpresarial));

        if(prestador != null){
            createDropdown('drop-cnpj-cpf', {
                items: Object.values(prestador.codigo)
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
})