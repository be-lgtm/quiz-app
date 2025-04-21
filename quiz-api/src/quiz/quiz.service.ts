import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {

      private questions = [
  {
  
    "question": "Quel concept POO permet de cacher les détails d'implémentation d'une classe ?",
    "answers": [ "Héritage", "Polymorphisme","Encapsulation", "Abstraction"],
    "correct": "Encapsulation"
  },
  {
    
    "question": "Quelle est la différence entre héritage simple et multiple ?",
    "answers": [
      "L’héritage simple existe uniquement en JavaScript",
      "Une classe hérite d’une seule vs plusieurs classes",
      "Héritage multiple est un polymorphisme avancé",
      "Aucune différence "
    ],
    "correct": "Une classe hérite d’une seule vs plusieurs classes"
  },
  {
   
    "question": "Quel mot-clé est utilisé pour déclarer une variable en JavaScript ?",
    "answers": ["var", "let", "const", "Toutes ces réponses"],
    "correct": "Toutes ces réponses"
  },
  {
    
    "question": "Que retourne typeof null en JavaScript ?",
    "answers": ["null", "object", "undefined", "number"],
    "correct": "object"
  },
  {
    
    "question": "Quel mot-clé en Java est utilisé pour définir une classe ?",
    "answers": [ "interface","class", "public", "extends"],
    "correct": "class"
  },
  {
    "question": "Différence entre == et equals() en Java?",
    "answers": [
      "== compare les références, equals() compare les valeurs",
      "equals() est plus rapide",
      "== compare uniquement des nombres",
      "Aucune différence"

    ],
    "correct": "== compare les références, equals() compare les valeurs"
  },
  {
    
    "question": "Quel symbole est utilisé pour l'opérateur d'accès aux membres en C++ ?",
    "answers": ["->", "::", "&", "."],
    "correct": "."
  },
  {
   
    "question": "Différence entre struct et class en C++?",
    "answers": [
      "struct → membres publics par défaut, class → privés",
       "class est pour les interfaces",
      "struct ne peut pas contenir de fonctions",
      "Aucune différence"
    ],
    "correct": "struct → membres publics par défaut, class → privés"
  },
  {
   
    "question": "Quel élément HTML est utilisé pour créer un lien hypertexte ?",
    "answers": ["<link>", "<href>", "<a>", "<button>"],
    "correct": "<a>"
  },
  {
   
    "question": "Que signifie HTML ?",
    "answers": [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Markup Language",
      "Hyperlink Text Management Language"
    ],
    "correct": "HyperText Markup Language"
  },
  {
  
    "question": "Quelle propriété CSS est utilisée pour changer la couleur du texte ?",
    "answers": ["color", "background-color", "text-style", "font-color"],
    "correct": "color"
  },
  {
  
    "question": "Effet de position: absolute; en CSS ?",
    "answers": [
      "Positionné par rapport à son parent positionné",
      "Par rapport à la fenêtre du navigateur",
      "Centré dans la page",
      "Suit le défilement de la page"
    ],
    "correct": "Positionné par rapport à son parent positionné"
  },
  {
    
    "question": "Différence entre let et var en JavaScript ?",
    "answers": [
      "let est plus rapide que var",
      "var ne peut pas être réassigné",
      "let a une portée bloc, var a une portée fonction",
      "let est obsolète"
    ],
    "correct": "let a une portée bloc, var a une portée fonction"
  },
  {
   
    "question": "Rôle de la balise <meta charset='UTF-8'> ?",
    "answers": [
      "Définit la langue du site",
      "Améliore le SEO",
      "Rend le site plus rapide",
      "Définit l'encodage en UTF-8"
    ],
    "correct": "Définit l'encodage en UTF-8"
  },
  {
    
    "question": "Que fait INNER JOIN en SQL ?",
    "answers": [
      "Retourne toutes les lignes de la première table",
      "Renvoie les lignes communes des deux tables",
      "Supprime  les doublons d’une table",
      "Fusionne deux bases de données"
    ],
    "correct": "Renvoie les lignes communes des deux tables"
  }
];
      getAllQuestions() {
        return this.questions;
      }
    

}