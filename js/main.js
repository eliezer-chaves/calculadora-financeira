// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}


// Função para definir um cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // Define o tempo de expiração
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";  // Define o cookie
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    // Alterna a classe 'open' na sidebar e a classe 'sidebar-open' no conteúdo
    sidebar.classList.toggle('open');
    content.classList.toggle('sidebar-open');

    // Armazena o estado da sidebar no localStorage
    if (sidebar.classList.contains('open')) {
        localStorage.setItem('sidebarOpen', 'true');
    } else {
        localStorage.setItem('sidebarOpen', 'false');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');

    // Recupera o estado da sidebar do localStorage
    const sidebarState = localStorage.getItem('sidebarOpen');

    // Se o estado estiver armazenado como 'true', abre a sidebar
    if (sidebarState === 'true') {
        sidebar.classList.add('open');
        document.getElementById('content').classList.add('sidebar-open');
    }
});


// Ao carregar a página, aplica o estado da sidebar se o cookie estiver ativo
window.onload = function() {
    const sidebarState = getCookie('sidebarOpen');
    if (sidebarState === 'open') {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('content').classList.add('sidebar-open');
    }
};

function toggleDarkMode() {
    const bg = document.getElementById('bg');
    const card = document.getElementById('card');
    const modeButton = document.getElementById('toggleModeButton');

    // Alterna a classe 'dark-mode'
    bg.classList.toggle('dark-mode');
    card.classList.toggle('dark-mode');

    // Armazena o estado do modo noturno no cookie
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    setCookie('darkMode', darkModeEnabled ? 'enabled' : 'disabled', 365);  // Cookie expira em 365 dias

    // Atualiza o texto e estilo do botão
    if (darkModeEnabled) {
        modeButton.textContent = '💡';
        modeButton.classList.remove('btn-secondary');
        modeButton.classList.add('btn-light');
    } else {
        modeButton.textContent = '🌑';
        modeButton.classList.remove('btn-light');
        modeButton.classList.add('btn-secondary');
    }
}

// Ao carregar a página, aplica o modo noturno se o cookie estiver ativo
window.onload = function() {
    // Define o modo escuro baseado no cookie
    const darkMode = getCookie('darkMode');
    const body = document.body;

    // Verifica se o modo escuro está habilitado, se sim, aplica as classes
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        document.getElementById('bg').classList.add('dark-mode');
        document.getElementById('card').classList.add('dark-mode');
        document.getElementById('toggleModeButton').textContent = '💡';
        document.getElementById('toggleModeButton').classList.remove('btn-secondary');
        document.getElementById('toggleModeButton').classList.add('btn-light');
    } else {
        // Caso contrário, removemos o dark mode (caso o usuário tenha desativado)
        body.classList.remove('dark-mode');
    }

    // Remove a classe de "loading" após a aplicação do modo correto
    body.classList.remove('loading');
};


