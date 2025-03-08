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
    cep = cep.replace(/\D/g, "");
    if (cep.length > 8) cep = cep.slice(0, 8);
    if (cep.length > 5) {
        return cep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    return cep;
}

// Função para aplicar a máscara de CPF
function mascararCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length > 11) cpf = cpf.slice(0, 11);
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para buscar dados do CEP usando a API ViaCEP
function buscarCEP(cep) {
    cep = cep.replace(/\D/g, "");
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

// Função para finalizar o cadastro/pagamento
function finalizarFormulario(event) {
    event.preventDefault();
    const planoSelecionado = obterParametroURL("plano") || "free";
    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value
    };

    if (planoSelecionado !== "free") {
        dados.cpf = document.getElementById("cpf").value;
        dados.cep = document.getElementById("cep").value;
        dados.cidade = document.getElementById("cidade").value;
        dados.rua = document.getElementById("rua").value;
        dados.numero = document.getElementById("numero").value;
        dados.referencia = document.getElementById("referencia").value;
    }

    dados.plano = planos[planoSelecionado].nome;
    console.log("Dados do formulário:", dados);

    if (planoSelecionado === "free") {
        alert("Cadastro concluído com sucesso para o plano Free!");
    } else {
        alert(`Pagamento finalizado para o plano ${planos[planoSelecionado].nome}!`);
    }
}

// Configurar eventos e inicialização
document.addEventListener("DOMContentLoaded", function() {
    const planoURL = obterParametroURL("plano");
    const nomePlano = document.getElementById("nome-plano");
    const precoPlano = document.getElementById("preco-plano");
    const cepInput = document.getElementById("cep");
    const cpfInput = document.getElementById("cpf");
    const numeroInput = document.getElementById("numero");
    const formTitle = document.getElementById("form-title");
    const finalizarBtn = document.getElementById("finalizar-btn");
    const pagamentoOnlyFields = document.querySelectorAll(".pagamento-only");

    // Definir o plano selecionado
    if (planoURL && planos[planoURL]) {
        nomePlano.textContent = planos[planoURL].nome;
        precoPlano.textContent = planos[planoURL].preco;
    } else {
        nomePlano.textContent = planos["free"].nome;
        precoPlano.textContent = planos["free"].preco;
    }

    // Ajustar formulário com base no plano
    if (planoURL === "free") {
        formTitle.textContent = "Dados para Cadastro";
        finalizarBtn.textContent = "Concluir Cadastro";
        pagamentoOnlyFields.forEach(field => {
            field.style.display = "none"; // Oculta campos de pagamento
            field.querySelector("input").required = false; // Remove obrigatoriedade
        });
    } else {
        formTitle.textContent = "Dados para Pagamento";
        finalizarBtn.textContent = "Finalizar Pagamento";
        pagamentoOnlyFields.forEach(field => {
            field.style.display = "block"; // Mostra campos de pagamento
            field.querySelector("input").required = true; // Torna obrigatório
        });
    }

    // Máscara de CEP em tempo real
    if (cepInput) {
        cepInput.addEventListener("input", function() {
            this.value = mascararCEP(this.value);
        });
        const debouncedBuscarCEP = debounce(buscarCEP, 500);
        cepInput.addEventListener("input", function() {
            debouncedBuscarCEP(this.value);
        });
    }

    // Máscara de CPF em tempo real
    if (cpfInput) {
        cpfInput.addEventListener("input", function() {
            this.value = mascararCPF(this.value);
        });
    }

    // Limitar número a 4 dígitos
    if (numeroInput) {
        numeroInput.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, "").slice(0, 4);
        });
    }

    // Finalizar formulário
    document.getElementById("pagamento-form").addEventListener("submit", finalizarFormulario);
});