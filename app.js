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

function selectItem (event) {
    const dropDown = event.target.parentNode.parentNode;

    const input = dropDown.querySelector('input');
    input.value = event.target.textContent;

    const span = dropDown.querySelector('span');
    span.style.font = getComputedStyle(input).font;
    span.textContent = input.value;

    input.style.width = span.offsetWidth + 10 + "px";
}

function loadDropdownItems (idDropdown, values = [] ,onClick = null) {
    let dropDown = document.querySelector(idDropdown);
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

loadDropdownItems('#lista-unidades', unidades.map(u => u.nome));