// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
        console.error('Erreur lors de la récupération des catégories');
        return []
    }
    return await response.json()
  }
  
  // Fonction pour récupérer les œuvres depuis l'API
  async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
        console.error('Erreur lors de la récupération des œuvres');
        return []
    }
    return await response.json()
  }
  
  // Fonction d'initialisation qui récupère les données et crée les boutons
  async function initialize() {
    const categories = await fetchCategories()
    const works = await fetchWorks()
    createCategoryButtons(categories, works)
    displayData(works)
  }
  
  // Fonction pour créer des boutons de catégorie
  function createCategoryButtons(categories, works) {
    const buttonContainer = document.getElementById('button-container')
  
    // Bouton "Tous"
    const allButton = document.createElement('button')
    allButton.textContent = 'Tous'
    allButton.addEventListener('click', () => displayData(works))
    buttonContainer.appendChild(allButton);
  
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
    const container = document.getElementById('data-container');
    container.innerHTML = ''
  
    if (data.length === 0) {
        container.textContent = "Aucune œuvre à afficher."
        return
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
    })
  }
  
  // Fonction pour filtrer les œuvres par catégorie
  function filterData(data, categoryId) {
    const filteredData = categoryId === 'all' ? data : data.filter(item => item.categoryId === categoryId);
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
        event.preventDefault();
        if (authButton.textContent === 'Logout') {
            logout()
        } else {
            window.location.href = 'login.html'
        }
    });
  });
  
  // Fonction pour gérer la déconnexion
  function logout() {
    localStorage.removeItem('authToken')
    const authButton = document.getElementById('auth-button');
    authButton.textContent = 'Login'
    authButton.href = 'login.html'
  }

  ////////////////////////////////////////////

  // Écoute l'événement DOMContentLoaded pour s'assurer que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm')
    const errorMessage = document.getElementById('error-message')
    const editModeDiv = document.querySelector('.edit'); // Sélectionne la div de mode édition

    // Vérifie si l'utilisateur est déjà connecté
    if (localStorage.getItem('authToken')) {
        window.location.href = 'index.html';

    // Vérifie si le formulaire de connexion existe
    if (loginForm) {
        // Ajoute un écouteur d'événements pour la soumission du formulaire
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Empêche la soumission par défaut

            // Récupère les valeurs des champs email et mot de passe
            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;

            try {
                // Envoie les informations de connexion à l'API
                const response = await fetch('http://localhost:5678/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Spécifie le type de contenu
                        'Accept': 'application/json', // Accepte le format JSON en réponse
                    },
                    body: JSON.stringify({ email, password }), // Convertit les données en JSON
                });

                const responseData = await response.json(); // Récupère les données de la réponse

                // Vérifie si la réponse indique une erreur
                if (!response.ok) {
                    throw new Error(responseData.message || 'Mot de passe invalide');
                }

                // Stocke le token d'authentification dans localStorage
                localStorage.setItem('authToken', responseData.token);

                // Redirige vers la page d'accueil après une connexion réussie
                window.location.href = 'index.html';

            } catch (error) {
                // Affiche le message d'erreur
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        });
    } else {
        console.error('Le formulaire de connexion n\'a pas été trouvé.');
    }
});
