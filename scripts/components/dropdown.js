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
export function createDropdown (idContainer, options = {dataBase: [], keyLabel, isSearchable: false, onInput}) {
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