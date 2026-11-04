Add-Type -AssemblyName System.Drawing

$imgDir = "C:\Users\USUARIO\.gemini\antigravity\scratch\trigus-bakery-web\assets\img"

function Crop-Image($sourcePath, $destPath, $xRel, $yRel, $wRel, $hRel) {
    if (-not (Test-Path $sourcePath)) { return }
    $src = [System.Drawing.Image]::FromFile($sourcePath)
    $x = [int]($src.Width * $xRel)
    $y = [int]($src.Height * $yRel)
    $w = [int]($src.Width * $wRel)
    $h = [int]($src.Height * $hRel)
    
    # Bound checks
    if ($x + $w -gt $src.Width) { $w = $src.Width - $x }
    if ($y + $h -gt $src.Height) { $h = $src.Height - $y }
    
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Created $destPath"
}

# Crop logo
Crop-Image "$imgDir\menu-cover.jpg" "$imgDir\trigus-logo.jpg" 0.12 0.30 0.76 0.22

# Crop Waffles
Crop-Image "$imgDir\menu-desayunos-snacks.jpg" "$imgDir\food-waffles.jpg" 0.52 0.37 0.36 0.12

# Crop Tenders
Crop-Image "$imgDir\menu-desayunos-snacks.jpg" "$imgDir\food-tenders.jpg" 0.08 0.67 0.38 0.14

# Crop Nachos
Crop-Image "$imgDir\menu-desayunos-snacks.jpg" "$imgDir\food-nachos.jpg" 0.52 0.67 0.39 0.13

# Crop Panini
Crop-Image "$imgDir\menu-sandwiches-burgers.jpg" "$imgDir\food-panini.jpg" 0.53 0.37 0.40 0.11

# Crop Burger
Crop-Image "$imgDir\menu-sandwiches-burgers.jpg" "$imgDir\food-burger.jpg" 0.53 0.67 0.42 0.11

# Crop Pasta
Crop-Image "$imgDir\menu-pastas-pizzas.jpg" "$imgDir\food-pasta.jpg" 0.52 0.31 0.35 0.11

# Crop Pizza
Crop-Image "$imgDir\menu-pastas-pizzas.jpg" "$imgDir\food-pizza.jpg" 0.10 0.66 0.28 0.12

# Crop Pizza Box Big Slice
Crop-Image "$imgDir\menu-pastas-pizzas.jpg" "$imgDir\food-pizza-box.jpg" 0.67 0.66 0.30 0.12

# Crop Ensalada
Crop-Image "$imgDir\menu-carnes-ensaladas.jpg" "$imgDir\food-salad.jpg" 0.56 0.25 0.38 0.13

# Crop Parrilla Mixta
Crop-Image "$imgDir\menu-carnes-ensaladas.jpg" "$imgDir\food-grill.jpg" 0.06 0.64 0.39 0.15

# Crop Parrilla Proteica
Crop-Image "$imgDir\menu-carnes-ensaladas.jpg" "$imgDir\food-proteica.jpg" 0.50 0.64 0.40 0.15

# Crop Parrilla Ricci & Combo
Crop-Image "$imgDir\menu-parrillas-cachapas.jpg" "$imgDir\food-parrilla-combo.jpg" 0.05 0.62 0.44 0.14

# Crop Cachapa
Crop-Image "$imgDir\menu-parrillas-cachapas.jpg" "$imgDir\food-cachapa.jpg" 0.50 0.65 0.45 0.10

# Crop Pollo Asado
Crop-Image "$imgDir\menu-pollo-asado.jpg" "$imgDir\food-pollo.jpg" 0.62 0.59 0.22 0.05

# Crop Malteada
Crop-Image "$imgDir\menu-bebidas.jpg" "$imgDir\food-malteada.jpg" 0.70 0.26 0.16 0.14

# Crop Smoothie
Crop-Image "$imgDir\menu-bebidas.jpg" "$imgDir\food-smoothie.jpg" 0.65 0.41 0.21 0.13

# Crop Café
Crop-Image "$imgDir\menu-bebidas.jpg" "$imgDir\food-cafe.jpg" 0.30 0.31 0.20 0.08

# Crop Jugos
Crop-Image "$imgDir\menu-bebidas.jpg" "$imgDir\food-jugos.jpg" 0.28 0.58 0.22 0.09

Write-Host "All crops generated successfully!"
