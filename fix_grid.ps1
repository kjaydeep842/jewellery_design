
$path = '18_KT.html'
$content = Get-Content $path -Raw -Encoding UTF8

# Define markers
# Note: Using regex to find the grid marker more robustly if attributes changed slightly?
# But user hasn't changed grid attributes in diffs.
$gridStartMarker = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">'
$paginationMarker = '<!-- Pagination or Load More -->'

# Find split points
$split1 = $content.Split([string[]]$gridStartMarker, 2, [StringSplitOptions]::None)
if ($split1.Count -lt 2) { 
    Write-Host "Error: Grid start marker not found."
    Write-Host "Looking for: $gridStartMarker"
    exit 1 
}
$headerPart = $split1[0]
$rest = $split1[1]

$split2 = $rest.Split([string[]]$paginationMarker, 2, [StringSplitOptions]::None)
if ($split2.Count -lt 2) { 
    Write-Host "Error: Pagination marker not found."
    exit 1 
}
$footerPart = $split2[1]

# Construct Card Template
# Implementing the "Heart | Add to Cart | Expand" layout
$cardTemplate = @"
                    <!-- Card {0} -->
                    <div class="bg-[#FAF8F1] border border-[#E8E1D5] hover:shadow-lg transition-shadow rounded-sm overflow-hidden p-2 relative group">
                        <div class="w-full aspect-square flex items-center justify-center mb-3 relative rounded-sm overflow-hidden">
                            <div class="absolute top-2 right-0 z-10 bg-[#BC511B] text-white text-[11px] pl-3 pr-2 py-1 rounded-l-full font-medium font-['Playfair_Display',serif] tracking-wide">
                                Best Seller
                            </div>
                            <!-- Product Images -->
                            <img src="assets/ring.png" alt="Eterna Diamond Ring"
                                class="w-full h-full object-contain-cover mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0">
                            <img src="assets/hover_image_p.png" alt="Eterna Diamond Ring Hover"
                                class="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            
                            <!-- Action Bar (Replaces old strip and static buttons) -->
                            <div class="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 z-20">
                                <!-- Wishlist Button -->
                                <div class="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <img src="assets/ic_wishlist1.png" alt="wishlist" class="w-4 h-4 object-contain">
                                </div>
                                
                                <!-- Add to Cart (Visible on Hover) -->
                                <button class="flex-grow h-9 bg-[#CBA65A] hover:bg-[#b39359] text-white text-xs font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-['Outfit'] whitespace-nowrap">
                                    Add to Cart
                                </button>
                                
                                <!-- Expand Button -->
                                <div class="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <img src="assets/maximize.png" alt="expand" class="w-4 h-4 object-contain">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Product Info -->
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
"@

# Generate Cards
$newCards = ""
for ($i = 1; $i -le 16; $i++) {
    $newCards += ($cardTemplate -f $i) + "`n"
}

# Assemble
$lowerPart = "
                </div>

                <!-- Pagination or Load More -->"

# Note: Adding `t` (tab) if needed for indentation, but browser handles it fine.
$finalContent = $headerPart + $gridStartMarker + "`n" + $newCards + $lowerPart + $footerPart

[System.IO.File]::WriteAllText($path, $finalContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully updated $path with new Card Layout."
