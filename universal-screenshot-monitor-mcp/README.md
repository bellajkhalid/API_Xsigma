# Universal Screenshot Monitor MCP

Un serveur MCP (Model Context Protocol) universel pour la surveillance automatique de sites web par captures d'écran et détection d'erreurs.

## 🚀 Fonctionnalités

- **Captures d'écran automatiques** de n'importe quel site web
- **Détection automatique d'erreurs** (console, réseau, visuelles, performance)
- **Surveillance programmée** avec cron jobs
- **Métriques de performance** (temps de chargement, DOM, etc.)
- **Rapports détaillés** en JSON
- **Interface universelle** - fonctionne avec tous les projets

## 📦 Installation

### 1. Installation des dépendances

```bash
cd universal-screenshot-monitor-mcp
npm install
```

### 2. Compilation TypeScript

```bash
npm run build
```

### 3. Configuration dans Augment

Dans vos paramètres Augment (Tools > MCP), ajoutez :

```json
{
  "name": "universal-screenshot-monitor",
  "command": "node",
  "args": ["./universal-screenshot-monitor-mcp/dist/index.js"],
  "cwd": "C:\\Users\\bella\\OneDrive\\Desktop\\API_Xsigma"
}
```

## 🛠️ Utilisation

### Prendre une capture d'écran

```typescript
// Capture d'écran simple
await takeScreenshot({
  url: "http://localhost:3000",
  outputDir: "./screenshots"
});

// Capture avec configuration avancée
await takeScreenshot({
  url: "http://localhost:3000",
  viewport: { width: 1920, height: 1080 },
  fullPage: true,
  waitFor: 3000,
  selector: ".main-content"
});
```

### Détecter les erreurs

```typescript
const result = await detectErrors({
  url: "http://localhost:3000",
  outputDir: "./reports"
});

// Résultat contient :
// - hasErrors: boolean
// - errors: Array<ErrorInfo>
// - screenshot: string (chemin)
// - metrics: PerformanceMetrics
```

## 🔧 Configuration

### Types d'erreurs détectées

1. **Erreurs Console** : JavaScript errors, warnings
2. **Erreurs Réseau** : 404, 500, timeouts
3. **Erreurs Visuelles** : Images cassées, layouts brisés
4. **Performance** : Temps de chargement lents

### Paramètres disponibles

- `url` : URL du site à surveiller (requis)
- `outputDir` : Dossier de sortie (défaut: ./screenshots)
- `viewport` : Taille de la fenêtre { width, height }
- `fullPage` : Capture complète (défaut: true)
- `waitFor` : Temps d'attente en ms
- `selector` : Attendre un élément CSS spécifique

## 📊 Exemples d'utilisation

### Pour votre projet XSigma

```typescript
// Surveiller la page d'accueil
await detectErrors({
  url: "http://localhost:3000",
  outputDir: "./xsigma-monitoring"
});

// Surveiller une page spécifique
await detectErrors({
  url: "http://localhost:3000/models/hjm",
  selector: ".hjm-model-container",
  waitFor: 5000
});
```

### Pour d'autres projets

```typescript
// N'importe quel site web
await detectErrors({
  url: "https://example.com",
  viewport: { width: 1366, height: 768 }
});
```

## 🔄 Surveillance automatique

Le MCP peut être étendu pour inclure la surveillance programmée :

```typescript
// Surveillance toutes les heures
scheduleMonitoring({
  jobId: "xsigma-hourly",
  url: "http://localhost:3000",
  schedule: "0 * * * *", // Cron pattern
  outputDir: "./monitoring"
});
```

## 📁 Structure des rapports

```json
{
  "hasErrors": false,
  "errors": [
    {
      "type": "console|network|visual|performance",
      "message": "Description de l'erreur",
      "severity": "low|medium|high",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ],
  "screenshot": "./screenshots/screenshot-2024-01-01.png",
  "metrics": {
    "loadTime": 1500,
    "domContentLoaded": 800,
    "firstContentfulPaint": 1200
  }
}
```

## 🎯 Avantages

- **Universel** : Fonctionne avec tous les projets web
- **Automatique** : Détection d'erreurs sans intervention
- **Intégré** : S'intègre parfaitement avec Augment
- **Configurable** : Paramètres flexibles selon les besoins
- **Rapports détaillés** : Informations complètes sur les problèmes

## 🚀 Prochaines étapes

1. Installer le MCP dans Augment
2. Tester avec votre projet XSigma
3. Configurer la surveillance automatique
4. Analyser les rapports d'erreurs
5. Utiliser pour d'autres projets web

Ce MCP vous permettra de surveiller automatiquement tous vos sites web et de détecter les problèmes avant qu'ils n'affectent vos utilisateurs !
