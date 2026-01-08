# Claude Personal Assistant - Quick Start Guide

## 🚀 Day 1: Get Running in 30 Minutes

### Step 1: Essential Setup (10 minutes)

```bash
# Create workspace
mkdir ~/claude-assistant && cd ~/claude-assistant

# Install Claude CLI
npm install -g @anthropic/claude-cli
claude auth login

# Install Memory MCP
git clone https://github.com/memory-mcp/memory-mcp-server
cd memory-mcp-server && pip install -r requirements.txt && cd ..

# Setup n8n (using Docker)
docker run -d --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```

### Step 2: Configure Claude with Memory (5 minutes)

Create `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "memory": {
      "command": "python",
      "args": ["-m", "memory_mcp"],
      "env": {
        "MEMORY_FILE_PATH": "~/claude-assistant/memory.jsonl"
      }
    },
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"]
    }
  }
}
```

### Step 3: Initialize Your Assistant (5 minutes)

Create `init_assistant.py`:

```python
#!/usr/bin/env python3
import json
from datetime import datetime

# Initial context for your assistant
assistant_context = {
    "user_profile": {
        "name": "YOUR_NAME",
        "role": "Business Owner",
        "timezone": "YOUR_TIMEZONE",
        "preferences": {
            "communication_style": "concise and actionable",
            "priority_method": "eisenhower_matrix",
            "work_hours": "9am-6pm"
        }
    },
    "businesses": [
        {
            "name": "Business 1",
            "type": "YOUR_BUSINESS_TYPE",
            "tools": ["Google Workspace", "GitHub", "Slack"]
        }
    ],
    "daily_routines": {
        "morning": ["email_check", "calendar_review", "priority_setting"],
        "evening": ["progress_review", "tomorrow_planning"]
    }
}

# Save initial memory
with open('memory.jsonl', 'w') as f:
    f.write(json.dumps({
        "type": "entity",
        "name": "Assistant",
        "entity_type": "system",
        "observations": ["Initialized", f"Serving {assistant_context['user_profile']['name']}"],
        "created_at": datetime.utcnow().isoformat()
    }) + '\n')
    
print("✅ Assistant initialized with your context!")
```

Run it:
```bash
python init_assistant.py
```

### Step 4: Google Workspace Connection (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable APIs:
   - Gmail API
   - Google Calendar API
   - Google Drive API
   - Google Sheets API
   - Google Tasks API

4. Create credentials:
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: Desktop app
   - Download JSON file as `credentials.json`

5. Quick authenticate:
```python
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = [
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/tasks'
]

flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
creds = flow.run_local_server(port=0)

# Save the credentials
with open('token.json', 'w') as token:
    token.write(creds.to_json())
    
print("✅ Google Workspace connected!")
```

### Step 5: First n8n Workflow (5 minutes)

1. Open n8n: http://localhost:5678
2. Create new workflow: "Email Summary"
3. Import this simple workflow:

```json
{
  "name": "Email Summary to Claude",
  "nodes": [
    {
      "name": "Every 30 min",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": {
          "item": [{
            "mode": "everyX",
            "value": 30,
            "unit": "minutes"
          }]
        }
      }
    },
    {
      "name": "Get Unread Emails",
      "type": "n8n-nodes-base.gmail",
      "parameters": {
        "operation": "getAll",
        "filters": {
          "labelIds": ["UNREAD", "INBOX"]
        },
        "limit": 10
      }
    },
    {
      "name": "Ask Claude",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "http://localhost:8000/claude",
        "bodyParametersUi": {
          "parameter": [{
            "name": "prompt",
            "value": "Summarize these emails and identify any urgent actions: {{$json}}"
          }]
        }
      }
    }
  ]
}
```

## 🎯 Your First Commands

### Morning Briefing (Manual for Day 1)
```bash
claude "Good morning! Please check my calendar for today and summarize my priorities. 
       Also, search my Google Drive for any documents modified yesterday."
```

### Email Processing
```bash
claude "Check my Gmail for important emails from the last 24 hours. 
       Create a summary and identify any that need immediate response."
```

### Project Status
```bash
claude "Search my Google Drive for project-related documents. 
       Give me a status update on active projects based on recent modifications."
```

### End of Day Review
```bash
claude "Review what we accomplished today. Update your memory with key decisions 
       and learnings. What should be our top 3 priorities for tomorrow?"
```

## 📊 Day 1 Success Metrics

By end of Day 1, you should have:
- ✅ Claude CLI responding to commands
- ✅ Memory system storing conversations
- ✅ Google Workspace connected
- ✅ At least 1 n8n workflow running
- ✅ Successful morning briefing generated

## 🔄 Day 2-7 Progressive Enhancement

### Day 2: Automate Morning Briefing
- Set up scheduled n8n workflow
- Configure email categorization
- Add task extraction from emails

### Day 3: Project Integration
- Connect GitHub repositories
- Add project status monitoring
- Create project memory entities

### Day 4: Smart Scheduling
- Calendar conflict detection
- Meeting preparation automation
- Time blocking suggestions

### Day 5: Document Management
- Auto-organize Google Drive
- Document summarization
- Version tracking in memory

### Day 6: Advanced Workflows
- Invoice processing
- Client communication templates
- Weekly report generation

### Day 7: Optimization
- Review memory patterns
- Tune automation triggers
- Customize for your workflow

## 🛠️ Troubleshooting

### Claude not responding?
```bash
claude mcp list  # Check MCP servers
claude mcp logs memory  # Check memory server logs
```

### Google APIs not working?
```bash
# Re-authenticate
python -c "import os; os.remove('token.json')"
python quickstart.py  # Re-run auth
```

### n8n workflows failing?
```bash
docker logs n8n  # Check n8n logs
docker restart n8n  # Restart if needed
```

### Memory not persisting?
```bash
# Check memory file
cat ~/claude-assistant/memory.jsonl | tail -5

# Test memory directly
claude "Remember that my favorite project management tool is Notion"
claude "What is my favorite project management tool?"
```

## 💡 Pro Tips for Week 1

1. **Start Simple**: Don't try to automate everything at once
2. **Document Patterns**: Note repetitive tasks for automation
3. **Update Memory**: Regularly tell Claude about preferences and context
4. **Test Incrementally**: Verify each component works before combining
5. **Use Natural Language**: Claude understands context, speak naturally

## 📈 Expected Benefits by End of Week 1

- ⏰ Save 1-2 hours daily on email and calendar management
- 📧 Zero important emails missed
- 📅 No double-booked meetings
- 📊 Daily project status awareness
- 🧠 Growing assistant intelligence through memory

## 🚦 Quick Health Check

Run this to verify everything is working:

```python
#!/usr/bin/env python3
# health_check.py

import subprocess
import requests
import json
import os

def check_service(name, check_func):
    try:
        check_func()
        print(f"✅ {name}: OK")
        return True
    except Exception as e:
        print(f"❌ {name}: {str(e)}")
        return False

# Check Claude CLI
check_service("Claude CLI", lambda: subprocess.run(["claude", "--version"], check=True))

# Check Memory File
check_service("Memory System", lambda: os.path.exists("memory.jsonl"))

# Check n8n
check_service("n8n Workflows", lambda: requests.get("http://localhost:5678").raise_for_status())

# Check Google Token
check_service("Google Auth", lambda: os.path.exists("token.json"))

print("\n📊 System Status Summary")
```

## 🎉 You're Ready!

Your Claude Personal Assistant is now operational. Start with simple commands, observe what works best for your workflow, and gradually add more automation. The system will learn and improve as you use it.

**Next Step**: Run your first morning briefing and let Claude start learning your preferences!

```bash
claude "Good morning! Let's start our day. What's on my calendar, what emails need attention, and what should I focus on first?"
```