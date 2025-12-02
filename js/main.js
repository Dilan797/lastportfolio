/* ============================================
MAIN.JS - Scripts de Interfaz
============================================ */

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 500);
        }
    }, 500);
});

// ========== TOGGLE DEL CHATBOT ==========
function toggleChat() {
    const overlay = document.getElementById('chatbotOverlay');
    const content = document.getElementById('chatContent');
    const icon = document.getElementById('chatToggleIcon');
    
    if (!overlay || !content || !icon) return;
    
    if (overlay.classList.contains('chatbot-collapsed')) {
        overlay.classList.remove('chatbot-collapsed');
        overlay.classList.add('chatbot-expanded');
        content.classList.remove('hidden');
        icon.textContent = '▼';
    } else {
        overlay.classList.add('chatbot-collapsed');
        overlay.classList.remove('chatbot-expanded');
        content.classList.add('hidden');
        icon.textContent = '▲';
    }
}

// Hacer la función global para poder usarla en onclick
window.toggleChat = toggleChat;

// ========== CHATBOT LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');

    if (!form || !input || !messages) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        
        if (text) {
            addMessage(text, 'user');
            input.value = '';

            // Simular respuesta del bot
            setTimeout(() => {
                const responses = [
                    '¡Interesante! Estoy aquí para ayudarte.',
                    '¿Quieres saber sobre algún proyecto?',
                    'Cuéntame más sobre lo que te interesa.',
                    'Especializado en Three.js y WebGL.',
                    'Tengo proyectos con React y Node.js.',
                    'Puedes ver mi GitHub para más detalles.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 600);
        }
    });

    // Función para agregar mensajes
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message flex max-w-[90%] ${sender === 'user' ? 'self-end' : 'self-start'}`;
        
        const p = document.createElement('p');
        p.className = sender === 'user' 
            ? 'bg-gradient-purple text-white px-2 py-1 rounded-lg rounded-br-sm text-[8px] leading-snug'
            : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-lg rounded-bl-sm text-[8px] leading-snug shadow-sm';
        
        p.textContent = text;
        div.appendChild(p);
        messages.appendChild(div);
        
        // Auto-scroll
        messages.scrollTop = messages.scrollHeight;
    }
});

// ========== ANALYTICS (Opcional) ==========
// Aquí puedes agregar Google Analytics, Hotjar, etc.
