# Agent Operations Lab

Agent Operations Lab is an AI powered research application designed to identify and analyse potential business opportunities by combining **web search, AI integration and structured research workflows**. 
The project explores how AI agents can use external tools to gather information, analyse evidence and produce structured research findings for human review.


## Current Architecture

```text
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
 │      │
 │      └── Tavily Search API
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
```

The application separates the agent's orchestration and tool execution from the user interface allowing additional tools and research workflows to be introduced over time.

## Features

### AI Agent

Uses an LLM-driven agent capable of selecting and invoking tools as part of a multi-step research workflow.

### Web Search

Uses the Tavily Web Search API to discover relevant information and sources from the web.

### Webpage Reading

Retrieves and processes information from webpages identified during the research process.

### Evidence Collection

Collects and structures supporting information from research sources rather than relying solely on generated responses.

### Structured Research

Uses defined schemas to return research findings in a predictable and structured format.

### Multi-Step Research

Allows the agent to perform multiple searches and webpage reads to investigate a research objective.

## Research Workflow

```text
Research Objective
       │
       ▼
Agent determines
what information it needs
       │
       ▼
Web Search
       │
       ▼
Search Results
       │
       ▼
Select Relevant Sources
       │
       ▼
Read Webpages
       │
       ▼
Collect Evidence
       │
       ▼
Analyse Evidence
       │
       ▼
Structured Findings
```

The workflow is designed around **tool use, external information, and evidence collection** rather than simply asking an LLM to generate an answer from its existing knowledge.

## Technology Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Node.js
* Tavily Web Search API
* LLM APIs
* REST API Routes

## Environment Variables

Create a `.env.local` file in the project root and add the required API credentials:

```env
TAVILY_API_KEY=your_tavily_api_key
YOUR_LLM_API_KEY=your_llm_api_key
```

**Never commit `.env.local` or API keys to GitHub.**

## Running Locally

Clone the repository:

```bash
git clone https://github.com/LupiwoPhillips/agent-operations-lab.git
cd agent-operations-lab
```

Install dependencies:

```bash
npm install
```

Create your `.env.local` file and add the required API credentials.

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Why I Built This

My previous development work has primarily focused on traditional web applications including dashboards, databases, authentication, state management and user-facing workflows.

Agent Operations Lab represents an expansion into **AI powered applications and agent-based systems** exploring how software can use AI to interact with external tools, gather information, and perform useful multi-step research.
