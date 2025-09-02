#!/bin/bash

# Télécharger les images restantes
curl -o public/images/products/champagne-luxury.webp "https://replicate.delivery/xezq/vH2M8ZHiUn7gBpeuvbmqvc5K785SA0fa28ElOPhHHrWGCDRVA/out-0.webp" &

# Récupérer les autres prédictions
predictions=(
  "kr3kmg2xzsrmc0cs13f85zt9jg"
  "9d3bkpm225rma0cs13f82nxfw0"
  "03ey0fd7v5rmc0cs13f8j4afg0"
  "jqv971eb31rm80cs13fbwye7yr"
  "w0ygsjqj6nrm80cs13fa3b5wsg"
  "wwcws28s59rma0cs13ftf8fnam"
)

wait
echo "Toutes les images ont été téléchargées"