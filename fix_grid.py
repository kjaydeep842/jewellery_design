
import re

card_template = """
                    <!-- Card {i} -->
                    <div class="bg-[#FAF8F1] border border-[#E8E1D5] hover:shadow-lg transition-shadow rounded-sm overflow-hidden p-2 relative group">
                        <div class="w-full aspect-square flex items-center justify-center mb-3 relative rounded-sm overflow-hidden">
                            <div class="absolute top-2 right-0 z-10 bg-[#BC511B] text-white text-[11px] pl-3 pr-2 py-1 rounded-l-full font-medium font-['Outfit']">
                                Best Seller
                            </div>
                            <img src="assets/ring.png" alt="Eterna Diamond Ring"
                                class="w-full h-full object-contain-cover mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0">
                            <img src="assets/hover_image_p.png" alt="Eterna Diamond Ring Hover"
                                class="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div class="absolute inset-x-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity z-20 gap-1 w-full h-[55px] bg-white rounded-t-[16px] px-3 py-2.5">
                                <button class="w-8 h-8 bg-[#FAF8F1] rounded-full flex items-center justify-center text-[#CBA65A] hover:bg-[#EDE5D3] shadow-sm"><i class="fa-solid fa-chevron-left text-xs"></i></button>
                                <button class="bg-[#CBA65A] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md hover:bg-[#b39359] transition-colors font-['Outfit'] flex-grow">Add to Cart</button>
                                <button class="w-8 h-8 bg-[#FAF8F1] rounded-full flex items-center justify-center text-[#CBA65A] hover:bg-[#EDE5D3] shadow-sm"><i class="fa-solid fa-chevron-right text-xs"></i></button>
                            </div>
                            <div class="absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer transition-opacity">
                                <img src="assets/ic_wishlist1.png" alt="wishlist" class="w-4 h-4 object-contain">
                            </div>
                            <div class="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer transition-opacity">
                                <img src="assets/maximize.png" alt="expand" class="w-4 h-4 object-contain">
                            </div>
                        </div>
                        <div class="space-y-1">
                            <p class="text-sm text-gray-800 font-medium leading-tight font-['Outfit']">Eterna Diamond
                                Solitaire Engagement Ring</p>
                            <p class="text-base font-bold text-[#1A1A1A] font-['Outfit']">&#8377;16,747.23</p>
                            <div class="flex items-center gap-2 mt-2">
                                <div class="w-4 h-4 rounded-full bg-[#E5C365] border border-gray-300 cursor-pointer hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"></div>
                                <div class="w-4 h-4 rounded-full bg-[#D4D4D4] border border-gray-300 cursor-pointer hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"></div>
                                <div class="w-4 h-4 rounded-full bg-[#E0A499] border border-gray-300 cursor-pointer hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"></div>
                            </div>
                        </div>
                    </div>
"""

def fix_grid():
    with open('18_KT.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the pattern to find the grid container and replace its content
    # Look for div with grid class, capture content until matches "<!-- Pagination"
    # Using specific markers from valid file structure
    
    # Header part: Up to start of grid
    pattern_start = r'(<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">)'
    # Footer part: From Pagination comment
    pattern_end = r'(<!-- Pagination)'
    
    parts = re.split(pattern_start, content)
    if len(parts) < 2:
        print("Could not find grid start")
        return
        
    header = parts[0] + parts[1]
    rest = parts[2]
    
    parts_end = re.split(pattern_end, rest)
    if len(parts_end) < 2:
        print("Could not find pagination start")
        return
        
    footer = parts_end[1] + parts_end[2]
    
    # Construct new grid content
    new_grid_content = "\n"
    for i in range(1, 17):
        new_grid_content += card_template.format(i=i) + "\n"
        
    # The 'rest' part might contain the closing div for the grid?
    # Actually, the grid is closed before Pagination?
    # In broken file:
    # </div> <!-- Close grid -->
    # </div> <!-- Pagination wrapper? No -->
    # <!-- Pagination -->
    
    # We should include the closing div for the grid in the new content
    # Wait, the split split at "<!-- Pagination".
    # The text BEFORE "<!-- Pagination" in broken file is:
    # </div>
    # <div class="mt-12 flex justify-center">
    # (Oh wait, Pagination comment is INSIDE the div?)
    # View File 688: <div class="mt-12 ...">
    # 689: <!-- Placeholder for pagination -->
    # So "<!-- Pagination" string might be inside.
    # Step 172 shows "<!-- Pagination or Load More -->" at line 687.
    # Ah, regex needs to match that.
    
    # Let's simple search for the "<!-- Pagination or Load More -->"
    
    post_grid_marker = '<!-- Pagination or Load More -->'
    
    if post_grid_marker not in content:
        print("Marker not found")
        return
        
    pre_marker, post_marker = content.split(post_grid_marker)
    
    # Finding the grid start in pre_marker
    grid_start_marker = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">'
    if grid_start_marker not in pre_marker:
        print("Grid start not found")
        return
        
    header_part, grid_content_dirty = pre_marker.split(grid_start_marker)
    
    # grid_content_dirty ends with </div> (closing grid) and some whitespace?
    # We should just Replace everything between Header+GridStart and PostMarker with NewCards + ClosingDiv + WrapperStart?
    
    # Structure:
    # <div class="grid ...">
    #    CARDS
    # </div>
    # <div class="mt-12 ...">
    # <!-- Pagination ... -->
    
    # So we need to reconstruct:
    # Header + GridStart + NewCards + LowerPart
    
    # LowerPart needs to start with </div> (closing grid)
    # Then <div class="mt-12 ...">
    # Then comes the marker.
    
    lower_part_template = """
                </div>

                <!-- Pagination or Load More -->"""
    
    final_content = header_part + grid_start_marker + new_grid_content + lower_part_template + post_marker
    
    with open('18_KT.html', 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Fixed 18_KT.html")

if __name__ == '__main__':
    fix_grid()
