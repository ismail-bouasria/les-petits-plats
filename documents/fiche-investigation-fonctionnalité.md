Le **Green Code**  vise à écrire du code plus efficace, consommant moins de ressources. Entre tes deux implémentations :

1. **Boucles natives (for, while, etc.)**  
   ✅ **Avantages :**  
   - Exécution plus rapide car plus proche du langage machine.  
   - Moins gourmand en mémoire.  
   - Pas de surcharge liée aux méthodes de haut niveau comme `map`, `filter`, etc.  
   
   ❌ **Inconvénients :**  
   - Code souvent plus verbeux et moins lisible.  
   - Risque d'erreurs plus élevé (index mal géré, oubli de sortie de boucle, etc.).  

2. **Programmation fonctionnelle (`map`, `filter`, `reduce`)**  
   ✅ **Avantages :**  
   - Code plus concis et lisible.  
   - Facilité de maintenance et de réutilisation.  
   - Exploite mieux la nature déclarative de JavaScript.  

   ❌ **Inconvénients :**  
   - Moins performant pour de grands tableaux (chaînage des méthodes crée des tableaux intermédiaires).  
   - Plus gourmand en mémoire et CPU.  

### **Verdict :**
- **Si l’objectif principal est la performance pure et l’optimisation énergétique**, les boucles natives sont meilleures en **Green Code**.  
- **Si l’objectif est la lisibilité et la maintenabilité à long terme**, la programmation fonctionnelle peut être un bon choix, mais il faut limiter les traitements inutiles (éviter les `.map().filter()` chaînés sans nécessité).  

Un bon compromis pourrait être une **implémentation hybride** : utiliser des boucles natives pour les tâches critiques et les méthodes fonctionnelles là où elles apportent un vrai gain en lisibilité. 🚀