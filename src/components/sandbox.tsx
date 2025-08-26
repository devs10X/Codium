import { Sandpack, SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";

const mockFiles = JSON.stringify({
    "/App.js": "import Navbar from './components/Navbar'\nimport Footer from './components/Footer'\nimport Button from './components/Button'\n\nexport default function App() {\n  return (\n    <div className=\"flex flex-col min-h-screen\">\n      <Navbar />\n      <main className=\"flex-1 flex items-center justify-center bg-gray-50\">\n        <div className=\"text-center p-8\">\n          <h1 className=\"text-4xl font-bold text-gray-900 mb-4\">Welcome to My App</h1>\n          <p className=\"text-gray-600 mb-6\">This is a demo project structure with multiple files.</p>\n          <Button label=\"Get Started\" />\n        </div>\n      </main>\n      <Footer />\n    </div>\n  )\n}",
    
    "/components/Navbar.js": "export default function Navbar() {\n  return (\n    <header className=\"bg-indigo-600 text-white p-4\">\n      <div className=\"max-w-7xl mx-auto flex items-center justify-between\">\n        <h1 className=\"text-lg font-semibold\">MyApp</h1>\n        <nav className=\"space-x-4\">\n          <a href=\"#\" className=\"hover:underline\">Home</a>\n          <a href=\"#\" className=\"hover:underline\">About</a>\n          <a href=\"#\" className=\"hover:underline\">Contact</a>\n        </nav>\n      </div>\n    </header>\n  )\n}",
  
    "/components/Footer.js": "export default function Footer() {\n  return (\n    <footer className=\"bg-gray-900 text-gray-400 py-6 mt-auto\">\n      <div className=\"max-w-7xl mx-auto px-4 text-center\">\n        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>\n      </div>\n    </footer>\n  )\n}",
  
    "/components/Button.js": "export default function Button({ label }) {\n  return (\n    <button className=\"px-6 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition\">\n      {label}\n    </button>\n  )\n}"
  })

export function Sandbox({files}: {files: any}) {
    return (
        <div className="h-full">
        <SandpackProvider template="react" theme="dark" style={{height: "100%", width: "100%"}} options={{
            autorun: false,
            recompileMode: "immediate",
            recompileDelay: 300,
            externalResources: ["https://cdn.tailwindcss.com"],
        }}
        files={files}
        >
            <SandpackLayout style={{height: "100%", width: "100%"}} className="scrollbar-custom">
                <div style={{width: "15%"}}>
                    <SandpackFileExplorer style={{height: "100%"}} />
                </div>
                <div style={{width: "35%"}}>
                    <SandpackCodeEditor
                        showLineNumbers={true}
                        showTabs={false}
                        closableTabs={false}
                        showInlineErrors
                        style={{height: "calc(100vh - 71px)"}}
                        className="scrollbar-custom"
                    />
                </div>
                <div style={{width: "calc(50% - 2px)"}}>
                    <SandpackPreview 
                        showNavigator
                        style={{height: "100%"}}
                    />
                </div>
            </SandpackLayout>
        </SandpackProvider>
      </div>
      );
}