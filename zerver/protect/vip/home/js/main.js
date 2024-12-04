        // Função para remover todos os parâmetros da URL
        function resetToBaseUrl() {
            const url = new URL(window.location.href); // Obtém a URL atual
            url.pathname = '/'; // Reseta o caminho para a raiz
            url.search = ''; // Limpa todos os parâmetros de pesquisa
            url.hash = ''; // Limpa o hash (se houver)
          
            // Atualiza a URL sem recarregar a página
            window.history.replaceState({}, document.title, url.toString());
          }
          
          resetToBaseUrl();
          

    
        function copyToClipboard() {
          const keyElement = document.getElementById('key');
          const keyText = keyElement.getAttribute('data-key'); // Pegue somente a chave
          const copyButton = document.getElementById('copyButton');
          const copySuccess = document.getElementById('copySuccess');
    
          if (navigator.clipboard) {
            navigator.clipboard.writeText(keyText)
              .then(() => {
                copyButton.textContent = 'Copied Key!';
                copySuccess.classList.remove('hidden');
                setTimeout(() => {
                  copyButton.textContent = 'Copy Key';
                  copySuccess.classList.add('hidden');
                }, 2000); // Restaura o estado do botão após 2 segundos
              })
              .catch(err => {
                console.error('Could not copy text:', err);
              });
          } else {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = keyText;
            document.body.appendChild(textArea);
            textArea.select();
            try {
              document.execCommand('copy');
              copyButton.textContent = 'Copied Key!';
              copySuccess.classList.remove('hidden');
              setTimeout(() => {
                copyButton.textContent = 'Copy Key';
                copySuccess.classList.add('hidden');
              }, 2000);
            } catch (err) {
              console.error('Could not copy text:', err);
            }
            document.body.removeChild(textArea);
          }
        }
    
        document.getElementById('copyButton').addEventListener('click', copyToClipboard);