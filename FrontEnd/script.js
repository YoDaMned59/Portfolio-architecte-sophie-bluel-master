async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories')
    }
    const categories = await response.json()
    console.log('Catégories récupérées:', categories)
    return categories
  } catch (error) {
    console.error('Erreur:', error)
  }
}

async function fetchWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des œuvres')
    }
    const works = await response.json()

    return works
  } catch (error) {
    console.error('Erreur:', error)
  }
}

async function initialize() {
  const categories = await fetchCategories()
  const works = await fetchWorks()
  createCategoryButtons(categories, works)
  displayData(works)
}

function createCategoryButtons(categories, works) {
  const buttonContainer = document.getElementById('button-container')

  // Ajouter un bouton "Tous" pour afficher toutes les images en premier
  const allButton = document.createElement('button')
  allButton.textContent = 'Tous'
  allButton.setAttribute('data-category', 'all')
  allButton.addEventListener('click', () => displayData(works))
  buttonContainer.appendChild(allButton)

  // Créer un bouton pour chaque catégorie
  categories.forEach(category => {
    const button = document.createElement('button')
    button.textContent = category.name
    button.setAttribute('data-category', category.id)

    // Écouteur d'événement pour filtrer les images par catégorie
    button.addEventListener('click', () => {
      filterData(works, category.id)
    });
    buttonContainer.appendChild(button)
  })
}

function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''

  if (data.length === 0) {
    const message = document.createElement('p')
    message.textContent = "Aucune œuvre à afficher pour cette catégorie."
    container.appendChild(message)
    return
  }

  data.forEach(item => {
    // Créer un élément figure pour chaque image
    const figure = document.createElement('figure')

    // Affichage de l'image de l'élément
    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title 
    figure.appendChild(img)

    // Affichage du titre de l'élément comme légende
    const caption = document.createElement('figcaption');
    caption.textContent = item.title
    figure.appendChild(caption)

    container.appendChild(figure)
  });
}

function filterData(data, categoryId) {
  // Filtrer les œuvres en fonction de l'ID de la catégorie
  const filteredData = categoryId === 'all' ? data : data.filter(item => {
    return item.categoryId === categoryId; // Comparer avec categoryId
  })
  displayData(filteredData);
}

// Initialiser l'application
initialize()







