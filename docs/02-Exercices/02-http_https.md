import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTTP et HTTPS

Lorsqu'un ordinateur consulte une page web, il échange des informations avec un serveur distant en utilisant des protocoles de communication.
Deux protocoles sont couramment utilisés pour ces échanges :

- **HTTP** (*HyperText Transfer Protocol*) : protocole permettant l'échange de ressources web sans chiffrement.
- **HTTPS** (*HyperText Transfer Protocol Secure*) : version sécurisée de HTTP, utilisant le protocole TLS pour protéger les communications.

Vous allez utiliser **Wireshark** afin d'analyser les échanges réseau générés lors de la consultation de pages web.

L'objectif est de comprendre comment une requête HTTP est construite, comment elle est transportée sur le réseau et quelles différences apparaissent lorsqu'une communication utilise HTTPS.

## Introduction à curl

Pour consulter une page web, vous utilisez habituellement un navigateur (*browser*) comme Firefox.
Cependant, un navigateur possède différentes fonctionnalités (cache, extensions, paramètres de configuration,...) qui peuvent influencer les communications réseau et compliquer leur analyse.
Afin de mieux contrôler les requêtes générées et de simplifier leur observation dans Wireshark, nous allons utiliser un outil en ligne de commande : **curl**.

### Vérification de l'installation

Ouvrez une invite de commande (Windows) ou un terminal (Linux/macOS) et exécutez la commande suivante :

```bash
curl --version
```

Si le programme est installé, cette commande affiche sa version ainsi que les fonctionnalités disponibles.

Si curl n'est pas installé ou si la commande n'est pas reconnue, vous pouvez l'installer :

- **Windows :** https://curl.se/windows/
- **macOS :** installez-le avec Homebrew : `brew install curl`
- **Ubuntu :** `sudo apt install curl`

### Première utilisation de curl

Nous allons maintenant utiliser curl pour consulter une page web simple.
Dans votre terminal, exécutez la commande suivante :

```bash
curl -4 --http1.1 https://example.com
```

:::tip Remarques
curl est un client HTTP permettant d'envoyer des requêtes à un serveur web et d'afficher les réponses reçues. 
Contrairement à un navigateur, il n'interprète pas le code HTML pour afficher une page web : il affiche directement son contenu dans le terminal.

L'option -4 oblige la commande a utilisé le protocole IPV4 et non IPV6.

L'option http1.1 de la commande force l'utilisation de la version HTTP/1.1 comme protocole applicatif, au lieu de HTTP/2 ou HTTP/3, 
La version 1 de http facilite l'analyse des requêtes dans Wireshark grâce à son format textuel, 
contrairement à HTTP/2 (format binaire) et HTTP/3 (basé sur QUIC et UDP).
:::

### Transmission de paramètres dans une URL

Une URL peut contenir des paramètres permettant de transmettre des informations au serveur web.
Ces paramètres sont ajoutés à la suite de l'adresse de la ressource, après un caractère `?`.

Par exemple :

```text
https://example.com/?user=Martin&ville=Mons
```

Cette URL est composée de plusieurs éléments :

| Élément | Signification |
|---|---|
| `https://` | Protocole utilisé pour la communication |
| `example.com` | Nom de domaine du serveur |
| `/` | Ressource demandée (ici, la page d'accueil, mais on peut imaginer `/index`) |
| `?` | Indique le début des paramètres |
| `nom=Dupont` | Premier paramètre : nom = Dupont |
| `&` | Séparateur entre deux paramètres |
| `ville=Mons` | Deuxième paramètre : ville = Mons |

Pour tester cette fonctionnalité, exécutez la commande suivante dans votre terminal :

```bash
curl -4 --http1.1 "https://example.com/?user=Martin&ville=Mons"
```

:::warning Remarque
La page https://example.com est une page de test qui n'effectue aucune action avec les paramètres 
envoyés.
:::

## Observation d'une communication HTTP

1. Lancez Wireshark.
1. Sélectionnez l'interface réseau utilisée pour accéder à Internet (Wi-Fi ou Ethernet).
1. Démarrez une capture.
1. Consultez la page web via la commande `curl -4 --http1.1 "http://neverssl.com/?nom=Martin&ville=Mons"`
1. Attendez que la page soit complètement chargée.
1. Arrêtez la capture Wireshark.

:::warning Remarque
La page http://neverssl.com/ est une page qui n'utilise aucun protocole d'encryption.
Elle est parfaitement adaptée à une analyse du protocole http.
:::

### Analyse de la capture

Dans le champ de filtrage de Wireshark, saisissez :

```text
http
```

Ce filtre permet d'afficher les paquets contenant des informations HTTP reconnues par Wireshark.
Repérez une requête HTTP de type GET et sélectionnez-la.

Dans le panneau inférieur, développez successivement les différentes couches (Frame, Ethernet, Internet Protocol, Transmission Control Protocol et  Hypertext Transfer Protocol), et
tentez de répondre aux questions suivantes : 

1. Quelle est l'adresse IP source de la communication ?
2. Quelle est l'adresse IP de destination ?
3. Quelle est l'adresse MAC source ?
4. Quelle est l'adresse MAC de destination ?
5. Quel est le protocole de transport utilisé ?
6. Quel est le port source ?
7. Quel est le port de destination ?
8. Quelle méthode HTTP est utilisée pour demander la page web ?
9. Quelle ressource est demandée au serveur ?
10. Quelle version du protocole HTTP est utilisée ?
11. À quoi correspond le champ `Host` ?
12. Peut-on lire directement le contenu de la requête HTTP dans Wireshark ?
13. Retrouvez la réponse envoyée par le serveur.
14. Quel est le code de réponse HTTP ?
15. À quoi correspond ce code ?
16. Peut-on retrouver le contenu HTML de la page dans les données échangées ?
17. Dans quelle couche du modèle OSI se situe HTTP ?
18. Dans quelle couche se situe TCP ?
19. Dans quelle couche se situe IP ?
20. Expliquez comment la requête HTTP est encapsulée avant d'être transmise sur le réseau.

## Observation d'une communication HTTPS

Vous allez maintenant consulter un site web utilisant HTTPS.
Nous utiliserons l'adresse suivante : **https://example.com**

Contrairement à HTTP, HTTPS utilise un mécanisme de chiffrement afin de protéger les données échangées entre le client et le serveur.

1. Ouvrez une nouvelle capture Wireshark.
1. Sélectionnez la même interface réseau que précédemment.
1. Démarrez la capture.
1. Ouvrez votre navigateur Internet.
1. Consultez la page web via la commande `curl -4 --http1.1 "https://example.com/?nom=Martin&ville=Mons"`
1. Attendez que la page soit complètement chargée.
1. Arrêtez la capture.

### Analyse de la capture

Dans le champ de filtrage de Wireshark, saisissez :

```text
tls
```

Observez les différents paquets échangés entre votre ordinateur et le serveur.

Essayez notamment de repérer les messages suivants :

- Client Hello
- Server Hello
- Application Data

Ces messages interviennent dans l'établissement et l'utilisation d'une communication sécurisée TLS.

Tentez de répondre aux questions ci-dessous : 

1. Quel est le protocole de transport utilisé ?
1. Quel est le port de destination utilisé par le serveur web ?
1. Quelle différence observez-vous par rapport à la communication HTTP ?
1. Quel est le rôle du message `Client Hello` ?
1. Quel est le rôle du message `Server Hello` ?
1. Quel est le rôle du protocole TLS dans cette communication ?
1. Peut-on retrouver la méthode HTTP GET dans la capture ?
1. Peut-on retrouver directement les en-têtes HTTP ?
1. Peut-on lire le contenu HTML de la page web ?
1. Pourquoi ces informations ne sont-elles plus directement visibles ?
1. Quelles informations restent néanmoins visibles dans la capture Wireshark ?

## Comparaison HTTP / HTTPS

À partir de vos deux captures, complétez le tableau suivant.

| Critère | HTTP | HTTPS |
|---|---|---|
| Port de destination | | |
| Protocole de transport | | |
| Requête GET lisible ? | | |
| En-têtes HTTP lisibles ? | | |
| Contenu HTML lisible ? | | |
| Adresse IP de destination visible ? | | |
| Données applicatives chiffrées ? | | |
| Utilisation de TLS ? | | |