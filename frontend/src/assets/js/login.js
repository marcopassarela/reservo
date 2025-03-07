// Função para atualizar o estado do login
function updateLoginState() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const sairBtn = document.querySelector('.btn svg.svg-sair')?.parentElement;
    const sairMobileBtn = document.querySelector('#menu-mobile .sair');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    console.log('Atualizando estado do login...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);
    console.log('loginBtn:', loginBtn);
    console.log('loginText:', loginText);
    console.log('mobileLoginBtn:', mobileLoginBtn);
    console.log('sairBtn:', sairBtn);
    console.log('sairMobileBtn:', sairMobileBtn);

    if (isLoggedIn && username) {
        console.log('Usuário logado, atualizando para:', username);
        if (loginText) loginText.textContent = username;
        if (loginBtn) loginBtn.removeAttribute('href');
        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = username;
            mobileLoginBtn.removeAttribute('href');
        }
    } else {
        console.log('Usuário não logado, mostrando "Login"');
        if (loginText) loginText.textContent = 'Login';
        if (loginBtn) loginBtn.setAttribute('href', 'login.html');
        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = 'Login';
            mobileLoginBtn.setAttribute('href', 'login.html');
        }
    }
}

// Função para logout
function handleLogout(e) {
    e.preventDefault();
    console.log('Logout clicado');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    updateLoginState();
}

// Função para clique no botão de login
function handleLoginClick(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para login.html');
        window.location.href = 'login.html';
    } else {
        console.log('Já logado, clique ignorado');
        e.preventDefault();
    }
}

// Inicializa os eventos
function initializeEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const sairBtn = document.querySelector('.btn svg.svg-sair')?.parentElement;
    const sairMobileBtn = document.querySelector('#menu-mobile .sair');

    console.log('Inicializando eventos...');
    console.log('loginBtn encontrado:', !!loginBtn);
    console.log('mobileLoginBtn encontrado:', !!mobileLoginBtn);
    console.log('sairBtn encontrado:', !!sairBtn);
    console.log('sairMobileBtn encontrado:', !!sairMobileBtn);

    if (loginBtn) {
        loginBtn.removeEventListener('click', handleLoginClick);
        loginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.warn('Botão "Login" do desktop não encontrado, ignorando evento.');
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.removeEventListener('click', handleLoginClick);
        mobileLoginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.warn('Botão "Login" do mobile não encontrado, ignorando evento.');
    }

    if (sairBtn) {
        sairBtn.removeEventListener('click', handleLogout);
        sairBtn.addEventListener('click', handleLogout);
    } else {
        console.warn('Botão "Sair" do desktop não encontrado, ignorando evento.');
    }

    if (sairMobileBtn) {
        sairMobileBtn.removeEventListener('click', handleLogout);
        sairMobileBtn.addEventListener('click', handleLogout);
    } else {
        console.warn('Botão "Sair" do mobile não encontrado, ignorando evento.');
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
    initializeEvents();
});