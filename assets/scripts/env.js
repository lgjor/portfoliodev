// Carrega as variáveis do arquivo .env na raiz do projeto.
// Navegadores não têm acesso a variáveis de ambiente, então o .env é buscado
// via fetch e os valores ficam disponíveis em window.ENV (com padrões de fallback).
(function () {
    const DEFAULTS = {
        PORTFOLIO_JSON: 'data/portfolio.json'
    };

    // Páginas dentro de admin/ precisam voltar um nível para alcançar a raiz
    const ROOT_PREFIX = window.location.pathname.includes('/admin/') ? '../' : '';

    window.ENV = { ...DEFAULTS };

    window.envReady = fetch(ROOT_PREFIX + '.env', { cache: 'no-store' })
        .then(res => (res.ok ? res.text() : ''))
        .then(text => {
            text.split('\n').forEach(line => {
                line = line.trim();
                if (!line || line.startsWith('#')) return;
                const eq = line.indexOf('=');
                if (eq === -1) return;
                const key = line.slice(0, eq).trim();
                const value = line.slice(eq + 1).trim();
                if (key) window.ENV[key] = value;
            });
            console.log('⚙️ .env carregado:', window.ENV);
            return window.ENV;
        })
        .catch(() => {
            console.warn('⚙️ .env não encontrado, usando valores padrão:', window.ENV);
            return window.ENV;
        });

    // Retorna o caminho do JSON já ajustado para a página atual
    window.getPortfolioJsonUrl = async function () {
        const env = await window.envReady;
        return ROOT_PREFIX + env.PORTFOLIO_JSON;
    };
})();
