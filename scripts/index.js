import Api from "../api/Api.js";

const recipesApi = new Api("./data/recipes.json");

export let recipesData = [];
mylog("avant init index.js", recipesData);


// Fonction d'initialisation de l'application
async function init() {
    try {
        recipesData = await recipesApi.get();
        mylog("début init index.js", recipesData);

        clearButtonMainSearch();

        // Afficher toutes les recettes initialement
        handleSearchInput({ target: { value: "" } }, recipesData);

        // Ecouter les événements de recherche
        ListenerSearchEvents(recipesData);

        FilterBySelectedItems();

    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application :", error);
    }
};

// Appel des fonctions lors de l'initialisation
init();

