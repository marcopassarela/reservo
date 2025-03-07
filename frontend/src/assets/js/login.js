// Função para atualizar o estado do login
function updateLoginState() {
    const loginBtn = document.getElementById('loginBtn'); // Desktop
    const loginText = document.getElementById('loginText'); // Texto no desktop
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); // Mobile
    const sairBtn = document.querySelector('.btn svg.svg-sair')?.parentElement; // Botão sair desktop
    const sairMobileBtn = document.querySelector('#menu-mobile .sair'); // Botão sair mobile
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    console.log('Atualizando estado do login...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);
    console.log('sairMobileBtn:', sairMobileBtn);

    if (isLoggedIn && username) {
        console.log('Usuário logado, atualizando para:', username);
        // Desktop
        if (loginText) loginText.textContent = username;
        if (loginBtn) loginBtn.removeAttribute('href');
        // Mobile
        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = username;
            mobileLoginBtn.removeAttribute('href');
        }
    } else {
        console.log('Usuário não logado, mostrando "Login"');
        // Desktop
        if (loginText) loginText.textContent = 'Login';
        if (loginBtn) loginBtn.setAttribute('href', 'login.html');
        // Mobile
        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = 'Login';
            mobileLoginBtn.setAttribute('href', 'login.html');
        }
    }

    // Evento de logout para desktop
    if (sairBtn) {
        sairBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicado (desktop)');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            updateLoginState();
        });
    }

    // Evento de logout para mobile
    if (sairMobileBtn) {
        sairMobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicado (mobile)');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            updateLoginState();
        });
    } else {
        console.error('Botão "Sair" do menu mobile não encontrado!');
    }
}

// Função para inicializar eventos
function initializeEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');

    // Evento de clique no botão de login (desktop)
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                console.log('Redirecionando para login.html (desktop)');
                window.location.href = 'login.html';
            } else {
                console.log('Já logado, clique ignorado (desktop)');
                e.preventDefault();
            }
        });
    }

    // Evento de clique no botão de login (mobile)
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function(e) {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                console.log('Redirecionando para login.html (mobile)');
                window.location.href = 'login.html';
            } else {
                console.log('Já logado, clique ignorado (mobile)');
                e.preventDefault();
            }
        });
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
    initializeEvents();
});