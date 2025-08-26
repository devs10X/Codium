# Codium - AI-Powered Code Editor

![Codium Logo](public/logo.png)

Codium is a modern, AI-powered code editor that helps developers write and preview React code faster and more efficiently. Built with Next.js and featuring an integrated AI assistant, Codium provides a seamless development experience with real-time collaboration and intelligent code generation capabilities.

## Features

- **AI-Powered Code Generation**: Generate code using natural language prompts
- **Real-time Preview**: See your changes instantly with the built-in preview
- **File Explorer**: Navigate through your project files with ease
- **Modern UI**: Clean, dark-themed interface with a focus on developer experience
- **Built with Next.js**: Leverages the power of React and server-side rendering
- **Authentication**: Secure sign-in with providers like GitHub and Google
- **Responsive Design**: Works seamlessly across different devices and screen sizes

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or pnpm
- A code editor (like VS Code)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devs10X/Codium.git
   cd Codium
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the environment variables with your configuration

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL
- **AI**: OpenAI API or Grok API
- **Code Editing**: CodeSandbox Sandpack
- **Animations**: Framer Motion

## Project Structure

```
.
├── prisma/           # Database schema and migrations
├── public/           # Static files
├── src/
│   ├── app/          # Next.js app router
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions
│   └── page/         # Next.js pages
├── .env.example      # Example environment variables
└── package.json      # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [CodeSandbox](https://codesandbox.io/)
- [Shadcn/ui](https://ui.shadcn.com/)

---

Built with by the Codium team