// Função para atualizar o estado do login
function updateLoginState() {
    const loginBtn = document.getElementById('loginBtn'); // Desktop
    const loginText = document.getElementById('loginText'); // Texto no desktop
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); // Mobile
    const sairBtn = document.querySelector('.btn svg.svg-sair')?.parentElement; // Botão sair desktop
    const sairMobileBtn = document.querySelector('#menu-mobile .sair'); // Botão sair mobile
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    // Logs para depuração
    console.log('Atualizando estado do login...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);
    console.log('loginBtn:', loginBtn);
    console.log('loginText:', loginText);
    console.log('mobileLoginBtn:', mobileLoginBtn);
    console.log('sairBtn:', sairBtn);
    console.log('sairMobileBtn:', sairMobileBtn);

    // Atualiza os botões com base no estado de login
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

    // Eventos de login (desktop)
    if (loginBtn) {
        loginBtn.removeEventListener('click', handleLoginClick); // Remove evento anterior
        loginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.error('Botão "Login" do desktop não encontrado!');
    }

    // Eventos de login (mobile)
    if (mobileLoginBtn) {
        mobileLoginBtn.removeEventListener('click', handleLoginClick); // Remove evento anterior
        mobileLoginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.error('Botão "Login" do mobile não encontrado!');
    }

    // Eventos de logout (desktop)
    if (sairBtn) {
        sairBtn.removeEventListener('click', handleLogout); // Remove evento anterior
        sairBtn.addEventListener('click', handleLogout);
    } else {
        console.error('Botão "Sair" do desktop não encontrado!');
    }

    // Eventos de logout (mobile)
    if (sairMobileBtn) {
        sairMobileBtn.removeEventListener('click', handleLogout); // Remove evento anterior
        sairMobileBtn.addEventListener('click', handleLogout);
    } else {
        console.error('Botão "Sair" do mobile não encontrado!');
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
    initializeEvents();
});

//código para login 
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Tentativa de login:', username, password);

    if (username === 'admin' && password === '1234') {
        console.log('Login bem-sucedido, salvando dados');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; // Redireciona para index.html
    } else {
        console.log('Login falhou');
        document.getElementById('errorMessage').style.display = 'block';
    }
});