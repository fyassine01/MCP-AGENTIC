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
```

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
```
Or use the launch helper:

```bash
python run_server.py
```
🧩 TypeScript MCP Server Setup
Step 1: Initialize Project
```bash
cd typescript-server
npm install
npm run build
Step 2: Run Server
bash
npm start
For hot reload (dev mode):

```bash
npm run dev
```
🤖 Claude Desktop Integration
Add this config in:
```
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
```
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

<img width="1085" height="425" alt="Screenshot 2025-06-19 190415" src="https://github.com/user-attachments/assets/a214b2d4-a787-47b2-9aaf-8090c1806833" />
<img width="751" height="565" alt="Screenshot 2025-06-19 185951" src="https://github.com/user-attachments/assets/1a627fb5-e438-4664-80ce-c9361e523258" />
<img width="1052" height="526" alt="Screenshot 2025-06-19 183151" src="https://github.com/user-attachments/assets/0cf30c3b-f7e6-474b-931e-e6e6d668c3bf" />
<img width="466" height="285" alt="Screenshot 2025-06-19 182919" src="https://github.com/user-attachments/assets/108cc9dd-019f-4c4c-b62b-8cb0a43ab7e3" />
<img width="478" height="283" alt="Screenshot 2025-06-19 182906" src="https://github.com/user-attachments/assets/35b2b1e9-89e3-440c-b56b-04c53abeb883" />
<img width="1919" height="1079" alt="Screenshot 2025-06-18 190236" src="https://github.com/user-attachments/assets/0d19a82c-3703-4af3-80a5-5cdb50ff16ca" />
<img width="1157" height="831" alt="Screenshot 2025-06-18 182053" src="https://github.com/user-attachments/assets/8ccaf9db-eac3-4deb-af02-c0ac55499ff2" />
<img width="1162" height="826" alt="Screenshot 2025-06-18 123413" src="https://github.com/user-attachments/assets/c774c1e9-01b8-4e57-9ed4-4ee5755ff87f" />
<img width="1219" height="722" alt="Screenshot 2025-06-18 101839" src="https://github.com/user-attachments/assets/5f49b477-c36a-4428-899e-2c3c5f0aaf87" />
<img width="877" height="871" alt="Screenshot 2025-06-16 154734" src="https://github.com/user-attachments/assets/817e5788-01fa-4bde-84ce-c923de45f13b" />
<img width="1082" height="592" alt="Screenshot 2025-06-19 192134" src="https://github.com/user-attachments/assets/03e3b121-e4eb-4514-bf79-30d0b71e8ee3" />
<img width="750" height="555" alt="Screenshot 2025-06-19 192117" src="https://github.com/user-attachments/assets/93170e29-d7bc-4499-804c-058eab211a32" />
<img width="1093" height="593" alt="Screenshot 2025-06-19 192001" src="https://github.com/user-attachments/assets/415ab8d7-9ac2-41d4-98ea-ab78158edbb4" />
<img width="755" height="557" alt="Screenshot 2025-06-19 191913" src="https://github.com/user-attachments/assets/50e9c068-c805-42b3-acea-584517dc06f1" />

