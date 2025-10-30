<h1 align="center">
<img src='./doc/statics/icon.png' width='30'>
<span>Assistente IT</span>
</h1>

<p align="center">
    <em>Il tuo assistente IT intelligente per Windows.<br />
    Risolvi problemi tecnici con l'aiuto dell'intelligenza artificiale.</em>
</p>

<p align="center">
<a href="https://github.com/matdac12/chatbox/releases" target="_blank">
<img alt="Windows" src="https://img.shields.io/badge/-Windows-blue?style=flat-square&logo=windows&logoColor=white" />
</a>
</p>

## Cos'è Assistente IT?

**Assistente IT** è un'applicazione desktop che ti aiuta a risolvere problemi tecnici utilizzando modelli di intelligenza artificiale avanzati. È come avere un esperto IT sempre disponibile sul tuo computer.

L'assistente è specializzato nel:
- **Risolvere problemi informatici** con soluzioni passo dopo passo
- **Gestire questioni di rete** e connettività
- **Supportare la sicurezza IT** e best practices
- **Spiegare concetti tecnici** in modo semplice e comprensibile

## Caratteristiche Principali

- **💾 Dati Locali**
  Tutte le tue conversazioni rimangono sul tuo dispositivo. Nessun dato viene inviato a server esterni (eccetto le richieste ai provider AI che scegli).

- **🎯 Prompt IT Preconfigurato**
  L'assistente è già configurato per rispondere come un esperto IT, fornendo soluzioni pratiche e immediate.

- **🤖 Supporto Multi-Provider**
  Scegli tra diversi fornitori di AI in base alle tue esigenze:
  - **OpenAI** (ChatGPT) - Modelli GPT-4, GPT-4o, O3
  - **Anthropic Claude** - Modelli Claude 3.5 Sonnet, Opus
  - **Google Gemini** - Gemini Pro e Flash
  - **Ollama** - Esegui modelli localmente (llama, mistral, ecc.)

- **📚 Knowledge Base**
  Carica documenti e manuali tecnici per ottenere risposte contestualizzate.

- **🌐 Navigazione Web**
  L'assistente può cercare informazioni online per fornirti soluzioni aggiornate.

- **🔧 MCP Server Support**
  Integrazione con Model Context Protocol per funzionalità avanzate.

- **⌨️ Scorciatoie da Tastiera**
  Lavora più velocemente con comandi rapidi.

- **🎨 Tema Scuro**
  Interfaccia comoda per lunghe sessioni di lavoro.

- **💬 Cronologia Conversazioni**
  Tutte le tue chat vengono salvate localmente per riferimenti futuri.

## Requisiti di Sistema

- **Sistema Operativo**: Windows 10 o superiore (x64 o ARM64)
- **RAM**: Minimo 4GB raccomandato
- **Connessione Internet**: Necessaria per utilizzare i provider AI cloud

## Installazione

1. Scarica il file `Assistente IT-Setup.exe` dalla sezione [Releases](https://github.com/matdac12/chatbox/releases)
2. Esegui il programma di installazione
3. Segui le istruzioni sullo schermo
4. **Nota**: Windows potrebbe mostrare un avviso di sicurezza perché l'applicazione non è firmata digitalmente. Clicca su "Maggiori informazioni" e poi "Esegui comunque"

## Configurazione Iniziale

1. **Apri l'applicazione** - Al primo avvio vedrai l'interfaccia principale
2. **Configura un provider AI**:
   - Vai su **Impostazioni** (icona ingranaggio nella barra laterale)
   - Seleziona un provider (OpenAI, Claude, Gemini o Ollama)
   - Inserisci la tua API key (ottienila dal sito del provider)
3. **Inizia a chattare** - Clicca su "Nuova Chat" e inizia a porre domande!

## Come Ottenere le API Keys

### OpenAI (ChatGPT)
1. Vai su [platform.openai.com](https://platform.openai.com/)
2. Registrati o accedi
3. Vai su "API Keys" e crea una nuova chiave
4. Copia la chiave e incollala nelle impostazioni di Assistente IT

### Anthropic Claude
1. Vai su [console.anthropic.com](https://console.anthropic.com/)
2. Registrati o accedi
3. Vai su "API Keys" e genera una nuova chiave
4. Copia la chiave e incollala nelle impostazioni

### Google Gemini
1. Vai su [makersuite.google.com](https://makersuite.google.com/)
2. Accedi con il tuo account Google
3. Ottieni la tua API key
4. Incollala nelle impostazioni

### Ollama (Modelli Locali)
1. Installa Ollama da [ollama.ai](https://ollama.ai/)
2. Scarica un modello: `ollama pull llama2`
3. In Assistente IT, seleziona Ollama come provider
4. L'endpoint locale è già preconfigurato

## Esempi di Utilizzo

**Problema di Rete:**
> "Il mio computer non si connette al Wi-Fi. Come posso risolvere?"

**Errore Software:**
> "Ricevo un errore 'DLL mancante' quando apro un programma. Cosa devo fare?"

**Sicurezza:**
> "Come posso verificare se il mio computer è infetto da malware?"

**Configurazione:**
> "Come imposto un indirizzo IP statico su Windows?"

## Funzionalità Avanzate

### Copilot Personalizzati
Crea assistenti specializzati per compiti specifici:
1. Vai su **I Miei Copilot**
2. Clicca su **Crea Nuovo Copilot**
3. Inserisci nome e prompt personalizzato
4. Usa il copilot per chat specializzate

### Knowledge Base
Carica documenti per risposte contestualizzate:
1. Vai su **Impostazioni** → **Knowledge Base**
2. Clicca su **Aggiungi File**
3. Carica manuali, documentazione tecnica, ecc.
4. L'assistente userà questi documenti per rispondere

## Risoluzione Problemi

**L'applicazione non si avvia:**
- Verifica di avere Windows 10 o superiore
- Controlla che non ci siano antivirus che bloccano l'esecuzione

**Errori di connessione API:**
- Verifica che la tua API key sia corretta
- Controlla la connessione internet
- Assicurati di avere credito sul tuo account provider

**L'assistente non risponde correttamente:**
- Prova a riformulare la domanda in modo più specifico
- Includi dettagli sul tuo sistema operativo e versione
- Fornisci messaggi di errore completi quando disponibili

## Sviluppo

Questo progetto è un fork di [Chatbox Community Edition](https://github.com/chatboxai/chatbox), personalizzato per uso aziendale come assistente IT.

### Requisiti di Sviluppo

- Node.js (v20.x – v22.x)
- npm (pnpm non è supportato)

### Istruzioni per lo Sviluppo

1. Clona il repository

```bash
git clone https://github.com/matdac12/chatbox.git
cd chatbox
```

2. Installa le dipendenze

```bash
npm install
```

3. Avvia l'applicazione in modalità sviluppo

```bash
npm run dev
```

4. Crea l'installer per Windows

```bash
npm run package
```

## Licenza

Questo progetto è distribuito sotto licenza GPL-3.0. Vedi il file [LICENSE](./LICENSE) per i dettagli completi.

Basato su [Chatbox Community Edition](https://github.com/chatboxai/chatbox) by [@benn](https://github.com/benn).

## Note sulla Privacy

- Tutte le conversazioni sono salvate **localmente** sul tuo computer
- Le richieste ai provider AI (OpenAI, Claude, Gemini) vengono inviate attraverso le loro API
- Consulta le policy sulla privacy dei singoli provider per capire come trattano i dati
- **Ollama** esegue i modelli completamente offline - nessun dato lascia il tuo computer

## Contribuire

Contributi, segnalazioni di bug e richieste di funzionalità sono benvenuti! Sentiti libero di aprire una issue o inviare una pull request.

## Contatti

Per supporto o domande, apri una [issue su GitHub](https://github.com/matdac12/chatbox/issues).

---

**Sviluppato con ❤️ per semplificare il supporto IT**
