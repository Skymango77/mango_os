// components/MangoCard.js

class MangoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--mango-glass);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: var(--mango-radius);
                    padding: 1.5rem;
                    box-shadow: var(--mango-shadow);
                    color: white;
                }
                .card-header {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
                .card-content {
                    font-size: 0.9rem;
                    line-height: 1.5;
                }
            </style>
            <div class="card-header"><slot name="header">Default Card Header</slot></div>
            <div class="card-content"><slot>Default Card Content</slot></div>
        `;
    }
}

customElements.define('mango-card', MangoCard);