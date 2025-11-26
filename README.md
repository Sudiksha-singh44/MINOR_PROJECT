# Resume Analyzer - Smart Resume Analysis Platform

A modern web application built with React and Vite that helps users analyze, improve, and optimize their resumes. The platform provides AI-powered resume analysis, ATS compliance checking, skill extraction, and personalized recommendations.

## 🚀 Features

- **Smart Resume Analyzer**: Upload PDF resumes and get instant analysis with scores, skill extraction, and field prediction
- **Interactive Chatbot**: FAQ chatbot with pre-loaded questions about resume optimization and ATS compliance
- **Program Showcase**: Display educational programs (Undergraduate, Masters, PhD)
- **Resume Builder Integration**: Direct link to Canva resume templates
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **File Validation**: Automatic PDF validation with size and type checking

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite (with rolldown-vite)
- **Styling**: Tailwind CSS 4.1.14 + Custom CSS
- **Icons**: Lucide React
- **Firebase**: v12.3.0 (installed, ready for integration)
- **Linting**: ESLint with React hooks and refresh plugins

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MINOR_PROJECT
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
MINOR_PROJECT/
├── src/
│   ├── Components/
│   │   ├── Navbar/        # Navigation component
│   │   ├── Hero/           # Landing hero section
│   │   ├── Program/        # Educational programs showcase
│   │   ├── Chatbot/        # FAQ chatbot interface
│   │   ├── Analyzer/       # Resume analysis tool (main feature)
│   │   ├── Build/          # Resume builder CTA section
│   │   └── Footer/         # Footer with links and contact
│   ├── assets/             # Images and static assets
│   ├── utils/              # Utility functions and constants
│   │   ├── constants.js    # Application constants
│   │   └── errorHandler.js # Error handling utilities
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🔧 Key Components

### Analyzer Component
The core feature that allows users to:
- Upload PDF resumes (max 5MB)
- Get instant analysis with resume scores
- View extracted and recommended skills
- See predicted job field
- Get course recommendations

### Chatbot Component
Interactive FAQ system with:
- Pre-loaded questions about resume optimization
- Click-to-ask interface
- Auto-scrolling message display
- Keyboard navigation support

## 🎨 Styling

The project uses a combination of:
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom CSS**: Component-specific styles in individual CSS files
- **Responsive Design**: Mobile-first approach with breakpoints

## 🔐 File Validation

The Analyzer component includes:
- PDF file type validation
- File size limit (5MB maximum)
- User-friendly error messages
- File size display

## 🚧 Current Limitations & Future Improvements

### Current State
- Resume analysis returns mock data (no real PDF parsing)
- Firebase installed but not configured
- No backend integration
- No authentication system
- Sign-in button is non-functional

### Planned Improvements
- [ ] Integrate Firebase for authentication and data storage
- [ ] Add real PDF parsing and analysis backend
- [ ] Implement React Router for multi-page navigation
- [ ] Add toast notifications for better UX
- [ ] Connect chatbot to AI service (OpenAI/Claude)
- [ ] Add user accounts and resume history
- [ ] Implement real-time analysis with progress indicators
- [ ] Add export functionality for analysis reports
- [ ] Improve mobile responsiveness
- [ ] Add unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- Project maintained by the development team

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons provided by [Lucide React](https://lucide.dev/)

---

**Note**: This is a frontend prototype. Backend integration and real analysis functionality are planned for future releases.
