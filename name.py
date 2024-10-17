import os
import pandas as pd

def rename_files_recursively(csv_file, root_folders):
    # CSVファイルを読み込む
    df = pd.read_csv(csv_file)
    
    # すべてのルートフォルダに対して処理
    for root_folder in root_folders:
        # ルートフォルダ以下の全てのファイルを再帰的に探索
        for folder_path, _, files in os.walk(root_folder):
            for file in files:
                # ファイル名と拡張子を分ける（ファイル名は数値）
                file_name, ext = os.path.splitext(file)
                
                # ファイル名が数値かどうかを確認
                if file_name.isdigit():
                    # CSVファイルの各行をループしてファイル名を探す
                    for index, row in df.iterrows():
                        old_name = str(row['変更前のファイル名'])  # 数値として扱うため文字列に変換
                        new_name = str(row['変更後のファイル名'])  # 数値として扱うため文字列に変換
                        
                        # 変更前のファイル名と一致する場合
                        if file_name == old_name:
                            old_file_path = os.path.join(folder_path, file)
                            new_file_path = os.path.join(folder_path, new_name + ext)
                            
                            # ファイル名を変更
                            os.rename(old_file_path, new_file_path)
                            print(f"Renamed: {old_file_path} -> {new_file_path}")

# 使用例
csv_file = r"C:\Users\User\Desktop\english\作成python\to_JSON - コピー.csv"  # CSVファイルのパスを指定

# 対象となるフォルダのリストを作成
root_folders = [
    r"C:\Users\User\Desktop\english\vocab-learning-app\public_a\audio\ENG_female",
    r"C:\Users\User\Desktop\english\vocab-learning-app\public_a\audio\JPN_male",
    r"C:\Users\User\Desktop\english\vocab-learning-app\public_a\images"
]

# ファイル名の変更を実行
rename_files_recursively(csv_file, root_folders)
