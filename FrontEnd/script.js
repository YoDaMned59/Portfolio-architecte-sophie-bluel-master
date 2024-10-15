// Requête fetch pour récupérer les données depuis l'API
fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    // Appel de la fonction pour afficher les données dans le HTML
    afficherWorks(data)
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error)
  });

// Fonction pour afficher les données dans le DOM
function afficherWorks(works) {
  const worksList = document.getElementById('works-list')
  
  // Pour chaque "work", créer un élément HTML (figure) et l'ajouter au DOM
  works.forEach(work => {
    const figure = document.createElement('figure')
    
    // Ajoute une image avec la source de l'API et le texte alternatif
    const img = document.createElement('img')
    img.src = work.imageUrl
    img.alt = work.title

    // Crée un figcaption avec le titre du projet
    const figcaption = document.createElement('figcaption')
    figcaption.textContent = work.title

    // Ajoute l'image et la légende à la figure
    figure.appendChild(img)
    figure.appendChild(figcaption)
    worksList.appendChild(figure)
  })
}
