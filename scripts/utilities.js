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