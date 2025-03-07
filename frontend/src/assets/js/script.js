function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    menu.classList.toggle('show'); // Alterna a classe 'show' para abrir/fechar o menu
    hamburgerIcon.classList.toggle('active'); // Alterna a classe 'active' para o efeito do ícone
}

function toggleMenu() {
    var menu = document.getElementById("menu-mobile");
    var icon = document.getElementById("hamburger-icon");

    menu.classList.toggle("active");
    icon.classList.toggle("active"); // Ativa a animação do "X"
}

// Seleciona todos os links com a classe 'requestLink'
const links = document.querySelectorAll('.requestLink');

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        window.location.href = '/404.html';  
    });
});


//Animação de entrada do site
document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll('.fade-in');

    fadeInElements.forEach(element => {
        element.classList.add('show');
    });
});

//Animação de escrita
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("text");
    const text = textElement.innerHTML
    textElement.innerHTML = "";

    let index = 0;
    function type() {
        if (index < text.length) {
            textElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 40); // Velocidade
        } else {
            textElement.classList.add("visible");
        }
    }
    type(); // Inicia o efeito de escrita
});


document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
    box.addEventListener('click', function(event) {
        // Previne que o clique dentro do box remova a classe
        event.stopPropagation();
        
        // Alterna a classe 'clicked' para virar o cartão
        this.classList.toggle('clicked');
    });
});

// Adiciona um evento de clique global no documento
document.addEventListener('click', function() {
    // Remove a classe 'clicked' de todos os boxes para voltar à frente
    document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
        box.classList.remove('clicked');
    });
});


//Para entrada de CEP
function formatarCEP(value) {
    // Remove tudo que não for número e adiciona o traço no lugar certo
    return value.replace(/\D/g, '') // Remove qualquer caractere que não seja número
                .replace(/^(\d{5})(\d{0,3})/, '$1-$2') // Coloca o traço após o 5º dígito
                .replace(/-$/, ''); // Remove o traço se for o último caractere
}
function buscarCEP() {
    let cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cep.length === 8) { // Verifica se tem 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("mensagemErro").style.display = 'none'; // Esconde a mensagem de erro
                } else {
                    mostrarMensagemErro("CEP não encontrado!");
                }
            })
            .catch(error => console.error("Erro ao buscar CEP:", error));
    }
}

function mostrarMensagemErro(mensagem) {
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.textContent = mensagem; // Exibe a mensagem de erro
    mensagemErro.style.display = 'block'; // Torna a mensagem visível
}

const cepInput = document.getElementById("cep");

// Quando o usuário digitar, formata o CEP automaticamente
cepInput.addEventListener("input", function() {
    this.value = formatarCEP(this.value);
    if (this.value.length === 9) { // Quando o CEP estiver completo, faz a busca
        buscarCEP();
    }
});

// Quando perder o foco (blur), faz a busca
cepInput.addEventListener("blur", buscarCEP);

// Quando pressionar Enter, também faz a busca
cepInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio do formulário (caso tenha)
        buscarCEP();
    }
});



//Limitar a 4 numeros e não aceitar letras
document.getElementById('residence').addEventListener('input', function(event) {
    // Remove qualquer caractere não numérico
    this.value = this.value.replace(/\D/g, '');
    
    // Limita o número de caracteres a 4
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
    }
});
