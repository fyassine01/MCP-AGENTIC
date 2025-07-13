# 🔌 Complete MCP (Model Context Protocol) Demo Project

**By Yassine FARAH**

This project demonstrates a full-stack implementation of the [Model Context Protocol (MCP)](https://modelcontextprotocol.io), a standardized way to connect LLMs to external data, tools, and services — think of it like **USB-C for AI apps**.

---

## 📦 Project Overview

You’ll build and compare:

✅ A **Python MCP Server**  
✅ A **TypeScript MCP Server**  
✅ Integration with the **Claude Desktop app**  
✅ Real-time access to:
- Notes
- Todos
- Weather
- GitHub search
- File system
- System info

---

## ⚙️ Prerequisites

- ✅ Python 3.8+
- ✅ Node.js 18+
- ✅ Git
- ✅ Claude Desktop (https://claude.ai/download)
- ✅ Basic knowledge of Python & TypeScript

---

## 🧱 Project Structure

```bash
mcp-demo-project/
├── python-server/         # Python MCP server
├── typescript-server/     # TypeScript MCP server
├── config/                # MCP config files
├── examples/              # Optional examples/demos
└── README.md              # 📄 You are here

# MCP Demo Project
mcp-demo-project/
├── python-server/ # Python MCP server
├── typescript-server/ # TypeScript MCP server
├── config/ # MCP config files
├── examples/ # Optional examples/demos
└── README.md # 📄 You are here

text

## 🐍 Python MCP Server Setup

### Step 1: Environment Setup
```bash
cd python-server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Step 2: Run the Server
bash
python server.py
Or use the launch helper:

bash
python run_server.py
🧩 TypeScript MCP Server Setup
Step 1: Initialize Project
bash
cd typescript-server
npm install
npm run build
Step 2: Run Server
bash
npm start
For hot reload (dev mode):

bash
npm run dev
🤖 Claude Desktop Integration
Add this config in:

Windows: %APPDATA%\Claude\claude_desktop_config.json

macOS: ~/Library/Application Support/Claude/claude_desktop_config.json

json
{
  "mcpServers": {
    "python-demo": {
      "command": "python",
      "args": ["absolute/path/to/python-server/server.py"]
    },
    "typescript-demo": {
      "command": "node",
      "args": ["absolute/path/to/typescript-server/dist/server.js"]
    }
  }
}
Restart Claude Desktop

MCP servers should now be auto-connected. You can start asking:

"Add a note with title 'Test'"

"List all notes"

"What's the weather in Casablanca?"

"Search GitHub for 'LLM server'"

"Add a todo: Finish MCP project"

"List todos"

🚀 Deployment
Dockerfile (Python server)
dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY python-server/requirements.txt .
RUN pip install -r requirements.txt
COPY python-server/ .
CMD ["python", "server.py"]
Docker Compose (Optional)
yaml
services:
  python-mcp:
    build: .
    volumes:
      - ./data:/app/data
    stdin_open: true
    tty: true
🧪 Testing & Debugging
Test direct:

bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}' | python server.py
bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}' | npm start
🔐 Advanced Features
✅ SQLite support (pip install sqlite3)

✅ File system browsing

✅ GitHub search via API

✅ Weather info (mocked)

✅ Modular Tool and Resource structure

🧠 Next Steps
Add real authentication (e.g. for GitHub API)

Build more tools (PDF parser, calendar, translator, etc.)

Streamline for production using Docker/Kubernetes

Implement real-time streaming + WebSocket support

Connect to your business or LLM product

📚 Resources
🌐 MCP Spec

🐍 Python SDK

🧑‍💻 TypeScript SDK

🧪 Example Servers
<img width="877" height="871" alt="Screenshot 2025-06-16 154734" src="https://github.com/user-attachments/assets/bfb13348-44c2-439b-b5d9-ac9b2a1cc6f0" />


