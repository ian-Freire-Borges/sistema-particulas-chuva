# Sistema de partículas: chuva

Protótipo para a Aula de Computação Gráfica e Realidade Virtual. Feito com React, Bootstrap e Three.js. A cena representa chuva e permite ajustar intensidade e vento. A cena é tridimensional, com câmera controlável e objetos 3D.

## Executar

É necessário Node.js. No diretório do projeto execute `npm install` e depois `npm run dev`. Abra o endereço exibido no terminal. Para gerar a versão de produção, execute `npm run build`.

## Organização

- `src/components`: interface, controles e canvas.
- `src/particles/engine.js`: criação, atualização, remoção e desenho das partículas.
- `src/App.jsx`: composição e estado da aplicação.

## Compreensão

1. Um sistema de partículas controla um conjunto de pequenas entidades que nascem, mudam e desaparecem ao longo do tempo.
2. Muitas entidades simples permitem representar fenômenos irregulares e dinâmicos, como chuva, sem modelar cada gota individualmente.
3. A partícula representa uma gota com posição, velocidade e idade; o sistema gerencia emissão, atualização, desenho e remoção do conjunto.
4. O emissor define onde, quando e quantas partículas nascem.
5. A atualização por quadro permite que posição e aparência evoluam ao longo do tempo. O cálculo usa o tempo decorrido para reduzir a dependência da taxa de quadros.
6. Sem limite de criação, a quantidade cresce continuamente, consumindo memória e processamento.
7. Limitar a quantidade máxima e remover partículas expiradas são duas estratégias de controle de custo.
8. Emissão → movimento → atualização da aparência → desenho → remoção. Primeiro as gotas nascem, depois são atualizadas e exibidas; por fim, as expiradas são removidas. Na implementação a remoção ocorre antes do desenho para evitar mostrar partículas já expiradas; a lógica visual é equivalente.

## Planejamento

| Item | Decisão |
|---|---|
| Fenômeno | Chuva |
| Emissor | Área horizontal acima da cena 3D |
| Quantidade máxima | 150, 450 ou 1200, conforme intensidade |
| Taxa de emissão | 60, 220 ou 750 gotas por segundo |
| Tempo de vida | Aleatório entre 1,8 e 2,3 segundos; a gota também pode sair da cena antes |
| Velocidade inicial | Entre 4 e 6 unidades de mundo por segundo |
| Força | Aceleração vertical de 3 unidades/s²; vento horizontal controlável |
| Tamanho | Traço de 0,22 unidade de mundo |
| Cor e transparência | Azul claro translúcido |
| Remoção | Ao expirar ou sair dos limites da cena |
| Controle | Intensidade e vento |
| Função no A3 | Proposta: criar atmosfera de chuva em uma área externa |

O emissor distribuído em uma área acima da cena, a aceleração para baixo e os traços finos sugerem gotas caindo. A variação de velocidade e tamanho reduz a aparência uniforme; a transparência permite sobreposição. O vento altera a trajetória e torna o fenômeno interativo.

## Experimento controlado

Selecione cada intensidade, aguarde alguns segundos e capture a tela. Compare a legibilidade e, usando o painel de desempenho do navegador, a taxa de quadros no computador de apresentação. As configurações e expectativas são:

| Configuração | Máximo | Emissão | Vida | Expectativa visual |
|---|---:|---:|---|---|
| Baixa | 150 | 60/s | 1,8–2,3 s | Gotas espaçadas |
| Intermediária | 450 | 220/s | 1,8–2,3 s | Chuva perceptível sem cobrir toda a cena |
| Alta | 1200 | 750/s | 1,8–2,3 s | Chuva densa, com maior custo |

O desempenho depende do dispositivo e deve ser medido. Mais partículas nem sempre melhoram a leitura: podem esconder o restante da cena. A configuração intermediária é uma escolha inicial para demonstração, a confirmar após o teste. Registre onde o desempenho começa a cair e inclua três capturas reais; não há medições ou capturas inventadas nesta entrega.

## Integração proposta com A3

O efeito poderia aparecer em uma área externa, comunicando clima chuvoso e movimento. O usuário altera o vento e a intensidade pelos controles. Em uma integração futura, uma mudança de clima poderia iniciar o efeito ou alterar sua intensidade. Em uma simulação ou experiência de RV, a chuva pode reforçar a sensação de ambiente dinâmico. A limitação atual é a ausência de colisão com objetos e de integração real com o A3. Plano B: reduzir a intensidade ou usar uma animação simples de fundo se o desempenho for insuficiente.

## Fechamento

As gotas em movimento, com velocidades e trajetórias diferentes, comunicam a evolução da chuva e permitem interação. Uma imagem estática não mostra essa mudança ao longo do tempo da mesma forma.


