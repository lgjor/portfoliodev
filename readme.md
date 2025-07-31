# Portfolio - Lucas de Godoy Chicarelli

Portfolio pessoal desenvolvido com HTML, CSS e JavaScript, com sistema de administração para gerenciamento de conteúdo.

## 🚀 Funcionalidades

### Frontend
- ✅ Design responsivo e moderno
- ✅ Tema claro/escuro
- ✅ Seção de tecnologias com ícones
- ✅ Projetos com modal de prévia
- ✅ Carrossel de imagens para projetos
- ✅ Seção sobre com accordion
- ✅ Links para redes sociais
- ✅ Navegação suave
- ✅ **Preview de imagens** (clique na imagem para ampliar)
- ✅ **Modal inteligente** (funciona com carrossel e imagens simples)

### Sistema de Administração
- ✅ Interface web para gerenciar conteúdo
- ✅ Formulários para dados pessoais, projetos, tecnologias
- ✅ Suporte a carrossel de imagens
- ✅ Exportação de JSON
- ✅ Preview em tempo real
- ✅ Armazenamento local
- ✅ **Reordenação de projetos** (setas ↑↓ e drag & drop)
- ✅ **Preview inteligente** (imagem principal quando não há prévia)

## 📁 Estrutura do Projeto

```
portfoliodev/
├── index.html                 # Frontend principal
├── data/
│   └── portfolio.json        # Dados do portfólio
├── admin/
│   ├── admin.html            # Interface de administração
│   ├── admin.css             # Estilos do admin
│   └── admin.js              # Lógica do admin
├── assets/
│   ├── icons/               # Ícones das tecnologias
│   ├── images/              # Imagens dos projetos
│   ├── scripts/
│   │   ├── script.js        # Scripts do frontend
│   │   └── data-loader.js   # Carregador de dados
│   └── styles/              # Arquivos CSS
└── README.md
```

## 🛠️ Como Usar

### 1. Visualizar o Portfolio
Abra o arquivo `index.html` em qualquer navegador web.

### 2. Acessar o Sistema de Administração
1. Abra `admin/admin.html` no navegador
2. Preencha os formulários com suas informações
3. Clique em "Salvar" para cada seção
4. Use "Exportar JSON" para baixar os dados
5. Substitua o arquivo `data/portfolio.json` com o novo JSON

### 3. Gerenciar Conteúdo

#### Dados Pessoais
- Nome completo
- Título profissional
- Localização
- Descrição
- Links das redes sociais
- Níveis de idiomas

#### Tecnologias
- Adicione tecnologias com nome e ícone
- Os ícones devem estar na pasta `assets/icons/`
- Formato: `assets/icons/nome-do-icone.svg`

#### Projetos
- Título e descrição
- Imagem principal
- Tecnologias utilizadas
- Funcionalidades (uma por linha)
- Links do repositório e preview
- Opções: modal, layout reverso, carrossel
- **Reordenação**: Use as setas ↑↓ ou arraste e solte
- **Preview inteligente**: Se não houver prévia, abre a imagem principal

#### Formação e Experiência
- Dados acadêmicos
- Experiência profissional
- Atividades realizadas

#### Cursos
- Título do curso
- Instituição
- Data
- Descrição detalhada

## 🔧 Configuração

### Adicionar Novas Tecnologias
1. Adicione o ícone SVG na pasta `assets/icons/`
2. No admin, adicione a tecnologia com o caminho do ícone
3. O sistema automaticamente carregará o ícone

### Configurar Carrossel de Projetos
1. Marque "É Carrossel" no formulário de projeto
2. Defina o ID do carrossel (ex: "meu-projeto")
3. Liste as imagens uma por linha
4. As imagens devem estar na pasta `assets/images/projects/`

### Reordenar Projetos
1. No painel admin, vá para a seção "Projetos"
2. Use as setas ↑↓ para mover projetos para cima/baixo
3. Ou arraste e solte os projetos para reordenar
4. Clique em "Salvar Projetos" para confirmar

### Preview Inteligente
- **Com prévia**: Abre o link externo
- **Sem prévia**: Abre a imagem principal no modal
- **Carrossel**: Abre a imagem atual do carrossel
- **Imagem simples**: Clique na imagem para ampliar

### Personalizar Estilos
- Frontend: edite os arquivos em `assets/styles/`
- Admin: edite `admin/admin.css`

## 📱 Responsividade

O portfolio é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🎨 Temas

- ✅ Tema escuro (padrão)
- ✅ Tema claro
- ✅ Toggle automático

## 🚀 Deploy

### GitHub Pages
1. Faça push do código para o GitHub
2. Ative o GitHub Pages no repositório
3. O site estará disponível em `https://seu-usuario.github.io/repositorio`

### Outros Serviços
- Netlify
- Vercel
- Firebase Hosting

## 🔄 Atualizações

### Via Admin (Recomendado)
1. Acesse `admin/admin.html`
2. Faça as alterações necessárias
3. Exporte o JSON
4. Substitua `data/portfolio.json`
5. Faça commit e push

### Via JSON Direto
1. Edite `data/portfolio.json`
2. Mantenha a estrutura JSON válida
3. Faça commit e push

## 🐛 Solução de Problemas

### Imagens não carregam
- Verifique se os caminhos estão corretos
- Confirme se os arquivos existem nas pastas

### Admin não funciona
- Abra o console do navegador (F12)
- Verifique se há erros JavaScript
- Confirme se todos os arquivos estão presentes

### Carrossel não funciona
- Verifique se o ID do carrossel está correto
- Confirme se as imagens existem
- Verifique se o JavaScript está carregado

### Preview não funciona
- Verifique se o campo "Preview" está preenchido
- Se vazio, o sistema usará a imagem principal
- Confirme se as imagens existem nos caminhos especificados

### Reordenação não funciona
- Verifique se o JavaScript está habilitado
- Tente usar as setas ↑↓ em vez do drag & drop
- Confirme se clicou em "Salvar Projetos" após reordenar

## 🆕 Novas Funcionalidades

### Reordenação de Projetos
- **Setas ↑↓**: Mova projetos para cima ou para baixo
- **Drag & Drop**: Arraste e solte para reordenar
- **Responsivo**: Funciona em desktop e mobile
- **Visual feedback**: Efeitos visuais durante a reordenação

### Preview Inteligente
- **Detecção automática**: O sistema detecta se há prévia cadastrada
- **Fallback inteligente**: Se não há prévia, usa a imagem principal
- **Modal consistente**: Mesma experiência para todos os tipos de projeto
- **Carrossel integrado**: Funciona com projetos de carrossel

### Melhorias na UX
- **Hover effects**: Indicadores visuais para elementos clicáveis
- **Zoom icon**: Ícone de lupa aparece ao passar o mouse sobre imagens
- **Feedback visual**: Animações suaves e transições
- **Acessibilidade**: Suporte a navegação por teclado

## 📝 Licença

Este projeto foi desenvolvido para fins educativos no Lab da [Digital Innovation One](https://www.dio.me/).

## 👨‍💻 Autor

**Lucas de Godoy Chicarelli**
- GitHub: [@lgjor](https://github.com/lgjor)
- LinkedIn: [lucasgch](https://www.linkedin.com/in/lucasgch/)

---

Desenvolvido com ❤️ usando HTML, CSS e JavaScript puro.
