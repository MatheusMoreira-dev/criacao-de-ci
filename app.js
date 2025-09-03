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

const listaUnidades = document.querySelector("#lista-unidades");
const inputUnidade = document.querySelector("#unidade-input");

function inserirUnidades(){
    let item;

    unidades.forEach((u,i) => {
        item = document.createElement('li');
        item.textContent = u.nome;
        item.value = i;

        item.addEventListener("mousedown", function(event){
            inputUnidade.value = event.target.textContent
        });

        listaUnidades.appendChild(item);
    });
}

window.addEventListener("load", inserirUnidades());