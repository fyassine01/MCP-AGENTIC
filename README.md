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
<img width="1919" height="1079" alt="Screenshot 2025-06-18 190236" src="https://github.com/user-attachments/assets/3963b088-4245-4b28-b992-f196ad4b2273" />
<img width="1157" height="831" alt="Screenshot 2025-06-18 182053" src="https://github.com/user-attachments/assets/5d14f590-6562-45ff-8a16-422f6ad2b0ad" />
<img width="1162" height="826" alt="Screenshot 2025-06-18 123413" src="https://github.com/user-attachments/assets/8255e3a0-1d81-450a-a209-7d6b8e945ce0" />
<img width="1219" height="722" alt="Screenshot 2025-06-18 101839" src="https://github.com/user-attachments/assets/6a97d8ac-c661-4b6b-837f-481f2c655a5c" />
<img width="873" height="871" alt="Screenshot 2025-06-16 155227" src="https://github.com/user-attachments/assets/e2b1d25c-ec6f-438d-aca3-924242b2826e" />
<img width="750" height="555" alt="Screenshot 2025-06-19 192117" src="https://github.com/user-attachments/assets/38beb80e-79eb-48b2-8121-fc9d6ad3c478" />
<img width="1093" height="593" alt="Screenshot 2025-06-19 192001" src="https://github.com/user-attachments/assets/4f4df75e-02d4-4327-bc7e-23fdbca62b16" />
<img width="755" height="557" alt="Screenshot 2025-06-19 191913" src="https://github.com/user-attachments/assets/30996119-2315-4dc4-a98c-8c71753745f0" />
<img width="1085" height="425" alt="Screenshot 2025-06-19 190415" src="https://github.com/user-attachments/assets/bd269706-7b12-430c-ae04-61bbfdbd2bc6" />
<img width="751" height="565" alt="Screenshot 2025-06-19 185951" src="https://github.com/user-attachments/assets/31d5813c-4dfb-4442-b4c6-5731173d659e" />
<img width="1130" height="571" alt="Screenshot 2025-06-19 185026" src="https://github.com/user-attachments/assets/006ef240-8a08-4e08-ad19-12dedc9d166c" />
<img width="756" height="557" alt="Screenshot 2025-06-19 184948" src="https://github.com/user-attachments/assets/f16c7b78-7d6f-4e8b-b2ff-fc41b611ca8b" />
<img width="1052" height="526" alt="Screenshot 2025-06-19 183151" src="https://github.com/user-attachments/assets/893da144-ebd0-4df5-81ec-86b44d7cb0f6" />
<img width="466" height="285" alt="Screenshot 2025-06-19 182919" src="https://github.com/user-attachments/assets/e4870bad-e21e-4154-b2e3-162001332ac2" />
<img width="478" height="283" alt="Screenshot 2025-06-19 182906" src="https://github.com/user-attachments/assets/d1bf96e6-c866-40d8-88c1-e565d2daef3d" />

