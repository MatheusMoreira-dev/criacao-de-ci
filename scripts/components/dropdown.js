const style = {
    ".dropdown-container":{
        'position': 'relative',
        'display': 'inline-block',
        'width': '100%'
    },

    ".dropdown-container > ul":{
        'border': '1px solid',
        'padding': '5px',
        'width': '100%',
        'max-width': '40dvw',
        'min-width': '15dvw',
        'max-height': '20dvh',
        'overflow-y': 'auto',
        'overflow-x': 'none',
        'visibility': 'hidden',
        'transition': 'opacity 0.3s ease',
        'opacity': '0',
        'position': 'absolute',
        'transform': 'translate(-50%, 0%)',
        'top': '100%',
        'left': '50%',
        'z-index': '99999',
        'background-color': '',

        'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
        'border-radius': '0.5rem',
    },

    ".dropdown-container >ul li":{
        'padding': '5px',
        'width': '100%',
        'border-bottom': '1px solid'
    },

    ".dropdown-container > input":{
        width: '100%'
    },

    ".dropdown-container > span":{
        "visibility":"hidden", 
        "position":"absolute", 
        "white-space":"pre"
    }
}

// Selecionar item para o Input 
function selectItem (event) {
    const dropDown = event.target.parentNode.parentNode;

    const input = dropDown.querySelector('input');
    input.value = event.target.textContent;
    input.dispatchEvent(new Event("input"));
}

// Carregar no dropdown todos os itens
function loadItems ({dropDown, values = []}) {
    let item;

    for (let value of values){
        item = document.createElement('li');
        item.textContent = value;

        item.addEventListener('mousedown', selectItem);
        dropDown.appendChild(item);
    }
}

// Criar dropdown container
export function createDropdown (idContainer, options = {dataBase: [], keyLabel, isSearchable: false, onInput, style}) {
    let items = (options.keyLabel == null) ? (options.dataBase) : (options.dataBase.map(d => d[options.keyLabel]));
    
    // Container
    const container = document.getElementById(idContainer);
    container.classList.add('dropdown-container');

    // Input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `${container.id}-input`
    input.readOnly = !options.isSearchable;
    input.autocomplete= "off";

    if(options.onInput != null) {
        input.addEventListener('input', options.onInput.bind(options));
    }

    // Dropdown
    const dropDown = document.createElement('ul');
    dropDown.id = `${container.id + "-list"}`;

    if (options.isSearchable){
        input.addEventListener('input', function() {
            dropDown.innerHTML = '';
            loadItems({
                dropDown: dropDown,
                values: items.filter(v => v.toLowerCase().includes(input.value.toLowerCase()))
            });
        });
    }

    //Span
    const span = document.createElement('span');
    
    //Inserir no container
    [input,dropDown,span].forEach(c => container.appendChild(c));
    
    //Carregar Items
    loadItems({
        dropDown: dropDown, 
        values: items
    });
    
    return container;
}