#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import https from "https";

// Create server instance
const server = new Server(
  {
    name: "typescript-demo-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Sample data
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

const TODOS_FILE = "todos.json";

async function loadTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(TODOS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "todos://all",
        name: "All Todos",
        description: "All todo items",
        mimeType: "application/json",
      },
      {
        uri: "system://info",
        name: "System Info",
        description: "System information",
        mimeType: "text/plain",
      },
    ],
  };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "todos://all": {
      const todos = await loadTodos();
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(todos, null, 2),
          },
        ],
      };
    }
    case "system://info": {
      const info = `System Information:
- Platform: ${process.platform}
- Node Version: ${process.version}
- Architecture: ${process.arch}
- Uptime: ${process.uptime()} seconds`;
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: info,
          },
        ],
      };
    }
    default:
      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
  }
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add_todo",
        description: "Add a new todo item",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Todo title",
            },
          },
          required: ["title"],
        },
      },
      {
        name: "list_todos",
        description: "List all todo items",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "toggle_todo",
        description: "Toggle todo completion status",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Todo ID",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "fetch_url",
        description: "Fetch content from a URL",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "URL to fetch",
            },
          },
          required: ["url"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Validate args is not undefined
  if (!args) {
    throw new McpError(ErrorCode.InvalidRequest, "Missing arguments");
  }

  switch (name) {
    case "add_todo": {
      const title = args.title;
      if (typeof title !== "string") {
        throw new McpError(ErrorCode.InvalidRequest, "Title must be a string");
      }

      const todos = await loadTodos();
      const newTodo: Todo = {
        id: todos.length + 1,
        title: title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      todos.push(newTodo);
      await saveTodos(todos);

      return {
        content: [
          {
            type: "text",
            text: `Todo added successfully! ID: ${newTodo.id}`,
          },
        ],
      };
    }

    case "list_todos": {
      const todos = await loadTodos();
      if (todos.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No todos found.",
            },
          ],
        };
      }

      const todoList = todos
        .map((todo) => `${todo.id}. [${todo.completed ? "✓" : " "}] ${todo.title}`)
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Todos:\n${todoList}`,
          },
        ],
      };
    }

    case "toggle_todo": {
      const todoId = args.id;
      if (typeof todoId !== "number") {
        throw new McpError(ErrorCode.InvalidRequest, "ID must be a number");
      }

      const todos = await loadTodos();
      const todo = todos.find((t) => t.id === todoId);

      if (!todo) {
        throw new McpError(ErrorCode.InvalidRequest, `Todo with ID ${todoId} not found`);
      }

      todo.completed = !todo.completed;
      await saveTodos(todos);

      return {
        content: [
          {
            type: "text",
            text: `Todo ${todoId} marked as ${todo.completed ? "completed" : "incomplete"}`,
          },
        ],
      };
    }

    case "fetch_url": {
      const url = args.url;
      if (typeof url !== "string") {
        throw new McpError(ErrorCode.InvalidRequest, "URL must be a string");
      }
      
      return new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve({
              content: [
                {
                  type: "text",
                  text: `Content from ${url}:\n\n${data.slice(0, 1000)}${data.length > 1000 ? "..." : ""}`,
                },
              ],
            });
          });
        }).on("error", (err) => {
          reject(new McpError(ErrorCode.InternalError, `Failed to fetch URL: ${err.message}`));
        });
      });
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("TypeScript MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
