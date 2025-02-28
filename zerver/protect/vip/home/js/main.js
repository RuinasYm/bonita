

          document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            window.open("https://ww1.atticus.icu/", "_blank");
        });
        
        document.onkeydown = (e) => {
            if (
                e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J' || e.key === 'K')) || 
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault();
                window.open("https://ww1.atticus.icu/", "_blank");
            }
        };
        
        
        function copyToClipboard() {
          const keyElement = document.getElementById('key');
          const keyText = keyElement.getAttribute('data-key'); // Pegue somente a chave
          const copyButton = document.getElementById('copyButton');
    
          if (navigator.clipboard) {
            navigator.clipboard.writeText(keyText)
              .then(() => {
                copyButton.textContent = 'Copied Key!';
        
                setTimeout(() => {
                  copyButton.textContent = 'Copy Key';
                
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
              
              setTimeout(() => {
                copyButton.textContent = 'Copy Key';
          
              }, 2000);
            } catch (err) {
              console.error('Could not copy text:', err);
            }
            document.body.removeChild(textArea);
          }
        }
    
        document.getElementById('copyButton').addEventListener('click', copyToClipboard);