import os

file_path = 'd:\\Bharu\\Tatasvi\\jewellery_design\\18_KT.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove hover-hide from individual buttons (Wishlist/Expand)
    # Target: lg:group-hover:opacity-0
    new_content = content.replace('lg:group-hover:opacity-0', '')

    # 2. Remove hover-hide from bottom container (Add to Cart strip)
    # Target: opacity-0 group-hover:opacity-100
    # Note: We replace it with nothing (removing the hiding class)
    new_content = new_content.replace('opacity-0 group-hover:opacity-100', '')
    
    # Also clean up the transition class if no longer needed? 
    # The original line: ... opacity-0 group-hover:opacity-100 transition-opacity ...
    # Becomes: ...  transition-opacity ...
    # This is fine.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated 18_KT.html")

except Exception as e:
    print(f"Error: {e}")
