function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (menu) menu.classList.toggle('show');
    if (hamburgerIcon) hamburgerIcon.classList.toggle('active');
}

function toggleMenuMobile() { // Renomeado para evitar duplicata
    const menu = document.getElementById("menu-mobile");
    const icon = document.getElementById("hamburger-icon");

    if (menu) menu.classList.toggle("active");
    if (icon) icon.classList.toggle("active");
}

// Seleciona todos os links com a classe 'requestLink'
const links = document.querySelectorAll('.requestLink');
links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '/404.html';
    });
});

// Animação de entrada do site
document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.classList.add('show');
    });
});

// Animação de escrita
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("text");
    if (textElement) {
        const text = textElement.innerHTML;
        textElement.innerHTML = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                textElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 40);
            } else {
                textElement.classList.add("visible");
            }
        }
        type();
    }
});

// Flip cards
document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
    box.addEventListener('click', function(event) {
        event.stopPropagation();
        this.classList.toggle('clicked');
    });
});

document.addEventListener('click', function() {
    document.querySelectorAll('.box1, .box2, .box3').forEach(box => {
        box.classList.remove('clicked');
    });
});

// Para entrada de CEP
function formatarCEP(value) {
    return value.replace(/\D/g, '')
                .replace(/^(\d{5})(\d{0,3})/, '$1-$2')
                .replace(/-$/, '');
}

function buscarCEP() {
    const cepInput = document.getElementById("cep");
    if (!cepInput) return;

    let cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    const cidade = document.getElementById("cidade");
                    const rua = document.getElementById("rua");
                    const mensagemErro = document.getElementById("mensagemErro");
                    if (cidade) cidade.value = data.localidade;
                    if (rua) rua.value = data.logradouro;
                    if (mensagemErro) mensagemErro.style.display = 'none';
                } else {
                    mostrarMensagemErro("CEP não encontrado!");
                }
            })
            .catch(error => console.error("Erro ao buscar CEP:", error));
    }
}

function mostrarMensagemErro(mensagem) {
    const mensagemErro = document.getElementById("mensagemErro");
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = 'block';
    }
}

const cepInput = document.getElementById("cep");
if (cepInput) {
    cepInput.addEventListener("input", function() {
        this.value = formatarCEP(this.value);
        if (this.value.length === 9) buscarCEP();
    });
    cepInput.addEventListener("blur", buscarCEP);
    cepInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            buscarCEP();
        }
    });
}

// Limitar a 4 números e não aceitar letras
const residenceInput = document.getElementById('residence');
if (residenceInput) {
    residenceInput.addEventListener('input', function(event) {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 4) this.value = this.value.slice(0, 4);
    });
}