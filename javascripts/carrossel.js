$(document).ready(function(){

  // ============ CARREGAR CARROSSEL DO JSON ============
  function loadCarousel() {
    fetch('../data/carrossel-estrutura.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.carousel-estrutura-container');
            if (!container) return;

            // Limpa o container mantendo apenas o controller
            const controller = container.querySelector('.carousel-controller');
            container.innerHTML = '';
            
            // Cria os itens do carrossel
            data.forEach((item, index) => {
                const carouselBox = document.createElement('div');
                carouselBox.className = 'carousel-box';
                carouselBox.id = `carouselItem${index + 1}`;
                if (index !== 0) {
                    carouselBox.style.display = 'none';
                }

                // Estrutura do carousel-imagem-titulo
                const imagemTitulo = document.createElement('div');
                imagemTitulo.className = 'carousel-imagem-titulo';

                // Primeira imagem
                const img1 = document.createElement('img');
                img1.src = item.img1;
                img1.alt = item.alt1;
                if (item.img2) {
                    img1.style.display = 'block';
                }

                // Segunda imagem (se existir)
                let img2 = null;
                if (item.img2) {
                    img2 = document.createElement('img');
                    img2.className = 'img-carousel2';
                    img2.src = item.img2;
                    img2.alt = item.alt2;
                    img2.style.display = 'none';
                }

                // Título
                const tituloDiv = document.createElement('div');
                tituloDiv.className = 'carrossel-titulo';

                const h3 = document.createElement('h3');
                h3.style.width = item.img2 ? '65%' : '75%';
                h3.textContent = item.titulo;

                const hr = document.createElement('hr');

                const fonte1 = document.createElement('span');
                fonte1.className = 'fonte-carousel';
                fonte1.textContent = item.fonte;

                const fonte2 = document.createElement('span');
                fonte2.className = 'fonte-carousel fonte-carousel2';
                fonte2.textContent = item.fonte2 || '';
                if (!item.fonte2) {
                    fonte2.style.display = 'none';
                }

                tituloDiv.appendChild(h3);
                tituloDiv.appendChild(hr);
                tituloDiv.appendChild(fonte1);
                tituloDiv.appendChild(fonte2);

                // Ícone do carrossel
                const icone = document.createElement('img');
                icone.id = 'carrossel-icone';
                icone.src = '../assets/carrossel-icone.svg';
                icone.alt = '';

                // Monta o carousel-imagem-titulo
                imagemTitulo.appendChild(img1);
                if (img2) imagemTitulo.appendChild(img2);
                imagemTitulo.appendChild(tituloDiv);
                imagemTitulo.appendChild(icone);

                // Texto do carrossel (já vem com as tags <p>)
                const textoDiv = document.createElement('div');
                textoDiv.innerHTML = item.texto;

                // Monta o carousel-box
                carouselBox.appendChild(imagemTitulo);
                // Pega os parágrafos do texto e adiciona
                while (textoDiv.firstChild) {
                    carouselBox.appendChild(textoDiv.firstChild);
                }

                container.appendChild(carouselBox);
            });

            // Recria o controller
            const controllerDiv = document.createElement('div');
            controllerDiv.className = 'carousel-controller';

            const setaEsq = document.createElement('img');
            setaEsq.src = 'assets/seta-esquerda.svg';
            setaEsq.alt = 'Anterior';

            const setaDir = document.createElement('img');
            setaDir.src = 'assets/seta-direita.svg';
            setaDir.alt = 'Próximo';

            controllerDiv.appendChild(setaEsq);

            // Cria os bullets
            data.forEach((item, index) => {
                const bullet = document.createElement('div');
                bullet.className = 'bullet-carousel';
                if (index === 0) {
                    bullet.style.backgroundColor = '#FFFFFF';
                    bullet.style.transform = 'scale(1.3)';
                }
                controllerDiv.appendChild(bullet);
            });

            controllerDiv.appendChild(setaDir);
            container.appendChild(controllerDiv);

            // ============ INICIALIZAR O CARROSSEL PRINCIPAL ============
            initCarousel(container);

            // ============ INICIALIZAR MINI CARROSSÉIS ============
            if (data.some(item => item.img2)) {
                // Só inicializa se tiver itens com img2
                setTimeout(() => {
                    document.querySelectorAll('.carousel-box').forEach((box, index) => {
                        if (data[index] && data[index].img2) {
                            setupMiniCarousel(box.id);
                        }
                    });
                }, 100);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o carrossel:', error);
        });
}

// ============ FUNÇÃO PARA INICIALIZAR O CARROSSEL PRINCIPAL ============
function initCarousel(container) {
    const carouselItems = container.querySelectorAll('.carousel-box');
    const bullets = container.querySelectorAll('.bullet-carousel');
    const setaEsquerda = container.querySelector('.carousel-controller img:first-child');
    const setaDireita = container.querySelector('.carousel-controller img:last-child');
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    let isTransitioning = false;

    function updateCarousel(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        carouselItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateX(0)';
        });

        const currentItem = carouselItems[index];
        currentItem.style.display = 'block';
        
        setTimeout(() => {
            currentItem.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
            currentItem.style.opacity = '1';
            currentItem.style.transform = 'translateX(0)';
        }, 10);

        bullets.forEach((bullet, i) => {
            if (i === index) {
                bullet.style.backgroundColor = '#FFFFFF';
                bullet.style.transform = 'scale(1.3)';
                bullet.style.transition = 'all 0.3s ease';
            } else {
                bullet.style.backgroundColor = '#DCE026';
                bullet.style.transform = 'scale(1)';
                bullet.style.boxShadow = 'none';
            }
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel(currentIndex);
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel(currentIndex);
    }

    if (setaEsquerda) {
        setaEsquerda.style.cursor = 'pointer';
        setaEsquerda.addEventListener('click', prevSlide);
    }

    if (setaDireita) {
        setaDireita.style.cursor = 'pointer';
        setaDireita.addEventListener('click', nextSlide);
    }

    bullets.forEach((bullet, index) => {
        bullet.style.cursor = 'pointer';
        bullet.addEventListener('click', function() {
            if (isTransitioning || currentIndex === index) return;
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
}

// ============ FUNÇÃO PARA O MINI CARROSSEL ============
function setupMiniCarousel(itemId) {
    const carouselBox = document.getElementById(itemId);
    if (!carouselBox) return;

    const imagemTitulo = carouselBox.querySelector('.carousel-imagem-titulo');
    const img1 = imagemTitulo.querySelector('img:first-child');
    const img2 = imagemTitulo.querySelector('.img-carousel2');
    const fonte1 = imagemTitulo.querySelector('.fonte-carousel:not(.fonte-carousel2)');
    const fonte2 = imagemTitulo.querySelector('.fonte-carousel2');

    if (!img1 || !img2 || !fonte1 || !fonte2) return;

    // Cria o container para os controles
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'mini-carousel-controls';

    // Cria a seta esquerda
    const setaEsq = document.createElement('span');
    setaEsq.textContent = '◀';
    setaEsq.style.cssText = `
        cursor: pointer;
        font-size: 24px;
        color: white;
        user-select: none;
        transition: all 0.3s ease;
        line-height: 1;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    setaEsq.onmouseover = () => {
        setaEsq.style.transform = 'scale(1.3)';
        setaEsq.style.color = '#DCE026';
    };
    setaEsq.onmouseout = () => {
        setaEsq.style.transform = 'scale(1)';
        setaEsq.style.color = 'white';
    };

    // Cria a seta direita
    const setaDir = document.createElement('span');
    setaDir.textContent = '▶';
    setaDir.style.cssText = `
        cursor: pointer;
        font-size: 24px;
        color: white;
        user-select: none;
        transition: all 0.3s ease;
        line-height: 1;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    setaDir.onmouseover = () => {
        setaDir.style.transform = 'scale(1.3)';
        setaDir.style.color = '#DCE026';
    };
    setaDir.onmouseout = () => {
        setaDir.style.transform = 'scale(1)';
        setaDir.style.color = 'white';
    };

    // Cria os bullets do mini carrossel
    const bulletsContainer = document.createElement('div');
    bulletsContainer.style.cssText = `
        display: flex;
        gap: 10px;
        align-items: center;
    `;

    const bullet1 = document.createElement('div');
    const bullet2 = document.createElement('div');
    
    [bullet1, bullet2].forEach((bullet, index) => {
        bullet.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: ${index === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.4)'};
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid rgba(255,255,255,0.2);
        `;
        bullet.onmouseover = () => {
            bullet.style.transform = 'scale(1.3)';
            bullet.style.borderColor = '#DCE026';
        };
        bullet.onmouseout = () => {
            bullet.style.transform = 'scale(1)';
            bullet.style.borderColor = 'rgba(255,255,255,0.2)';
        };
        bulletsContainer.appendChild(bullet);
    });

    controlsContainer.appendChild(setaEsq);
    controlsContainer.appendChild(bulletsContainer);
    controlsContainer.appendChild(setaDir);

    imagemTitulo.style.position = 'relative';
    imagemTitulo.appendChild(controlsContainer);

    let currentImage = 0;

    function switchImage(index) {
        const currentImg = index === 0 ? img2 : img1;
        const nextImg = index === 0 ? img1 : img2;
        const currentFonte = index === 0 ? fonte2 : fonte1;
        const nextFonte = index === 0 ? fonte1 : fonte2;

        currentImg.style.transition = 'opacity 0.3s ease';
        currentImg.style.opacity = '0';
        
        setTimeout(() => {
            currentImg.style.display = 'none';
            nextImg.style.display = 'block';
            nextImg.style.opacity = '0';
            setTimeout(() => {
                nextImg.style.transition = 'opacity 0.3s ease';
                nextImg.style.opacity = '1';
            }, 10);
        }, 300);

        currentFonte.style.display = 'none';
        nextFonte.style.display = 'block';

        if (index === 0) {
            bullet1.style.backgroundColor = '#FFFFFF';
            bullet1.style.transform = 'scale(1.2)';
            bullet1.style.borderColor = '#DCE026';
            bullet2.style.backgroundColor = 'rgba(255,255,255,0.4)';
            bullet2.style.transform = 'scale(1)';
            bullet2.style.borderColor = 'rgba(255,255,255,0.2)';
            currentImage = 0;
        } else {
            bullet1.style.backgroundColor = 'rgba(255,255,255,0.4)';
            bullet1.style.transform = 'scale(1)';
            bullet1.style.borderColor = 'rgba(255,255,255,0.2)';
            bullet2.style.backgroundColor = '#FFFFFF';
            bullet2.style.transform = 'scale(1.2)';
            bullet2.style.borderColor = '#DCE026';
            currentImage = 1;
        }
    }

    setaEsq.addEventListener('click', function(e) {
        e.stopPropagation();
        const newIndex = currentImage === 0 ? 1 : 0;
        switchImage(newIndex);
    });

    setaDir.addEventListener('click', function(e) {
        e.stopPropagation();
        const newIndex = currentImage === 0 ? 1 : 0;
        switchImage(newIndex);
    });

    bullet1.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentImage !== 0) switchImage(0);
    });

    bullet2.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentImage !== 1) switchImage(1);
    });

    // Configura estado inicial
    img1.style.display = 'block';
    img1.style.opacity = '1';
    img2.style.display = 'none';
    img2.style.opacity = '0';
    fonte1.style.display = 'block';
    fonte2.style.display = 'none';
}

// ============ EXECUTA O CARREGAMENTO ============
loadCarousel();

});