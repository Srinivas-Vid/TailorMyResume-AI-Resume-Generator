# TailorMyResume AI - Resume Generator

A comprehensive AI-powered resume generator that creates ATS-optimized, job-specific resumes with advanced features like resume parsing, job description analysis, and real-time ATS scoring.

## 🚀 Features

### Core Features
- **Smart Resume Builder**: Manual entry forms with intuitive UI
- **Resume Upload & Parse**: Upload existing resumes (PDF/DOCX) for auto-extraction
- **Job Description Analysis**: AI-powered JD parsing and keyword extraction
- **ATS Optimization**: Real-time ATS compatibility scoring
- **Multiple Export Formats**: PDF, DOCX, TXT exports
- **Template System**: Professional ATS-friendly templates

### Advanced Features
- **ATS Score Checker**: Real-time scoring with improvement suggestions
- **LinkedIn Optimizer**: Generate optimized LinkedIn profiles
- **Cover Letter Generator**: AI-powered personalized cover letters
- **Interview Prep Assistant**: Predicted questions and suggested answers
- **Company Research Bot**: Automated company insights

### Security & Privacy
- **AES-256 Encryption**: Enterprise-grade data protection
- **Local Processing**: Option for browser-only data processing
- **Auto-Delete**: Automatic data cleanup
- **GDPR/CCPA Compliant**: Privacy-first architecture

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **React Router** for navigation
- **React Dropzone** for file uploads
- **Date-fns** for date handling

### Backend (Planned)
- **FastAPI** for high-performance APIs
- **PostgreSQL** for user profiles
- **MongoDB** for resume data
- **Redis** for caching

### AI/ML Integration
- **OpenAI GPT API** for content generation
- **spaCy** for NLP processing
- **HuggingFace** for additional AI models

### Export & Processing
- **jsPDF** for PDF generation
- **html2canvas** for resume rendering
- **python-docx** for DOCX export (backend)

## 📋 Resume Sections

The application supports comprehensive resume building with the following sections:

1. **Personal Information**: Contact details, social profiles
2. **Professional Summary**: AI-optimized career summary
3. **Education**: Academic background with achievements
4. **Work Experience**: Professional history with quantified achievements
5. **Projects**: Technical projects with technologies and outcomes
6. **Skills**: Technical and soft skills with suggestions
7. **Certifications**: Professional certifications with credentials
8. **Additional Information**: Awards, volunteering, publications

## 🎯 ATS Optimization

### Scoring Algorithm
- **Keyword Match**: Analyzes job description keywords vs resume content
- **Format Score**: Checks ATS-friendly formatting
- **Missing Keywords**: Identifies gaps in keyword coverage
- **Improvement Suggestions**: Actionable recommendations

### ATS-Friendly Features
- Clean, parseable formatting
- Proper section headers
- Keyword optimization
- Quantified achievements
- Professional templates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tailormyresume-ai.git
cd tailormyresume-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Usage

### Quick Start with Upload
1. **Upload Resume**: Drag and drop your existing resume (PDF/DOCX)
2. **Auto-Parse**: System extracts and populates form fields
3. **Add Job Description**: Paste the target job posting
4. **Review & Edit**: Modify auto-extracted information
5. **Generate**: Create optimized resume with ATS scoring

### Manual Entry
1. **Fill Sections**: Complete each resume section using the sidebar navigation
2. **Add Job Description**: Input target job requirements
3. **Check ATS Score**: Review compatibility and suggestions
4. **Export**: Download in preferred format

### Advanced Features
- **Preview Mode**: Real-time resume preview
- **ATS Analysis**: Detailed scoring breakdown
- **Keyword Optimization**: Missing keyword identification
- **Template Selection**: Choose from ATS-optimized templates

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── common/         # Reusable components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   ├── ats/           # ATS-related components
│   └── resume/        # Resume preview components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── resumeParser.ts    # Resume parsing logic
│   ├── atsScorer.ts       # ATS scoring algorithm
│   └── dateUtils.ts       # Date formatting utilities
└── App.tsx             # Main application component
```

### Key Components

#### Resume Parser (`utils/resumeParser.ts`)
- Extracts personal information, education, experience
- Parses skills, projects, and certifications
- Handles multiple resume formats

#### ATS Scorer (`utils/atsScorer.ts`)
- Calculates keyword match percentage
- Evaluates resume format compliance
- Generates improvement suggestions

#### Form Components (`components/forms/`)
- Modular form sections for each resume part
- Real-time validation and suggestions
- Dynamic field management

### Adding New Features

1. **New Resume Section**:
   - Add type definition in `types/resume.ts`
   - Create form component in `components/forms/`
   - Update main App component
   - Add to sidebar navigation

2. **New Export Format**:
   - Extend export utilities
   - Add format selection UI
   - Implement backend integration

3. **AI Enhancement**:
   - Add API integration utilities
   - Create AI service components
   - Implement prompt engineering

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build image
docker build -t tailormyresume-ai .

# Run container
docker run -p 3000:3000 tailormyresume-ai
```

### Environment Deployment
- **Development**: Vite dev server
- **Staging**: Docker containers
- **Production**: Kubernetes with auto-scaling

## 🗺️ Roadmap

### Phase 1 (Current) - MVP
- ✅ Resume Builder with all sections
- ✅ File upload and parsing
- ✅ ATS scoring system
- ✅ Job description analysis
- ✅ Real-time preview

### Phase 2 - Enhanced Features
- 🔄 LinkedIn profile optimizer
- 🔄 Cover letter generator
- 🔄 Multiple resume templates
- 🔄 Advanced AI suggestions

### Phase 3 - Advanced AI
- 📋 Interview preparation assistant
- 📋 Company research automation
- 📋 Voice-based resume building
- 📋 Portfolio website generation

### Phase 4 - Enterprise
- 📋 Multi-user support
- 📋 Team collaboration features
- 📋 API for third-party integrations
- 📋 Advanced analytics dashboard

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.tailormyresume.ai](https://docs.tailormyresume.ai)
- **Issues**: [GitHub Issues](https://github.com/yourusername/tailormyresume-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/tailormyresume-ai/discussions)
- **Email**: support@tailormyresume.ai

## 🙏 Acknowledgments

- OpenAI for GPT API
- Tailwind CSS team for the amazing framework
- React community for excellent tooling
- All contributors and beta testers

---

**TailorMyResume AI** - Empowering job seekers with AI-powered resume optimization 🚀