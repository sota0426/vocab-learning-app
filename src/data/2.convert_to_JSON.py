import csv
import json
import os

def load_existing_json(json_file_path):
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    return []

def csv_to_json(csv_file_path, json_file_path):
    existing_data = load_existing_json(json_file_path)
    existing_ids = set(item.get('id', '') for item in existing_data)
    
    new_data = []
    
    with open(csv_file_path, 'r', encoding='utf-8-sig') as file:
        csv_reader = csv.reader(file)
        
        # Get the header
        header = next(csv_reader)
        
        for row in csv_reader:
            if not row:  # Skip empty rows
                continue
            
            row_id = row[0]  # 最初の列をIDとして使用
            
            if row_id and row_id not in existing_ids:
                # Create a dictionary for this row
                row_dict = dict(zip(header, row))
                
                # 型変換: remind_frag を boolean に、collect_number を number に変換
                if 'remind_frag' in row_dict:
                    row_dict['remind_frag'] = row_dict['remind_frag'].lower() == 'true'
                
                if 'quiz_level' in row_dict:
                    try:
                        row_dict['quiz_level'] = int(row_dict['quiz_level'])
                    except ValueError:
                        row_dict['quiz_level'] = 0  # 数字に変換できない場合のデフォルト値
                    
                new_data.append(row_dict)
                existing_ids.add(row_id)
    
    # Combine existing and new data
    combined_data = existing_data + new_data
    
    # Sort the combined data by id
    combined_data.sort(key=lambda x: int(x.get('id', '0')))
    
    return json.dumps(combined_data, ensure_ascii=False, indent=2)


# Example usage
csv_file_path = r"src\data\JsonData.csv"
json_file_path = r'src\data\vocabData.json'  # Replace with your actual JSON file path

json_output = csv_to_json(csv_file_path, json_file_path)

# Save the updated JSON output to a file
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json_file.write(json_output)

print(f"Updated JSON data has been saved to {json_file_path}")
print(f"Number of entries: {len(json.loads(json_output))}")
