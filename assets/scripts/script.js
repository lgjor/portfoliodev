const toggleTheme = document.getElementById("switch");
const rootHtml = document.documentElement
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

function toggleMode(){
  const html = document.documentElement;
  
  // Muda a classe do HTML entre light e dark
  html.setAttribute.toggle("data-theme", "light");
  html.setAttribute.toggle("data-theme", "dark");

  // Pegar a tag img do perfil
  const img = document.querySelector('#profile img');

  // // Substituir a img
  // if (html.classList.contains('dark')) {
  //   img.setAttribute('src', './assets/images/avatar-dark.png');
  // } else {
  //   img.setAttribute('src', './assets/images/avatar.png');
  // }
}

function changeTheme(){
  const switchBtn = document.querySelector('#switch button');
  switchBtn.classList.add('animated');
  const currentTheme = rootHtml.getAttribute("data-theme");
  currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme", "dark")

  toggleTheme.classList.toggle("sun")
  toggleTheme.classList.toggle("moon")
}

toggleTheme.addEventListener("click", changeTheme);

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  })
})

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})

// Carrossel de imagens
let slideIndex = {};

function showSlides(n, carouselId) {
  const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-image');
  const dots = carousel.querySelectorAll('.dot');
  
  if (!slideIndex[carouselId]) slideIndex[carouselId] = 1;
  
  if (n > slides.length) slideIndex[carouselId] = 1;
  if (n < 1) slideIndex[carouselId] = slides.length;
  
  // Esconder todas as imagens
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Mostrar a imagem atual
  if (slides[slideIndex[carouselId] - 1]) {
    slides[slideIndex[carouselId] - 1].classList.add('active');
  }
  if (dots[slideIndex[carouselId] - 1]) {
    dots[slideIndex[carouselId] - 1].classList.add('active');
  }
}

function changeSlide(n, carouselId) {
  if (!slideIndex[carouselId]) slideIndex[carouselId] = 1;
  showSlides(slideIndex[carouselId] += n, carouselId);
}

function currentSlide(n, carouselId) {
  showSlides(slideIndex[carouselId] = n, carouselId);
}

// Modal para prévia das imagens
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  modalImg.src = imageSrc;
  modal.style.display = 'block';
  
  // Prevenir scroll do body
  document.body.style.overflow = 'hidden';
}

// Abrir modal a partir do carrossel
function openModalFromCarousel(imageSrc) {
  openModal(imageSrc);
}

// Abrir modal com a imagem atual do carrossel
function openModalFromCarouselCurrent() {
  const carousel = document.querySelector('[data-carousel="academia-digital"]');
  const activeImage = carousel.querySelector('.carousel-image.active');
  if (activeImage) {
    openModal(activeImage.src);
  }
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  
  // Restaurar scroll do body
  document.body.style.overflow = 'auto';
}

// Event listeners para o modal e carrossel
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar o carrossel da academia digital
  showSlides(1, 'academia-digital');
  
  // Auto-play do carrossel (opcional)
  setInterval(() => {
    if (slideIndex['academia-digital']) {
      changeSlide(1, 'academia-digital');
    }
  }, 5000); // Muda a cada 5 segundos
  
  // Modal event listeners
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.close');
  
  if (closeBtn) {
    // Fechar modal ao clicar no X
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Fechar modal com tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      closeModal();
    }
  });
});