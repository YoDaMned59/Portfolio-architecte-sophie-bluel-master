// Écoute l'événement DOMContentLoaded pour s'assurer que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm'); // Sélectionne le formulaire de connexion
    const errorMessage = document.getElementById('error-message'); // Sélectionne l'élément pour afficher les erreurs

    // Vérifie si l'utilisateur est déjà connecté
    if (localStorage.getItem('authToken')) {
        window.location.href = 'index.html'; // Redirige vers la page d'accueil si connecté
    }

    // Vérifie si le formulaire de connexion existe
    if (loginForm) {
        // Ajoute un écouteur d'événements pour la soumission du formulaire
        loginForm.addEventListener('submit', async function(event) {
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
                    throw new Error(responseData.message || 'Mot de passe invalide'); // Affiche un message d'erreur
                }

                // Stocke le token d'authentification dans localStorage
                localStorage.setItem('authToken', responseData.token);

                // Redirige vers la page d'accueil après une connexion réussie
                window.location.href = 'index.html';

            } catch (error) {
                // Affiche le message d'erreur
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block'; // Affiche l'élément d'erreur
            }
        });
    } else {
        console.error('Le formulaire de connexion n\'a pas été trouvé.'); // Message d'erreur si le formulaire n'existe pas
    }
});