import { createRecipeArticles } from "../templates/createRecipeArcticles.js";
import { populateZoneLists } from "./populateZoneLists.js";
import { FilterBySelectedItems } from "./filterBySelectedItems.js";
import { clearInput } from "./clearInput.js";
import { removeAccents } from "./removeAccents.js";
import { mylog } from "../params/handleConsoleLog.js";


// Exporter la variable filteredRecipes
export let filteredRecipes = [];

// Fonction pour filtrer les recettes en fonction de la recherche
function filterRecipes(recipes, query) {
    mylog("début filterRecipes", recipes);

    // Désinfecter et normaliser la requête
    const sanitizedQuery = clearInput(query); // Désinfection
    const normalizedQuery = removeAccents(sanitizedQuery); // Suppression des accents

    // Convertir la requête en mots, en gardant ceux de 3 caractères ou plus
    const queryWords = [];
    const words = normalizedQuery.toLowerCase().split(" ");
    
    for (let i = 0; i < words.length; i++) {
        if (words[i].length >= 3) {
            queryWords.push(words[i]);
        }
    }

    // Filtrer les recettes
    const filteredRecipes = [];

    for (let j = 0; j < recipes.length; j++) {
        const recipe = recipes[j];
        const name = recipe.name ? removeAccents(recipe.name.toLowerCase()) : '';
        const description = recipe.description ? removeAccents(recipe.description.toLowerCase()) : '';

        let ingredients = '';
        for (let k = 0; k < recipe.ingredients.length; k++) {
            ingredients += removeAccents(recipe.ingredients[k].ingredient.toLowerCase()) + ' ';
        }

        const appliance = recipe.appliance ? removeAccents(recipe.appliance.toLowerCase()) : '';

        let ustensils = '';
        for (let l = 0; l < recipe.ustensils.length; l++) {
            ustensils += removeAccents(recipe.ustensils[l].toLowerCase()) + ' ';
        }

        let allWordsMatch = true;
        for (let m = 0; m < queryWords.length; m++) {
            const word = queryWords[m];
            if (!(name.includes(word) || description.includes(word) ||
                ingredients.includes(word) || appliance.includes(word) || ustensils.includes(word))) {
                allWordsMatch = false;
                break;
            }
        }

        if (allWordsMatch) {
            filteredRecipes.push(recipe);
        }
    }

    mylog("fin filterRecipes", filteredRecipes);
    return filteredRecipes;
}


// Fonction pour mettre à jour l'affichage des recettes et des listes
export function updateRecipeDisplay(recipes) {
    createRecipeArticles(recipes);  // Affiche les recettes filtrées
    populateZoneLists(recipes); // Met à jour les listes de sélection
}

// Fonction pour gérer les changements dans la barre de recherche
export function handleSearchInput(event, allRecipes) {
    const query = event.target.value.trim();
    if (query.length >= 3) {
        // Filtrer les recettes en fonction de la recherche
        filteredRecipes = filterRecipes(allRecipes, query);
        mylog("dans handleSearchInput filteredRecipes", filteredRecipes);

        // Appliquer le filtre par les éléments sélectionnés après le filtrage de la recherche
        FilterBySelectedItems();

    } else {
        // Réinitialiser les recettes filtrées à toutes les recettes
        filteredRecipes = [...allRecipes];

        // Appliquer le filtre par les éléments sélectionnés même si la recherche est vide
        FilterBySelectedItems();
    }
}

// Fonction pour configurer les événements de recherche
export function ListenerSearchEvents(recipesData) {
    // Ajouter un écouteur d'événements pour la barre de recherche
    const searchInput = document.getElementById('mainsearch');
    searchInput.addEventListener('input', function (event) {
        handleSearchInput(event, recipesData);
    });

    // Ajouter un écouteur d'événements pour le bouton de recherche
    const form = document.querySelector(".formSearch");
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher la soumission du formulaire
        handleSearchInput({ target: searchInput }, recipesData); // Effectuer la recherche sur la soumission
    });
}

