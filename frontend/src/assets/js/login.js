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
    console.log('loginBtn:', loginBtn);
    console.log('loginText:', loginText);
    console.log('mobileLoginBtn:', mobileLoginBtn);
    console.log('sairBtn:', sairBtn);
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
        // Remove eventos anteriores para evitar duplicatas
        sairBtn.removeEventListener('click', handleLogout);
        sairBtn.addEventListener('click', handleLogout);
    } else {
        console.error('Botão "Sair" do menu desktop não encontrado!');
    }

    // Evento de logout para mobile
    if (sairMobileBtn) {
        // Remove eventos anteriores para evitar duplicatas
        sairMobileBtn.removeEventListener('click', handleLogout);
        sairMobileBtn.addEventListener('click', handleLogout);
    } else {
        console.error('Botão "Sair" do menu mobile não encontrado!');
    }
}

// Função auxiliar para logout
function handleLogout(e) {
    e.preventDefault();
    console.log('Logout clicado');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    updateLoginState();
}

// Função para inicializar eventos de login
function initializeEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');

    if (loginBtn) {
        loginBtn.removeEventListener('click', handleLoginClick);
        loginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.error('Botão "Login" do desktop não encontrado!');
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.removeEventListener('click', handleLoginClick);
        mobileLoginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.error('Botão "Login" do mobile não encontrado!');
    }
}

// Função auxiliar para clique no login
function handleLoginClick(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para index.html');
        window.location.href = 'index.html';
    } else {
        console.log('Já logado, clique ignorado');
        e.preventDefault();
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
    initializeEvents();
});