// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories')
  if (!response.ok) {
      console.error('Erreur lors de la récupération des catégories')
      return []
  }
  return await response.json()
}

// Fonction pour récupérer les œuvres depuis l'API
async function fetchWorks() {
  const response = await fetch('http://localhost:5678/api/works')
  if (!response.ok) {
      console.error('Erreur lors de la récupération des œuvres')
      return []
  }
  return await response.json()
}

// Fonction d'initialisation qui récupère les données et crée les boutons
async function initialize() {
  const categories = await fetchCategories()
  const works = await fetchWorks();
  createCategoryButtons(categories, works)
  displayData(works)
  
  // Vérifie l'état de connexion de l'utilisateur
  const authToken = localStorage.getItem('authToken')
  toggleEditDiv(authToken);
}

// Fonction pour créer des boutons de catégorie
function createCategoryButtons(categories, works) {
  const buttonContainer = document.getElementById('button-container')

  // Bouton "Tous"
  const allButton = document.createElement('button')
  allButton.textContent = 'Tous'
  allButton.addEventListener('click', () => displayData(works))
  buttonContainer.appendChild(allButton)

  // Créer un bouton pour chaque catégorie
  categories.forEach(category => {
      const button = document.createElement('button')
      button.textContent = category.name
      button.addEventListener('click', () => filterData(works, category.id))
      buttonContainer.appendChild(button)
  });
}

// Fonction pour afficher les données dans le conteneur
function displayData(data) {
  const container = document.getElementById('data-container')
  container.innerHTML = ''

  if (data.length === 0) {
      container.textContent = "Aucune œuvre à afficher."
      return;
  }

  // Créer et afficher les œuvres
  data.forEach(item => {
      const figure = document.createElement('figure')
      const img = document.createElement('img')
      img.src = item.imageUrl
      img.alt = item.title
      figure.appendChild(img)

      const caption = document.createElement('figcaption')
      caption.textContent = item.title
      figure.appendChild(caption)

      container.appendChild(figure)
  });
}

// Fonction pour filtrer les œuvres par catégorie
function filterData(data, categoryId) {
  const filteredData = categoryId === 'all' ? data : data.filter(item => item.categoryId === categoryId)
  displayData(filteredData)
}

// Initialiser l'application
initialize()

// Gestion de la connexion/déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const authButton = document.getElementById('auth-button')

  // Vérifie si l'utilisateur est connecté
  if (localStorage.getItem('authToken')) {
      authButton.textContent = 'Logout'
      authButton.href = 'javascript:void(0);'
  }

  // Clic sur le bouton de connexion/déconnexion
  authButton.addEventListener('click', (event) => {
      event.preventDefault()
      if (authButton.textContent === 'Logout') {
          logout()
      } else {
          window.location.href = 'login.html'
      }
  })
})

// Fonction pour gérer la déconnexion
function logout() {
  localStorage.removeItem('authToken')
  const authButton = document.getElementById('auth-button')
  authButton.textContent = 'Login'
  authButton.href = 'login.html'

  // Appeler la fonction pour cacher la div d'édition
  toggleEditDiv(null)
}

// Fonction pour afficher ou cacher la div d'édition
function toggleEditDiv(authToken) {
  const editDiv = document.querySelector('.edit')
  if (editDiv) {
      if (authToken) {
          editDiv.classList.remove('hidden')
      } else {
          editDiv.classList.add('hidden')
      }
  }
}







