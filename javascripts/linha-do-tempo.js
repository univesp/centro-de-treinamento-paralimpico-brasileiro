document.addEventListener('DOMContentLoaded', function() {
  // ============ ANIMAÇÃO DA LINHA DO TEMPO ============
  
  // Seleciona todos os itens da linha do tempo
  const ldtItems = document.querySelectorAll('.ldt-info-box');
  
  // Configuração do Intersection Observer
  const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.2 // 20% visível para ativar
  };

  // Função de callback quando um item entra/sai da viewport
  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Adiciona a classe 'visivel' quando o item aparece
              entry.target.classList.add('visivel');
              
              // Opcional: para animar uma vez só, descomente a linha abaixo
              // observer.unobserve(entry.target);
          }
      });
  };

  // Cria o observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Adiciona cada item ao observer
  ldtItems.forEach(item => {
      // Adiciona uma classe base para o estado inicial (invisível)
      item.classList.add('ldt-hidden');
      observer.observe(item);
  });

  // Função para verificar itens já visíveis ao carregar a página
  function checkVisibleOnLoad() {
      ldtItems.forEach(item => {
          const rect = item.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          // Se o item já estiver visível na tela
          if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
              item.classList.add('visivel');
          }
      });
  }

  // Verifica itens visíveis ao carregar
  setTimeout(checkVisibleOnLoad, 300);

  // Re-verifica após um pequeno delay para garantir
  window.addEventListener('load', function() {
      setTimeout(checkVisibleOnLoad, 500);
  });
});