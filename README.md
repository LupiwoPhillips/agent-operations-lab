# Agent Operations Lab

Agent Operations Lab (AOL) is an AI-powered research application for investigating business opportunities using **web search, AI analysis, external tools, and structured research workflows**.

The project explores how AI agents can move beyond generating text and instead **research real-world information, interact with tools, collect evidence, and produce structured findings for human review**.

AOL is designed as an evolving platform rather than a single-purpose application with the goal of experimenting with different AI agents, tools, research workflows and business use cases.

---

## What It Does

Agent Operations Lab allows a user to define a research objective and have an AI agent investigate it using external information.

The agent can:

* Understand a research objective
* Determine what information is needed
* Search the web for relevant information
* Identify potentially useful sources
* Read information from webpages
* Collect supporting evidence
* Analyse the gathered information
* Organise findings into structured results
* Return research that can be reviewed by a human

The goal is not to replace human decision-making instead AOL is built around the idea of **AI-assisted research**, where the agent handles information gathering and analysis while the human remains responsible for evaluating the findings and making decisions.

---

## Current Features

### AI Research Agent

Uses an LLM to reason through research objectives and determine which tools and information it needs during an investigation.

### Web Search

Uses the **Tavily Web Search API** to discover relevant information and sources across the web.

### Webpage Research

Allows the research workflow to retrieve and process information from webpages discovered during a search.

### Evidence Collection

Research findings are supported by information gathered from external sources rather than relying entirely on the model's existing knowledge.

### Structured Research

Research outputs follow defined structures so that findings can be consistently processed and displayed by the application.

### Multi-Step Research

The agent can perform multiple research actions as part of a single investigation rather than relying on one search or one AI response.

---

## Research Process

A typical investigation follows a process similar to:

```text
Research Objective
        ↓
Determine Information Needed
        ↓
Search the Web
        ↓
Identify Relevant Sources
        ↓
Read Sources
        ↓
Collect Evidence
        ↓
Analyse Information
        ↓
Generate Structured Findings
        ↓
Human Review
```

The exact workflow is continuously evolving as new capabilities are added to the platform.

---

## Technology

Agent Operations Lab is currently built with:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Node.js
* Tavily Web Search API
* LLM APIs
* REST API routes

Additional tools and technologies may be introduced as the project evolves.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LupiwoPhillips/agent-operations-lab.git

cd agent-operations-lab
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
TAVILY_API_KEY=your_tavily_api_key
YOUR_LLM_API_KEY=your_llm_api_key
```

Never commit `.env.local` or API keys to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Project Direction

Agent Operations Lab is being developed as a **general AI agent experimentation and research platform**, rather than being restricted to a single business research workflow.

Future iterations may explore:

* Additional AI agents
* Additional external tools
* Automated research workflows
* Different research domains
* Opportunity discovery
* Competitive research
* Market research
* Business intelligence
* Data extraction
* Source verification
* Agent-to-agent workflows
* Human-in-the-loop systems
* Automated reporting
* AI-assisted decision-support systems

The objective is to build the underlying capabilities gradually and allow the platform to expand as new use cases are discovered.

---

## Why I Built This

My previous development work has primarily focused on traditional web applications involving interfaces, dashboards, databases, authentication, state management, and user workflows.

Agent Operations Lab represents the next step in that progression. Instead of building applications where software only responds to user actions, AOL explores how software can **reason about a task, use external tools, gather information, and complete multi-step workflows**.

The project is an opportunity to develop practical experience with:

* AI agents
* Tool calling
* LLM integration
* Web research
* Evidence-based AI systems
* Structured outputs
* Agent orchestration
* Human-in-the-loop workflows

AOL is ultimately an exploration of how traditional software engineering can be combined with AI systems to build applications that can **actively perform useful work**.

---

## Status

**Active Development**

Agent Operations Lab is an ongoing project. Features, workflows, tools, and the underlying implementation are continuously being improved as the platform evolves.
