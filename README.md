# Pipoca Recheada

Landing page experimental para uma marca de pipoca recheada, adaptada de um design system originalmente escuro e tecnológico para uma direção visual clara, rosa-bebê, cremosa e mais ligada a comida/presente.

## Direção visual

- navegação em cápsula com blur;
- hero grande e enquadrado, inspirado na estrutura cinematográfica do design system de referência;
- grid estrutural e pontos discretos no fundo;
- títulos grandes com Barlow Condensed;
- microtextos com JetBrains Mono;
- creme, rosa-bebê, caramelo e chocolate como paleta;
- cards grandes e arredondados para os baldes;
- placeholders prontos para substituir por fotografias reais dos produtos.

## Arquivos

- `index.html` — estrutura e conteúdo;
- `styles.css` — sistema visual e responsividade;
- `script.js` — menu mobile, seleção de produto e animações de entrada.

## Como testar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático.

## Onde colocar as fotos reais

Nos cards da seção `#sabores`, substitua cada bloco `.photo-placeholder` por uma imagem, por exemplo:

```html
<img class="product-photo" src="assets/balde-ninho.jpg" alt="Balde de pipoca recheada de Ninho e creme de avelã" />
```

A proporção 1:1 (por exemplo 1200 × 1200 px) funciona melhor com o layout atual.
