export function resizeInput (idInput) {
    const input = document.getElementById(idInput);
    const inputContainer = input.parentElement;

    const spanMirror = document.createElement('span');
}

export function upperCase () {
    const allInput = document.querySelectorAll('input[type="text"], textarea');
    Array.from(allInput).forEach(i => {
        i.addEventListener('input', function(event){
            event.target.value = String(event.target.value).toUpperCase();
        });
    });
}

export function moneyInput(id){
    const input = document.getElementById(id);
    let valor = 0;

    input.addEventListener('input', (event) => {
        let digitos = event.target.value.replace('/[^0-9]/g', "");
        console.log(digitos);
        if(!digitos) digitos = '0';

        valor = parseInt(digitos);
        let monetario = (valor/100).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });

        input.value = monetario;
    });

    input.addEventListener('input', (event) => {
        if(event.key === 'Backspace'){
            valor = Math.floor(valor/10);
            let monetario = (valor/100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });
            input.value = monetario;
            event.preventDefault();
        }
    });
}