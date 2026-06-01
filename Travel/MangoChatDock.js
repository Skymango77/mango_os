/**
 * AI Concierge Chat Dock
 * Domain 06: AI Concierge Orchestrator
 */
class MangoChatDock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { position: fixed; bottom: 100px; right: 20px; z-index: 1000; }
                .dock-trigger {
                    width: 60px; height: 60px; border-radius: 50%;
                    background: var(--mango-gradient, linear-gradient(135deg, #f59e0b, #d97706));
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    cursor: pointer; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .dock-trigger:hover { transform: scale(1.1) rotate(5deg); }
                .dock-trigger img { width: 35px; height: 35px; border-radius: 50%; border: 2px solid white; }
                .status-dot { 
                    position: absolute; top: 0; right: 0; width: 15px; height: 15px; 
                    background: #10b981; border-radius: 50%; border: 3px solid #050505;
                }
            </style>
            <div class="dock-trigger" id="trigger">
                <img src="../assets/img/mango.jpg" alt="Mango AI">
                <div class="status-dot"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('trigger').addEventListener('click', () => {
            // Global Event Bus를 통해 채팅창 열기 요청
            window.dispatchEvent(new CustomEvent('MANGO_OPEN_CHAT'));
        });
    }
}
customElements.define('mango-chat-dock', MangoChatDock);
