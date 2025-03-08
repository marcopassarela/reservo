// /frontend/src/assets/js/pagamento.js

// Objetos com informações dos planos
const planos = {
    free: { nome: "Free", preco: "R$ 0" },
    plus: { nome: "Plus", preco: "R$ 29,99" },
    pro: { nome: "Pro", preco: "R$ 49,99" },
    premium: { nome: "Premium", preco: "R$ 99,90" }
};

// Função para obter o parâmetro da URL
function obterParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Função para aplicar a máscara de CEP
function mascararCEP(cep) {
    cep = cep.replace(/\D/g, ""); // Remove tudo que não é número
    if (cep.length > 8) cep = cep.slice(0, 8); // Limita a 8 dígitos
    if (cep.length > 5) {
        return cep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    return cep;
}

// Função para aplicar a máscara de CPF
function mascararCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove tudo que não é número
    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para buscar dados do CEP usando a API ViaCEP
function buscarCEP(cep) {
    cep = cep.replace(/\D/g, ""); // Remove o traço e outros não-dígitos
    const cidadeInput = document.getElementById("cidade");
    const ruaInput = document.getElementById("rua");
    
    if (cep.length === 8) {
        cidadeInput.value = "Carregando...";
        ruaInput.value = "Carregando...";

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    cidadeInput.value = data.localidade;
                    ruaInput.value = data.logradouro;
                } else {
                    alert("CEP não encontrado!");
                    cidadeInput.value = "";
                    ruaInput.value = "";
                }
            })
            .catch(error => {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar o CEP. Tente novamente.");
                cidadeInput.value = "";
                ruaInput.value = "";
            });
    } else {
        cidadeInput.value = "";
        ruaInput.value = "";
    }
}

// Função de debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Função para finalizar o pagamento
function finalizarPagamento(event) {
    event.preventDefault();
    const planoSelecionado = obterParametroURL("plano") || "free"; // Pega o plano da URL
    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        cidade: document.getElementById("cidade").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        referencia: document.getElementById("referencia").value,
        plano: planos[planoSelecionado].nome
    };
    console.log("Dados do pagamento:", dados);
    alert(`Pagamento finalizado para o plano ${planos[planoSelecionado].nome}!`);
}

// Configurar eventos e inicialização
document.addEventListener("DOMContentLoaded", function() {
    const planoURL = obterParametroURL("plano");
    const nomePlano = document.getElementById("nome-plano");
    const precoPlano = document.getElementById("preco-plano");
    const cepInput = document.getElementById("cep");
    const cpfInput = document.getElementById("cpf");
    const numeroInput = document.getElementById("numero");
    
    // Definir o plano selecionado com base na URL
    if (planoURL && planos[planoURL]) {
        nomePlano.textContent = planos[planoURL].nome;
        precoPlano.textContent = planos[planoURL].preco;
    } else {
        nomePlano.textContent = planos["free"].nome;
        precoPlano.textContent = planos["free"].preco;
    }

    // Máscara de CEP em tempo real
    cepInput.addEventListener("input", function() {
        this.value = mascararCEP(this.value);
    });

    // Máscara de CPF em tempo real
    cpfInput.addEventListener("input", function() {
        this.value = mascararCPF(this.value);
    });

    // Limitar número a 4 dígitos
    numeroInput.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 4); // Apenas números, máx 4
    });

    // Buscar CEP com debounce
    const debouncedBuscarCEP = debounce(buscarCEP, 500);
    cepInput.addEventListener("input", function() {
        debouncedBuscarCEP(this.value);
    });

    // Finalizar pagamento
    document.getElementById("pagamento-form").addEventListener("submit", finalizarPagamento);
});