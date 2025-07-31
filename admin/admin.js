class PortfolioAdmin {
    constructor() {
        this.portfolioData = this.loadPortfolioData();
        this.initEventListeners();
        this.loadFormData();
        this.renderTechnologies();
        this.renderProjects();
        this.renderCourses();
    }

    loadPortfolioData() {
        try {
            const savedData = localStorage.getItem('portfolioData');
            if (savedData) {
                return JSON.parse(savedData);
            } else {
                // Carregar dados padrão do JSON
                return this.getDefaultStructure();
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return this.getDefaultStructure();
        }
    }

    getDefaultStructure() {
        return {
            personal: {
                name: "",
                title: "",
                subtitle: "",
                location: "",
                description: "",
                languages: {
                    english: "Básico",
                    spanish: "Básico"
                },
                social: {
                    github: "",
                    linkedin: "",
                    instagram: ""
                },
                resume: ""
            },
            technologies: [],
            projects: [],
            education: {
                degree: "",
                institution: "",
                graduationDate: "",
                type: ""
            },
            experience: {
                current: {
                    title: "",
                    period: "",
                    description: "",
                    activities: []
                }
            },
            courses: []
        };
    }

    savePortfolioData() {
        localStorage.setItem('portfolioData', JSON.stringify(this.portfolioData));
        this.showMessage('Dados salvos com sucesso!', 'success');
    }

    exportJSON() {
        const dataStr = JSON.stringify(this.portfolioData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'portfolio.json';
        link.click();
        
        this.showMessage('JSON exportado com sucesso!', 'success');
    }

    initEventListeners() {
        // Formulários
        document.getElementById('personalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePersonalData();
        });

        document.getElementById('technologyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTechnology();
        });

        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProject();
        });

        // Botão de salvar projetos
        document.getElementById('saveProjectsBtn').addEventListener('click', () => {
            this.saveProjects();
        });

        document.getElementById('educationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEducation();
        });

        document.getElementById('experienceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveExperience();
        });

        document.getElementById('courseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCourse();
        });

        // Botões de ação
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportJSON();
        });

        document.getElementById('previewBtn').addEventListener('click', () => {
            window.open('../index.html', '_blank');
        });

        // Toggle campos do carrossel
        document.getElementById('projectIsCarousel').addEventListener('change', (e) => {
            const carouselFields = document.getElementById('carouselFields');
            carouselFields.style.display = e.target.checked ? 'block' : 'none';
        });
    }

    loadFormData() {
        // Carregar dados pessoais
        const { personal } = this.portfolioData;
        document.getElementById('name').value = personal.name || '';
        document.getElementById('title').value = personal.title || '';
        document.getElementById('subtitle').value = personal.subtitle || '';
        document.getElementById('location').value = personal.location || '';
        document.getElementById('description').value = personal.description || '';
        document.getElementById('english').value = personal.languages?.english || 'Básico';
        document.getElementById('spanish').value = personal.languages?.spanish || 'Básico';
        document.getElementById('github').value = personal.social?.github || '';
        document.getElementById('linkedin').value = personal.social?.linkedin || '';
        document.getElementById('instagram').value = personal.social?.instagram || '';
        document.getElementById('resume').value = personal.resume || '';

        // Carregar formação
        const { education } = this.portfolioData;
        document.getElementById('degree').value = education.degree || '';
        document.getElementById('institution').value = education.institution || '';
        document.getElementById('graduationDate').value = education.graduationDate || '';
        document.getElementById('educationType').value = education.type || '';

        // Carregar experiência
        const { experience } = this.portfolioData;
        document.getElementById('expTitle').value = experience.current?.title || '';
        document.getElementById('expPeriod').value = experience.current?.period || '';
        document.getElementById('expDescription').value = experience.current?.description || '';
        document.getElementById('expActivities').value = experience.current?.activities?.join('\n') || '';
    }

    savePersonalData() {
        const formData = new FormData(document.getElementById('personalForm'));
        
        this.portfolioData.personal = {
            name: formData.get('name'),
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            location: formData.get('location'),
            description: formData.get('description'),
            languages: {
                english: formData.get('english'),
                spanish: formData.get('spanish')
            },
            social: {
                github: formData.get('github'),
                linkedin: formData.get('linkedin'),
                instagram: formData.get('instagram')
            },
            resume: formData.get('resume')
        };

        this.savePortfolioData();
    }

    addTechnology() {
        const formData = new FormData(document.getElementById('technologyForm'));
        const techName = formData.get('techName');
        const techIcon = formData.get('techIcon');

        if (!techName || !techIcon) {
            this.showMessage('Preencha todos os campos da tecnologia!', 'error');
            return;
        }

        const newTech = {
            name: techName,
            icon: techIcon,
            alt: `${techName} logo`
        };

        this.portfolioData.technologies.push(newTech);
        this.savePortfolioData();
        this.renderTechnologies();
        
        // Limpar formulário
        document.getElementById('technologyForm').reset();
    }

    removeTechnology(index) {
        this.portfolioData.technologies.splice(index, 1);
        this.savePortfolioData();
        this.renderTechnologies();
    }

    renderTechnologies() {
        const container = document.getElementById('technologiesList');
        container.innerHTML = '';

        this.portfolioData.technologies.forEach((tech, index) => {
            const techItem = document.createElement('div');
            techItem.className = 'technology-item';
            techItem.innerHTML = `
                <img src="../${tech.icon}" alt="${tech.alt}">
                <span class="tech-name">${tech.name}</span>
                <button class="remove-tech" onclick="portfolioAdmin.removeTechnology(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            container.appendChild(techItem);
        });
    }

    addProject() {
        const formData = new FormData(document.getElementById('projectForm'));
        
        const project = {
            id: formData.get('projectId'),
            title: formData.get('projectTitle'),
            description: formData.get('projectDescription'),
            image: formData.get('projectImage'),
            alt: formData.get('projectAlt'),
            technologies: formData.get('projectTechnologies').split(',').map(t => t.trim()),
            repository: formData.get('projectRepository'),
            preview: formData.get('projectPreview'),
            features: formData.get('projectFeatures').split('\n').filter(f => f.trim()),
            hasModal: formData.get('projectHasModal') === 'on',
            isReverse: formData.get('projectIsReverse') === 'on',
            type: formData.get('projectIsCarousel') === 'on' ? 'carousel' : 'simple'
        };

        if (project.type === 'carousel') {
            const carouselId = formData.get('carouselId');
            const carouselImages = formData.get('carouselImages').split('\n').filter(img => img.trim());
            
            project.carouselId = carouselId;
            project.images = carouselImages.map((src, index) => ({
                src: src.trim(),
                alt: `${project.title} - Preview ${index + 1}`
            }));
        }

        console.log('🔄 Adicionando projeto:', project.title);
        console.log('📊 Total de projetos antes:', this.portfolioData.projects.length);

        // Adicionar projeto temporariamente (não salvar ainda)
        this.portfolioData.projects.push(project);
        
        console.log('📊 Total de projetos depois:', this.portfolioData.projects.length);
        
        this.renderProjects();
        
        // Mostrar seção de salvar
        this.showProjectSaveSection();
        
        // Limpar formulário
        document.getElementById('projectForm').reset();
        document.getElementById('carouselFields').style.display = 'none';
        
        console.log('✅ Projeto adicionado com sucesso');
    }

    removeProject(index) {
        this.portfolioData.projects.splice(index, 1);
        this.savePortfolioData();
        this.renderProjects();
    }

    showProjectSaveSection() {
        const saveSection = document.getElementById('projectSaveSection');
        saveSection.style.display = 'flex';
        
        // Scroll para a seção de salvar
        saveSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    hideProjectSaveSection() {
        const saveSection = document.getElementById('projectSaveSection');
        saveSection.style.display = 'none';
    }

    saveProjects() {
        console.log('🔄 Salvando projetos...');
        console.log('📊 Total de projetos antes de salvar:', this.portfolioData.projects.length);
        console.log('📋 Projetos:', this.portfolioData.projects.map(p => p.title));
        
        // Salvar dados no localStorage
        this.savePortfolioData();
        
        // Esconder seção de salvar
        this.hideProjectSaveSection();
        
        // Mostrar mensagem de sucesso
        this.showMessage('Projetos salvos com sucesso!', 'success');
        
        // Atualizar automaticamente o arquivo JSON
        this.updatePortfolioJSON();
        
        console.log('✅ Projetos salvos com sucesso');
    }

    updatePortfolioJSON() {
        try {
            // Criar o JSON atualizado
            const jsonData = JSON.stringify(this.portfolioData, null, 2);
            
            // Criar blob para download
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // Criar link de download automático
            const link = document.createElement('a');
            link.href = url;
            link.download = 'portfolio.json';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Mostrar instruções para o usuário
            this.showMessage('JSON atualizado! Substitua o arquivo data/portfolio.json pelo arquivo baixado.', 'success');
            
            // Adicionar notificação visual
            this.showJSONUpdateNotification();
            
        } catch (error) {
            console.error('Erro ao atualizar JSON:', error);
            this.showMessage('Erro ao atualizar JSON. Use o botão "Exportar JSON" manualmente.', 'error');
        }
    }

    showJSONUpdateNotification() {
        // Criar notificação visual
        const notification = document.createElement('div');
        notification.className = 'json-update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>JSON Atualizado!</strong>
                    <p>O arquivo portfolio.json foi baixado automaticamente. Substitua o arquivo data/portfolio.json pelo arquivo baixado para ver as mudanças no site.</p>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
        
        // Adicionar ao topo da página
        const container = document.querySelector('.admin-container');
        container.insertBefore(notification, container.firstChild);
        
        // Remover após 10 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    renderProjects() {
        const container = document.getElementById('projectsList');
        container.innerHTML = '';

        this.portfolioData.projects.forEach((project, index) => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.setAttribute('data-index', index);
            projectItem.draggable = true;
            
            projectItem.innerHTML = `
                <div class="project-info">
                    <div class="project-title">${project.title}</div>
                    <div class="project-description">${project.description}</div>
                </div>
                <div class="project-actions">
                    <div class="order-controls">
                        <button class="btn btn--small" onclick="portfolioAdmin.moveProject(${index}, 'up')" ${index === 0 ? 'disabled' : ''}>
                            <i class="bi bi-arrow-up"></i>
                        </button>
                        <button class="btn btn--small" onclick="portfolioAdmin.moveProject(${index}, 'down')" ${index === this.portfolioData.projects.length - 1 ? 'disabled' : ''}>
                            <i class="bi bi-arrow-down"></i>
                        </button>
                    </div>
                    <button class="btn btn--secondary" onclick="portfolioAdmin.editProject(${index})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn--danger" onclick="portfolioAdmin.removeProject(${index})">
                        <i class="bi bi-trash"></i> Remover
                    </button>
                </div>
            `;
            
            // Adicionar event listeners para drag and drop
            projectItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', index);
                projectItem.classList.add('dragging');
            });
            
            projectItem.addEventListener('dragend', () => {
                projectItem.classList.remove('dragging');
            });
            
            projectItem.addEventListener('dragover', (e) => {
                e.preventDefault();
                projectItem.classList.add('drag-over');
            });
            
            projectItem.addEventListener('dragleave', () => {
                projectItem.classList.remove('drag-over');
            });
            
            projectItem.addEventListener('drop', (e) => {
                e.preventDefault();
                projectItem.classList.remove('drag-over');
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const toIndex = index;
                this.moveProjectByDrag(fromIndex, toIndex);
            });
            
            container.appendChild(projectItem);
        });
    }

    moveProject(index, direction) {
        if (direction === 'up' && index > 0) {
            // Mover para cima
            const temp = this.portfolioData.projects[index];
            this.portfolioData.projects[index] = this.portfolioData.projects[index - 1];
            this.portfolioData.projects[index - 1] = temp;
            this.renderProjects();
            this.showProjectSaveSection();
        } else if (direction === 'down' && index < this.portfolioData.projects.length - 1) {
            // Mover para baixo
            const temp = this.portfolioData.projects[index];
            this.portfolioData.projects[index] = this.portfolioData.projects[index + 1];
            this.portfolioData.projects[index + 1] = temp;
            this.renderProjects();
            this.showProjectSaveSection();
        }
    }

    moveProjectByDrag(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        
        const project = this.portfolioData.projects.splice(fromIndex, 1)[0];
        this.portfolioData.projects.splice(toIndex, 0, project);
        this.renderProjects();
        this.showProjectSaveSection();
    }

    editProject(index) {
        const project = this.portfolioData.projects[index];
        
        // Preencher formulário com dados do projeto
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectAlt').value = project.alt;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectRepository').value = project.repository;
        document.getElementById('projectPreview').value = project.preview;
        document.getElementById('projectFeatures').value = project.features.join('\n');
        document.getElementById('projectHasModal').checked = project.hasModal;
        document.getElementById('projectIsReverse').checked = project.isReverse;
        document.getElementById('projectIsCarousel').checked = project.type === 'carousel';
        
        if (project.type === 'carousel') {
            document.getElementById('carouselFields').style.display = 'block';
            document.getElementById('carouselId').value = project.carouselId;
            document.getElementById('carouselImages').value = project.images.map(img => img.src).join('\n');
        }

        // Remover projeto atual da lista (será adicionado de volta quando salvar)
        this.portfolioData.projects.splice(index, 1);
        this.renderProjects();
        
        // Mostrar seção de salvar
        this.showProjectSaveSection();
        
        // Limpar campos do carrossel se não for carrossel
        if (project.type !== 'carousel') {
            document.getElementById('carouselFields').style.display = 'none';
        }
    }

    saveEducation() {
        const formData = new FormData(document.getElementById('educationForm'));
        
        this.portfolioData.education = {
            degree: formData.get('degree'),
            institution: formData.get('institution'),
            graduationDate: formData.get('graduationDate'),
            type: formData.get('educationType')
        };

        this.savePortfolioData();
    }

    saveExperience() {
        const formData = new FormData(document.getElementById('experienceForm'));
        
        this.portfolioData.experience = {
            current: {
                title: formData.get('expTitle'),
                period: formData.get('expPeriod'),
                description: formData.get('expDescription'),
                activities: formData.get('expActivities').split('\n').filter(a => a.trim())
            }
        };

        this.savePortfolioData();
    }

    addCourse() {
        const formData = new FormData(document.getElementById('courseForm'));
        
        const course = {
            title: formData.get('courseTitle'),
            institution: formData.get('courseInstitution'),
            date: formData.get('courseDate'),
            description: formData.get('courseDescription')
        };

        this.portfolioData.courses.push(course);
        this.savePortfolioData();
        this.renderCourses();
        
        // Limpar formulário
        document.getElementById('courseForm').reset();
    }

    removeCourse(index) {
        this.portfolioData.courses.splice(index, 1);
        this.savePortfolioData();
        this.renderCourses();
    }

    renderCourses() {
        const container = document.getElementById('coursesList');
        container.innerHTML = '';

        this.portfolioData.courses.forEach((course, index) => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <div class="course-info">
                    <div class="course-title">${course.title}</div>
                    <div class="course-institution">${course.institution} - ${course.date}</div>
                </div>
                <div class="course-actions">
                    <button class="btn btn--secondary" onclick="portfolioAdmin.editCourse(${index})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn--danger" onclick="portfolioAdmin.removeCourse(${index})">
                        <i class="bi bi-trash"></i> Remover
                    </button>
                </div>
            `;
            container.appendChild(courseItem);
        });
    }

    editCourse(index) {
        const course = this.portfolioData.courses[index];
        
        // Preencher formulário com dados do curso
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseInstitution').value = course.institution;
        document.getElementById('courseDate').value = course.date;
        document.getElementById('courseDescription').value = course.description;

        // Remover curso atual e adicionar novo
        this.portfolioData.courses.splice(index, 1);
        this.savePortfolioData();
        this.renderCourses();
    }

    showMessage(message, type = 'success') {
        // Remover mensagens existentes
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;

        // Inserir no topo da página
        const container = document.querySelector('.admin-container');
        container.insertBefore(messageDiv, container.firstChild);

        // Remover após 3 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Inicializar admin quando o DOM estiver pronto
let portfolioAdmin;
document.addEventListener('DOMContentLoaded', () => {
    portfolioAdmin = new PortfolioAdmin();
});
