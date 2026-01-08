# Custom Memory MCP Server Setup Guide

## Overview
This guide will help Claude Code build a custom Memory MCP (Model Context Protocol) server that provides persistent memory across sessions using a knowledge graph structure. The server enables agents to remember project context, decisions, code relationships, and learning patterns.

## Architecture

```
Claude/Agents ←→ MCP Protocol ←→ Memory Server ←→ Knowledge Graph (JSONL)
                                        ↓
                                 [Entities & Relations]
```

## Implementation Instructions

### Step 1: Project Structure

Create the following directory structure:
```
memory-mcp-server/
├── src/
│   ├── __init__.py
│   ├── memory_store.py      # Core knowledge graph implementation
│   ├── mcp_server.py        # MCP server implementation
│   └── tools.py             # MCP tool definitions
├── requirements.txt
├── setup.py
├── Dockerfile (optional)
├── docker-compose.yml (optional)
└── README.md
```

### Step 2: Core Implementation Files

#### File: `requirements.txt`
```txt
mcp>=0.1.0
pydantic>=2.0
jsonlines>=3.1.0
typing-extensions>=4.8.0
python-dotenv>=1.0.0
```

#### File: `src/memory_store.py`
```python
"""
Knowledge Graph Memory Store
Handles persistent storage of entities and relationships in JSONL format
"""

import json
import jsonlines
import os
from typing import List, Dict, Any, Optional, Set
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, asdict

@dataclass
class Entity:
    name: str
    entity_type: str
    observations: List[str]
    metadata: Dict[str, Any] = None
    created_at: str = None
    updated_at: str = None
    importance: float = 0.5
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.utcnow().isoformat()
        if self.updated_at is None:
            self.updated_at = self.created_at
        if self.metadata is None:
            self.metadata = {}

@dataclass
class Relation:
    from_entity: str
    to_entity: str
    relation_type: str
    metadata: Dict[str, Any] = None
    created_at: str = None
    strength: float = 1.0
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.utcnow().isoformat()
        if self.metadata is None:
            self.metadata = {}

class KnowledgeGraphMemory:
    def __init__(self, file_path: str = None):
        self.file_path = Path(file_path or os.getenv('MEMORY_FILE_PATH', 'memory.jsonl'))
        self.entities: Dict[str, Entity] = {}
        self.relations: List[Relation] = []
        self.load()
    
    def load(self):
        """Load knowledge graph from JSONL file"""
        if not self.file_path.exists():
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            self.save()
            return
        
        self.entities = {}
        self.relations = []
        
        try:
            with jsonlines.open(self.file_path, 'r') as reader:
                for obj in reader:
                    if obj.get('type') == 'entity':
                        entity = Entity(
                            name=obj['name'],
                            entity_type=obj['entity_type'],
                            observations=obj.get('observations', []),
                            metadata=obj.get('metadata', {}),
                            created_at=obj.get('created_at'),
                            updated_at=obj.get('updated_at'),
                            importance=obj.get('importance', 0.5)
                        )
                        self.entities[entity.name] = entity
                    elif obj.get('type') == 'relation':
                        relation = Relation(
                            from_entity=obj['from_entity'],
                            to_entity=obj['to_entity'],
                            relation_type=obj['relation_type'],
                            metadata=obj.get('metadata', {}),
                            created_at=obj.get('created_at'),
                            strength=obj.get('strength', 1.0)
                        )
                        self.relations.append(relation)
        except Exception as e:
            print(f"Error loading memory: {e}")
            self.entities = {}
            self.relations = []
    
    def save(self):
        """Save complete graph back to JSONL file"""
        try:
            with jsonlines.open(self.file_path, 'w') as writer:
                # Write entities
                for entity in self.entities.values():
                    obj = asdict(entity)
                    obj['type'] = 'entity'
                    writer.write(obj)
                
                # Write relations
                for relation in self.relations:
                    obj = asdict(relation)
                    obj['type'] = 'relation'
                    writer.write(obj)
        except Exception as e:
            print(f"Error saving memory: {e}")
    
    def create_entities(self, entities: List[Dict[str, Any]]) -> int:
        """Create multiple entities"""
        count = 0
        for entity_data in entities:
            entity = Entity(
                name=entity_data['name'],
                entity_type=entity_data['entity_type'],
                observations=entity_data.get('observations', []),
                metadata=entity_data.get('metadata', {}),
                importance=entity_data.get('importance', 0.5)
            )
            
            if entity.name in self.entities:
                # Update existing entity
                existing = self.entities[entity.name]
                existing.observations.extend(entity.observations)
                existing.observations = list(set(existing.observations))  # Remove duplicates
                existing.updated_at = datetime.utcnow().isoformat()
                existing.importance = max(existing.importance, entity.importance)
            else:
                self.entities[entity.name] = entity
                count += 1
        
        self.save()
        return count
    
    def create_relations(self, relations: List[Dict[str, Any]]) -> int:
        """Create multiple relations"""
        count = 0
        for rel_data in relations:
            # Check if relation already exists
            exists = any(
                r.from_entity == rel_data['from'] and
                r.to_entity == rel_data['to'] and
                r.relation_type == rel_data['relation_type']
                for r in self.relations
            )
            
            if not exists:
                relation = Relation(
                    from_entity=rel_data['from'],
                    to_entity=rel_data['to'],
                    relation_type=rel_data['relation_type'],
                    metadata=rel_data.get('metadata', {}),
                    strength=rel_data.get('strength', 1.0)
                )
                self.relations.append(relation)
                count += 1
        
        self.save()
        return count
    
    def add_observations(self, observations: List[Dict[str, Any]]) -> int:
        """Add observations to existing entities"""
        count = 0
        for obs_data in observations:
            entity_name = obs_data['entity_name']
            if entity_name in self.entities:
                entity = self.entities[entity_name]
                new_obs = obs_data['contents']
                for obs in new_obs:
                    if obs not in entity.observations:
                        entity.observations.append(obs)
                        count += 1
                entity.updated_at = datetime.utcnow().isoformat()
        
        self.save()
        return count
    
    def search_nodes(self, query: str) -> List[Dict[str, Any]]:
        """Search entities by name, type, or observations"""
        results = []
        query_lower = query.lower()
        
        for entity in self.entities.values():
            score = 0
            
            # Check name (highest weight)
            if query_lower in entity.name.lower():
                score += 3
            
            # Check entity type
            if query_lower in entity.entity_type.lower():
                score += 2
            
            # Check observations
            for obs in entity.observations:
                if query_lower in obs.lower():
                    score += 1
                    break
            
            if score > 0:
                result = asdict(entity)
                result['relevance_score'] = score
                results.append(result)
        
        # Sort by relevance and importance
        results.sort(key=lambda x: (x['relevance_score'], x.get('importance', 0)), reverse=True)
        return results[:20]  # Return top 20 results
    
    def open_nodes(self, names: List[str]) -> List[Dict[str, Any]]:
        """Get specific entities by name with their relations"""
        results = []
        for name in names:
            if name in self.entities:
                entity = self.entities[name]
                entity_dict = asdict(entity)
                
                # Add relations
                entity_dict['relations'] = {
                    'outgoing': [],
                    'incoming': []
                }
                
                for relation in self.relations:
                    if relation.from_entity == name:
                        entity_dict['relations']['outgoing'].append({
                            'to': relation.to_entity,
                            'type': relation.relation_type,
                            'strength': relation.strength
                        })
                    elif relation.to_entity == name:
                        entity_dict['relations']['incoming'].append({
                            'from': relation.from_entity,
                            'type': relation.relation_type,
                            'strength': relation.strength
                        })
                
                results.append(entity_dict)
        
        return results
    
    def read_graph(self) -> Dict[str, Any]:
        """Return the entire knowledge graph"""
        return {
            'entities': [asdict(e) for e in self.entities.values()],
            'relations': [asdict(r) for r in self.relations],
            'stats': {
                'total_entities': len(self.entities),
                'total_relations': len(self.relations),
                'entity_types': list(set(e.entity_type for e in self.entities.values()))
            }
        }
    
    def delete_entities(self, entity_names: List[str]) -> int:
        """Delete entities and their relations"""
        count = 0
        for name in entity_names:
            if name in self.entities:
                del self.entities[name]
                count += 1
                
                # Remove related relations
                self.relations = [
                    r for r in self.relations
                    if r.from_entity != name and r.to_entity != name
                ]
        
        self.save()
        return count
    
    def delete_observations(self, deletions: List[Dict[str, Any]]) -> int:
        """Delete specific observations from entities"""
        count = 0
        for deletion in deletions:
            entity_name = deletion['entity_name']
            if entity_name in self.entities:
                entity = self.entities[entity_name]
                obs_to_delete = deletion['observations']
                for obs in obs_to_delete:
                    if obs in entity.observations:
                        entity.observations.remove(obs)
                        count += 1
                entity.updated_at = datetime.utcnow().isoformat()
        
        self.save()
        return count
    
    def delete_relations(self, relations: List[Dict[str, Any]]) -> int:
        """Delete specific relations"""
        count = 0
        for rel_data in relations:
            self.relations = [
                r for r in self.relations
                if not (r.from_entity == rel_data['from'] and
                       r.to_entity == rel_data['to'] and
                       r.relation_type == rel_data['relation_type'])
            ]
            count += 1
        
        self.save()
        return count
```

#### File: `src/mcp_server.py`
```python
"""
MCP Server Implementation
Provides the MCP interface for the knowledge graph memory
"""

import asyncio
import json
import os
from typing import Any, Dict, List
from mcp.server import Server
from mcp.types import (
    Tool,
    TextContent,
    Resource,
    ResourceTemplate
)
from .memory_store import KnowledgeGraphMemory

# Initialize memory store
memory = KnowledgeGraphMemory()

# Create MCP server
app = Server("memory-server")

# Tool definitions
TOOLS = [
    Tool(
        name="memory:create_entities",
        description="Create multiple new entities in the knowledge graph",
        inputSchema={
            "type": "object",
            "properties": {
                "entities": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string", "description": "Unique name of the entity"},
                            "entity_type": {"type": "string", "description": "Type of entity (e.g., project, feature, bug, person)"},
                            "observations": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "List of observations about the entity"
                            },
                            "importance": {"type": "number", "minimum": 0, "maximum": 1, "default": 0.5}
                        },
                        "required": ["name", "entity_type"]
                    }
                }
            },
            "required": ["entities"]
        }
    ),
    Tool(
        name="memory:create_relations",
        description="Create relations between entities in the knowledge graph",
        inputSchema={
            "type": "object",
            "properties": {
                "relations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "from": {"type": "string", "description": "Source entity name"},
                            "to": {"type": "string", "description": "Target entity name"},
                            "relation_type": {"type": "string", "description": "Type of relation (e.g., uses, contains, depends_on)"},
                            "strength": {"type": "number", "minimum": 0, "maximum": 1, "default": 1.0}
                        },
                        "required": ["from", "to", "relation_type"]
                    }
                }
            },
            "required": ["relations"]
        }
    ),
    Tool(
        name="memory:add_observations",
        description="Add new observations to existing entities",
        inputSchema={
            "type": "object",
            "properties": {
                "observations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "entity_name": {"type": "string"},
                            "contents": {
                                "type": "array",
                                "items": {"type": "string"}
                            }
                        },
                        "required": ["entity_name", "contents"]
                    }
                }
            },
            "required": ["observations"]
        }
    ),
    Tool(
        name="memory:search_nodes",
        description="Search for entities in the knowledge graph",
        inputSchema={
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"}
            },
            "required": ["query"]
        }
    ),
    Tool(
        name="memory:open_nodes",
        description="Get specific entities by name with their relations",
        inputSchema={
            "type": "object",
            "properties": {
                "names": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of entity names to retrieve"
                }
            },
            "required": ["names"]
        }
    ),
    Tool(
        name="memory:read_graph",
        description="Read the entire knowledge graph",
        inputSchema={
            "type": "object",
            "properties": {}
        }
    ),
    Tool(
        name="memory:delete_entities",
        description="Delete entities and their relations from the graph",
        inputSchema={
            "type": "object",
            "properties": {
                "entity_names": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["entity_names"]
        }
    ),
    Tool(
        name="memory:delete_observations",
        description="Delete specific observations from entities",
        inputSchema={
            "type": "object",
            "properties": {
                "deletions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "entity_name": {"type": "string"},
                            "observations": {
                                "type": "array",
                                "items": {"type": "string"}
                            }
                        },
                        "required": ["entity_name", "observations"]
                    }
                }
            },
            "required": ["deletions"]
        }
    ),
    Tool(
        name="memory:delete_relations",
        description="Delete specific relations from the graph",
        inputSchema={
            "type": "object",
            "properties": {
                "relations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "from": {"type": "string"},
                            "to": {"type": "string"},
                            "relation_type": {"type": "string"}
                        },
                        "required": ["from", "to", "relation_type"]
                    }
                }
            },
            "required": ["relations"]
        }
    )
]

@app.list_tools()
async def list_tools() -> List[Tool]:
    """List available memory tools"""
    return TOOLS

@app.call_tool()
async def call_tool(name: str, arguments: Dict[str, Any]) -> TextContent:
    """Execute memory tool"""
    try:
        if name == "memory:create_entities":
            count = memory.create_entities(arguments["entities"])
            return TextContent(text=f"Successfully created {count} new entities")
        
        elif name == "memory:create_relations":
            count = memory.create_relations(arguments["relations"])
            return TextContent(text=f"Successfully created {count} new relations")
        
        elif name == "memory:add_observations":
            count = memory.add_observations(arguments["observations"])
            return TextContent(text=f"Successfully added {count} observations")
        
        elif name == "memory:search_nodes":
            results = memory.search_nodes(arguments["query"])
            return TextContent(text=json.dumps(results, indent=2))
        
        elif name == "memory:open_nodes":
            results = memory.open_nodes(arguments["names"])
            return TextContent(text=json.dumps(results, indent=2))
        
        elif name == "memory:read_graph":
            graph = memory.read_graph()
            return TextContent(text=json.dumps(graph, indent=2))
        
        elif name == "memory:delete_entities":
            count = memory.delete_entities(arguments["entity_names"])
            return TextContent(text=f"Successfully deleted {count} entities")
        
        elif name == "memory:delete_observations":
            count = memory.delete_observations(arguments["deletions"])
            return TextContent(text=f"Successfully deleted {count} observations")
        
        elif name == "memory:delete_relations":
            count = memory.delete_relations(arguments["relations"])
            return TextContent(text=f"Successfully deleted {count} relations")
        
        else:
            return TextContent(text=f"Unknown tool: {name}")
    
    except Exception as e:
        return TextContent(text=f"Error executing tool {name}: {str(e)}")

async def main():
    """Run the MCP server"""
    from mcp.server.stdio import stdio_server
    
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

#### File: `setup.py`
```python
from setuptools import setup, find_packages

setup(
    name="memory-mcp-server",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "mcp>=0.1.0",
        "pydantic>=2.0",
        "jsonlines>=3.1.0",
        "typing-extensions>=4.8.0",
        "python-dotenv>=1.0.0"
    ],
    entry_points={
        "console_scripts": [
            "memory-mcp=src.mcp_server:main",
        ],
    },
)
```

### Step 3: Docker Setup (Optional)

#### File: `Dockerfile`
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY setup.py .

RUN pip install -e .

ENV MEMORY_FILE_PATH=/data/memory.jsonl

VOLUME ["/data"]

CMD ["python", "-m", "src.mcp_server"]
```

#### File: `docker-compose.yml`
```yaml
version: '3.8'
services:
  memory-mcp:
    build: .
    container_name: memory-mcp-server
    volumes:
      - ./data:/data
    environment:
      - MEMORY_FILE_PATH=/data/memory.jsonl
    restart: unless-stopped
```

### Step 4: Integration with Claude Desktop

Add to Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "memory": {
      "command": "python",
      "args": ["-m", "src.mcp_server"],
      "cwd": "/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/memory-mcp-server",
      "env": {
        "MEMORY_FILE_PATH": "/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/memory-mcp-server/portfolio-memory.jsonl",
        "PYTHONPATH": "/Users/rajan/Documents/rmsitemagicportfolio/magic-portfolio/memory-mcp-server"
      }
    }
  }
}
```

### Step 5: Testing the Implementation

Create a test script `test_memory.py`:

```python
import asyncio
from src.memory_store import KnowledgeGraphMemory

async def test_memory():
    # Initialize memory
    memory = KnowledgeGraphMemory("test_memory.jsonl")
    
    # Create entities
    entities = [
        {
            "name": "MyProject",
            "entity_type": "project",
            "observations": ["REST API", "PostgreSQL database", "React frontend"],
            "importance": 1.0
        },
        {
            "name": "UserAuth",
            "entity_type": "feature",
            "observations": ["JWT tokens", "Refresh tokens", "OAuth integration"]
        }
    ]
    memory.create_entities(entities)
    
    # Create relations
    relations = [
        {
            "from": "UserAuth",
            "to": "MyProject",
            "relation_type": "part_of",
            "strength": 1.0
        }
    ]
    memory.create_relations(relations)
    
    # Search
    results = memory.search_nodes("auth")
    print("Search results:", results)
    
    # Get full graph
    graph = memory.read_graph()
    print(f"Graph stats: {graph['stats']}")

if __name__ == "__main__":
    asyncio.run(test_memory())
```

## Usage Examples

### Example 1: Project Setup Memory
```python
# Claude/Agent can remember project structure
memory:create_entities([
  {
    "name": "EcommerceApp",
    "entity_type": "project",
    "observations": ["Next.js 14", "TypeScript", "Tailwind CSS"],
    "importance": 1.0
  },
  {
    "name": "ProductCatalog",
    "entity_type": "feature",
    "observations": ["Grid layout", "Filter system", "Search functionality"]
  }
])

memory:create_relations([
  {
    "from": "ProductCatalog",
    "to": "EcommerceApp",
    "relation_type": "part_of"
  }
])
```

### Example 2: Bug Tracking
```python
# Remember bugs and their fixes
memory:create_entities([
  {
    "name": "BUG_AUTH_001",
    "entity_type": "bug",
    "observations": ["Users logged out randomly", "Session timeout issue"],
    "importance": 0.9
  },
  {
    "name": "FIX_AUTH_001",
    "entity_type": "solution",
    "observations": ["Extended JWT expiry to 7 days", "Added refresh token rotation"]
  }
])

memory:create_relations([
  {
    "from": "FIX_AUTH_001",
    "to": "BUG_AUTH_001",
    "relation_type": "resolves"
  }
])
```

### Example 3: Learning Patterns
```python
# Remember successful patterns
memory:create_entities([
  {
    "name": "OptimisticUIPattern",
    "entity_type": "pattern",
    "observations": [
      "Update UI immediately",
      "Send request in background",
      "Rollback on error"
    ],
    "importance": 0.8
  }
])

memory:add_observations([
  {
    "entity_name": "OptimisticUIPattern",
    "contents": ["Improves perceived performance by 40%"]
  }
])
```

## Customization Options

### 1. Custom Entity Types
Extend the entity types for your domain:
- `component`, `service`, `module`
- `decision`, `assumption`, `constraint`
- `person`, `team`, `stakeholder`
- `requirement`, `specification`, `test`

### 2. Custom Relation Types
Define meaningful relationships:
- `implements`, `extends`, `overrides`
- `blocks`, `depends_on`, `conflicts_with`
- `owns`, `maintains`, `reviews`
- `causes`, `prevents`, `enables`

### 3. Memory Strategies
Implement different memory management strategies:
- **Importance Decay**: Reduce importance over time
- **Access Frequency**: Boost importance for frequently accessed items
- **Relationship Strength**: Strengthen relations that are traversed often
- **Memory Consolidation**: Merge similar entities periodically

## Troubleshooting

### Issue: Memory file not found
**Solution:** Ensure the directory exists and has write permissions:
```bash
mkdir -p ~/claude-memory
chmod 755 ~/claude-memory
```

### Issue: MCP server not connecting
**Solution:** Check logs and validate configuration:
```bash
# Test the server directly
python -m src.mcp_server

# Check Claude Desktop logs
tail -f ~/Library/Logs/Claude/mcp.log  # macOS
```

### Issue: Memory not persisting
**Solution:** Verify file path is absolute in configuration:
```json
"MEMORY_FILE_PATH": "/Users/username/claude-memory/memory.jsonl"
```

## Advanced Features to Add

1. **Semantic Search**: Add embedding-based search using sentence transformers
2. **Memory Compression**: Periodically consolidate similar memories
3. **Import/Export**: Add tools to import from/export to other formats
4. **Visualization**: Create graph visualization of the knowledge base
5. **Backup System**: Automatic versioned backups of memory

## Best Practices

1. **Use Clear Entity Names**: Make them unique and descriptive
2. **Categorize with Types**: Use consistent entity_type values
3. **Add Rich Observations**: More context helps with retrieval
4. **Set Importance Scores**: Help prioritize memory retrieval
5. **Create Bidirectional Relations**: When appropriate, create reverse relations
6. **Regular Cleanup**: Periodically remove outdated or low-importance memories

## Summary

This Memory MCP server provides:
- ✅ Persistent memory across sessions
- ✅ Knowledge graph structure for relationships
- ✅ Search and retrieval capabilities
- ✅ Simple JSONL storage (human-readable)
- ✅ Docker support for deployment
- ✅ Full CRUD operations on memories

The server is now ready to give Claude and other agents persistent, searchable memory that survives between sessions and can be shared across different tools and contexts.