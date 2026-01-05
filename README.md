# Chiesa Luterana Confessionale d’Italia – Web Application

Questo progetto è una web application sviluppata come elaborato per l’esame di Sviluppo di Applicazioni Web (SAW).

L’applicazione fornisce un sito pubblico informativo e un pannello di amministrazione riservato ai pastori, con supporto ad autenticazione, database cloud, notifiche push e funzionalità Progressive Web App (PWA).

## Funzionalità principali

### Area pubblica
L’area pubblica è accessibile senza autenticazione e consente la visualizzazione dei contenuti informativi del sito, inclusi i sermoni e gli eventi. È presente un modulo di contatto che permette agli utenti di inviare messaggi ai pastori.

L’applicazione supporta la visualizzazione multilingua (italiano e inglese).

### Area amministrativa
L’area amministrativa è accessibile esclusivamente agli utenti autenticati con ruolo di pastore. Tramite il pannello di amministrazione è possibile:
- creare, modificare ed eliminare sermoni
- creare, modificare ed eliminare eventi
- visualizzare i messaggi ricevuti tramite il modulo di contatto
- gestire lo stato dei messaggi (letti/non letti)
- eliminare i messaggi ricevuti

Le rotte amministrative sono protette tramite un meccanismo di guard basato sull’autenticazione Firebase.

## Autenticazione e autorizzazione

L’autenticazione è gestita tramite Firebase Authentication.

Il ruolo dell’utente è memorizzato nella collezione `users` su Firestore. Solo gli utenti con ruolo `pastor` possono accedere alle funzionalità di amministrazione.

Le regole di sicurezza Firestore garantiscono che:
- solo i pastori possano creare, modificare o eliminare eventi e sermoni
- i messaggi di contatto siano leggibili e modificabili esclusivamente dal pastore destinatario
- gli utenti non autenticati possano inviare messaggi tramite il form di contatto

## Database

Il database è implementato tramite Firebase Firestore.

Collezioni utilizzate:
- users
- sermons
- events
- contactMessages
- pushTokens

Le regole di sicurezza sono definite nel file `firestore.rules` e distribuite tramite Firebase.

## Newsletter e notifiche push

L’applicazione include una funzionalità di newsletter basata su notifiche push web.

La newsletter è accessibile a tutti gli utenti, anche senza autenticazione. L’iscrizione avviene esclusivamente tramite azione esplicita dell’utente, nel rispetto delle policy del browser.

Il funzionamento è il seguente:
- l’utente clicca sul pulsante Newsletter nel footer
- il browser richiede il consenso per le notifiche
- in caso di consenso, il token Firebase Cloud Messaging viene salvato nella collezione `pushTokens`
- se l’utente risulta già iscritto, l’app evita la registrazione duplicata

La funzionalità è implementata tramite Firebase Cloud Messaging ed è predisposta per future estensioni.

## Progressive Web App

L’applicazione è implementata come Progressive Web App.

Sono presenti:
- Web App Manifest
- Service Worker generato tramite vite-plugin-pwa
- supporto all’installazione su desktop e dispositivi mobili
- navigazione offline con fallback
- aggiornamento automatico del Service Worker

La verifica delle funzionalità PWA va effettuata sulla build di produzione.

## Avvio del progetto

Installazione delle dipendenze:
```bash
npm install

## Avvio in modalità sviluppo:

npm run dev


## Build e preview di produzione:

npm run build
npm run preview

## Deploy

Il progetto è configurato per il deploy tramite Firebase Hosting:

firebase deploy

## Tecnologie utilizzate

- React

- Vite

- Firebase Authentication

- Firebase Firestore

- Firebase Cloud Messaging

- vite-plugin-pwa

- React Router

- SCSS