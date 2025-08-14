# Backend Analytical Sigma API

## 📋 Vue d'ensemble

Cette API implémente l'**Approche 1 : Conversion en Scripts Python** pour exécuter les calculs de volatilité analytique sigma. Le notebook Jupyter `AnalyticalSigmaVolatility_fixed_executed.ipynb` a été converti en script Python autonome qui peut être exécuté via ligne de commande.

## 🏗️ Architecture

```
Backend_AnalyticalSigma/
├── index.js                    # Serveur Express principal
├── package.json                # Dépendances Node.js
├── api/
│   └── openapi.yaml           # Spécification OpenAPI/Swagger
├── routes/
│   ├── analyticalSigma.js     # Routes API principales
│   └── health.js              # Routes de santé
├── services/
│   └── pythonExecutor.js      # Service d'exécution Python
├── service/Python/
│   └── AnalyticalSigmaVolatility.py  # Script Python converti
└── test-api.js                # Tests de l'API
```

## 🚀 Démarrage rapide

### Prérequis
- Node.js 16+
- Python 3.x avec les modules xsigmamodules
- Accès au répertoire `Examples/Notebook` pour les modules Python

### Installation
```bash
cd Examples/Notebook/Backend_AnalyticalSigma
npm install
```

### Démarrage du serveur
```bash
node index.js
```

Le serveur démarre sur le port 5003 :
- **API** : http://localhost:5003/api/AnalyticalSigmaVolatility
- **Documentation** : http://localhost:5003/api-docs
- **Health Check** : http://localhost:5003/api/health

## 📊 Utilisation de l'API

### Types de sortie disponibles

| Type | Description | Données incluses |
|------|-------------|------------------|
| `volatility_surface` | Surface de volatilité basique | strikes, volatilities, atm_volatilities |
| `vols_plus_minus` | Analyse de sensibilité | + vols_plus, vols_minus, ctrl_c_plus/minus |
| `sensitivity` | Alias pour vols_plus_minus | Identique à vols_plus_minus |
| `density` | Fonctions de densité | + density |
| `probability` | Probabilités cumulatives | + probability |
| `all` | Analyse complète | Toutes les données ci-dessus |

### Exemples d'utilisation

#### Via GET (paramètres simples)
```bash
# Surface de volatilité basique
curl "http://localhost:5003/api/AnalyticalSigmaVolatility?n=50&fwd=1500&time=0.5"

# Analyse de sensibilité
curl "http://localhost:5003/api/AnalyticalSigmaVolatility?n=30&output_type=vols_plus_minus"
```

#### Via POST (paramètres complets)
```bash
# Analyse complète
curl -X POST http://localhost:5003/api/AnalyticalSigmaVolatility \
  -H "Content-Type: application/json" \
  -d '{
    "n": 100,
    "fwd": 2000,
    "time": 1.0,
    "atm": 0.8,
    "skew": 2.5,
    "output_type": "all"
  }'
```

#### PowerShell
```powershell
# Test rapide
$result = Invoke-RestMethod -Uri "http://localhost:5003/api/AnalyticalSigmaVolatility?n=20" -Method GET
$result.data.strikes.Count  # Nombre de points

# Analyse complète
$body = '{"n":50,"fwd":1800,"output_type":"all"}'
$result = Invoke-RestMethod -Uri "http://localhost:5003/api/AnalyticalSigmaVolatility" -Method POST -Body $body -ContentType "application/json"
```

## 🔧 Paramètres

### Paramètres de calcul
- **n** : Nombre de points (10-1000, défaut: 200)
- **fwd** : Prix forward (>0, défaut: 2245.0656707892695)
- **time** : Temps jusqu'à expiration (>0, défaut: 1.0)
- **ctrl_p** : Paramètre de contrôle P (défaut: 0.2)
- **ctrl_c** : Paramètre de contrôle C (défaut: 0.2)
- **atm** : Volatilité at-the-money (>0, défaut: 1.1)
- **skew** : Paramètre de skew (défaut: 3.5)
- **smile** : Paramètre de smile (défaut: 17)
- **put** : Paramètre put (défaut: 0.7)
- **call** : Paramètre call (défaut: 0.06)
- **output_type** : Type de sortie (défaut: volatility_surface)

## 📈 Performance

### Temps d'exécution typiques
- **Small (n=10)** : ~640ms
- **Medium (n=50)** : ~640ms  
- **Large (n=200)** : ~640ms
- **Sensitivity (n=50)** : ~650ms

### Optimisations
- Exécution directe Python (pas d'interpréteur intermédiaire)
- Gestion des processus avec timeout
- Validation côté serveur pour éviter les erreurs Python
- Cache des modules Python chargés

## 🧪 Tests

### Exécution des tests
```bash
node test-api.js
```

### Tests inclus
1. **Health Check** - Vérification de l'état du serveur
2. **Surface de volatilité basique** - Test GET simple
3. **Analyse de sensibilité** - Test POST avec paramètres
4. **Analyse complète** - Test du type "all"
5. **Comparaison de performance** - Tests de charge
6. **Gestion d'erreurs** - Validation des paramètres
7. **Health Check détaillé** - Vérification de l'environnement Python

## 🏥 Monitoring

### Endpoints de santé
- **GET /api/health** - État basique
- **GET /api/health/detailed** - Vérification complète avec test Python
- **GET /api/health/python** - Test spécifique de l'environnement Python

### Métriques disponibles
- Temps d'exécution total et Python
- Nombre d'exécutions actives
- État des modules xsigma
- Utilisation mémoire

## 🔒 Sécurité

### Mesures implémentées
- Validation stricte des paramètres
- Timeout sur les exécutions Python
- Rate limiting (100 req/15min par IP)
- Headers de sécurité (Helmet.js)
- Limitation de la taille des requêtes

### Variables d'environnement
```bash
PYTHON_COMMAND=python          # Commande Python à utiliser
EXECUTION_TIMEOUT=60000        # Timeout en ms (défaut: 60s)
PORT=5003                      # Port du serveur
```

## 🆚 Comparaison des approches

| Aspect | Approche 1 (Scripts) | Approche 2 (Notebooks) |
|--------|----------------------|-------------------------|
| **Performance** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Bon |
| **Simplicité** | ⭐⭐⭐⭐ Simple | ⭐⭐ Complexe |
| **Maintenance** | ⭐⭐⭐⭐⭐ Facile | ⭐⭐⭐ Modérée |
| **Flexibilité** | ⭐⭐⭐ Modérée | ⭐⭐⭐⭐⭐ Excellente |
| **Debugging** | ⭐⭐⭐⭐ Bon | ⭐⭐ Difficile |

## 📚 Documentation

- **Interface Swagger** : http://localhost:5003/api-docs
- **Spécification OpenAPI** : `api/openapi.yaml`
- **Code source** : Entièrement documenté avec JSDoc

## 🤝 Contribution

1. Modifier le script Python dans `service/Python/AnalyticalSigmaVolatility.py`
2. Mettre à jour la spécification OpenAPI si nécessaire
3. Exécuter les tests : `node test-api.js`
4. Vérifier la documentation Swagger

## 📝 Licence

MIT - Voir le fichier LICENSE pour plus de détails.
