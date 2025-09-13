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
export function createDropdown (idContainer, {items = [], isSearchable = false, onInput}) {
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

    if(onInput != null) {input.addEventListener('input', onInput);}

    // Dropdown
    const dropDown = document.createElement('ul');
    dropDown.id = `${container.id + "-list"}`;

    if (isSearchable){
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
    childs.concat([input,dropDown,span]).forEach(c => container.appendChild(c));
    
    //Carregar Items
    loadItems({
        dropDown: dropDown, 
        values: items
    });
    
    return container;
}