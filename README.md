Agent Operations Lab was created as a learning project to explore the architecture behind AI agents and AI-powered research systems.

The current workflow allows an agent to:

Receive a research objective
Determine what information it needs
Search the web using the Tavily Search API
Read relevant webpages
Collect and structure evidence
Analyse the information using an LLM
Return structured research findings for human review

The goal is not to replace human decision-making but to explore how AI can assist with research, discovery and information gathering.

Current Architecture
User
  │
  ▼
Next.js Application
  │
  ▼
Agent API
  │
  ▼
Agent Orchestration
  │
  ├── Web Search Tool
  │       │
  │       └── Tavily Search API
  │
  ├── Webpage Reader
  │
  ├── Evidence Collection
  │
  └── Research Schema
  │
  ▼
LLM Analysis
  │
  ▼
Structured Research Results

The application separates the agent's reasoning and tool execution from the user interface, allowing the system to evolve as additional tools and workflows are introduced.

Features
AI Agent

The project uses an LLM-driven agent capable of selecting and invoking tools as part of a research workflow.

Web Search

Uses the Tavily Web Search API to retrieve relevant web results for research tasks.

Webpage Reading

The agent can retrieve and process information from webpages discovered during its research process.

Evidence Collection

Research findings are structured around individual pieces of evidence rather than relying solely on a final generated response.

Structured Research

Research outputs are defined using schemas so that information can be returned in a predictable format rather than as unstructured text.

Multi-Step Research

The agent can perform multiple searches and webpage reads as it works toward a research objective.

Technology Stack
Next.js
React
TypeScript
Tailwind CSS
Tavily Web Search API
LLM APIs
REST API routes
Node.js
Project Structure
agent-operations-lab/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── agent/
│   │   │       └── route.ts
│   │   │
│   │   └── page.tsx
│   │
│   └── lib/
│       ├── agent/
│       │   ├── runAgent.ts
│       │   ├── toolDefinitions.ts
│       │   └── types.ts
│       │
│       ├── research/
│       │   ├── evidence.ts
│       │   └── opportunitySchema.ts
│       │
│       └── tools/
│           ├── readWebpage.ts
│           └── searchWeb.ts
│
├── public/
├── package.json
└── README.md
Example Research Workflow

A typical research request can follow a workflow similar to:

Research Objective
       │
       ▼
   Agent decides
   what it needs
       │
       ▼
   Web Search
       │
       ▼
   Search Results
       │
       ▼
 Select relevant sources
       │
       ▼
 Read webpages
       │
       ▼
 Collect evidence
       │
       ▼
 Analyse evidence
       │
       ▼
 Structured findings

This workflow is intentionally designed around tool use and evidence, rather than simply asking an LLM to generate an answer from its existing knowledge.

Why I Built This

Most of my previous development work has focused on traditional web applications including dashboards, authentication, databases, state management and user-facing workflows.

Agent Operations Lab represents a new direction in my development journey:

How can software systems use AI to interact with tools, gather information, and perform useful multi-step tasks?

This project is my practical exploration of that question.

It also gives me an opportunity to combine my existing web development skills with emerging AI application patterns.

Create a .env.local file in the project root and add the required API credentials.

Example:

TAVILY_API_KEY=your_tavily_api_key
YOUR_LLM_API_KEY=your_llm_api_key

Never commit .env.local or API keys to GitHub.

Running Locally

Clone the repository:

git clone https://github.com/LupiwoPhillips/agent-operations-lab.git
cd agent-operations-lab

Install dependencies:

npm install

Create your environment file:

.env.local

Add your API credentials, then start the development server:

npm run dev

Open:

http://localhost:3000
Status

This project is actively being developed as a practical exploration of AI agents, web research, and AI-powered software systems.

The architecture and functionality will continue to evolve as new concepts are learned and implemented.