function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('open');
    content.classList.toggle('sidebar-open');
}

function toggleDarkMode() {
    //document.body.classList.toggle('dark-mode');
    document.getElementById('bg').classList.toggle('dark-mode')
    document.getElementById('card').classList.toggle('dark-mode')

    const modeButton = document.getElementById('toggleModeButton');

    if (document.body.classList.contains('dark-mode')) {
        modeButton.textContent = '💡';
        modeButton.classList.remove('btn-secondary');
        modeButton.classList.add('btn-light');
    } else {
        modeButton.textContent = '🌑';
        modeButton.classList.remove('btn-light');
        modeButton.classList.add('btn-secondary');
    }
}
