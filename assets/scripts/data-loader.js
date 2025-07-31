class PortfolioDataLoader {
    constructor() {
        this.portfolioData = null;
        this.loadData();
    }

    async loadData() {
        try {
            console.log('🔄 Iniciando carregamento do portfolio.json...');
            const response = await fetch('data/portfolio.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            this.portfolioData = await response.json();
            console.log('✅ Dados carregados com sucesso:', this.portfolioData);
            this.updatePortfolio();
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // Dados de fallback caso o JSON não carregue
        console.log('Usando dados de fallback');
        // O frontend continuará funcionando com os dados estáticos do HTML
    }

    updatePortfolio() {
        console.log('🔄 Iniciando atualização do portfolio...');
        this.updatePersonalInfo();
        this.updateTechnologies();
        this.updateProjects();
        this.updateAboutSection();
        console.log('✅ Portfolio atualizado com sucesso!');
    }

    updatePersonalInfo() {
        const { personal } = this.portfolioData;
        console.log('🔄 Atualizando informações pessoais...');
        
        // Atualizar nome
        const nameElement = document.querySelector('.hero span');
        if (nameElement) {
            nameElement.textContent = personal.name;
            console.log('✅ Nome atualizado:', personal.name);
        } else {
            console.log('⚠️ Elemento .hero span não encontrado');
        }
        
        // Atualizar título
        const titleElement = document.querySelector('.hero h1 b');
        if (titleElement) {
            titleElement.textContent = personal.title;
            console.log('✅ Título atualizado:', personal.title);
        } else {
            console.log('⚠️ Elemento .hero h1 b não encontrado');
        }
        
        // Atualizar subtítulo
        const subtitleElement = document.querySelector('.hero h1');
        if (subtitleElement && personal.subtitle) {
            const fullTitle = `<b>${personal.title}</b> ${personal.subtitle}`;
            subtitleElement.innerHTML = fullTitle;
            console.log('✅ Subtítulo atualizado:', personal.subtitle);
        } else {
            console.log('⚠️ Elemento .hero h1 não encontrado ou subtítulo não definido');
        }
        
        // Atualizar localização
        const locationElement = document.querySelector('.hero p');
        if (locationElement) {
            locationElement.textContent = personal.location;
            console.log('✅ Localização atualizada:', personal.location);
        } else {
            console.log('⚠️ Elemento .hero p não encontrado');
        }

        // Atualizar links sociais
        this.updateSocialLinks(personal.social);
    }

    updateSocialLinks(social) {
        const githubLink = document.querySelector('a[href*="github.com"]');
        const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
        const instagramLink = document.querySelector('a[href*="instagram.com"]');

        if (githubLink && social.github) {
            githubLink.href = social.github;
        }
        if (linkedinLink && social.linkedin) {
            linkedinLink.href = social.linkedin;
        }
        if (instagramLink && social.instagram) {
            instagramLink.href = social.instagram;
        }
    }

    updateTechnologies() {
        const { technologies } = this.portfolioData;
        const technologiesList = document.querySelector('.technologies .technologies__list');
        
        if (technologiesList) {
            technologiesList.innerHTML = '';
            
            technologies.forEach(tech => {
                const li = document.createElement('li');
                li.className = 'technologies__item';
                li.innerHTML = `<img src="${tech.icon}" alt="${tech.alt}">`;
                technologiesList.appendChild(li);
            });
        }
    }

    updateProjects() {
        const projectsContainer = document.querySelector('.projects__container');
        
        if (projectsContainer) {
            console.log('🔄 Atualizando projetos...');
            projectsContainer.innerHTML = '';
            
            this.portfolioData.projects.forEach((project, index) => {
                console.log(`📋 Renderizando projeto ${index + 1}: ${project.title}`);
                const projectHTML = this.generateProjectHTML(project);
                projectsContainer.innerHTML += projectHTML;
            });

            console.log(`✅ ${this.portfolioData.projects.length} projetos renderizados`);
            
            // Reinicializar carrossel e modal após adicionar projetos
            this.initializeCarouselAndModal();
        } else {
            console.log('⚠️ Container de projetos não encontrado');
        }
    }

    generateProjectHTML(project) {
        let projectHTML = '';

        if (project.type === 'carousel') {
            projectHTML = this.generateCarouselProjectHTML(project);
        } else {
            projectHTML = this.generateSimpleProjectHTML(project);
        }

        return projectHTML;
    }

    generateSimpleProjectHTML(project) {
        const cardClass = project.isReverse ? 'projects__card card--reverse' : 'projects__card';
        
        // Verificar se o projeto tem modal ou preview
        let modalButton;
        if (project.hasModal) {
            // Se tem modal, abre a imagem principal
            modalButton = `<button class="btn btn--primary" onclick="openModal('${project.image}')">
                <span>Prévia</span>
                <i class="bi bi-arrow-up-right"></i>
            </button>`;
        } else if (project.preview && project.preview.trim() !== '') {
            // Se tem preview definido, abre o link externo
            modalButton = `<a href="${project.preview}" target="_blank">
                <button class="btn btn--primary">
                    <span>Prévia</span>
                    <i class="bi bi-arrow-up-right"></i>
                </button>
            </a>`;
        } else {
            // Se não tem preview, abre a imagem principal no modal
            modalButton = `<button class="btn btn--primary" onclick="openModal('${project.image}')">
                <span>Prévia</span>
                <i class="bi bi-arrow-up-right"></i>
            </button>`;
        }

        return `
            <div class="${cardClass}">
                <img class="card__cover" src="${project.image}" alt="${project.alt}" onclick="openModal('${project.image}')" style="cursor: pointer;">
                <div class="card__body">
                    <h3 class="card__title">${project.title}</h3>
                    <p class="card__description">${project.description}</p>
                    <ul class="card__list">
                        ${project.features.map(feature => `<li class="card__item">${feature}</li>`).join('')}
                    </ul>
                    <ul class="technologies__list">
                        ${this.generateTechnologiesHTML(project.technologies)}
                    </ul>
                    <div class="card__buttons">
                        ${modalButton}
                        <a href="${project.repository}" target="_blank">
                            <button class="btn">
                                <span>Repositório</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    generateCarouselProjectHTML(project) {
        const carouselImages = project.images.map((img, index) => `
            <img class="carousel-image ${index === 0 ? 'active' : ''}" 
                 src="${img.src}" 
                 alt="${img.alt}" 
                 onclick="openModalFromCarousel(this.src)">
        `).join('');

        const carouselDots = project.images.map((_, index) => `
            <span class="dot ${index === 0 ? 'active' : ''}" 
                  onclick="currentSlide(${index + 1}, '${project.carouselId}')"></span>
        `).join('');

        return `
            <div class="projects__card card--reverse">
                <div class="card__cover carousel-container">
                    <div class="carousel" data-carousel="${project.carouselId}">
                        ${carouselImages}
                        <button class="carousel-btn carousel-btn--prev" onclick="changeSlide(-1, '${project.carouselId}')">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="carousel-btn carousel-btn--next" onclick="changeSlide(1, '${project.carouselId}')">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                        <div class="carousel-dots">
                            ${carouselDots}
                        </div>
                    </div>
                </div>
                <div class="card__body">
                    <h3 class="card__title">${project.title}</h3>
                    <p class="card__description">${project.description}</p>
                    <ul class="card__list">
                        ${project.features.map(feature => `<li class="card__item">${feature}</li>`).join('')}
                    </ul>
                    <ul class="technologies__list">
                        ${this.generateTechnologiesHTML(project.technologies)}
                    </ul>
                    <div class="card__buttons">
                        <button class="btn btn--primary" onclick="openModalFromCarouselCurrent()">
                            <span>Prévia</span>
                            <i class="bi bi-arrow-up-right"></i>
                        </button>
                        <a href="${project.repository}" target="_blank">
                            <button class="btn">
                                <span>Repositório</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    generateTechnologiesHTML(technologies) {
        const techIcons = {
            'Java': 'assets/icons/java-brands.svg',
            'JavaScript': 'assets/icons/JavaScript.svg',
            'HTML': 'assets/icons/html5-brands.svg',
            'CSS': 'assets/icons/css3-alt-brands.svg',
            'React': 'assets/icons/React.svg'
        };

        return technologies.map(tech => `
            <li class="technologies__item">
                <img src="${techIcons[tech] || 'assets/icons/JavaScript.svg'}" alt="${tech} logo">
            </li>
        `).join('');
    }

    updateAboutSection() {
        const { personal, education, experience, courses } = this.portfolioData;
        
        // Atualizar dados pessoais na seção sobre
        const aboutName = document.querySelector('.about__description h2');
        if (aboutName) {
            aboutName.textContent = personal.name;
        }

        const aboutDescription = document.querySelector('.about__description p');
        if (aboutDescription) {
            aboutDescription.textContent = personal.description;
        }

        // Atualizar idiomas
        const languagesElement = document.querySelector('.about__icons span');
        if (languagesElement) {
            languagesElement.textContent = `Inglês: ${personal.languages.english} | Espanhol: ${personal.languages.spanish}`;
        }

        // Atualizar formação
        this.updateEducation(education);

        // Atualizar experiência
        this.updateExperience(experience);

        // Atualizar cursos
        this.updateCourses(courses);
    }

    updateEducation(education) {
        const degreeElement = document.querySelector('.row1 h4');
        const institutionElement = document.querySelector('.row1 .about__icons span');
        const dateElement = document.querySelector('.row1 span');
        const typeElement = document.querySelector('.row1 .about__icons:last-child span');

        if (degreeElement) degreeElement.textContent = education.degree;
        if (institutionElement) institutionElement.textContent = education.institution;
        if (dateElement) dateElement.textContent = education.graduationDate;
        if (typeElement) typeElement.textContent = education.type;
    }

    updateExperience(experience) {
        const titleElement = document.querySelector('.row2 h4');
        const periodElement = document.querySelector('.row2 span');
        const descriptionElement = document.querySelector('.row2 span:nth-of-type(2)');
        const activitiesList = document.querySelector('.row2 .about__list');

        if (titleElement) titleElement.textContent = experience.current.title;
        if (periodElement) periodElement.textContent = experience.current.period;
        if (descriptionElement) descriptionElement.textContent = experience.current.description;
        
        if (activitiesList) {
            activitiesList.innerHTML = experience.current.activities.map(activity => 
                `<li class="about__item">${activity}</li>`
            ).join('');
        }
    }

    updateCourses(courses) {
        const accordion = document.getElementById('accordion');
        if (accordion) {
            accordion.innerHTML = '';
            
            courses.forEach((course, index) => {
                const isActive = index === 0 ? 'active' : '';
                const isStart = index === 0 ? 'start' : '';
                const isEnd = index === courses.length - 1 ? 'end' : '';
                
                const courseHTML = `
                    <div class="accordion__item ${isActive}">
                        <button class="accordion__header ${isStart} ${isEnd}">
                            <span>${course.title}</span>
                            <i class="bi bi-caret-down-fill"></i>
                        </button>
                        <div class="accordion__body ${isEnd}">
                            <p>${course.institution}. ${course.date}.</p>
                            <p>${course.description}</p>
                        </div>
                    </div>
                `;
                accordion.innerHTML += courseHTML;
            });

            // Reinicializar accordion
            this.initializeAccordion();
        }
    }

    initializeCarouselAndModal() {
        // Reinicializar carrossel se existir
        if (typeof showSlides === 'function') {
            this.portfolioData.projects.forEach(project => {
                if (project.type === 'carousel') {
                    showSlides(1, project.carouselId);
                }
            });
        }
    }

    initializeAccordion() {
        const accordionHeaders = document.querySelectorAll(".accordion__header");
        
        accordionHeaders.forEach(header => {
            header.addEventListener("click", () => {
                const accordionItem = header.parentElement;
                const accordionActive = accordionItem.classList.contains("active");

                accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
            });
        });
    }
}

// Inicializar carregador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioDataLoader();
}); 