# Nouveaux Services, Hooks et Utilitaires

Ce document décrit les nouveaux services, hooks personnalisés et utilitaires ajoutés au projet Al-Lawh Al-Mahfoudh.

## 📦 Services

### AsyncStorage Service (`src/services/storage/asyncStorage.ts`)

Service de stockage local pour la persistance des données de l'application.

#### Fonctionnalités principales :
- **Fonctions génériques** : `save`, `load`, `remove`, `clear`
- **Gestion des bookmarks** : `saveBookmarks`, `loadBookmarks`
- **Gestion des paramètres** : `saveSettings`, `loadSettings`
- **Progression de lecture** : `saveReadingProgress`, `loadReadingProgress`
- **Historique de lecture** : `saveReadingHistory`, `loadReadingHistory`
- **Position de lecture** : `saveLastRead`, `loadLastRead`
- **Audio téléchargé** : `saveDownloadedAudio`, `loadDownloadedAudio`, `removeDownloadedAudio`

#### Exemple d'utilisation :
```typescript
import { saveBookmarks, loadBookmarks } from '@services/storage/asyncStorage';

// Sauvegarder des bookmarks
await saveBookmarks(bookmarksArray);

// Charger des bookmarks
const bookmarks = await loadBookmarks();
```

## 🎨 Hooks Personnalisés

### useTheme Hook (`src/hooks/useTheme.ts`)

Hook personnalisé pour la gestion des thèmes (clair/sombre/système).

#### Fonctionnalités :
- **État du thème** : `isDark`, `isLight`, `themePreference`
- **Couleurs du thème** : `colors` (ensemble complet de couleurs)
- **Basculement de thème** : `toggleTheme`, `setLightTheme`, `setDarkTheme`, `setSystemTheme`
- **Fonctions utilitaires** : `withOpacity`, `getContrastText`

#### Exemple d'utilisation :
```typescript
import { useTheme } from '@hooks/useTheme';

function MyComponent() {
  const { isDark, colors, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello World</Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
}
```

## 🛠️ Utilitaires

### 1. Quran Utils (`src/utils/quranUtils.ts`)

Fonctions pour travailler avec les références coraniques.

#### Fonctionnalités principales :
- **Calculs de page/Juz/Hizb** : `getPageBySurah`, `getJuzBySurah`, `getHizbByJuz`
- **Références** : `parseReference`, `formatReference`, `isValidReference`
- **Navigation** : `getNextAyah`, `getPreviousAyah`
- **Progression** : `calculateProgress`, `getTotalAyahsUpTo`
- **Conversions** : `getAyahFromAbsolute`, `getSurahsInJuz`

#### Exemple d'utilisation :
```typescript
import { parseReference, isValidReference, getNextAyah } from '@utils/quranUtils';

// Parser une référence
const ref = parseReference('2:255'); // { surah: 2, ayah: 255 }

// Valider
if (isValidReference(2, 255)) {
  console.log('Référence valide');
}

// Obtenir le verset suivant
const next = getNextAyah(2, 255); // { surah: 2, ayah: 256 }
```

### 2. Arabic Utils (`src/utils/arabicUtils.ts`)

Fonctions pour le traitement du texte arabe.

#### Fonctionnalités principales :
- **Normalisation** : `removeDiacritics`, `normalizeArabic`
- **Validation** : `containsArabic`, `isArabic`
- **Comptage** : `countWords`
- **Numération** : `toArabicNumerals`, `fromArabicNumerals`
- **Recherche** : `searchArabic`, `findAllOccurrences`, `highlightSearchTerm`
- **Formatage** : `formatForDisplay`, `getTextDirection`

#### Exemple d'utilisation :
```typescript
import { removeDiacritics, toArabicNumerals, searchArabic } from '@utils/arabicUtils';

// Retirer les diacritiques
const clean = removeDiacritics('بِسْمِ اللَّهِ'); // 'بسم الله'

// Convertir en chiffres arabes
const arabicNum = toArabicNumerals(123); // '١٢٣'

// Rechercher dans le texte arabe
const found = searchArabic('بسم الله الرحمن', 'الله'); // true
```

### 3. Formatters (`src/utils/formatters.ts`)

Fonctions de formatage pour nombres, dates et durées.

#### Fonctionnalités principales :
- **Nombres** : `formatArabicNumber`, `padNumber`, `formatNumber`
- **Durées audio** : `formatDuration`, `formatLongDuration`, `formatArabicDuration`
- **Dates Hijri** : `formatHijriDate`
- **Dates Grégoriennes** : `formatDate`, `formatArabicDate`, `formatRelativeTime`
- **Temps** : `formatTime`, `formatArabicTime`
- **Autres** : `formatFileSize`, `formatPercentage`, `formatOrdinal`

#### Exemple d'utilisation :
```typescript
import { formatDuration, formatHijriDate, formatArabicDate } from '@utils/formatters';

// Formater une durée audio
const duration = formatDuration(125); // '02:05'

// Formater une date Hijri
const hijri = formatHijriDate(15, 6, 1446, 'ar'); // '١٥ جمادى الثانية ١٤٤٦ هـ'

// Formater une date en arabe
const arabicDate = formatArabicDate(new Date()); // '٣٠ ديسمبر ٢٠٢٥'
```

## 📋 Intégration avec le Code Existant

Tous ces utilitaires sont conçus pour s'intégrer parfaitement avec le code existant :

- **AsyncStorage** : Utilise les `STORAGE_KEYS` définis dans `constants/config.ts`
- **useTheme** : S'intègre avec le slice Redux `settingsSlice`
- **quranUtils** : Utilise les données de `constants/quranData.ts`
- **arabicUtils** : Fonctionne avec les textes coraniques existants
- **formatters** : Compatible avec tous les formats de données de l'app

## 🔄 Imports Simplifiés

Des fichiers d'index ont été créés pour simplifier les imports :

```typescript
// Import depuis utils
import { parseReference, formatDuration, searchArabic } from '@utils';

// Import depuis storage
import { saveBookmarks, loadSettings } from '@services/storage';

// Import du hook
import { useTheme } from '@hooks/useTheme';
```

## ✅ TypeScript

Tous les fichiers sont entièrement typés avec TypeScript et compilent sans erreur. Les interfaces et types utilisés proviennent de `src/types/quran.types.ts`.

## 📝 Notes

- Aucune dépendance externe supplémentaire n'a été ajoutée
- Le code suit les conventions existantes du projet
- Tous les utilitaires sont testables et réutilisables
- La documentation JSDoc est incluse dans chaque fonction
