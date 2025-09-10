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

// Selecionar item para o Input 
function selectItem (event) {
    const dropDown = event.target.parentNode.parentNode;

    const input = dropDown.querySelector('input');
    input.value = event.target.textContent;
    input.dispatchEvent(new Event("input"));

    const span = dropDown.querySelector('span');
    span.style.font = getComputedStyle(input).font;
    span.textContent = input.value;

    input.style.width = span.offsetWidth + 10 + "px";
}
// Carregar no dropdown todos os itens
function loadItems (dropDown, values = [] ,onClick = null) {
    let item;

    for (let value of values){
        item = document.createElement('li');
        item.textContent = value;

        if(onClick == null) {
            item.addEventListener('mousedown', e => selectItem(e));
        } else {
            item.addEventListener('mousedown', function(e) {
                selectItem(e);
                onClick(e);
            })
        }

        dropDown.appendChild(item);
    }
} 
// Criar dropdown container
function createDropdown (idContainer, {items = [], isSearchable = false, onClick, label}) {
    let childs = [];
    
    // Container
    const container = document.getElementById(idContainer);
    container.classList.add('dropdown-container');

    // Input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `${container.id}-input`
    input.readOnly = !isSearchable;
    input.autocomplete= "off";

    //Label
    if(label != undefined){
        const tagLabel = document.createElement('label');
        tagLabel.textContent = label;
        tagLabel.setAttribute('for', input.id);
        childs.push(tagLabel);
    }

    // Dropdown
    const dropDown = document.createElement('ul');
    dropDown.id = `${container.id + "-list"}`;

    if (isSearchable){
        input.addEventListener('input', function() {
            dropDown.innerHTML = '';
            loadItems(dropDown, items.filter(v => v.toLowerCase().includes(input.value.toLowerCase()), onClick))
        });
    }

    //Span
    const span = document.createElement('span');
    
    //Inserir no container
    childs.concat([input,dropDown,span]).forEach(c => container.appendChild(c));
    
    //Carregar Items
    loadItems(dropDown, items, onClick);
    
    return container;
}

createDropdown('drop-unidades',{
    items: unidades.map(u => u.nome),
    onClick: function (event) {
        const item = unidades.find(u => u.nome == event.target.textContent);

        const cnpj = document.querySelector('#cnpj-unidade');
        cnpj.textContent = item.cnpj;

        const codigo = document.querySelector('#codigo-unidade');
        codigo.textContent = item.codigo;
    }
});

createDropdown('drop-setores', {
    items: setores.map(s => s.nome),
    label:"SETOR:",
    onClick: function (event) {
        document.querySelector('#drop-colaboradores').innerHTML = '';
        let setor = setores.find(s => s.nome == event.target.textContent);
        
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
    onClick: function (event) {
        document.querySelector('#drop-cnpj-cpf').innerHTML = '';
        const prestador = prestadores.find(p => event.target.textContent.includes(p.nomeEmpresarial));

        createDropdown('drop-cnpj-cpf', {
            items: Object.values(prestador.codigo)
        });

        console.log(Object.values(prestador.codigo));
    }
});

function checkitem({label}){
    const container = document.createElement('label');
    container.classList.add('checkitem');
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    
    const span = document.createElement('span');
    [input,span].forEach(e => container.appendChild(e));
    
    container.textContent = label;
    return container;
}

function checklist({ id = '',items = []}){
    const container = document.getElementById(id);
    container.classList.add('checklist');

    items.forEach(i => container.appendChild(i));
}

checklist({
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