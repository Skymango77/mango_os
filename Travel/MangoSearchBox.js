// components/MangoSearchBox.js

class MangoSearchBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 1rem;
                }
                .search-container {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    overflow: hidden;
                }
                input {
                    flex-grow: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 0.75rem 1rem;
                    color: white;
                    font-size: 1rem;
                }
                input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
                button {
                    background: var(--mango-gradient);
                    border: none;
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    color: black;
                    font-weight: bold;
                }
            </style>
            <div class="search-container">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>
        `;
    }
}

customElements.define('mango-search-box', MangoSearchBox);