export function checkitem({label}){
    const container = document.createElement('label');
    const textLabel = document.createTextNode(label);

    container.classList.add('checkitem');
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    
    const span = document.createElement('span');
    [input,span,textLabel].forEach(e => container.appendChild(e));
    
    return container;
}

export function createChecklist({ id = '',items = []}){
    const container = document.getElementById(id);
    container.classList.add('checklist');

    items.forEach(i => container.appendChild(i));
}