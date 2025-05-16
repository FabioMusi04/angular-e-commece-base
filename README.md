# 🛍️ Dashboard Amministrazione E-Commerce — Documentazione Tecnica

## 📘 Overview

Questo progetto è una **dashboard di amministrazione** sviluppata in **Angular 17**, progettata per la gestione di un e-commerce. L'applicazione si connette a un'**API RESTful** per consentire agli amministratori di:

- Gestire prodotti e categorie
- Visualizzare e processare ordini
- Analizzare vendite e metriche aziendali

---

## 🧱 Struttura del Progetto

```bash
AngularProject/
├── angular.json                # Configurazione CLI Angular
├── package.json                # Dipendenze e script
├── tsconfig.json               # Config TypeScript
├── src/
│   ├── environments/           # Configurazioni ambienti
│   ├── main.ts                 # Entry point Angular
│   ├── index.html              # HTML base
│   ├── styles.scss             # Stile globale
│   └── app/
│       ├── app.component.*     # Root component
│       ├── app.config.ts       # Configurazioni modulari
│       ├── app.routes.ts       # Routing centralizzato
│       ├── core/               # Servizi condivisi, auth, interceptor, guard
│       └── features/           # Moduli funzionali (analytics, ordini, carrello, ecc.)
│       └── interfaces/         #  Interfacce TypeScript
│       └── search-input/       # Componente input di ricerca
│       └── shared/             # Entità riutilizzabili in tutta l'applicazione
│       └── state/              # NgRx Store globali
```

<br>

# ⚙️ Setup Ambiente di Sviluppo

🔧 Requisiti

- Node.js 18+

- Yarn (o npm)

- Angular CLI

<br>

# ▶️ Comandi Principali

```bash
# Installazione dipendenze
yarn install

# Avvio sviluppo
yarn start

# Build produzione
yarn build

# Linting
yarn lint

# Test
yarn test
```

<br>

# 🌍 Environments

Le configurazioni degli ambienti si trovano in `src/environments/`:

```typescript
export const environment = {
  apiUrl: "https://...api...",
  production: false,
  masterKey: "API_KEY_HERE",
};
```

<br>

# 🧩 Componenti e Servizi Chiave

| Tipo      | Nome                  | Descrizione    | Percorso                                               |
| --------- | --------------------- | -------------- | ------------------------------------------------------ |
| Component | `AppComponent`        | Root dell’app  | `app/app.component.ts`                                 |
| Component | `AnalyticsComponent`  | Dashboard dati | `features/analytics/analytics.component.ts`            |
| Component | `OrdersListComponent` | Lista ordini   | `features/orders/orders-list/orders-list.component.ts` |
| Component | `CartComponent`       | Carrello       | `features/cart/cart.component.ts`                      |
| Component | `CheckoutComponent`   | Checkout       | `features/checkout/checkout.component.ts`              |
| Component | `HomeComponent`       | Home           | `features/home/home.component.ts`                      |
| Component | `LoginComponent`      | Login          | `features/login/login.component.ts`                    |
| Component | `ProductsComponent`   | Products       | `features/products/products.component.ts`              |
| Component | `SignupComponent`     | SignUp         | `features/signup/signup.component.ts`                  |

|
| Service | `AuthService` | Login / Logout / Token JWT | `core/auth/auth.service.ts` |
| Service | `ProductsService` | Gestione prodotti | `core/services/products/products.service.ts` |
| Service | `CategoriesService` | Gestione categorie | `core/services/categories/categories.service.ts` |
| Service | `OrdersService` | Gestione ordini | `core/services/orders/orders.service.ts` |
| Service | `TokenService` | Gestione tplem | `core/services/token/token.service.ts` |
|
| Interceptor | `ErrorInterceptor` | Gestione errori globali | `core/interceptors/errors/errors.interceptor.ts` |
| Interceptor | `HeadersInterceptor` | Inserimento header API | `core/interceptors/headers/headers.interceptor.ts` |
| Interceptor | `LoggingInterceptor` | Gestione log | `core/interceptors/logging/logging.interceptor.ts` |
|
| Guard | `Guard` | Gestione guard | `core/guard/guard.interceptor.ts` |

<br>

# 🧠 Gestione dello Stato (NgRx Store + Persistence)

L'applicazione utilizza NgRx Store insieme a NgRx Effects per una gestione reattiva e centralizzata dello stato. Inoltre, implementa persistenza dello stato per mantenere i dati anche dopo ricaricamenti della pagina, migliorando l'esperienza utente e riducendo le chiamate superflue al backend.

## 📦 Moduli di Stato Gestiti

| Slice Store     | Contenuto Gestito                  |
| --------------- | ---------------------------------- |
| `products`      | Lista prodotti, filtri, selezione  |
| `orders`        | Ordini recenti, stato di evasione  |
| `categories`    | Categorie disponibili              |
| `cart`          | Articoli nel carrello              |
| `user` / `auth` | Informazioni autenticazione utente |

## 🔁 Persistenza dello Stato

Per rendere persistente lo store tra reload della pagina, si può usare una delle seguenti strategie:

- NgRx Store LocalStorage MetaReducer

Esempio:

```typescript
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ["auth", "cart"], rehydrate: true })(reducer);
}
```

Questo permette di:

- Mantenere sessione utente attiva

- Salvare il carrello

- Evitare chiamate duplicate al backend

## 📌 Architettura NgRx Utilizzata

| Elemento    | Funzione                                                      |
| ----------- | ------------------------------------------------------------- |
| `Actions`   | Rappresentano eventi (es. `loadCategories`, `createProduct`)  |
| `Reducers`  | Gestiscono aggiornamenti immutabili dello stato               |
| `Effects`   | Chiamate HTTP e operazioni asincrone (es. login, load orders) |
| `Selectors` | Espongono porzioni di stato in modo ottimizzato               |

<br>

# 🔐 Autenticazione

L’app utilizza JWT per autenticazione, grazie al modulo `@auth0/angular-jwt`.

### Meccanismo:

- Dopo il login, il token viene salvato

- Gli intercettori HTTP aggiungono automaticamente il token alle richieste

- Il `masterKey` può servire come chiave di accesso privilegiata per le API

### Features:

- Possibilità di proteggere rotte con AuthGuard

- Gestione automatica della scadenza dei token

<br>

# 📊 Visualizzazione Dati

## 📈 Librerie Usate:

- `chart.js` per grafici interattivi

- `ng2-charts` come wrapper Angular

Usate nel modulo analytics per mostrare:

- Vendite nel tempo

- Ordini recenti

- Metriche sintetiche

<br>

# 🛠️ Tecnologie e Librerie Principali

| Tecnologia           | Uso                                   |
| -------------------- | ------------------------------------- |
| **Angular 17**       | Framework principale                  |
| **NgRx Store**       | Stato centralizzato                   |
| **RxJS**             | Programmazione reattiva               |
| **Angular Material** | UI componenti (modali, tabelle, form) |
| **Chart.js**         | Grafici e metriche                    |
| **Auth0 JWT**        | Autenticazione via token              |

<br>

# 🚀 Deployment

Attualmente il progetto non è ancora deployato. Per prepararlo alla produzione:

```bash
yarn build --configuration production
```

Il risultato si trova in `dist/e-commerce/` e può essere distribuito su:

- Firebase Hosting

- Vercel / Netlify

- Server statico con nginx / Apache
