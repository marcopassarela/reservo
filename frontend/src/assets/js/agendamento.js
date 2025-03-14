// Função para exibir o nome do usuário na página de agendamento
function displayUserName() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    console.log('Exibindo nome do usuário na página de agendamento...');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('username:', username);
    console.log('userNameDisplay:', userNameDisplay);

    if (isLoggedIn && username && userNameDisplay) {
        userNameDisplay.textContent = username;
    } else if (userNameDisplay) {
        userNameDisplay.textContent = 'Usuário não logado';
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de agendamento carregada, exibindo nome do usuário');
    displayUserName();
});


//Função para adicionar a foto de perfil 
const avatar = document.getElementById('avatar');
const upload = document.getElementById('upload');
const remove = document.getElementById('remove');
const defaultAvatar = "default-avatar.png"; // Imagem padrão

// Verifica se já existe uma imagem salva no localStorage e a carrega
window.addEventListener('load', function() {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
        avatar.src = savedAvatar;
        avatar.alt = "Foto do usuário"; // Se houver foto salva, alteramos o alt
        remove.classList.remove("hidden"); // Exibe o botão de remoção
    }
});

// Clique na imagem para adicionar ou alterar a foto
avatar.addEventListener('click', function () {
    if (avatar.src.includes(defaultAvatar)) {
        upload.click();
    }
});

// Quando o usuário escolhe uma imagem
upload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            avatar.src = imageSrc;
            avatar.alt = "Foto do usuário";
            localStorage.setItem('avatar', imageSrc);
            remove.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    }
});

// Remover a imagem ao clicar na lixeira
remove.addEventListener('click', function (event) {
    event.stopPropagation();
    avatar.src = defaultAvatar;
    avatar.alt = "Avatar";
    localStorage.removeItem('avatar');
    upload.value = "";
    remove.classList.add("hidden");
});
