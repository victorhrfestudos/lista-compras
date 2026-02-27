let historico = []

let idHistorico = 1

window.onload = function() {
    // Você precisa BUSCAR os dados do localStorage
    let historicoSalvo = localStorage.getItem('historico')

    // SE existir dados salvos, carrega. SENÃO, mantém vazio
    if (historicoSalvo) {
    historico = JSON.parse(historicoSalvo)
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

    renderizarHistorico()
}

function renderizarHistorico() {
    document.getElementById("historico").innerHTML = ""
    for (let i = 0; i < historico.length; i++){
        let compra = historico[i]
        document.getElementById("historico").innerHTML +=
    
        `
            <div class="compra-item">
                <span class="compra-data">📅 ${compra.data}</span>
                <span class="compra-total">R$ ${compra.total}</span>
                <button onclick="verDetalhes(${compra.id})">Ver Detalhes</button>
            </div>
        `
    }
}

function verDetalhes(id) {
    let compra = historico.find(compra => compra.id === id)
    let conteudo = `<div class="modal-titulo">🛒 Compra de ${compra.data}</div>`
    
    for (let i = 0; i < compra.itens.length; i++) {
        let item = compra.itens[i]
        let total = item.quantidade * item.preco
        conteudo += `
            <div class="item-lista">
                <span class="item-nome">${item.nome}</span>
                <span class="item-info">R$ ${item.preco} x ${item.quantidade} = ${total}</span>
            </div>
        `
    }
    
    conteudo += `<strong>Total: R$ ${compra.total}</strong>`
    
    document.getElementById('modalConteudo').innerHTML = conteudo
    document.getElementById('modal').style.display = "block"
}

function fecharModal(){
    document.getElementById('modal').style.display = "none"
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