from PIL import Image
import os

# Este script edita imagens específicas em "img/apresentacao":
# 1) Corta a "fachada.jpeg" para remover a área do portão branco/contato,
#    mantendo o foco à direita (logo/porta).
# 2) Reenquadra a "mamadeira.jpeg" com um corte mais próximo para que as mamadeiras
#    apareçam mais (assunto mais proeminente), mantendo qualidade.

BASE_DIR = r"C:\Landingpages\imperiodasfraldas"
APRESENTACAO_DIR = os.path.join(BASE_DIR, "img", "apresentacao")

FACHADA_SRC = os.path.join(APRESENTACAO_DIR, "fachada.jpeg")
FACHADA_OUT = os.path.join(APRESENTACAO_DIR, "fachada_cortada.jpeg")

MAMADEIRA_SRC = os.path.join(APRESENTACAO_DIR, "mamadeira.jpeg")
MAMADEIRA_OUT = os.path.join(APRESENTACAO_DIR, "mamadeira_cortada.jpeg")


def save_jpeg(img: Image.Image, path: str, quality: int = 95):
    """Salva JPEG com qualidade alta e otimização."""
    img = img.convert("RGB")  # garante formato consistente
    img.save(path, format="JPEG", quality=quality, optimize=True)


def crop_right_focus(img: Image.Image, left_fraction: float = 0.28,
                     top_fraction: float = 0.0, bottom_fraction: float = 0.0) -> Image.Image:
    """
    Corta a imagem mantendo o foco na porção direita.
    - left_fraction: fração da largura removida pela esquerda (0.0 a 0.9)
    - top_fraction: fração da altura removida no topo
    - bottom_fraction: fração da altura removida na base
    """
    w, h = img.size
    left = int(w * left_fraction)
    top = int(h * top_fraction)
    right = w
    bottom = int(h * (1.0 - bottom_fraction))
    return img.crop((left, top, right, bottom))


def crop_tighter_center(img: Image.Image,
                        left_pad_fraction: float = 0.10,
                        right_pad_fraction: float = 0.10,
                        top_pad_fraction: float = 0.05,
                        bottom_pad_fraction: float = 0.05) -> Image.Image:
    """
    Faz um corte mais próximo, centralizado, removendo bordas para tornar o assunto mais proeminente.
    As frações indicam quanto REMOVER de cada lado.
    """
    w, h = img.size
    left = int(w * left_pad_fraction)
    right = int(w * (1.0 - right_pad_fraction))
    top = int(h * top_pad_fraction)
    bottom = int(h * (1.0 - bottom_pad_fraction))
    # Garantias para evitar valores inválidos
    left = max(0, min(left, w - 2))
    right = max(left + 2, min(right, w))
    top = max(0, min(top, h - 2))
    bottom = max(top + 2, min(bottom, h))
    return img.crop((left, top, right, bottom))


def process_fachada():
    if not os.path.exists(FACHADA_SRC):
        print(f"⚠️ Arquivo não encontrado: {FACHADA_SRC}")
        return
    img = Image.open(FACHADA_SRC)
    # Remove ~28% da esquerda (portão branco/contato) e mantém topo/base inteiras
    cropped = crop_right_focus(img, left_fraction=0.28, top_fraction=0.0, bottom_fraction=0.0)
    save_jpeg(cropped, FACHADA_OUT, quality=95)
    print(f"✅ Fachada cortada e salva em: {FACHADA_OUT}")


def process_mamadeira():
    if not os.path.exists(MAMADEIRA_SRC):
        print(f"⚠️ Arquivo não encontrado: {MAMADEIRA_SRC}")
        return
    img = Image.open(MAMADEIRA_SRC)
    # Corte central mais próximo para que as mamadeiras apareçam mais
    cropped = crop_tighter_center(img, left_pad_fraction=0.10, right_pad_fraction=0.10,
                                  top_pad_fraction=0.05, bottom_pad_fraction=0.05)
    save_jpeg(cropped, MAMADEIRA_OUT, quality=95)
    print(f"✅ Mamadeira cortada e salva em: {MAMADEIRA_OUT}")


if __name__ == "__main__":
    process_fachada()
    process_mamadeira()
    print("🚀 Edição concluída para: fachada e mamadeira.")
