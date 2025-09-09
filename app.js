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
// Funções executadas ao clicar em item do dropdown list específico
// Dropdown de Unidades
function selectUnidade (event) {
    const item = unidades.find(u => u.nome == event.target.textContent);

    const cnpj = document.querySelector('#cnpj-unidade');
    cnpj.textContent = item.cnpj;

    const codigo = document.querySelector('#codigo-unidade');
    codigo.textContent = item.codigo;
}
// Dropdown de Setores
function selectSetor (event) {
    document.querySelector('#lista-colaboradores').innerHTML = '';

    let setor = setores.find(s => s.nome == event.target.textContent);
    loadItems('#lista-colaboradores', setor.colaboradores);
    document.querySelector('#ramal').value = setor.ramal;
}
// Dropdown de Prestadores
function selectPrestador (event) {
    const prestador = prestadores.find(p => event.target.textContent.includes(p.nomeEmpresarial));
    document.querySelector('#lista-cnpj-ou-cpf').innerHTML = '';
    loadItems('#lista-cnpj-ou-cpf', Object.values(prestador.codigo));
}
// Criar dropdown container
function createDropdown (obj = {}) {
    // Container
    const divContainer = document.createElement('div');
    divContainer.id = obj.idDropdown;
    divContainer.classList.add('dropdown-container');

    // Input
    const input = document.createElement('input');
    input.type = 'text';
    input.readOnly = obj.isInputReadOnly;

    // Dropdown
    const dropDown = document.createElement('ul');
    dropDown.id = `${obj.idDropdown + "-list"}`;

    //Span
    const span = document.createElement('span');
    
    //Inserir no container
    divContainer.appendChild(input);
    divContainer.appendChild(dropDown);
    divContainer.appendChild(span);
    
    //Carregar Items
    loadItems(dropDown, obj.items, obj.onClick);

    if (!obj.isInputReadOnly){
        input.addEventListener('input', function() {
            dropDown.innerHTML = '';
            loadItems(dropDown, obj.items.filter(v => v.includes(input.value), obj.onClick))
        });
    }
    
    //Append no html
    document.getElementById(obj.idLocal).appendChild(divContainer);
    return divContainer;
}

const allDropdowns = [
    {
        'idLocal' : 'titulo-unidade',
        'idDropdown':  'lista-unidades',
        'items' : unidades.map(u => u.nome),
        'onClick': selectUnidade,
        'isInputReadOnly': false

    }, 

    {
        'idLocal' : '',
        'idDropdown':  '',
        'items' : [],
        'onClick': '',
        'isInputReadOnly': true

    },

    {
        'idLocal' : '',
        'idDropdown':  '',
        'items' : [],
        'onClick': '',
        'isInputReadOnly': true

    },
]; 

createDropdown(allDropdowns[0]);

loadItems('#lista-unidades', unidades.map(u => u.nome), selectUnidade);
loadItems('#lista-setores', setores.map(s => s.nome), selectSetor);
loadItems('#lista-prestadores', prestadores.map(p => p.nomeEmpresarial + " - " + p.nomeFantasia), selectPrestador);