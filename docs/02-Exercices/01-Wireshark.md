# Découvrir Wireshark

## Objectifs

À la fin de cet exercice, vous serez capables de :

- Installer Wireshark sur votre ordinateur.
- Sélectionner une interface réseau et démarrer une capture.
- Utiliser des filtres d'affichage pour retrouver certains paquets.
- Identifier les principales informations des couches Ethernet, IPv4 et ICMP.
- Comprendre comment les données sont encapsulées lors d'une communication réseau.

## Installation de Wireshark

Wireshark est un logiciel d'analyse du trafic réseau. Il permet de capturer les paquets échangés sur une interface réseau et d'examiner leur contenu.

Rendez-vous sur le [site officiel Wireshark](https://www.wireshark.org/download.html) pour le télécharger.
Choisissez la version correspondant à votre système d'exploitation et consultez 
[le guide officiel d'installation Windows, macOS et Linux](https://www.wireshark.org/docs/wsug_html/#ChIntroDownload). Prêtez attention aux droits que vous donnez suivants votre OS : 

- **Windows 10 / 11** : télécharger et exécuter l'installateur Windows. Conservez les options proposées par défaut et acceptez l'installation de Npcap, nécessaire à la capture des paquets.
- **macOS** : installer Wireshark depuis le fichier téléchargé. Pour capturer le trafic, il faut également installer le composant ChmodBPF fourni avec le paquet d'installation.
- **Ubuntu** : installer Wireshark depuis les dépôts de la distribution. Lors de l'installation, la possibilité d'autoriser les utilisateurs non administrateurs à capturer les paquets peut être proposée. Si nécessaire, cette autorisation devra être configurée.

:::warning Attention aux droits d'accès
L'installation du logiciel ne garantit pas automatiquement que vous disposez des droits nécessaires pour capturer le trafic réseau. Si aucune interface ne permet de démarrer une capture, vérifiez les droits d'accès et les composants nécessaires à votre système.
:::

### Vérifier l'installation

1. Démarrez Wireshark.
2. Vérifiez que plusieurs interfaces réseau sont proposées (Wi-Fi, Ethernet, ...).
3. Identifiez l'interface correspondant à votre connexion active.

Vous êtes maintenant prêts à réaliser une première capture.

### Ressource pour apprendre à utiliser les filtres

Consultez le tutoriel ci-dessous ou la documentation officielle concernant l'utilisation des filtres dans Wireshark : 

- [Tutoriel vidéo](https://www.youtube.com/watch?v=uEa1HLQRsfQ)
- [Documentation officielle sur les filtres d'affichage](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDisplayFilterSection.html)

L'objectif n'est pas de mémoriser tous les filtres, mais de savoir retrouver rapidement les paquets correspondant à un protocole ou à une adresse IP.

## Première capture : analyser une communication ICMP

Nous allons capturer une communication réseau générée par la commande `ping`.
Cette commande permet de tester l'accessibilité d'un équipement sur un réseau IP.
Nous allons envoyer plusieurs messages ICMP vers l'adresse IP `1.1.1.1`.

### Étape 1 : démarrer une capture

1. Ouvrez Wireshark.
2. Identifiez l'interface réseau actuellement utilisée (Wi-Fi ou Ethernet).
3. Double-cliquez sur cette interface pour démarrer la capture.

Wireshark commence à enregistrer les paquets qui circulent sur cette interface.

### Étape 2 : générer du trafic réseau

Ouvrez un terminal ou une invite de commandes.
Exécutez la commande correspondant à votre système :

**Windows :**

```bash
ping -n 4 1.1.1.1
```

**macOS / Ubuntu :**

```bash
ping -c 4 1.1.1.1
```

Cette commande envoie quatre demandes ICMP vers l'adresse IP `1.1.1.1`.

:::note Remarque
Si aucune réponse n'est reçue, cela ne signifie pas nécessairement que Wireshark ne fonctionne pas.

Certains réseaux ou équipements filtrent les messages ICMP. Dans ce cas, les demandes peuvent être visibles dans la capture sans qu'une réponse soit reçue.
:::

### Étape 3 : arrêter la capture et appliquer un filtre

1. Revenez dans Wireshark.
2. Arrêtez la capture à l'aide du bouton Stop.
3. Dans la barre des filtres d'affichage, saisissez :

```text
icmp
```

Wireshark n'affiche maintenant que les paquets ICMP.

Vous devriez notamment retrouver :

- Des messages **Echo Request** : demandes envoyées par votre ordinateur.
- Des messages **Echo Reply** : réponses reçues de la destination, si celle-ci répond.

### Étape 4 : analyser un paquet

Sélectionnez un paquet de type Echo Request.

Dans la zone des détails, développez successivement les sections suivantes :

- Ethernet II
- Internet Protocol Version 4
- Internet Control Message Protocol

Vous pouvez retrouver les informations suivantes :

| Couche | Informations à observer | Exemple |
|---|---|---|
| Ethernet | Adresse MAC source | Adresse MAC de votre interface réseau |
| Ethernet | Adresse MAC destination | MAC de la passerelle si la destination est distante |
| IPv4 | Adresse IP source | Adresse IP de votre ordinateur |
| IPv4 | Adresse IP destination | `1.1.1.1` |
| IPv4 | Protocole | ICMP (valeur 1) |
| IPv4 | TTL | Valeur initiale dépendant du système |
| ICMP | Type | 8 pour Echo Request |
| ICMP | Code | 0 |
| ICMP | Identifiant et séquence | Informations permettant d'associer les demandes et les réponses |

### Étape 5 : comprendre l'encapsulation

Un message `ping` permet d'illustrer l'encapsulation des données.

Dans notre exemple, le message ICMP est transporté directement dans un paquet IPv4, lui-même transporté dans une trame Ethernet.

```text
┌──────────────────────────────────────┐
│ Trame Ethernet                       │
│                                      │
│  MAC source                          │
│  MAC destination                     │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Paquet IPv4                    │  │
│  │                                │  │
│  │  IP source                     │  │
│  │  IP destination                │  │
│  │  Protocole : ICMP              │  │
│  │                                │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │ Message ICMP             │  │  │
│  │  │                          │  │  │
│  │  │ Type : Echo Request      │  │  │
│  │  │ Code : 0                 │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

Chaque couche ajoute des informations nécessaires à la transmission et à l'interprétation des données.

:::info À retenir
Dans cet exemple, ICMP est directement transporté par IPv4.

Il n'y a donc pas de segment TCP ou de datagramme UDP entre IPv4 et ICMP. Les messages ICMP ne possèdent pas non plus de ports TCP ou UDP.
:::

:::warning Attention à l'adresse MAC destination
Dans cet exercice, `1.1.1.1` est une adresse située sur Internet.

Votre ordinateur transmet donc généralement la trame Ethernet à sa passerelle par défaut. L'adresse MAC destination observée dans Wireshark est celle de cette passerelle, et non celle du serveur `1.1.1.1`.

L'adresse IP destination reste cependant `1.1.1.1`.
:::

## Travail à réaliser

À partir de votre capture Wireshark, répondez aux questions suivantes.

1. Quel est le nom de l'interface réseau utilisée pour la capture ?
2. Combien de paquets ICMP avez-vous capturés ?
3. Quelle est l'adresse IPv4 source de votre ordinateur ?
4. Quelle est l'adresse IPv4 destination ?
5. Quelle est l'adresse MAC source de la trame Ethernet ?
6. Quelle est l'adresse MAC destination ?
7. Quelle est la valeur du champ Protocol dans l'en-tête IPv4 ?
8. Quelle est la valeur du champ TTL ?
9. Quel est le type du message ICMP envoyé ?

Ces manipulations seront réutilisées dans les prochains exercices pour analyser des communications réseau et des protocoles industriels.
