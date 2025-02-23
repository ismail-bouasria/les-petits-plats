// Fonction pour supprimer les accents d'une chaîne
export function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
