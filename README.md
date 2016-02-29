# Democratie_Liquide_Front
Client web de l'application de Democratie Liquide

![](/src/images/vote.png?raw=true)

>Créez des sujets que vous voulez soumettre au vote et ...  
>**More will come soon**

Ce front n'est rien sans son api. Elle se trouve ici -> [liquid-democracy-api](https://github.com/ZenikaOuest/Democratie_Liquide)

## Démarrer l'application

Comme pour n'importe quel projet Javascript : Installer le projet avec `npm install`

Il faut ensuite builder le projet : `ǹpm run build`
Pour builder un code optimisé (pas de sourcemap, source minifiées) ajouter l'argument `release` : `npm run build release`.

Une fois celà effectué, le résultat du build se trouve dans le dossier `build/`.

Il suffit maintenant de servir l'application avec votre serveur web préféré. **Ne pas oublier de configurer le revers-proxy vers l'api afin de gérer le CORS**

Avec [http-server](https://github.com/indexzero/http-server):
```sh 
http-server build -P http://your_api_location
```

## Développer sur l'application

Cette application est construite en [React](https://github.com/facebook/react) grace au librairies :
 - [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
 - [react-router](https://github.com/reactjs/react-router)
 - [react-markdown](https://github.com/rexxars/react-markdown)

Codé en ES2015 la transpilation est transpilé par [babel](https://github.com/babel/babel) et le bundle est généré par [webpack](https://github.com/webpack)
La build est configuré par quelques scripts js qui sont dans le répertoire `tools/`

Piur démarer l'application en mode dev exécuter la commande `npm start`
