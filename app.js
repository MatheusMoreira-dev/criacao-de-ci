import {createDropdown} from './scripts/components/dropdown.js';
import {createChecklist, checkitem} from './scripts/components/checklist.js';

const dbJson = async () => await fetch("./db.json")
.then(res => res.json());

const dropDowns = [
    createDropdown('drop-unidades', 
        {
            dataBase: await dbJson().then(res => res.unidades),
            keyLabel: 'nome',
            onInput: function (event) {
                const item = this.dataBase.find(u => u.nome == event.target.value);

                const cnpj = document.querySelector('#cnpj-unidade');
                cnpj.textContent = item.cnpj;

                const codigo = document.querySelector('#codigo-unidade');
                codigo.textContent = item.codigo;
            }
        }
    ),
    
    createDropdown('drop-setores', 
        {
            dataBase: await dbJson().then(res => res.setores),
            keyLabel: 'nome',
            onInput: function (event) {
                document.querySelector('#drop-colaboradores').innerHTML = '';
                let setor = this.dataBase.find(s => s.nome == event.target.value);
                
                createDropdown('drop-colaboradores', {
                    dataBase: setor.colaboradores,
                    isSearchable: true
                })
                document.querySelector('#ramal').value = setor.ramal;
            }
        }
    ),

    createDropdown('drop-prestadores', 
        {
            dataBase: await dbJson().then(res => res.prestadores),
            keyLabel: 'nomeEmpresarial',
            isSearchable: true,
            onInput: function (event) {
                document.querySelector('#drop-cnpj-cpf').innerHTML = '';
                document.querySelector('#drop-banco').innerHTML = '';

                const prestador = this.dataBase.find(p => event.target.value.includes(p.nomeEmpresarial));

                if(prestador != null){
                    createDropdown('drop-cnpj-cpf', {
                        dataBase: Object.values(prestador.codigo)
                    });

                    createDropdown('drop-banco', {
                        dataBase: this.dataBase.map(p => p.nomeEmpresarial)
                    });
                }
            }
        }
    )
];

const checklists = [
    createChecklist({
        id: 'check-anexos',
        isMultipleChoice: true,
        items: [
            checkitem({label: 'Nota Fiscal ou Recibo'}),
            checkitem({label: 'Orçamento Aprovado'}),
            checkitem({label: 'Ordem de Pagamento/Recisões/indenizações'}),
            checkitem({label: 'Contrato Assinado/Pagamento Mensal'}),
            checkitem({label: 'Acordo Judicial'}),
            checkitem({label: 'Água/Luz/Telefone/Celular/Internet/Tributos'}),
            checkitem({label: 'Outros: _________________'})
        ]
    }),
    
    createChecklist({
        id: 'tipos-de-pagamento',
        items: [
            checkitem({label: 'DEPÓSITO ONLINE'}),
            checkitem({label: 'CHEQUE'}),
            checkitem({label: 'CAIXA'}),
            checkitem({label: 'BOLETO'})
        ]
    }),
    
    createChecklist({
        id: 'tipos-de-conta',
        items: [
            checkitem({label: 'CORRENTE'}),
            checkitem({label: 'POUPANÇA'})
        ]
    })
];

function todayDate(){
    // DEFINIR A DATA DE SOLICITAÇÃO E DATA DE PAGAMENTO
    const today = new Date();
    const dateToString = (date = today) => date.toISOString().split("T")[0]; 
    
    document.getElementById('data-solicitacao').value = dateToString();
    document.getElementById('data-limite-pagamento').value = dateToString();
}

todayDate();