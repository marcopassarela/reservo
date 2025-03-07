// Função para atualizar o estado do login (usada no index.html)
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

// Função para logout (usada no index.html)
function handleLogout(e) {
    e.preventDefault();
    console.log('Logout clicado');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    updateLoginState();
}

// Função para clique no botão de login (usada no index.html)
function handleLoginClick(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para login.html');
        window.location.href = 'login.html';
    } else {
        console.log('Já logado, clique ignorado');
        e.preventDefault();
    }
}

// Função para lidar com a submissão do formulário de login (usada no login.html)
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (!usernameInput || !passwordInput) return; // Sai se os elementos não existem

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log('Tentativa de login:', username, password);

    if (username === 'admin' && password === '1234') {
        console.log('Login bem-sucedido, salvando dados');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; // Redireciona para index.html
    } else {
        console.log('Login falhou');
        if (errorMessage) errorMessage.style.display = 'block';
    }
}

// Inicializa os eventos dependendo da página
function initializeEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const sairBtn = document.querySelector('.btn svg.svg-sair')?.parentElement;
    const sairMobileBtn = document.querySelector('#menu-mobile .sair');
    const loginForm = document.getElementById('loginForm');

    console.log('Inicializando eventos...');
    console.log('loginBtn encontrado:', !!loginBtn);
    console.log('mobileLoginBtn encontrado:', !!mobileLoginBtn);
    console.log('sairBtn encontrado:', !!sairBtn);
    console.log('sairMobileBtn encontrado:', !!sairMobileBtn);
    console.log('loginForm encontrado:', !!loginForm);

    // Eventos para index.html
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

    // Evento para login.html
    if (loginForm) {
        loginForm.removeEventListener('submit', handleLoginSubmit);
        loginForm.addEventListener('submit', handleLoginSubmit);
    } else {
        console.warn('Formulário de login não encontrado, ignorando evento.');
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState(); // Atualiza o estado apenas se os elementos existirem (index.html)
    initializeEvents(); // Inicializa eventos para a página atual
});