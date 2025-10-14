from PIL import Image
import os

# Caminho da pasta onde estão as imagens
pasta = r"C:\Landingpages\imperiodasfraldas\img\img_loja"

# Dimensões desejadas
largura_desejada = 1600
altura_desejada = 744

# Loop por todos os arquivos da pasta
for arquivo in os.listdir(pasta):
    if arquivo.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):  # formatos suportados
        caminho_arquivo = os.path.join(pasta, arquivo)
        
        # Abre a imagem
        imagem = Image.open(caminho_arquivo)
        
        # Redimensiona
        imagem_redimensionada = imagem.resize((largura_desejada, altura_desejada))
        
        # Sobrescreve o arquivo (ou salve em outra pasta se quiser preservar os originais)
        imagem_redimensionada.save(caminho_arquivo)
        
        print(f"✅ {arquivo} redimensionado para {largura_desejada}x{altura_desejada}")

print("🚀 Todas as imagens foram redimensionadas com sucesso!")
