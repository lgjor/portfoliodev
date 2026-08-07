// Script para inicializar o admin com dados padrão
// Execute este script uma vez para carregar os dados do JSON no localStorage

async function initializeAdmin() {
    try {
        // Carregar dados do JSON
        const jsonUrl = await window.getPortfolioJsonUrl();
        const response = await fetch(jsonUrl);
        const portfolioData = await response.json();
        
        // Salvar no localStorage
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        
        console.log('✅ Dados inicializados com sucesso!');
        console.log('📊 Dados carregados:', portfolioData);
        
        // Mostrar mensagem de sucesso
        showSuccessMessage('Dados inicializados com sucesso! Recarregue a página.');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar dados:', error);
        showErrorMessage('Erro ao carregar dados. Verifique se o arquivo portfolio.json existe.');
    }
}

function showSuccessMessage(message) {
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 0.375rem;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    div.textContent = message;
    document.body.appendChild(div);
    
    setTimeout(() => div.remove(), 5000);
}

function showErrorMessage(message) {
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem;
        border-radius: 0.375rem;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    div.textContent = message;
    document.body.appendChild(div);
    
    setTimeout(() => div.remove(), 5000);
}

// Executar quando o script for carregado
if (typeof window !== 'undefined') {
    // Adicionar botão de inicialização se não existir
    if (!document.getElementById('initBtn')) {
        const initBtn = document.createElement('button');
        initBtn.id = 'initBtn';
        initBtn.textContent = '🔄 Inicializar com Dados Padrão';
        initBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            z-index: 10000;
        `;
        initBtn.onclick = initializeAdmin;
        document.body.appendChild(initBtn);
    }
}

// Executar automaticamente se estiver na página de admin
if (window.location.pathname.includes('admin.html')) {
    console.log('🔧 Sistema de inicialização carregado');
    console.log('💡 Clique no botão "Inicializar com Dados Padrão" para carregar os dados do JSON');
} 