// components/MangoLoader.js

class MangoLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: 1rem;
                    color: white;
                }
                .spinner {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid var(--mango-gold);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin-bottom: 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .message {
                    font-size: 1rem;
                    font-weight: bold;
                }
            </style>
            <div class="spinner"></div>
            <div class="message"><slot>Loading...</slot></div>
        `;
    }
}

customElements.define('mango-loader', MangoLoader);