# Epic Bites - AI-Powered Recipe Manager

A React Native Expo app created for [Eitan Bernath](https://www.instagram.com/eitanbernath/) - professional chef and social media creator.

Built for the **Shipyard.fyi Expo Snack Contest** 🚀

## Features

- 📱 Recipe collection management
- 🤖 AI-powered recipe extraction from photos and URLs
- 🗓️ Weekly meal planning
- 🛒 Smart grocery list generation
- 👨‍🍳 Interactive cooking mode with step-by-step guidance
- 📚 Curated creator collections
- 💎 Premium features with RevenueCat integration

## Tech Stack

- **Framework**: React Native (Expo SDK 49)
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Backend**: Firebase (Firestore)
- **AI**: Google Gemini API for recipe extraction
- **Monetization**: RevenueCat (in-app purchases)
- **Storage**: AsyncStorage for local data

## Quick Start with Expo Snack

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Click **Import → Import from GitHub**
3. Paste this repository URL
4. The app will load instantly in Snack

## Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
epic-bites-app/
├── App.js                    # Main entry point
├── package.json              # Dependencies
├── app.json                  # Expo configuration
└── src/
    ├── screens/              # All app screens
    │   ├── HomeScreen.js
    │   ├── AddRecipeScreen.js
    │   ├── RecipeDetailScreen.js
    │   ├── CookingModeScreen.js
    │   ├── MealPlanScreen.js
    │   ├── GroceryListScreen.js
    │   ├── CreatorCollectionsScreen.js
    │   ├── CollectionDetailScreen.js
    │   ├── ProfileScreen.js
    │   ├── PaywallScreen.js
    │   └── LoadingScreen.js
    └── services/             # Backend services
        ├── firebase.js
        ├── recipeService.js
        ├── aiRecipeExtractor.js
        ├── mealPlanService.js
        ├── groceryListService.js
        ├── creatorCollectionsService.js
        └── revenuecat.js
```

## Configuration

To run the app with full functionality, you'll need to configure:

1. **Firebase**: Add your Firebase config in `src/services/firebase.js`
2. **Gemini API**: Add your API key in `src/services/aiRecipeExtractor.js`
3. **RevenueCat**: Add your API key in `src/services/revenuecat.js`

## Shipyard.fyi Contest Submission

This app was built as part of the Shipyard.fyi Expo Snack Contest, demonstrating:

- Complete React Native app architecture
- AI integration with Google Gemini
- Firebase backend integration
- Production-ready monetization with RevenueCat
- Professional UI/UX design
- Multi-screen navigation with React Navigation

## Creator

Built for **Eitan Bernath** - Professional chef, TikTok creator with 2M+ followers, and author.

## License

MIT License

---

**Created by Troy** | [Shipyard.fyi Contest Entry](https://www.shipyard.fyi)