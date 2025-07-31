# 🔧 Guia de Troubleshooting - Sistema Dinâmico

## Problema: Alterações do JSON não aparecem no index.html

### Passo 1: Verificar se o JSON foi atualizado

1. Abra o arquivo `data/portfolio.json` no seu editor
2. Verifique se as alterações que você fez no admin estão presentes
3. Se não estiverem, você precisa:
   - Ir para `admin/admin.html`
   - Fazer as alterações
   - Clicar em "Exportar JSON"
   - Substituir o arquivo `data/portfolio.json` pelo novo

### Passo 2: Verificar o Console do Navegador

1. Abra o `index.html` no navegador
2. Pressione `F12` para abrir as ferramentas do desenvolvedor
3. Vá para a aba "Console"
4. Procure por mensagens como:
   - ✅ "Dados carregados com sucesso"
   - ❌ "Erro ao carregar dados"
   - ⚠️ "Elemento não encontrado"

### Passo 3: Testar o Sistema

1. Abra o arquivo `test-loader.html` no navegador
2. Clique em "Testar Fetch do JSON"
3. Clique em "Testar Data Loader"
4. Verifique se há erros

### Passo 4: Verificar Estrutura de Arquivos

Certifique-se de que você tem esta estrutura:
```
portfoliodev/
├── index.html
├── data/
│   └── portfolio.json
├── assets/
│   └── scripts/
│       ├── script.js
│       └── data-loader.js
└── admin/
    ├── admin.html
    ├── admin.css
    ├── admin.js
    └── init-admin.js
```

### Passo 5: Problemas Comuns e Soluções

#### Problema: "Erro ao carregar dados"
**Causa:** O arquivo `portfolio.json` não existe ou está corrompido
**Solução:** 
1. Verifique se o arquivo existe em `data/portfolio.json`
2. Verifique se o JSON é válido (use um validador online)
3. Recrie o arquivo usando o admin

#### Problema: "Elemento não encontrado"
**Causa:** Os seletores CSS não estão encontrando os elementos
**Solução:**
1. Verifique se o HTML tem as classes corretas
2. Verifique se o `data-loader.js` está sendo carregado após o HTML

#### Problema: Dados não aparecem
**Causa:** O script não está sendo executado
**Solução:**
1. Verifique se `data-loader.js` está incluído no `index.html`
2. Verifique se não há erros de JavaScript no console
3. Force um refresh da página (Ctrl+F5)

### Passo 6: Debug Avançado

Se ainda não funcionar, adicione este código temporário ao `index.html` antes do `</body>`:

```html
<script>
// Debug temporário
console.log('🔍 Debug: Verificando elementos...');
console.log('Hero span:', document.querySelector('.hero span'));
console.log('Hero h1:', document.querySelector('.hero h1'));
console.log('Technologies list:', document.querySelector('.technologies .technologies__list'));
console.log('Projects container:', document.querySelector('.projects__container'));
</script>
```

### Passo 7: Recriar o Sistema

Se nada funcionar, recrie o sistema:

1. **Backup dos dados:**
   - Copie o conteúdo do `portfolio.json` atual

2. **Limpar localStorage:**
   - Abra o console do navegador
   - Digite: `localStorage.clear()`

3. **Reinicializar:**
   - Vá para `admin/admin.html`
   - Clique no botão "🔄 Inicializar com Dados Padrão"
   - Recarregue a página

4. **Testar:**
   - Vá para `index.html`
   - Verifique se os dados aparecem

### Contato

Se ainda tiver problemas, verifique:
- A versão do navegador (recomendado: Chrome, Firefox, Edge)
- Se está usando um servidor local (não apenas abrindo o arquivo)
- Se todos os arquivos estão na estrutura correta 