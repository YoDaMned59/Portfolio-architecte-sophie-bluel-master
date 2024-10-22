// Écoute l'événement DOMContentLoaded pour s'assurer que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm')
    const errorMessage = document.getElementById('error-message')
    const editModeDiv = document.querySelector('.edit')

    // Vérifie si l'utilisateur est déjà connecté
    if (localStorage.getItem('authToken')) {
        window.location.href = 'index.html'
    }
    // Vérifie si le formulaire de connexion existe
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault()

            // Récupère les valeurs des champs email et mot de passe
            const email = document.getElementById('email').value
            const password = document.getElementById('pass').value

            try {
                // Envoie les informations de connexion à l'API
                const response = await fetch('http://localhost:5678/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                })

                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message || 'Mot de passe invalide')
                }

                // Stocke le token d'authentification dans localStorage
                localStorage.setItem('authToken', responseData.token)

                // Redirige vers la page d'accueil après une connexion réussie
                window.location.href = 'index.html'

            } catch (error) {
                // Affiche le message d'erreur
                errorMessage.textContent = error.message
                errorMessage.style.display = 'block'
            }
        })
    } else {
        console.error('Le formulaire de connexion n\'a pas été trouvé.')
    }
})