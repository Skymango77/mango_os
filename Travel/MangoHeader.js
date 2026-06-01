// components/MangoHeader.js

class MangoHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Basic styling for the header, can be expanded */
                :host {
                    display: block;
                    background-color: var(--mango-bg-dark);
                    color: white;
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .logo {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: var(--mango-gold);
                }
                .nav-links a {
                    margin-left: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                }
            </style>
            <div class="header-content">
                <div class="logo">MANGO</div>
                <nav class="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Travel</a>
                    <a href="#">Profile</a>
                </nav>
            </div>
        `;
    }
}

customElements.define('mango-header', MangoHeader);