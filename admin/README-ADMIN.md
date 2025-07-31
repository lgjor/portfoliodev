# 📋 Guia do Admin - Sistema de Portfolio

## 🎯 Como Funciona o Sistema

O sistema admin funciona em duas etapas:

1. **Edição no Admin**: Você edita os dados no painel admin
2. **Exportação do JSON**: O sistema gera um arquivo JSON atualizado
3. **Substituição do Arquivo**: Você substitui o arquivo `data/portfolio.json` pelo novo

## 🔧 Como Usar

### 1. Editar Projetos

1. Acesse `admin/admin.html`
2. Vá para a seção "Projetos"
3. Edite um projeto existente ou adicione um novo
4. Clique em "Adicionar Projeto" ou "Editar"
5. **IMPORTANTE**: Clique em "Salvar Projetos" para confirmar

### 2. Atualizar o Site

Após salvar os projetos, o sistema irá:

1. ✅ Salvar no localStorage
2. ✅ Baixar automaticamente o arquivo `portfolio.json` atualizado
3. ✅ Mostrar uma notificação azul no canto superior direito

### 3. Aplicar as Mudanças

Para ver as mudanças no site:

1. **Substitua o arquivo**: Copie o arquivo `portfolio.json` baixado para a pasta `data/`
2. **Recarregue o site**: Abra `index.html` e recarregue a página (F5)

## ⚠️ Problemas Comuns

### Problema: "Mudanças não aparecem no site"
**Solução:**
1. Verifique se você clicou em "Salvar Projetos" (não apenas "Adicionar Projeto")
2. Verifique se o arquivo `data/portfolio.json` foi substituído pelo novo
3. Recarregue a página do site (Ctrl+F5)

### Problema: "Arquivo JSON não foi baixado"
**Solução:**
1. Verifique se o navegador permite downloads
2. Use o botão "Exportar JSON" manualmente
3. Substitua o arquivo `data/portfolio.json` pelo arquivo baixado

### Problema: "Erro ao carregar dados"
**Solução:**
1. Verifique se o arquivo `data/portfolio.json` existe
2. Verifique se o JSON é válido
3. Use o botão "🔄 Inicializar com Dados Padrão" no admin

## 🔄 Fluxo Completo de Edição

```
1. Editar projeto no admin
   ↓
2. Clicar "Adicionar Projeto" ou "Editar"
   ↓
3. Clicar "Salvar Projetos" (IMPORTANTE!)
   ↓
4. Sistema baixa portfolio.json atualizado
   ↓
5. Substituir data/portfolio.json pelo arquivo baixado
   ↓
6. Recarregar index.html
   ↓
7. Mudanças aparecem no site! ✅
```

## 📁 Estrutura de Arquivos

```
portfoliodev/
├── index.html (site principal)
├── data/
│   └── portfolio.json (dados do portfolio)
└── admin/
    ├── admin.html (painel admin)
    ├── admin.css (estilos do admin)
    ├── admin.js (lógica do admin)
    └── init-admin.js (inicialização)
```

## 🎨 Recursos do Admin

- ✅ **Dados Pessoais**: Nome, título, descrição, redes sociais
- ✅ **Tecnologias**: Adicionar/remover tecnologias com ícones
- ✅ **Projetos**: Adicionar/editar projetos com carrossel
- ✅ **Formação**: Dados acadêmicos
- ✅ **Experiência**: Dados profissionais
- ✅ **Cursos**: Lista de cursos e certificações

## 🚀 Dicas

1. **Sempre clique em "Salvar Projetos"** após editar
2. **Substitua o arquivo JSON** para ver as mudanças
3. **Use Ctrl+F5** para recarregar sem cache
4. **Teste no navegador** após cada mudança

## 🆘 Suporte

Se tiver problemas:

1. Verifique o console do navegador (F12)
2. Use o botão "🔄 Inicializar com Dados Padrão"
3. Recrie o sistema se necessário
4. Verifique se todos os arquivos estão na estrutura correta 