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

// Função para calcular a força da senha
function calcularForcaSenha(senha) {
    let forca = 0;
    if (senha.length > 0) forca += 1; // Tem pelo menos 1 caractere
    if (senha.length >= 8) forca += 1; // 8 ou mais caracteres
    if (/[A-Z]/.test(senha)) forca += 1; // Tem maiúscula
    if (/[0-9]/.test(senha)) forca += 1; // Tem número
    if (/[^A-Za-z0-9]/.test(senha)) forca += 1; // Tem caractere especial

    if (forca <= 2) return "weak"; // Apenas vermelho
    if (forca <= 4) return "medium"; // Vermelho e amarelo
    return "strong"; // Vermelho, amarelo e verde
}

// Função para finalizar o cadastro/pagamento
function finalizarFormulario(event) {
    event.preventDefault();
    const planoSelecionado = obterParametroURL("plano") || "free";
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    // Validar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem! Por favor, verifique.");
        return;
    }

    const dados = {
        username: document.getElementById("username").value,
        senha: senha,
        email: document.getElementById("email").value
    };

    if (planoSelecionado !== "free") {
        dados.nome = document.getElementById("nome").value;
        dados.telefone = document.getElementById("telefone").value;
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
    const togglePasswordButtons = document.querySelectorAll(".toggle-password");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmar-senha");
    const senhaBar1 = document.getElementById("senha-bar1");
    const senhaBar2 = document.getElementById("senha-bar2");
    const senhaBar3 = document.getElementById("senha-bar3");
    const confirmarBar1 = document.getElementById("confirmar-bar1");
    const confirmarBar2 = document.getElementById("confirmar-bar2");
    const confirmarBar3 = document.getElementById("confirmar-bar3");
    const confirmarSenhaError = document.getElementById("confirmar-senha-error");

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
            field.style.display = "none";
            field.querySelector("input").required = false;
        });
    } else {
        formTitle.textContent = "Dados para Pagamento";
        finalizarBtn.textContent = "Finalizar Pagamento";
        pagamentoOnlyFields.forEach(field => {
            field.style.display = "block";
            field.querySelector("input").required = true;
        });
    }

    // Máscara de CEP em tempo real (apenas para planos pagos)
    if (cepInput && planoURL !== "free") {
        cepInput.addEventListener("input", function() {
            this.value = mascararCEP(this.value);
        });
        const debouncedBuscarCEP = debounce(buscarCEP, 500);
        cepInput.addEventListener("input", function() {
            debouncedBuscarCEP(this.value);
        });
    }

    // Máscara de CPF em tempo real (apenas para planos pagos)
    if (cpfInput && planoURL !== "free") {
        cpfInput.addEventListener("input", function() {
            this.value = mascararCPF(this.value);
        });
    }

    // Limitar número a 4 dígitos (apenas para planos pagos)
    if (numeroInput && planoURL !== "free") {
        numeroInput.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, "").slice(0, 4);
        });
    }

    // Alternar visibilidade da senha com macacos
    togglePasswordButtons.forEach(button => {
        button.textContent = "🙈"; // Inicia com macaco de olhos cobertos
        button.addEventListener("click", function() {
            const targetInput = document.getElementById(this.getAttribute("data-target"));
            if (targetInput.type === "password") {
                targetInput.type = "text";
                this.textContent = "🙉"; // Macaco com mãos nas orelhas (senha visível)
            } else {
                targetInput.type = "password";
                this.textContent = "🙈"; // Macaco com olhos cobertos (senha oculta)
            }
        });
    });

    // Atualizar força da senha em tempo real
    senhaInput.addEventListener("input", function() {
        const forca = calcularForcaSenha(this.value);
        senhaBar1.classList.remove("red");
        senhaBar2.classList.remove("yellow");
        senhaBar3.classList.remove("green");

        if (this.value === "") {
            // Sem cor se vazio
        } else if (forca === "weak") {
            senhaBar1.classList.add("red");
        } else if (forca === "medium") {
            senhaBar1.classList.add("red");
            senhaBar2.classList.add("yellow");
        } else if (forca === "strong") {
            senhaBar1.classList.add("red");
            senhaBar2.classList.add("yellow");
            senhaBar3.classList.add("green");
        }

        // Atualizar confirmação se já houver algo digitado
        const confirmarSenha = confirmarSenhaInput.value;
        if (confirmarSenha !== "") {
            confirmarBar1.classList.remove("red");
            confirmarBar2.classList.remove("yellow");
            confirmarBar3.classList.remove("green");
            if (this.value === confirmarSenha) {
                confirmarBar1.classList.add("red");
                confirmarBar2.classList.add("yellow");
                confirmarBar3.classList.add("green");
                confirmarSenhaError.textContent = "";
            } else {
                confirmarBar1.classList.add("red");
                confirmarSenhaError.textContent = "Senhas não coincidem";
            }
        }
    });

    // Validar confirmação da senha em tempo real
    confirmarSenhaInput.addEventListener("input", function() {
        const senha = senhaInput.value;
        const confirmarSenha = this.value;
        confirmarBar1.classList.remove("red");
        confirmarBar2.classList.remove("yellow");
        confirmarBar3.classList.remove("green");

        if (senha === "" || confirmarSenha === "") {
            confirmarSenhaError.textContent = "";
        } else if (senha === confirmarSenha) {
            confirmarBar1.classList.add("red");
            confirmarBar2.classList.add("yellow");
            confirmarBar3.classList.add("green");
            confirmarSenhaError.textContent = "";
        } else {
            confirmarBar1.classList.add("red");
            confirmarSenhaError.textContent = "Senhas não coincidem";
        }
    });

    // Finalizar formulário
    document.getElementById("pagamento-form").addEventListener("submit", finalizarFormulario);
});