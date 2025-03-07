// Função para atualizar o estado do login
function updateLoginState() {
    const loginBtn = document.getElementById('loginBtn'); // Desktop
    const loginText = document.getElementById('loginText'); // Texto no desktop
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); // Mobile
    const sairBtn = document.querySelector('.btn svg.svg-sair').parentElement; // Botão sair desktop
    const sairMobileBtn = document.querySelector('#menu-mobile .sair'); // Botão sair mobile
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    console.log('Atualizando estado do login...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);

    if (isLoggedIn && username) {
        console.log('Usuário logado, atualizando para:', username);
        // Desktop
        loginText.textContent = username;
        loginBtn.removeAttribute('href');
        // Mobile
        mobileLoginBtn.textContent = username;
        mobileLoginBtn.removeAttribute('href');
    } else {
        console.log('Usuário não logado, mostrando "Login"');
        // Desktop
        loginText.textContent = 'Login';
        loginBtn.setAttribute('href', 'login.html');
        // Mobile
        mobileLoginBtn.textContent = 'Login';
        mobileLoginBtn.setAttribute('href', 'login.html');
    }

    // Evento de logout para desktop
    sairBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Logout clicado (desktop)');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateLoginState();
    });

    // Evento de logout para mobile
    sairMobileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Logout clicado (mobile)');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateLoginState();
    });
}

// Evento de clique no botão de login (desktop)
document.getElementById('loginBtn').addEventListener('click', function(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para login.html (desktop)');
        window.location.href = 'login.html';
    } else {
        console.log('Já logado, clique ignorado (desktop)');
        e.preventDefault();
    }
});

// Evento de clique no botão de login (mobile)
document.getElementById('mobileLoginBtn').addEventListener('click', function(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para login.html (mobile)');
        window.location.href = 'login.html';
    } else {
        console.log('Já logado, clique ignorado (mobile)');
        e.preventDefault();
    }
});

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
});