const Quiz = require("../models/Quiz");
const { GoogleGenAI } = require("@google/genai");

// We initialize inside the function to ensure we catch the env var if it's updated


const generateQuiz = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    // Removed DB caching so new questions are generated every attempt!

    const prompt = `Generate a 10-question multiple-choice quiz about "${topic}". 
    Return ONLY a JSON array of objects. Do NOT use markdown code blocks like \`\`\`json or \`\`\`.
    Each object must have the following properties:
    - question: string
    - options: array of 4 strings
    - answer: string (must exactly match one of the options)`;

    // Check if GEMINI_API_KEY is provided
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Using mock data for testing.");
      const randomId = Math.floor(Math.random() * 1000);
      
      const mockDatabase = {
        "React.js": [
          { q: "What hook is used to manage state in a functional component?", a: "useState", o: ["useState", "useEffect", "useContext", "useReducer"] },
          { q: "What is the virtual DOM?", a: "A lightweight copy of the actual DOM", o: ["A lightweight copy of the actual DOM", "A browser extension", "A styling library", "A server-side rendering engine"] },
          { q: "Which method is used to pass data from parent to child?", a: "Props", o: ["State", "Props", "Context", "Redux"] },
          { q: "What hook runs side effects?", a: "useEffect", o: ["useEffect", "useState", "useMemo", "useRef"] },
          { q: "How do you render an array of items in React?", a: "Using the .map() method", o: ["Using a for loop", "Using the .map() method", "Using .forEach()", "Using .filter()"] },
          { q: "What is JSX?", a: "A syntax extension for JavaScript", o: ["A syntax extension for JavaScript", "A new programming language", "A database query language", "A CSS preprocessor"] },
          { q: "Which tool is commonly used for React routing?", a: "React Router", o: ["React Router", "Express", "Mongoose", "Axios"] },
          { q: "What does calling setState do?", a: "Schedules an update to a component's state object", o: ["Immediately mutates the state", "Schedules an update to a component's state object", "Deletes the component", "Triggers an API call"] },
          { q: "What is Context API used for?", a: "Prop drilling avoidance", o: ["Prop drilling avoidance", "Animation", "Database connection", "API requests"] },
          { q: "What is the standard tool to bootstrap a React app?", a: "Vite or Create React App", o: ["Vite or Create React App", "Nodemon", "Webpack manually", "Django"] }
        ],
        "JavaScript Core": [
          { q: "What is closure in JS?", a: "A function bundled with its lexical environment", o: ["A function bundled with its lexical environment", "A syntax error", "A loop termination", "A strictly typed variable"] },
          { q: "Which keyword defines block-scoped variables?", a: "let", o: ["var", "let", "function", "global"] },
          { q: "What is the output of typeof null?", a: "'object'", o: ["'null'", "'undefined'", "'object'", "'number'"] },
          { q: "What does 'use strict' do?", a: "Enforces stricter parsing and error handling", o: ["Enforces stricter parsing and error handling", "Makes code run faster", "Allows syntax errors", "Connects to a database"] },
          { q: "Which method converts a JSON string into an object?", a: "JSON.parse()", o: ["JSON.stringify()", "JSON.parse()", "Object.assign()", "Array.from()"] },
          { q: "What is an IIFE?", a: "Immediately Invoked Function Expression", o: ["Immediately Invoked Function Expression", "Internal Interface For Elements", "Iterative Index For Arrays", "Inline Integrated Frame Element"] },
          { q: "What does the 'this' keyword refer to?", a: "The object that is executing the current function", o: ["The object that is executing the current function", "Always the global window", "The previous variable", "A CSS selector"] },
          { q: "What is Event Bubbling?", a: "Events propagate from innermost element to outer elements", o: ["Events propagate from innermost element to outer elements", "Events cancel each other out", "A memory leak", "A type of sorting algorithm"] },
          { q: "Which statement stops a loop?", a: "break", o: ["stop", "break", "halt", "return"] },
          { q: "What is a Promise?", a: "An object representing eventual completion of an async operation", o: ["An object representing eventual completion of an async operation", "A synchronous loop", "A guaranteed variable value", "A strict mode feature"] }
        ],
        "Node.js": [
          { q: "What runtime is Node.js built on?", a: "V8 JavaScript engine", o: ["V8 JavaScript engine", "SpiderMonkey", "Java Virtual Machine", "WebAssembly"] },
          { q: "Which module is used to create a web server?", a: "http", o: ["http", "fs", "path", "os"] },
          { q: "How is Node.js primarily characterized?", a: "Asynchronous and event-driven", o: ["Multi-threaded", "Asynchronous and event-driven", "Synchronous only", "Frontend framework"] },
          { q: "What is npm?", a: "Node Package Manager", o: ["Node Package Manager", "New Project Module", "Network Protocol Manager", "Node Process Monitor"] },
          { q: "Which file specifies project dependencies?", a: "package.json", o: ["index.js", "package.json", ".env", "node_modules"] },
          { q: "What is Express.js?", a: "A web application framework for Node.js", o: ["A database", "A web application framework for Node.js", "A frontend library", "A CSS framework"] },
          { q: "How do you read a file synchronously in Node?", a: "fs.readFileSync()", o: ["fs.readFile()", "fs.readFileSync()", "file.read()", "fs.open()"] },
          { q: "What is the global object in Node.js?", a: "global", o: ["window", "document", "global", "process"] },
          { q: "Which variable holds command-line arguments?", a: "process.argv", o: ["process.env", "process.argv", "global.args", "console.args"] },
          { q: "What does module.exports do?", a: "Exposes functions or variables for other files", o: ["Deletes a file", "Exposes functions or variables for other files", "Installs a package", "Starts the server"] }
        ],
        "MongoDB": [
          { q: "What type of database is MongoDB?", a: "NoSQL document database", o: ["Relational SQL database", "NoSQL document database", "Graph database", "In-memory cache"] },
          { q: "What format does MongoDB use to store documents?", a: "BSON", o: ["JSON", "XML", "BSON", "CSV"] },
          { q: "Which uniquely identifies a document in a collection?", a: "_id", o: ["_id", "primary_key", "uuid", "doc_id"] },
          { q: "What is a replica set?", a: "A group of MongoDB processes that maintain the same data set", o: ["A group of MongoDB processes that maintain the same data set", "A backup file", "A caching layer", "A relational table"] },
          { q: "Which command inserts a single document?", a: "insertOne()", o: ["insert()", "insertOne()", "add()", "create()"] },
          { q: "What is Mongoose?", a: "An Object Data Modeling (ODM) library for MongoDB", o: ["A database GUI", "An Object Data Modeling (ODM) library for MongoDB", "A type of query language", "A server hosting provider"] },
          { q: "Which aggregation stage filters documents?", a: "$match", o: ["$filter", "$match", "$where", "$query"] },
          { q: "How do you define an index?", a: "createIndex()", o: ["makeIndex()", "createIndex()", "index()", "setIndex()"] },
          { q: "What is the equivalent of a SQL table in MongoDB?", a: "Collection", o: ["Collection", "Document", "Cluster", "Row"] },
          { q: "Which query operator specifies 'less than'?", a: "$lt", o: ["$less", "<", "$lt", "$l"] }
        ],
        "Web Fundamentals": [
          { q: "What does HTML stand for?", a: "HyperText Markup Language", o: ["HyperText Markup Language", "HyperLinks Text Mode", "Home Tool Markup Language", "Highly Typed Machine Language"] },
          { q: "What does CSS do?", a: "Styles the visual presentation of a webpage", o: ["Adds interactivity", "Styles the visual presentation of a webpage", "Connects to a database", "Hosts the website"] },
          { q: "Which HTML tag is used for the largest heading?", a: "<h1>", o: ["<heading>", "<h1>", "<h6>", "<head>"] },
          { q: "What does HTTP stand for?", a: "Hypertext Transfer Protocol", o: ["Hypertext Transfer Protocol", "Hyper Transfer Text Protocol", "Host To Terminal Protocol", "Hyper Tool Transfer Protocol"] },
          { q: "What is the purpose of the <head> tag?", a: "To contain metadata and links to scripts/styles", o: ["To display the main title on the screen", "To contain metadata and links to scripts/styles", "To create a navigation bar", "To hold the footer"] },
          { q: "Which CSS property changes text color?", a: "color", o: ["text-color", "font-color", "color", "background-color"] },
          { q: "What is responsive web design?", a: "Designing websites to work on multiple devices and window sizes", o: ["Making the site load faster", "Designing websites to work on multiple devices and window sizes", "Using React", "Writing clean code"] },
          { q: "What does the 'alt' attribute in an image tag do?", a: "Provides alternative text for screen readers", o: ["Changes the image size", "Provides alternative text for screen readers", "Adds a border", "Creates a link"] },
          { q: "Which tag creates a hyperlink?", a: "<a>", o: ["<link>", "<a>", "<href>", "<nav>"] },
          { q: "What is a CSS class selector prefixed with?", a: ".", o: ["#", ".", "@", "&"] }
        ],
        "Artificial Intelligence": [
          { q: "What does NLP stand for in AI?", a: "Natural Language Processing", o: ["Natural Language Processing", "Neural Logic Programming", "Network Level Parsing", "Nominal Logic Processing"] },
          { q: "What is a Neural Network?", a: "A computing system inspired by the human brain", o: ["A computing system inspired by the human brain", "A physical internet cable", "A database index", "A strict set of if-else rules"] },
          { q: "What does LLM stand for?", a: "Large Language Model", o: ["Large Language Model", "Local Logic Machine", "Linear Learning Method", "Logical Language Matrix"] },
          { q: "Who is considered one of the founding fathers of AI?", a: "Alan Turing", o: ["Albert Einstein", "Alan Turing", "Isaac Newton", "Nikola Tesla"] },
          { q: "What is supervised learning?", a: "Training an algorithm on labeled data", o: ["Training an algorithm on labeled data", "Letting the AI learn by itself without guidance", "Programming exact rules", "Using random data"] },
          { q: "What is the Turing Test?", a: "A test of a machine's ability to exhibit intelligent behavior", o: ["A math exam", "A hardware stress test", "A test of a machine's ability to exhibit intelligent behavior", "A compilation error check"] },
          { q: "What is a common application of Computer Vision?", a: "Facial recognition", o: ["Sorting arrays", "Facial recognition", "Calculating taxes", "Writing poetry"] },
          { q: "What does Deep Learning rely heavily upon?", a: "Artificial neural networks with multiple layers", o: ["Hardcoded logic trees", "Artificial neural networks with multiple layers", "SQL databases", "Manual data entry"] },
          { q: "Which company created ChatGPT?", a: "OpenAI", o: ["Google", "Meta", "OpenAI", "Microsoft"] },
          { q: "What is Reinforcement Learning?", a: "Learning by interacting with an environment to maximize rewards", o: ["Learning by interacting with an environment to maximize rewards", "Memorizing text", "Reading a dictionary", "Compressing images"] }
        ]
      };

      // Fallback for custom topics
      const defaultQuestions = [
        { q: `What is a common use case for ${topic}?`, a: "Industry standard workflows", o: ["Industry standard workflows", "Not applicable", "Deprecation", "Hardware manipulation"] },
        { q: `How does ${topic} benefit developers?`, a: "Improved efficiency and tooling", o: ["Improved efficiency and tooling", "By being difficult to learn", "It doesn't", "It causes errors"] },
        { q: `Which of the following is associated with ${topic}?`, a: "Modern software ecosystems", o: ["Legacy mainframes", "Modern software ecosystems", "Typewriters", "Floppy disks"] },
        { q: `In the context of ${topic}, what is crucial?`, a: "Best practices and documentation", o: ["Guesswork", "Best practices and documentation", "Ignoring errors", "Deleting code"] },
        { q: `What describes ${topic} best?`, a: "A specialized tool or concept", o: ["A specialized tool or concept", "A food item", "A vehicle", "A country"] },
        { q: `Who uses ${topic}?`, a: "Professionals globally", o: ["Professionals globally", "Nobody", "Only students", "Only robots"] },
        { q: `Why is ${topic} popular?`, a: "Community support and capabilities", o: ["Community support and capabilities", "Because it is required by law", "It is the only option", "It is completely random"] },
        { q: `How often is ${topic} updated?`, a: "Regularly by maintainers", o: ["Regularly by maintainers", "Never", "Every century", "Once a day"] },
        { q: `Is ${topic} relevant today?`, a: "Yes, highly relevant", o: ["No", "Yes, highly relevant", "Only in the 90s", "It is banned"] },
        { q: `Where can you learn more about ${topic}?`, a: "Official documentation and courses", o: ["Official documentation and courses", "Nowhere", "A dictionary", "A novel"] }
      ];

      const selectedQuestions = mockDatabase[topic] || defaultQuestions;

      // Shuffle options and pick 10
      const mockQuestions = selectedQuestions.map((template, idx) => {
        // Simple shuffle for options
        const shuffledOptions = [...template.o].sort(() => Math.random() - 0.5);
        return {
          question: `[Mock ${randomId}] Q${idx + 1}: ${template.q}`,
          options: shuffledOptions,
          answer: template.a
        };
      });

      const mockQuiz = new Quiz({
        topic: `${topic} (Mock ${randomId})`,
        questions: mockQuestions
      });
      // We don't save mock quizzes to DB to prevent clutter
      return res.status(201).json(mockQuiz);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;
    // Strip markdown formatting if any
    rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

    const questions = JSON.parse(rawText);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid output format from AI");
    }

    // Save to DB
    const newQuiz = new Quiz({
      topic,
      questions
    });

    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz", details: error.message });
  }
};

const getTopics = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "topic");
    res.json(quizzes.map(q => q.topic));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ topic: new RegExp(`^${req.params.topic}$`, "i") });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

module.exports = { generateQuiz, getTopics, getQuiz };