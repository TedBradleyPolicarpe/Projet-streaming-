# 🎬 Plateforme de Streaming 

> L’objectif : démontrer mes compétences en **React**, intégration d’API et conception d’une application complète de type **Netflix / Crunchyroll**, **sans streaming réel** (pour des raisons légales).

---

## 🧩 Description du projet

Cette application simule une plateforme de streaming où les utilisateurs peuvent :

- Consulter des séries, saisons et épisodes.
- Explorer les fiches d’artistes.
- Naviguer avec une pagination fluide.
- Tester un système d’authentification simple.

L’API utilisée :
👉 **[`https://tvshowdbapi.herokuapp.com`](https://tvshowdbapi.herokuapp.com)**

Le but n’est pas de diffuser de vraies vidéos, mais de **montrer ma capacité à intégrer des données externes** et à construire une interface moderne et réactive avec React.

---

## ⚙️ Technologies utilisées

- **React** (Vite)
- **JavaScript (ES6+)**
- **HTML / CSS**
- **Context API** pour la gestion d’état utilisateur
- **API REST** externe (TV Show DB)

---

## 🚀 Installation et exécution du projet

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/<ton-nom-utilisateur>/<nom-du-projet>.git
cd <nom-du-projet>
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Lancer le serveur de développement

```bash
npm run dev
```

L’application sera accessible à l’adresse :

```
http://localhost:5173/
```

_(ou selon le port affiché dans la console)_

---

## 👤 Compte de démonstration

Si vous ne souhaitez pas créer un compte, vous pouvez utiliser les identifiants suivants pour tester directement l’application :

- **Nom d’utilisateur** : `e61234567`
- **Mot de passe** : `e61234567`

---

## 🧠 Objectif pédagogique

Il a pour but :

- De mettre en pratique les notions de **React moderne (hooks, context, props)**.
- De démontrer la **capacité à intégrer une API REST externe**.
- De montrer la **structuration propre d’un projet front-end complet**.

---

## 🧰 Commandes utiles

| Commande          | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm install`     | Installe les dépendances                     |
| `npm run dev`     | Lance le serveur local de développement      |
| `npm run build`   | Crée la version optimisée pour la production |
| `npm run preview` | Prévisualise la version buildée              |

---

## 🐞 Dépannage

- **Erreur de port** : vérifier si un autre service utilise le même port (5173 par défaut).
- **Erreur d’API** : si `tvshowdbapi.herokuapp.com` ne répond pas, essayer plus tard ou tester avec une autre API publique.
- **Problèmes de dépendances** : supprimer `node_modules` + `package-lock.json` puis relancer `npm install`.

---

## 📄 Licence MIT

```
MIT License

Copyright (c) 2025 Ted Bradley Policarpe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---
