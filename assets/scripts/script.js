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