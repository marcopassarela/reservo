document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
        // Armazena o estado de login e o nome do usuário
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; // Volta para a página principal
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Tentativa de login:', username, password);

    if (username === 'admin' && password === '1234') {
        console.log('Login bem-sucedido, salvando dados');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        console.log('Login falhou');
        document.getElementById('errorMessage').style.display = 'block';
    }
});