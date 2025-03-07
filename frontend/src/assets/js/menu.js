// Função para atualizar o estado do login
function updateLoginState() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const sairBtn = document.querySelector('.btn svg.svg-sair').parentElement;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    console.log('Atualizando estado do login...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);

    if (isLoggedIn && username) {
        console.log('Usuário logado, atualizando para:', username);
        loginText.textContent = username;
        loginBtn.removeAttribute('href'); // Remove o link quando logado
    } else {
        console.log('Usuário não logado, mostrando "Login"');
        loginText.textContent = 'Login';
        loginBtn.setAttribute('href', 'login.html');
    }

    // Evento de logout
    sairBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Logout clicado');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateLoginState();
    });
}

// Evento de clique no botão de login
document.getElementById('loginBtn').addEventListener('click', function(e) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log('Redirecionando para login.html');
        window.location.href = 'login.html';
    } else {
        console.log('Já logado, clique ignorado');
        e.preventDefault();
    }
});

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando estado do login');
    updateLoginState();
});