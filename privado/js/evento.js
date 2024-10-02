const eventoForm = document.getElementById('eventoForm');

eventoForm.onsubmit = validarCampos;

const enderecoAPI = 'http://localhost:4000/eventos';

buscarTodosEventos();

var motivoAcao = "CADASTRAR";

function gravarEvento() {
    const objetoEvento = {
        nomeEvento: document.getElementById('nome-evento').value,
        data: document.getElementById('data-evento').value,
        local: document.getElementById('local-evento').value,
        cidade: document.getElementById('cidade-evento').value,
        estado: document.getElementById('estado-evento').value
    };

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function selecionarEvento(nomeEvento, data, local, cidade, estado, motivo) {
    document.getElementById('nome-evento').value = nomeEvento;
    document.getElementById('data-evento').value = data;
    document.getElementById('local-evento').value = local;
    document.getElementById('cidade-evento').value = cidade;
    document.getElementById('estado-evento').value = estado;

    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    } else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function excluirEvento() {
    const idEvento = document.getElementById('id-evento').value;
    fetch(`${enderecoAPI}/${idEvento}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function atualizarEvento() {
    const idEvento = document.getElementById('id-evento').value;
    const objetoEvento = {
        nomeEvento: document.getElementById('nome-evento').value,
        data: document.getElementById('data-evento').value,
        local: document.getElementById('local-evento').value,
        cidade: document.getElementById('cidade-evento').value,
        estado: document.getElementById('estado-evento').value
    };

    fetch(`${enderecoAPI}/${idEvento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, 'yellow');
    });
}

function buscarTodosEventos() {
    fetch(enderecoAPI, { method: 'GET' })
        .then((resposta) => {
            return resposta.json();
        })
        .then((respostaAPI) => {
            if (respostaAPI.status == true) {
                exibirTabelaEventos(respostaAPI.listaEventos);
            } else {
                exibirMensagem(respostaAPI.mensagem, 'red');
            }
        })
        .catch((erro) => {
            exibirMensagem(erro, 'yellow');
        });
}

function exibirTabelaEventos(listaEventos) {
    const tabelaEventos = document.getElementById('tabelaEventos');
    tabelaEventos.innerHTML = '';
    listaEventos.forEach((evento) => {
        tabelaEventos.innerHTML += `
            <tr>
                <td>${evento.nomeEvento}</td>
                <td>${evento.data}</td>
                <td>${evento.local}</td>
                <td>${evento.cidade}</td>
                <td>${evento.estado}</td>
            </tr>
        `;
    });
}

function exibirMensagem(mensagem, cor) {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = mensagem;
    divMensagem.style.color = cor;
}

function validarCampos() {
    const nomeEvento = document.getElementById('nome-evento').value;
    const dataEvento = document.getElementById('data-evento').value;
    const localEvento = document.getElementById('local-evento').value;
    const cidadeEvento = document.getElementById('cidade-evento').value;
    const estadoEvento = document.getElementById('estado-evento').value;

    if (!nomeEvento || !dataEvento || !localEvento || !cidadeEvento || !estadoEvento) {
        exibirMensagem("Preencha todos os campos", "red");
        return false;
    }

    if (motivoAcao === "CADASTRAR") {
        gravarEvento();
    } else if (motivoAcao === "EDITAR") {
        atualizarEvento();
    } else if (motivoAcao === "EXCLUIR") {
        excluirEvento();
    }

    return false;
}












/*const bandregistrationform = documento.getElementById('bandregistrationform');

bandregistrationform.onsubmit = validarCampos; 

const enderecoAPI = 'http://localhost:4000/clientes';

buscarTodosClientes();

var motivoAcao = "CADASTRAR";

function gravarCliente(){
    const obijetocliente = {
        nome     : documento.getElementById('band-name').value,
        email    : documento.getElementById('band-email').value,
        telefone : documento.getElementById('band-phone').value,
        cpf      : documento.getElementById('band-cpf').value,
    }
    fetch (enderecoAPI, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(obijetocliente)
    }).then((resposta) => {
    return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibriMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibriMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibriMensagem(erro, 'yellow');
    }); 
}




function selecionarCliente(nome, email, telefone, cpf, motivo){
    documento.getElementById('band-name').value = nome;
    documento.getElementById('band-email').value = email;
    documento.getElementById('band-phone').value = telefone;
    documento.getElementById('band-cpf').value = cpf;

    motivoAcao = motivo;
    const botaoConfirmacao = documento.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') { 
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') { 
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    

}

function excluirCliente(){
    fetch(enderecoAPI, {method: 'DELETE',
        headers: {
            'content-type': 'application/jason'
        },
        body: JSON.stringify({cpf: documento.getElementById('band-cpf').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
if (respostaAPI.status == true) {
    exibriMensagem (respostaAPI.mensagem, 'green');
}
else
exibriMensagem (respostaAPI.mensagem, 'red');
    }).catch((error) =>{
        exibriMensagem(erro, 'yellow');
    })
        
}

function atualizarCliente(){
    const obijetocliente ={
    cpf      : documento.getElementById('band-cpf').value,
    email    : documento.getElementById('band-email').value = email,
    telefone : documento.getElementById('band-phone').value = telefone,
    cpf      : documento.getElementById('band-cpf').value = cpf,
    }
    fetch(enderecoAPI, {method: 'PUT',
        headers: {
        'content-type': 'application/jason'
        },
        body: JSON.stringify({obijetocliente})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
if (respostaAPI.status == true) {
    exibriMensagem (respostaAPI.mensagem, 'green');
}
else
exibriMensagem (respostaAPI.mensagem, 'red');
    }).catch((error) =>{
        exibriMensagem(erro, 'yellow');
    })


}

function buscarTodosClientes(){
    fetch (enderecoAPI, {method: 'GET'})
    .then ((resposta) => {
        return resposta.json();
    })
    .then ((respostaAPI) => {
        if (respostaAPI.status == true){
            exibriTabelaClientes(respostaAPI.listaClientes);
        }
        else{
            exibriMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibriMensagem(erro, 'yellow');
    });
}

function validarCampos(evento){
    const nome     = documento.getElementById('band-name').value;
    const email    = documento.getElementById('band-email').value;
    const telefone = documento.getElementById('band-phone').value;
    const cpf      = documento.getElementById('band-cpf').value;

    evento.stopPropagation();
    evento.preventDefault();
    if (nome && email && telefone && cpf) {
        if (motivoAcao == "CADASTRAR"){
            gravarCliente();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarCliente();
            motivoAcao == "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirCliente();
            motivoAcao == "CADASTRAR";
        }

        bandregistrationfor.resset();
        buscarTodosClientes();
        return true;
        
    }

    else
    exibriMensagem('por fazor preencha todos os campos do formulário')
        return false;
}

function exibriMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem')
    divMensagem.innerHTML = "<p style='color: " + cor + " ; ' >" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

function exibriTabelaClientes(listaClientes){
    if (listaClientes.length > 0){
        const espacoTabela = document.getElementById('containerTbaela');
        const tabela = document.createElement('table');
        tabela.classList = "table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
        <tr>
        <th>idEvent</th>
        <th>nomeEvento</th>
        <th>TELEFONE</th>
        <th>CPF</th>
        <th>Ações</th>
        </tr>`;
        
        const corpo = document.createElement('tbody');
        
        for (const clientes of listaClientes){
            const linha = document.createElement('tr');
            linha.innerHTML = ` 
            <td>${}</td>
            <td>${cliente.e-mail}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.cpf}</td>
            <td>
                    <button>onclick=>"selecionarCliente('${cliente.nome}','${cliente.e-mail}','${cliente.telefone}','${cliente.cpf}','EDITAR')"Alterar</button>
                    <button>onclick=>"selecionarCliente"('${cliente.nome}','${cliente.e-mail}','${cliente.telefone}','${cliente.cpf}','EXCLUIR')Excluir</button>
            </td>
            `;
            corpo.appendChild(linha);
            tabela.appendChild(cabecalho);
            tabela.appendChild(corpo);
            espacoTabela.innerHTML = "";
            espacoTabela.appendChild(tabela);


        }
        

    }
    else {
        exibriMensagem('Nenhum cliente encontrado.');
    }
}*/