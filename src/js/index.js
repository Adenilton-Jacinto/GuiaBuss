/*
Objetivo 1 - quando o usuário clicar no botão de seleção de plataformas deve abrir uma caixa com os botões de seleção de plataforma
    Passo 1 - pegar o botão de seleção de plataformas no JS pra poder verificar quando o usuário clicar em cima dele
    Passo 2 - pegar o elemento do conteudo que precisa ser mostrado
    Passo 3 - pegar o clique do usuario no js
    Passo 4 - quando o usuário clicar, adicionar a classe ativo na listagem de plataformas dentro do botão pra que o conteúdo apareça

Objetivo 2 - caso a lista de botões de plataformas já esteja aparecendo e o usuário clicar em cima do botão, o conteúdo deve ser escondido
    Passo 1 - verificar se o botão já esta aberto, se sim, devemos remover a classe ativo pra que ele esconda o conteúdo novamente

Objetivo 3 - Mostrar uma aba de rota ao clicar em uma das opções de R01 a R05
    Passo 1 - Pegar todos os elementos de imagem das rotas (R01 a R05)
    Passo 2 - Para cada imagem de rota, adicionar um evento de clique
    Passo 3 - Quando uma imagem de rota for clicada:
        a. Esconder todas as abas de rota visíveis.
        b. Pegar o ID da rota (e.g., 'R01') da imagem clicada usando o atributo data-route.
        c. Mostrar a aba de rota correspondente a esse ID.
        d. Fechar a caixa de seleção de plataformas se estiver aberta.
        e. NOVO: Parar a propagação do clique para que o botão pai não intercepte.
*/

// Adiciona um listener para garantir que o script só rode quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    // --- Seleção de Elementos ---
    const botaoPlataforma = document.querySelector(".btn-plataforma");
    const listaPlataformas = document.querySelector(".btn-plataforma .plataformas");
    // Seleciona todas as imagens de rota que têm o atributo data-route, de AMBAS as listas
    const imagensRotas = document.querySelectorAll(".plataformas img[data-route]");

    // --- Objetivo 1 e 2: Toggle da lista de plataformas ---
    if (botaoPlataforma && listaPlataformas) {
        botaoPlataforma.addEventListener("click", () => {
            listaPlataformas.classList.toggle("ativo");
        });
    } else {
        console.error("Erro: Elementos .btn-plataforma ou .plataformas não encontrados.");
    }


    // --- Objetivo 3: Mostrar uma aba de rota ao clicar ---
    if (imagensRotas.length > 0) {
        imagensRotas.forEach(imagem => {
            imagem.addEventListener("click", (event) => { // Adicione 'event' como parâmetro aqui
                event.stopPropagation(); // ISSO É O NOVO: Interrompe a propagação do clique

                // 3a. Esconder todas as abas de rota visíveis
                const todasAbasRotas = document.querySelectorAll(".route-tab");
                todasAbasRotas.forEach(aba => {
                    aba.style.display = "none";
                });

                // 3b. Pegar o ID da rota da imagem clicada
                const rotaId = imagem.dataset.route;

                // 3c. Mostrar a aba de rota correspondente
                if (rotaId) {
                    const abaRotaParaMostrar = document.getElementById(`route-${rotaId}`);
                    if (abaRotaParaMostrar) {
                        abaRotaParaMostrar.style.display = "block";
                        abaRotaParaMostrar.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        console.warn(`Aviso: Aba de rota com ID 'route-${rotaId}' não encontrada.`);
                    }
                }

                // 3d. Fechar a caixa de seleção de plataformas se estiver aberta
                if (listaPlataformas && listaPlataformas.classList.contains("ativo")) {
                    listaPlataformas.classList.remove("ativo");
                }
            });
        });
    } else {
        console.warn("Aviso: Nenhuma imagem de rota com 'data-route' encontrada.");
    }
});