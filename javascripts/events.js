$(document).ready(function(){

  //////////////////////////////////////////////////////////////////
  // HEADER DINÂMICO
  // Mostra header somente no início da página.
  // Descomentar caso utilizada a classe .header-dinamico. Caso contrário, deletar.

  $(window).scroll(function(){
    var nav = $(".header-dinamico .container");
    var scroll = $(window).scrollTop();
    if(scroll == 0){
      nav.fadeIn();
    } else {
      nav.fadeOut();
    }
  });

  //////////////////////////////////////////////////////////////////

  // ============ CARREGAR ÍCONES DA ESTRUTURA DO COMPLEXO ============
  function loadEstruturaIcones() {
    fetch('../data/estrutura-complexo-icones.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('iconesEstrutura');
        if (!container) return;

        // Limpa o container para evitar duplicação
        container.innerHTML = '';
        
        // Organizar em grupos de 5, 4, 4
        const grupos = [];
        const tamanhos = [5, 4, 4];
        let index = 0;
        
        tamanhos.forEach(tamanho => {
          const grupo = data.slice(index, index + tamanho);
          if (grupo.length > 0) {
            grupos.push(grupo);
          }
          index += tamanho;
        });
        
        // Criar as linhas
        grupos.forEach((grupo) => {
          const linha = document.createElement('div');
          linha.className = 'icones-linha';
          
          grupo.forEach(item => {
            const divItem = document.createElement('div');
            divItem.className = 'icones-estrutura-item';
            
            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.alt;
            
            const span = document.createElement('span');
            span.textContent = item.titulo;
            
            divItem.appendChild(img);
            divItem.appendChild(span);
            linha.appendChild(divItem);
          });
          
          container.appendChild(linha);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os ícones da estrutura:', error);
      });
  }

  // ============ CARREGAR MODALIDADES DO JSON ============
  function loadModalidades() {
    fetch('../data/modalidades.json')
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector('.modalidades-container');
        if (!container) return;

        // Limpa o container (caso tenha algum conteúdo placeholder)
        container.innerHTML = '';

        // Itera sobre cada modalidade
        data.forEach((item, index) => {
          // Cria o item principal
          const modalidadeItem = document.createElement('div');
          modalidadeItem.className = 'modalidade-item';

          // Cria a box do ícone
          const itemBox = document.createElement('div');
          itemBox.className = 'modalidade-item-box';

          // Cria a imagem do ícone
          const img = document.createElement('img');
          img.src = item.icone;
          img.alt = item.alt || `Ícone da modalidade ${item.modalidade}`;

          // Cria o ícone de informação
          const iconeInfo = document.createElement('img');
          iconeInfo.className = 'icone-info';
          iconeInfo.src = '../assets/icone-info.png';
          iconeInfo.alt = 'Clique para mais informações';
          iconeInfo.dataset.target = `texto${index + 1}`;

          // Adiciona as imagens à box
          itemBox.appendChild(img);
          itemBox.appendChild(iconeInfo);

          // Cria o span com o nome da modalidade
          const span = document.createElement('span');
          span.textContent = item.modalidade;

          // Cria a div do texto (popup)
          const textoBox = document.createElement('div');
          textoBox.className = 'texto-modalidade-box';
          textoBox.id = `texto${index + 1}`;

          const p = document.createElement('p');
          p.textContent = item.texto;
          textoBox.appendChild(p);

          // Monta o item completo
          modalidadeItem.appendChild(itemBox);
          modalidadeItem.appendChild(span);
          modalidadeItem.appendChild(textoBox);

          // Adiciona ao container
          container.appendChild(modalidadeItem);
        });

        // ============ INICIALIZAR OS POPUPS ============
        initModalidadePopups();
      })
      .catch(error => {
        console.error('Erro ao carregar as modalidades:', error);
        // Fallback: mostra mensagem de erro no container
        const container = document.querySelector('.modalidades-container');
        if (container) {
          container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Erro ao carregar modalidades. Tente novamente mais tarde.</p>';
        }
      });
  }

  // ============ FUNÇÃO PARA INICIALIZAR OS POPUPS ============
  function initModalidadePopups() {
    // Fecha todos os popups ao clicar fora
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.modalidade-item').length) {
        $('.texto-modalidade-box').removeClass('ativo');
      }
    });

    // Toggle do popup ao clicar no ícone
    $('.icone-info').on('click', function(e) {
      e.stopPropagation(); // Impede que o clique feche o popup imediatamente
      
      const targetId = $(this).data('target');
      const targetBox = $(`#${targetId}`);
      
      // Fecha outros popups
      $('.texto-modalidade-box').not(targetBox).removeClass('ativo');
      
      // Toggle do popup clicado
      targetBox.toggleClass('ativo');
    });

    // Fecha o popup ao clicar no ESC
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape') {
        $('.texto-modalidade-box').removeClass('ativo');
      }
    });

    // Ajusta posição do popup se estiver próximo à borda
    function ajustarPosicaoPopup() {
      $('.texto-modalidade-box.ativo').each(function() {
        const popup = $(this);
        const rect = popup[0].getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        // Se o popup ultrapassar a borda direita
        if (rect.right > windowWidth - 20) {
          popup.css({
            'left': 'auto',
            'right': '0',
            'transform': 'translateY(10px)'
          });
          // Ajusta a seta
          popup.find('::before').css({
            'left': 'auto',
            'right': '20px'
          });
        } else {
          popup.css({
            'left': '50%',
            'right': 'auto',
            'transform': 'translateX(-50%) translateY(10px)'
          });
        }
      });
    }

    // Ajusta ao abrir o popup
    $(document).on('click', '.icone-info', function() {
      setTimeout(ajustarPosicaoPopup, 100);
    });

    // Ajusta ao redimensionar a janela
    $(window).on('resize', ajustarPosicaoPopup);
  }

  // ============ EXECUTA OS CARREGAMENTOS ============
  loadEstruturaIcones();
  loadModalidades();

});