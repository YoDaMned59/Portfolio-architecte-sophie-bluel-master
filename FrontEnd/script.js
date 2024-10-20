// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  if (!response.ok) {
      console.error('Erreur lors de la récupération des catégories');
      return []; // Retourne un tableau vide en cas d'erreur
  }
  return await response.json(); // Retourne les catégories
}

// Fonction pour récupérer les œuvres depuis l'API
async function fetchWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  if (!response.ok) {
      console.error('Erreur lors de la récupération des œuvres');
      return []; // Retourne un tableau vide en cas d'erreur
  }
  return await response.json(); // Retourne les œuvres
}

// Fonction d'initialisation qui récupère les données et crée les boutons
async function initialize() {
  const categories = await fetchCategories(); // Récupère les catégories
  const works = await fetchWorks(); // Récupère les œuvres
  createCategoryButtons(categories, works); // Crée les boutons de catégorie
  displayData(works); // Affiche toutes les œuvres par défaut
}

// Fonction pour créer des boutons de catégorie
function createCategoryButtons(categories, works) {
  const buttonContainer = document.getElementById('button-container');

  // Bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.addEventListener('click', () => displayData(works)); // Affiche toutes les œuvres
  buttonContainer.appendChild(allButton);

  // Créer un bouton pour chaque catégorie
  categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name; // Nom de la catégorie
      button.addEventListener('click', () => filterData(works, category.id)); // Filtre par catégorie
      buttonContainer.appendChild(button);
  });
}

// Fonction pour afficher les données dans le conteneur
function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Vide le conteneur avant d'afficher de nouvelles données

  if (data.length === 0) {
      container.textContent = "Aucune œuvre à afficher."; // Message si aucune œuvre
      return;
  }

  // Créer et afficher les œuvres
  data.forEach(item => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = item.imageUrl; // URL de l'image
      img.alt = item.title; // Titre comme texte alternatif
      figure.appendChild(img);

      const caption = document.createElement('figcaption');
      caption.textContent = item.title; // Titre de l'œuvre
      figure.appendChild(caption);

      container.appendChild(figure); // Ajoute l'œuvre au conteneur
  });
}

// Fonction pour filtrer les œuvres par catégorie
function filterData(data, categoryId) {
  const filteredData = categoryId === 'all' ? data : data.filter(item => item.categoryId === categoryId);
  displayData(filteredData); // Affiche les œuvres filtrées
}

// Initialiser l'application
initialize();

// Gestion de la connexion/déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const authButton = document.getElementById('auth-button');

  // Vérifie si l'utilisateur est connecté
  if (localStorage.getItem('authToken')) {
      authButton.textContent = 'Logout'; // Change le texte en Logout
      authButton.href = 'javascript:void(0);'; // Empêche la redirection
  }

  // Clic sur le bouton de connexion/déconnexion
  authButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (authButton.textContent === 'Logout') {
          logout(); // Déconnexion
      } else {
          window.location.href = 'login.html'; // Redirection vers la page de connexion
      }
  });
});

// Fonction pour gérer la déconnexion
function logout() {
  localStorage.removeItem('authToken'); // Supprime le token
  const authButton = document.getElementById('auth-button');
  authButton.textContent = 'Login'; // Remet le texte à Login
  authButton.href = 'login.html'; // Redirection vers la page de connexion
}





