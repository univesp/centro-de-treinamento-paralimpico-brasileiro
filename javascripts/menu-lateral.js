document.addEventListener('DOMContentLoaded', function() {
  // ============ MENU LATERAL ============
  
  // Configuração dos itens do menu
  const menuItems = [
      { id: 'apresentacao', label: 'Apresentação' },
      { id: 'dadosGerais', label: 'Dados gerais' },
      { id: 'comoSurgiuOCentro', label: 'Como surgiu o centro?' },
      { id: 'extruturaComplexo', label: 'Estrutura do complexo' },
      { id: 'modalidadesTreinadas', label: 'Modalidades treinadas' },
      { id: 'linhaDoTempo', label: 'Linha do tempo' },
      { id: 'impactosInclusao', label: 'Impactos para a inclusão' },
      { id: 'marcosERecordes', label: 'Marcos e recordes' }
  ];

  // Seleciona todos os menus
  const menuAreas = document.querySelectorAll('.menu-area');
  
  menuAreas.forEach((menuArea, index) => {
      // Cria o container do dropdown
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'menu-dropdown-container';

      // Envolve o ícone no container
      const icon = menuArea.querySelector('img');
      if (icon) {
          // Cria o botão do menu
          const menuButton = document.createElement('div');
          menuButton.className = 'menu-button';
          
          // Move o ícone para dentro do botão
          icon.parentNode.insertBefore(menuButton, icon);
          menuButton.appendChild(icon);

          // Cria o dropdown
          const dropdown = document.createElement('div');
          dropdown.className = 'menu-dropdown';

          // Adiciona os itens do menu
          menuItems.forEach(item => {
              const link = document.createElement('a');
              link.href = `#${item.id}`;
              link.textContent = item.label;

              // Scroll suave ao clicar
              link.addEventListener('click', function(e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  const targetElement = document.querySelector(targetId);
                  if (targetElement) {
                      const offsetTop = targetElement.offsetTop - 80; // Ajuste para o header
                      window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                      });
                  }
                  // Fecha o dropdown
                  dropdown.style.display = 'none';
                  menuButton.classList.remove('ativo');
              });

              dropdown.appendChild(link);
          });

          // Adiciona o dropdown ao container
          menuButton.parentNode.insertBefore(dropdown, menuButton.nextSibling);

          // Toggle do dropdown ao clicar no ícone
          menuButton.addEventListener('click', function(e) {
              e.stopPropagation();
              const isOpen = dropdown.style.display === 'block';
              
              // Fecha todos os outros dropdowns
              document.querySelectorAll('.menu-dropdown').forEach(d => {
                  d.style.display = 'none';
              });
              document.querySelectorAll('.menu-button').forEach(b => {
                  b.classList.remove('ativo');
              });
              
              if (!isOpen) {
                  dropdown.style.display = 'block';
                  this.classList.add('ativo');
                  // Animação de rotação do ícone
                  const img = this.querySelector('img');
                  if (img) {
                      img.style.transform = 'rotate(180deg)';
                      img.style.transition = 'transform 0.3s ease';
                  }
              } else {
                  dropdown.style.display = 'none';
                  this.classList.remove('ativo');
                  const img = this.querySelector('img');
                  if (img) {
                      img.style.transform = 'rotate(0deg)';
                  }
              }
          });

          // Fecha o dropdown ao clicar fora
          document.addEventListener('click', function(e) {
              if (!dropdownContainer.contains(e.target)) {
                  dropdown.style.display = 'none';
                  menuButton.classList.remove('ativo');
                  const img = menuButton.querySelector('img');
                  if (img) {
                      img.style.transform = 'rotate(0deg)';
                  }
              }
          });

          // Fecha o dropdown ao pressionar ESC
          document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape') {
                  dropdown.style.display = 'none';
                  menuButton.classList.remove('ativo');
                  const img = menuButton.querySelector('img');
                  if (img) {
                      img.style.transform = 'rotate(0deg)';
                  }
              }
          });
      }
  });

  // Adiciona a animação CSS
  const style = document.createElement('style');
  style.textContent = `
      @keyframes menuFadeIn {
          from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
          }
          to {
              opacity: 1;
              transform: translateY(0) scale(1);
          }
      }

      .menu-button.ativo img {
          transform: rotate(180deg);
      }

      .menu-dropdown a:last-child {
          border-bottom: none;
      }

      /* Scrollbar personalizada do dropdown */
      .menu-dropdown::-webkit-scrollbar {
          width: 4px;
      }
      .menu-dropdown::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
      }
      .menu-dropdown::-webkit-scrollbar-thumb {
          background: #FFC815;
          border-radius: 4px;
      }
  `;
  document.head.appendChild(style);
});