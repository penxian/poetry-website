#!/usr/bin/env python3
"""Import poetry data to Supabase using supabase client"""

import json
import json5
import os
from supabase import create_client, Client

# Read config
config_path = os.path.expanduser("/root/.supabase_config.json")
with open(config_path, 'r') as f:
    config = json.load(f)

url = config['url']
key = config['service_key']

supabase: Client = create_client(url, key)

# Load data
with open('/root/.openclaw/workspace/src/data.js', 'r') as f:
    js_content = f.read()

start = js_content.find('[')
end = js_content.rfind(']')
js_array = js_content[start:end+1]
poetry_data = json5.loads(js_array)

print(f"Loaded {len(poetry_data)} poems")

# Clear table first
print("Truncating table...")
try:
    supabase.table('poetry').delete().neq('id', 0).execute()
    print("Table cleared")
except Exception as e:
    print(f"Warning clearing: {e}")

# Insert data in batches
batch_size = 50
total_inserted = 0

for i in range(0, len(poetry_data), batch_size):
    batch = poetry_data[i:i+batch_size]
    
    processed = []
    for poem in batch:
        processed.append({
            'title': poem.get('title', ''),
            'author': poem.get('author', ''),
            'dynasty': poem.get('dynasty', ''),
            'style': poem.get('style', ''),
            'content': poem.get('content', ''),
            'popularity': poem.get('popularity', 50),
            'spread': poem.get('spread', 50),
            'compulsory': poem.get('compulsory', False),
            'notes': poem.get('notes', None)
        })
    
    try:
        result = supabase.table('poetry').insert(processed).execute()
        total_inserted += len(batch)
        print(f"Batch {i//batch_size + 1}: inserted {len(batch)} (total {total_inserted})")
    except Exception as e:
        print(f"Error inserting batch {i//batch_size + 1}: {e}")

print(f"\n✅ Done! Total inserted: {total_inserted}")

# Verify count
try:
    result = supabase.table('poetry').select('*', count='exact').execute()
    print(f"Final count in database: {result.count}")
except Exception as e:
    print(f"Could not get count: {e}")
