# WattWise - Smart Energy Management App

<img src="assets/images/icon.png" alt="WattWise Logo" width="200" height="200" />

## Overview
WattWise is a comprehensive energy management application built with React Native and Expo. Developed by Team Greenovators, this sustainable app helps users track their energy consumption, optimize usage patterns, and save on electricity bills through intelligent monitoring and personalized recommendations. Our project won the Second Prize in the Sustainable App Development competition, recognizing our commitment to promoting energy efficiency and environmental sustainability.

## 🏆 Achievement
- **Second Prize Winner** in Sustainable App Development Competition organised at Amrita Amritapuri as part of Vidyut 2025 - A National level Multifest
- Recognized for innovative approach to energy conservation
- Demonstrated practical impact on sustainable living

## 👥 Team Greenovators
Our team is passionate about creating technology solutions that promote sustainability and environmental consciousness. WattWise represents our commitment to making a positive impact on energy consumption patterns through innovative technology.

## 🌟 Key Features

- **Real-time Energy Monitoring**
  - Track daily energy consumption
  - Visualize usage patterns with interactive charts
  - Monitor individual appliance consumption

- **Smart Analytics**
  - Detailed consumption breakdown
  - Usage trends and patterns
  - Energy-saving recommendations

- **Social Features**
  - Leaderboard for energy-saving achievements
  - Community challenges
  - Achievement badges

- **User Experience**
  - Dark/Light theme support
  - Intuitive dashboard
  - Easy-to-use appliance management

## 🛠️ Technologies Used

- **Frontend**
  - React Native
  - Expo
  - TypeScript
  - React Navigation

- **State Management**
  - React Context
  - Custom Hooks

- **UI Components**
  - Custom-built components
  - Responsive design
  - Modern UI/UX principles

## 📱 Screenshots
[Add screenshots of your app here]

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

## 🔧 Project Structure

```
wattwise/
├── app/              # Main application screens
├── components/       # Reusable UI components
├── assets/          # Static assets
├── constants/       # Application constants
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── services/        # Service layer
└── utils/           # Utility functions
```

## ⚙️ Environment Setup

### Environment Variables
The project uses environment variables for configuration. A `.env.example` file is provided as a template.

1. Copy `.env.example` to create your `.env` file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration values:
```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ **Important**: 
> - Never commit your `.env` file to version control
> - The `.env` file is already included in `.gitignore`
> - Use `.env.example` as a template for required variables
> - Keep your Firebase and Gemini API credentials secure

### Getting Environment Variables
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Get your Firebase configuration from your project settings
3. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. For production deployment, ensure all environment variables are properly configured


### Installation Options

#### Option 1: Direct APK Installation
1. Download the latest APK from the link provided[click_here](https://1drv.ms/u/c/237c845962d07dc1/ET-XZfkFSbROmOym2eArPdUBDllCc6xS_gC3vVbhXllNYA?e=BNnfXb)
2. Enable "Install from Unknown Sources" in your Android device settings
3. Install the APK file on your Android device

#### Option 2: Development Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/wattwise.git
```

2. Install dependencies
```bash
cd wattwise
npm install
```
3. Add .env file as mentioned above with proper credetentials

4. Start the development server
```bash
npx expo start
```

5. Run on your device
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Or press 'a' for Android emulator or 'i' for iOS simulator


## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

<!-- ## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

## 👨‍💻 Author
[Manoj Koneti]
- GitHub: [@manojkoneti](https://github.com/manojk765)
- LinkedIn: [Manoj Koneti](https://www.linkedin.com/in/koneti-manoj/)

## 🙏 Acknowledgments
- Team Greenovators for their dedication and collaboration
- Competition organizers for providing the platform to showcase sustainable solutions
- All contributors who helped shape this project into an award-winning application 
