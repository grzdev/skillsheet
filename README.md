# Skillsheet

A modern resume builder application built with Open Router's API, has multiple templates, and a real-time preview.

## Features

### Core Features
- **Multiple Templates**: Choose from various professional resume templates (Modern, Serif, Coral, Modern Writer)
- **AI-Powered Assistance**: Generate and edit resume content with AI help
- **Real-time Preview**: See changes instantly as you edit your resume
- **Responsive Design**: Works perfectly on mobile and desktop devices
- **Export Options**: Download your resume in PDF format

### Templates
The application offers multiple professionally designed templates:

1. **Modern Template**
   - Clean and contemporary design
   - Sidebar layout with accent colors
   - Perfect for tech and business professionals

2. **Serif Template**
   - Academic and traditional style
   - Typography-focused design
   - Ideal for academic and research positions

3. **Coral Template**
   - Classic and elegant design
   - Traditional single-column layout
   - Suitable for all professional fields

4. **Modern Writer Template**
   - Creative and unique layout
   - Personality-focused design
   - Great for creative professionals

### AI Features
- **Smart Content Generation**: AI helps create professional resume content
- **Content Refinement**: AI assists in improving existing content
- **Real-time Chat Interface**: Interactive chat interface for AI assistance
- **Context-Aware Suggestions**: AI understands your career context and provides relevant suggestions

### Resume Sections
1. **Personal Information**
   - Name and title
   - Contact details
   - Professional summary

2. **Work Experience**
   - Company details
   - Job titles and dates
   - Key responsibilities and achievements

3. **Education**
   - Institutions and degrees
   - Graduation dates
   - Academic achievements

4. **Skills**
   - Technical skills
   - Soft skills
   - Professional certifications

5. **Additional Sections**
   - Projects
   - Awards and honors
   - Publications
   - Volunteer work### UI Features
- **Modern Interface**: Clean and intuitive user interface
- **Dynamic Previews**: Real-time resume preview as you type
- **Customization Options**: Customize colors, fonts, and layout
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Support for different color themes

## Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful UI components
- **HTML2Canvas** for PDF generation
- **React Hook Form** for form handling
- **Lucide React** for icons

### AI Integration
- **Custom AI Flows** for resume content generation
- **Chat Interface** for interactive AI assistance
- **Context-aware AI** for personalized suggestions

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type checking

## Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/grzdev/skillsheet.git
   cd skillsheet
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:9002`## How to Use

### Creating a Resume
1. Choose a template from the homepage
2. Use the AI chat interface to generate or edit content
3. Fill in your personal information and experience
4. Preview your resume in real-time
5. Download the final version as PDF

### AI Assistant Usage
- Type natural language requests in the chat interface
- Ask for help with specific sections
- Request improvements or alternatives for existing content
- Get suggestions for better phrasing

### Best Practices
1. **Content Organization**
   - Keep descriptions clear and concise
   - Use action verbs for experience bullets
   - Highlight quantifiable achievements

2. **Formatting Tips**
   - Maintain consistent spacing
   - Use appropriate section hierarchy
   - Ensure content fits within page limits

3. **Template Selection**
   - Choose based on your industry
   - Consider the role you're applying for
   - Match template style to company culture

## Project Structure

### Key Components

#### Templates
- Modern Template (`/components/templates/ModernTemplate.tsx`)
- Serif Template (`/components/templates/SerifTemplate.tsx`)
- Coral Template (`/components/templates/CoralTemplate.tsx`)
- Modern Writer Template (`/components/templates/ModernWriterTemplate.tsx`)

#### AI Integration
- AI Flows (`/src/ai/flows/`)
- Chat Interface (`/components/ChatInterface.tsx`)
- Resume Data Handling (`/src/lib/types.ts`)

#### UI Components
- Template Cards
- Resume Preview
- Form Components
- Chat Interface
- Navigation Elements

## Building and Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Build Features
- Optimized bundle size
- Static page generation where possible
- Responsive image optimization
- Modern JavaScript and CSS minification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier
- Write clear, documented code
- Test thoroughly before submitting

## Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- Game logic validation
- Socket event handling
- Card effect implementation
- Database operations

## Troubleshooting

### Common Issues

**Connection Issues**
- Ensure Socket.io server is running on port 3001
- Check CORS settings
- Verify firewall settings

**Database Issues**
- Run `npm run db:push` to update schema
- Check database file permissions
- Verify environment variables

**Build Issues**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors


## Future Enhancements

Planned features for future releases:
- Tournament mode
- Spectator mode
- More card types
- Achievements system
- Player profiles and avatars
- Game replay system
- Mobile app version
