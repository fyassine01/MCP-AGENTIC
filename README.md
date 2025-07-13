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

<img width="750" height="555" alt="Screenshot 2025-06-19 192117" src="https://github.com/user-attachments/assets/280074fe-0fae-4d2b-8aaa-e164c7b175be" />
<img width="1093" height="593" alt="Screenshot 2025-06-19 192001" src="https://github.com/user-attachments/assets/0a48a7b0-6d7c-4d4d-a07e-c23a15ebb643" />
<img width="755" height="557" alt="Screenshot 2025-06-19 191913" src="https://github.com/user-attachments/assets/f1950d8c-a4cd-45d2-9341-9bc3a5180c43" />
<img width="1085" height="425" alt="Screenshot 2025-06-19 190415" src="https://github.com/user-attachments/assets/8b34f78f-2ae1-4e60-8154-daa8b37e53e7" />
<img width="751" height="565" alt="Screenshot 2025-06-19 185951" src="https://github.com/user-attachments/assets/67c1a0f0-ee33-428b-8945-1c75d15b72ad" />
<img width="1130" height="571" alt="Screenshot 2025-06-19 185026" src="https://github.com/user-attachments/assets/40ba0286-4066-43f5-8b1d-6a3995802cf0" />
<img width="756" height="557" alt="Screenshot 2025-06-19 184948" src="https://github.com/user-attachments/assets/511851b6-27a7-44de-ba31-01f49cd87c50" />
<img width="1052" height="526" alt="Screenshot 2025-06-19 183151" src="https://github.com/user-attachments/assets/08cb403d-376f-4808-8dde-4a612c0ffea0" />
<img width="466" height="285" alt="Screenshot 2025-06-19 182919" src="https://github.com/user-attachments/assets/96666707-6736-4117-bea8-353fa8f833d3" />
<img width="478" height="283" alt="Screenshot 2025-06-19 182906" src="https://github.com/user-attachments/assets/427c59d4-ad7b-4ebd-8965-a298a9f419d4" />
<img width="1919" height="1079" alt="Screenshot 2025-06-18 190236" src="https://github.com/user-attachments/assets/4e79930d-de9f-4ace-813c-06e03821ff21" />
<img width="1219" height="722" alt="Screenshot 2025-06-18 101839" src="https://github.com/user-attachments/assets/6595e1d3-d049-4d3a-b49a-dae70ebeb21d" />
<img width="877" height="871" alt="Screenshot 2025-06-16 154734" src="https://github.com/user-attachments/assets/0e462c9c-dece-46f4-b1d5-12e8b6c0c7a1" />
<img width="1082" height="592" alt="Screenshot 2025-06-19 192134" src="https://github.com/user-attachments/assets/40cd8d08-594f-4c18-8ac1-943b9d78369c" />

