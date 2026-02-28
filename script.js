let listadeCompras = []

let historico = []

let proximoId = 1

let idHistorico = 1

window.onload = function() {
    // Você precisa BUSCAR os dados do localStorage
    let listaSalva = localStorage.getItem('lista')
    let idSalvo = localStorage.getItem('proximoId')
    let historicoSalvo = localStorage.getItem('historico')

    // SE existir dados salvos, carrega. SENÃO, mantém vazio
    if (listaSalva) {
        listadeCompras = JSON.parse(listaSalva)
        proximoId = parseInt(idSalvo)
    }

    if (historicoSalvo) {
    historico = JSON.parse(historicoSalvo)
    idHistorico = parseInt(localStorage.getItem('idHistorico'))
}

    let temaSalvo = localStorage.getItem('tema')
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark')
        document.getElementById('btnTema').textContent = '☀️'
    }

    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch(err => console.log('Erro:', err))
    }

    renderizarLista()
    document.getElementById('total').textContent = `Total: R$ ${calcularTotal()}`
}

function calcularTotal() {
    let total = 0

    for (let i = 0; i< listadeCompras.length; i++){
        let quantidade = listadeCompras[i].quantidade
        let preco = listadeCompras[i].preco

        total += quantidade * preco
        }
    return total
}

function renderizarLista() {
    document.getElementById('lista').innerHTML = ""

        for (let i = 0; i < listadeCompras.length; i++) {
            document.getElementById("lista").innerHTML += `
            <div class="item-lista">
                <span class="item-nome">${listadeCompras[i].nome}</span>
                <span class="item-info">R$ ${listadeCompras[i].preco} x ${listadeCompras[i].quantidade}</span>
                <div class="item-acoes">
                    <button onclick="editarItem(${listadeCompras[i].id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirItem(${listadeCompras[i].id})">Excluir</button>
                </div>
            </div>`        
        }
}

function adicionarItem() {
    let nome = document.getElementById('nome').value
    let preco = parseFloat(document.getElementById('preco').value)
    let quantidade = parseInt(document.getElementById('quantidade').value)

    // Cria um novo item (objeto)
    const novoItem = {
        id:proximoId,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    // Adiciona o item ao array de itens
    listadeCompras.push(novoItem);

    proximoId++

    renderizarLista()
    document.getElementById('total').textContent = `Total: R$ ${calcularTotal()}`
    document.getElementById('nome').value = ""
    document.getElementById('preco').value = ""
    document.getElementById('quantidade').value = ""
    salvarDados()
}


function editarItem(id) {
    let item = listadeCompras.find(item => item.id === id)
    let novoNome = prompt("Novo item:", item.nome)
    let novoPreco = prompt("Preço:", item.preco)
    let novaQtd = prompt("Quantidade:", item.quantidade)

    item.nome = novoNome
    item.preco = parseFloat(novoPreco)
    item.quantidade = parseInt(novaQtd)

    renderizarLista()
    document.getElementById('total').textContent = `Total: R$ ${calcularTotal()}`
    salvarDados()
}

function excluirItem(id) {
    listadeCompras = listadeCompras.filter(item => item.id !== id)
    renderizarLista()
    document.getElementById('total').textContent = `Total: R$ ${calcularTotal()}`
    salvarDados()
}

function calcularTotalItem(id) {

}

function salvarDados() {
    localStorage.setItem('lista', JSON.stringify(listadeCompras))
    localStorage.setItem('proximoId', proximoId)
}

function limparLista(){
    listadeCompras = []
    proximoId = 1

    renderizarLista()
    document.getElementById('total').textContent = `Total: R$ ${calcularTotal()}`
    salvarDados()
}

function salvarHistorico() {
    
    if (listadeCompras.length === 0) {
        alert("Adicione itens antes de finalizar!")
        return
    }

    let idSalvo = localStorage.getItem('idHistorico')
    let data = new Date().toLocaleDateString('pt-BR')

    const novoItem = {
        id:idHistorico,
        data: data,
        itens: [...listadeCompras],
        total: calcularTotal()
    };

    historico.push(novoItem);
    
    localStorage.setItem('historico', JSON.stringify(historico))
    localStorage.setItem('idHistorico', idHistorico)

    idHistorico++

    limparLista()
}

function alternarTema() {
    document.body.classList.toggle('dark')
    let btnTema = document.getElementById('btnTema')
    
    if (document.body.classList.contains('dark')) {
        btnTema.textContent = '☀️'
        localStorage.setItem('tema', 'dark')
    } else {
        btnTema.textContent = '🌙'
        localStorage.setItem('tema', 'claro')
    }
}

const addItem = document.getElementById("btnAdicionar").addEventListener("click", adicionarItem)
const limparTudo = document.getElementById("btnLimpar").addEventListener("click", limparLista)
const finalizarCompra = document.getElementById("btnFinalizar").addEventListener("click", salvarHistorico)
