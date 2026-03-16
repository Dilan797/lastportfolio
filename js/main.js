/* ============================================
MAIN.JS - Scripts de Interfaz con Chatbot IA
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

// ========== CHATBOT CON IA (DeepSeek) ==========
class PortfolioChatbot {
    constructor() {
        this.form = document.getElementById('chatForm');
        this.input = document.getElementById('chatInput');
        this.messages = document.getElementById('chatMessages');
        this.history = [];
        this.isProcessing = false;

        if (this.form && this.input && this.messages) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.form.dispatchEvent(new Event('submit'));
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const text = this.input.value.trim();
        if (!text || this.isProcessing) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.isProcessing = true;

        const typingIndicator = this.showTypingIndicator();

        try {
            const reply = await this.sendToAI(text);
            this.removeTypingIndicator(typingIndicator);
            this.addMessage(reply, 'bot');

            this.history.push({ role: 'user', content: text });
            this.history.push({ role: 'assistant', content: reply });

            if (this.history.length > 10) {
                this.history = this.history.slice(-10);
            }
        } catch (error) {
            console.error('Error en chatbot:', error);
            this.removeTypingIndicator(typingIndicator);
            this.addMessage('Lo siento, ocurrió un error. Intenta de nuevo.', 'bot');
        }

        this.isProcessing = false;
    }

    async sendToAI(message) {
        // URL de la función Cloudflare Pages
        const apiUrl = '/api/chat';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                history: this.history
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.reply || 'No pude procesar tu mensaje.';
    }

    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message flex max-w-[90%] ${sender === 'user' ? 'self-end' : 'self-start'}`;

        const p = document.createElement('p');

        if (sender === 'user') {
            p.className = 'bg-gradient-purple text-white px-3 py-2 rounded-lg rounded-br-sm text-[10px] lg:text-[11px] leading-relaxed shadow-md';
        } else {
            p.className = 'bg-white text-gray-800 px-3 py-2 rounded-lg rounded-bl-sm text-[10px] lg:text-[11px] leading-relaxed shadow-sm border border-gray-200';
        }

        if (sender === 'bot') {
            p.innerHTML = this.formatResponse(text);
        } else {
            p.textContent = text;
        }

        div.appendChild(p);
        this.messages.appendChild(div);

        this.messages.scrollTo({
            top: this.messages.scrollHeight,
            behavior: 'smooth'
        });
    }

    formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-purple-700 text-[9px]">$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'message flex max-w-[90%] self-start typing-indicator';
        div.innerHTML = `
            <p class="bg-white text-gray-500 px-3 py-2 rounded-lg rounded-bl-sm text-[10px] shadow-sm border border-gray-200 flex items-center gap-1">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </p>
        `;
        this.messages.appendChild(div);
        this.messages.scrollTo({ top: this.messages.scrollHeight, behavior: 'smooth' });
        return div;
    }

    removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.remove();
        }
    }
}

// ========== ESTILOS DINÁMICOS PARA TYPING INDICATOR ==========
const typingStyles = document.createElement('style');
typingStyles.textContent = `
    .typing-dot {
        width: 6px;
        height: 6px;
        background-color: #9CA3AF;
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    .typing-dot:nth-child(3) { animation-delay: 0s; }

    @keyframes typingBounce {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }

    .message {
        animation: messageSlideIn 0.3s ease-out;
    }

    @keyframes messageSlideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(typingStyles);

// ========== INICIALIZAR CHATBOT ==========
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
});

// ========== FUNCIONES AUXILIARES ==========
function sendSuggestion(text) {
    const input = document.getElementById('chatInput');
    const form = document.getElementById('chatForm');

    if (input && form) {
        input.value = text;
        form.dispatchEvent(new Event('submit'));
    }
}

window.sendSuggestion = sendSuggestion;
