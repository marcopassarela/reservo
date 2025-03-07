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
