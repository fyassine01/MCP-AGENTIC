#!/usr/bin/env python3
import asyncio
import json
import sys
from datetime import datetime
from typing import Any, Sequence
import httpx
from mcp.server.models import InitializationOptions
import mcp.types as types
from mcp.server import NotificationOptions, Server
import mcp.server.stdio


# Create server instance
server = Server("demo-server")

# Sample data store
NOTES_FILE = "notes.json"

def load_notes():
    """Load notes from JSON file"""
    try:
        with open(NOTES_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_notes(notes):
    """Save notes to JSON file"""
    with open(NOTES_FILE, 'w') as f:
        json.dump(notes, f, indent=2)

@server.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    """List available resources"""
    return [
        types.Resource(
            uri="C:/Users/remyy/Desktop/project_MCP/mcp-demo-project/notes_Storage",
            name="All Notes",
            description="All stored notes",
            mimeType="application/json",
        ),
        types.Resource(
            uri="weather://current",
            name="Current Weather",
            description="Current weather information",
            mimeType="text/plain",
        )
    ]

@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    """Read a specific resource"""
    if uri == "notes://all":
        notes = load_notes()
        return json.dumps(notes, indent=2)
    elif uri == "weather://current":
        # Mock weather data
        return f"Current weather: 22°C, Sunny (as of {datetime.now().strftime('%Y-%m-%d %H:%M')})"
    else:
        raise ValueError(f"Unknown resource: {uri}")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools"""
    return [
        types.Tool(
            name="add_note",
            description="Add a new note",
            inputSchema={
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Note title"
                    },
                    "content": {
                        "type": "string",
                        "description": "Note content"
                    }
                },
                "required": ["title", "content"]
            },
        ),
        types.Tool(
            name="list_notes",
            description="List all notes",
            inputSchema={
                "type": "object",
                "properties": {}
            },
        ),
        types.Tool(
            name="get_weather",
            description="Get weather information for a city",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City name"
                    }
                },
                "required": ["city"]
            },
        ),
        types.Tool(
            name="search_github",
            description="Search GitHub repositories",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query"
                    }
                },
                "required": ["query"]
            },
        )
    ]

@server.call_tool()
async def handle_call_tool(name: str, arguments: dict | None) -> list[types.TextContent]:
    """Handle tool calls"""
    if name == "add_note":
        notes = load_notes()
        new_note = {
            "id": len(notes) + 1,
            "title": arguments.get("title"),
            "content": arguments.get("content"),
            "created_at": datetime.now().isoformat()
        }
        notes.append(new_note)
        save_notes(notes)
        return [types.TextContent(
            type="text",
            text=f"Note added successfully! ID: {new_note['id']}"
        )]
    
    elif name == "list_notes":
        notes = load_notes()
        if not notes:
            return [types.TextContent(type="text", text="No notes found.")]
        
        notes_text = "All Notes:\n"
        for note in notes:
            notes_text += f"ID: {note['id']}\n"
            notes_text += f"Title: {note['title']}\n"
            notes_text += f"Content: {note['content']}\n"
            notes_text += f"Created: {note['created_at']}\n\n"
        
        return [types.TextContent(type="text", text=notes_text)]
    
    elif name == "get_weather":
        city = arguments.get("city", "Unknown")
        # Mock weather API response
        weather_info = f"Weather for {city}:\nTemperature: 25°C\nCondition: Partly Cloudy\nHumidity: 60%\nWind: 10 km/h"
        return [types.TextContent(type="text", text=weather_info)]
    
    elif name == "search_github":
        query = arguments.get("query")
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://api.github.com/search/repositories",
                    params={"q": query, "sort": "stars", "order": "desc", "per_page": 5}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    results = []
                    for repo in data.get("items", [])[:3]:
                        results.append(f"• {repo['full_name']} - {repo['description'] or 'No description'} (⭐ {repo['stargazers_count']})")
                    
                    return [types.TextContent(
                        type="text",
                        text=f"Top GitHub repositories for '{query}':\n\n" + "\n".join(results)
                    )]
                else:
                    return [types.TextContent(
                        type="text",
                        text=f"Failed to search GitHub: {response.status_code}"
                    )]
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"Error searching GitHub: {str(e)}"
            )]
    
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    # Run the server using stdio transport
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="demo-server",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
