// Banco de dados de todas as ações, extraído do Resumo_de_acoes.pdf

const LISTA_ATRIBUTOS = ['Jeitinho', 'Confusão', 'Músculos', 'Cachola', 'Contatos', 'Esperteza', 'Falastrice', 'Maneirice', 'Teimosia'];
const LISTA_TIPOS = ["FÍSICO", "MENTAL", "SOCIAL", "COOPERATIVO", "CENA"];

const allActions = [
    // === JEITINHO ===
    {
        nome: "Equipar-se",
        atributo: "Jeitinho",
        descricao: "Retira algo da mochila.",
        tags: [],
        detalhes: `<strong>Dificuldade:</strong> O quão rebuscado o objeto é.<br>
            0: Lanche, corda...<br>
            1: Tocha, adagas...<br>
            2: Lock Pick, gancho de escalada<br>
            3: Raros<br><br>
            <strong>Magnífico:</strong><br>
            +1 usando-o. Quebra rápido<br>
            1: +2 em ação com o objeto<br>
            2: Proeza normal ao objeto<br>
            3: +3 em ação com o objeto<br>
            4: Proeza poderosa ao objeto`
    },
    {
        nome: "Inventar",
        atributo: "Jeitinho",
        descricao: "Cria um treco.",
        tags: ["MENTAL", "COOPERATIVO", "CENA"],
        detalhes: `Para ações concretas (brincadeiras)<br>
            Coisas mais específicas<br>
            Que serve para coisas gerais (para escalar, algo assim)<br><br>
            <strong>Magnífico:</strong><br>
            1: Um sucesso automático no uso<br>
            2: Proeza normal<br>
            3: Proeza poderosa<br>
            +1: +1 sucesso automático/max de 3`
    },
    {
        nome: "Reparar",
        atributo: "Jeitinho",
        descricao: "Repara objetos.",
        tags: ["MENTAL", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> Complexidade do objeto<br>
            0: Espadas, facas...<br>
            1: Batedeira, ventilador...<br>
            2: Carro, moto...<br>
            3: Robô, computador...<br><br>
            <strong>Magnífico:</strong> Aprimora o objeto<br>
            1: Proeza normal<br>
            2: Proeza poderosa`
    },
    // === CONFUSÃO ===
    {
        nome: "Atacar",
        atributo: "Confusão",
        descricao: "Atacar um inimigo.",
        tags: ["FÍSICO", "CONFUSÃO"],
        detalhes: `<strong>Dificuldade:</strong> Reação do inimigo e/ou<br>
            1 área: 1<br>
            2 áreas: 2<br>
            Obstáculos: +1<br><br>
            Um dano padrão +1 por magnífico ou:<br>
            1: Atordoado, cego ou mancando 1 turno<br>
            2: Mesmo do 1º, 3 turnos / Imobilizado (arma apropriada)<br>
            3: Mesmo do 1º uma cena<br>
            4: Mesmo do 1º, história inteira`
    },
    {
        nome: "Empurrar",
        atributo: "Confusão",
        descricao: "Desloca por 1 área.",
        tags: ["FÍSICO", "MÚSCULOS", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Tamanho relativo ao inimigo<br>
            0: Inimigo menor<br>
            1: Mesmo tamanho<br>
            2: Inimigo maior<br>
            3: Muito maior<br><br>
            <strong>Magnífico:</strong><br>
            1: Atordoado 1 turno<br>
            2: 1 de dano<br>
            3: Mesmo do 1º, 3 turnos<br>
            4: 2 de dano<br>
            *Caso vá para uma área mais baixa tem a ação cair`
    },
    {
        nome: "Lançar",
        atributo: "Confusão",
        descricao: "Lança objetos ou algumas armas.",
        tags: ["FÍSICO", "CONFUSÃO"],
        detalhes: `<strong>Dificuldade:</strong> (fazer ação levantar antes se pesado)<br>
            0: Shurikens, facas, pedras...<br>
            1: Saco de maçãs<br>
            2: Arca de joias (+1 de dano)<br>
            3: Tampa de sarcófago (+1 de dano)<br>
            4: Sarcófago inteiro (+2 de dano)<br><br>
            Um de dano padrão<br>
            <strong>Magnífico:</strong><br>
            1: Atordoado, cego ou mancando 1 turno<br>
            2: Mesmo do 1º, 3 turnos / Imobilizado (arma apropriada)<br>
            3: Mesmo do 1º uma cena<br>
            4: Mesmo do 1º, história inteira<br>
            +1: Dano ou distância adicional`
    },
    // === MÚSCULOS ===
    {
        nome: "Bloquear",
        atributo: "Músculos",
        descricao: "Bloquear passagens.",
        tags: ["FÍSICO", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Quantidade do que tem em volta<br>
            0: Abarrotado de coisas<br>
            1: Muitas coisas como caixas<br>
            2: Pouca coisa<br>
            3: Quase deserto<br><br>
            *Dificuldade 1 com ação de quebrar para portas ou saltar para mesas<br>
            <strong>Magnífico:</strong> +1 magnífico = +1 na dificuldade`
    },
    {
        nome: "Cair",
        atributo: "Músculos",
        descricao: "Pode ser proposital, acidental ou resultado de outra ação.",
        tags: ["FÍSICO", "MÚSCULOS"],
        detalhes: `<strong>Dificuldade:</strong> Altura (Se falhar, toma o dano)<br>
            0: De um cavalo (Falha: 1 de saúde)<br>
            1: Telhado de casa baixa (Falha: 2 de saúde)<br>
            2: Copa de árvore alta (Falha: 3 de saúde)<br>
            3: Torre de um castelo (Falha: 4 de saúde)<br><br>
            *Caso não falhe: reduz 1 do dano total e +1 por magnífico.<br>
            <strong>Se cair em um personagem:</strong><br>
            1: Atordoado 1 turno<br>
            2: 1 de dano no personagem alvo<br>
            3: Atordoado 3 turnos<br>
            4: 2 de dano no personagem alvo`
    },
    {
        nome: "Correr",
        atributo: "Músculos",
        descricao: "Serve para voadores ou semelhantes.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> O quão acidentado é o terreno<br>
            0: Reto e livre de coisas<br>
            1: Alguns obstáculos no caminho<br>
            2: Muitos obstáculos para evitar<br>
            3: Muitos obstáculos, curvas e voltas<br><br>
            *1 área extra se bem sucedido.<br>
            <strong>Magnífico:</strong> A cada magnífico deixa +1 personagem impressionado ou surpreso por 1 turno, ou aumenta a duração.`
    },
    {
        nome: "Engolir",
        atributo: "Músculos",
        descricao: "Engolir coisas.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> O que se tenta engolir (Falha: estado doente ou empanturrado)<br>
            0: Comida normal<br>
            1: Comida em excesso<br>
            2: Objeto não comestível (Ex: relógio)<br>
            3: Objeto não comestível grande<br><br>
            *Caso não falhe: remove estado esfomeado.<br>
            <strong>Magnífico:</strong> Deixa alguém Deslumbrado ou confuso.<br><br>
            <strong>* Remover efeitos venenosos:</strong><br>
            Dificuldade: A quantidade de vida que perderia<br>
            0: Comida podre<br>
            1: Veneno fraco<br>
            2: Veneno sério<br>
            3: Veneno mortífero`
    },
    {
        nome: "Escalar",
        atributo: "Músculos",
        descricao: "Subir em alturas mais elevadas.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> O quão íngreme é a superfície (Falha: ação cair)<br>
            0: Corda com nós<br>
            1: Árvore nodosa<br>
            2: Parede de tijolos<br>
            3: Parede lisa<br><br>
            <strong>Magnífico:</strong> A cada magnífico deixa +1 personagem impressionado ou surpreso por 1 turno, ou aumenta a duração.`
    },
    {
        nome: "Esquivar",
        atributo: "Músculos",
        descricao: "Dificulta o acerto de ataques.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> 1<br>
            <strong>Caso não falhe:</strong> +2 na dificuldade do inimigo.<br>
            <strong>Magnífico:</strong> +1 na dificuldade por magnífico.`
    },
    {
        nome: "Levantar",
        atributo: "Músculos",
        descricao: "Relacionada a mover peso.",
        tags: ["FÍSICO", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Peso do objeto<br>
            0: Saco de maçãs<br>
            1: Arca de joias<br>
            2: Tampa de sarcófago<br>
            3: Sarcófago inteiro<br>
            4: Estátua de um elefante<br><br>
            <strong>Magnífico:</strong> A cada magnífico é dado uma rodada extra sem a necessidade de fazer o teste para manter no ar ou mover.`
    },
    {
        nome: "Nadar",
        atributo: "Músculos",
        descricao: "*caso não tenha barbatanas",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> Tranquilidade das águas (Falha: provável ação de segurar)<br>
            0: Tranquilas como uma piscina<br>
            1: Poucas ondas, um lago<br>
            2: Ondas moderadas, rio<br>
            3: Um mar revolto<br><br>
            <strong>Magnífico:</strong> Chegar sem ser visto ou para cada sucesso 1 personagem fica impressionado ou surpreso por 1 turno.`
    },
    {
        nome: "Prender",
        atributo: "Músculos",
        descricao: "Imobiliza um personagem.",
        tags: ["FÍSICO", "MÚSCULOS", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Reação do personagem<br>
            <strong>Caso não falhe:</strong> Imobilizado no personagem alvo. Dura 1 turno.<br>
            <strong>Reação:</strong> Realiza a ação de soltar-se.<br><br>
            <strong>Magnífico:</strong> O personagem se mantém imobilizado após ser solto por quem fez a ação, e a quantidade de magnífico significa a força das amarras.`
    },
    {
        nome: "Quebrar",
        atributo: "Músculos",
        descricao: "Quebrar objetos.",
        tags: ["FÍSICO", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Dureza do material<br>
            0: Frágil, jarro de porcelana<br>
            1: Não muito duro, bastão de madeira<br>
            2: Robusto, porta grossa<br>
            3: Duro, porta de metal<br><br>
            *Reparar o objeto terá +1 de dificuldade.<br>
            <strong>Magnífico:</strong><br>
            1: Quebra silenciosa<br>
            2: Reparar objeto terá +2 de dificuldade<br>
            3: Objeto irreconhecível, +1 de dificuldade em investigar`
    },
    {
        nome: "Segurar",
        atributo: "Músculos",
        descricao: "Fome, sono, prender respiração, etc.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> Nível de saúde (Falha: Perder 1 nível de saúde ou algo que faça sentido)<br>
            0: 4 níveis<br>
            1: 3 níveis<br>
            2: 2 níveis<br>
            3: 1 nível<br>
            4: 0 níveis<br><br>
            <strong>Magnífico:</strong> Adiciona 1 unidade de tempo.`
    },
    {
        nome: "Saltar",
        atributo: "Músculos",
        descricao: "Ultrapassar um obstáculo.",
        tags: ["FÍSICO"],
        detalhes: `<strong>Dificuldade:</strong> Tamanho do obstáculo (Falha: pode cair, ser imobilizado, etc)<br>
            0: Insignificante, diminuto<br>
            1: Pequeno, um banco<br>
            2: Alto como um personagem médio<br>
            3: Muro médio<br>
            4: Muro alto, quase necessário escalar<br><br>
            <strong>Magnífico:</strong> A cada magnífico deixa +1 personagem impressionado ou surpreso por 1 turno, ou aumenta a duração.`
    },
    {
        nome: "Soltar-se",
        atributo: "Músculos",
        descricao: "Em estado imobilizado, pode tentar sair.",
        tags: ["FÍSICO", "MÚSCULOS", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Força das amarras ou reação.<br>
            0: Barbante fino<br>
            1: Corda grossa<br>
            2: Algemas ou corrente fina<br>
            3: Corrente grossa<br><br>
            <strong>Magnífico:</strong> Deixar o personagem que o prende atordoado por turnos igual aos magníficos OU Deixar o(s) captor(es) surpreso(s). (Quantidade ou turnos igual aos magníficos).`
    },
    // === CACHOLA ===
    {
        nome: "Ciência",
        atributo: "Cachola",
        descricao: "Preparar coisas que envolvam ciência (Ex: soro dezumbificador).",
        tags: ["MENTAL", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> O quão tranquilo está trabalhando (Falha: consequência considerável)<br>
            0: Em seu laboratório sem ninguém<br>
            1: No laboratório com interrupções<br>
            2: Fora do laboratório, ou dentro com muita interrupção<br>
            3: Fora do laboratório, com interrupções ou...<br>
            4: Fora do laboratório em perigo<br><br>
            <strong>Magnífico:</strong> Causa um estado adequado durante:<br>
            1: Três turnos<br>
            2: Uma cena<br>
            3: O resto da história`
    },
    {
        nome: "Curar",
        atributo: "Cachola",
        descricao: "Recuperar PS de um personagem.",
        tags: ["MENTAL", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Quantidade de PS do alvo<br>
            0: 3 PS ou mais<br>
            1: 2 PS<br>
            2: 1 PS<br>
            3: 0 PS<br><br>
            <strong>Caso não falhe:</strong> +1 PS.<br>
            <strong>Magnífico:</strong> +1 PS para cada magnífico.<br><br>
            <strong>*Remove estados de magia (congelado, doente, cego):</strong><br>
            Magníficos necessários pela duração do estado:<br>
            1: Menos de uma cena<br>
            2: Uma cena<br>
            3: Uma aventura<br>
            4: Qualquer duração`
    },
    {
        nome: "Estudar",
        atributo: "Cachola",
        descricao: "Estuda um livro, video, etc. Ganhando proeza temporária.",
        tags: ["MENTAL", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> Tipo de proeza<br>
            0: Proeza normal<br>
            1: Proeza poderosa<br>
            2: Proeza mágica<br>
            3: Proeza poderosa mágica<br><br>
            <strong>Caso não falhe:</strong> Proeza pode ser usada na cena seguinte.<br>
            <strong>Magnífico:</strong> Cada magnífico aumenta mais uma cena para utilização.`
    },
    {
        nome: "Investigar",
        atributo: "Cachola",
        descricao: "Busca informações montando uma investigação.",
        tags: ["MENTAL", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> O quão escondida está a informação<br>
            0: Tem testemunhas e provas úteis<br>
            1: Resposta certa misturada com falsas<br>
            2: Muita informação falsa em poucas verdadeiras<br>
            3: Talvez haja uma resposta certa<br><br>
            *A ação é jogada pelo mestre, que retornará as informações com base no resultado.`
    },
    {
        nome: "Saber",
        atributo: "Cachola",
        descricao: "Lembra de algo que você tenha visto em algum momento.",
        tags: ["MENTAL"],
        detalhes: `<strong>Dificuldade:</strong> Especificidade<br>
            0: Conhecimento geral<br>
            1: Não muito conhecido, mas difundido<br>
            2: Conhecimento preciso<br>
            3: Só os principais especialistas tem<br><br>
            <strong>Magnífico:</strong> A cada magnífico é permitido +1 pergunta sobre o assunto ao mestre.`
    },
    // === CONTATOS ===
    {
        nome: "Contatar",
        atributo: "Contatos",
        descricao: "Procurar onde está um personagem.",
        tags: ["MENTAL", "FALASTRICE", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade (Personagem Específica):</strong> Área de procura<br>
            0: Vilarejo (pouco mais de 4 casas)<br>
            1: Aldeia<br>
            2: Cidade grande<br>
            3: Uma região inteira de Ooo<br>
            *Falha vs Reação: O personagem percebe sua presença.<br>
            *Magnífico: +1 turno de vantagem para agir antes que percebam.<br><br>
            <strong>Dificuldade (Personagem Genérica):</strong> Inverso<br>
            0: Uma região inteira de Ooo<br>
            1: Cidade grande<br>
            2: Aldeia<br>
            3: Vilarejo<br>
            *Personagem contratado terá 3 no atributo da profissão.<br>
            *Magnífico: +1 na pontuação do atributo.`
    },
    {
        nome: "Fichar",
        atributo: "Contatos",
        descricao: "Saber algo sobre outro personagem (personalidade, trabalho, etc).",
        tags: ["MENTAL", "FALASTRICE"],
        detalhes: `<strong>Dificuldade:</strong> O quão conhecido o personagem é<br>
            0: Conhecido por todos<br>
            1: Como Finn e Jake<br>
            2: Aventureiro novato, conhecido em sua área<br>
            3: Nunca saiu do seu povoado<br><br>
            <strong>Magnífico:</strong> Uma pergunta adicional para cada magnífico.`
    },
    {
        nome: "Impressionar",
        atributo: "Contatos",
        descricao: "Contando aventuras e coisas doidas que fez.",
        tags: ["SOCIAL", "TEIMOSIA", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Do que você fez<br>
            0: Feitos extraordinários<br>
            1: Aventuras como as de Finn e Jake<br>
            2: Aventureiro novato<br>
            3: Você nunca saiu do seu povoado<br><br>
            <strong>Caso não falhe:</strong> O alvo fica em estado impressionado.<br>
            <strong>Magnífico (Duração):</strong><br>
            1: Três turnos<br>
            2: Esta cena<br>
            3: Esta aventura<br>
            *OU: Cada magnífico = -1 adicional para a personagem no estado.`
    },
    // === ESPERTEZA ===
    {
        nome: "Buscar",
        atributo: "Esperteza",
        descricao: "Procurar um objeto ou personagem escondido.",
        tags: ["MENTAL", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Tamanho do que está procurando<br>
            0: Grande ou gigante<br>
            1: Médio<br>
            2: Pequeno<br>
            3: Diminuto<br>
            *Pode aumentar se estiver bem escondido.<br><br>
            <strong>Magnífico:</strong> Cada magnífico serve para encontrar mais um objeto, de menor dificuldade.`
    },
    {
        nome: "Cavalgar",
        atributo: "Esperteza",
        descricao: "Fazer ações com uma montaria (saltar, correr, etc).",
        tags: ["FÍSICO", "TEIMOSIA"],
        detalhes: `<strong>Dificuldade:</strong> A mesma da ação que quer que a montaria faça.<br>
            *Se for selvagem, a montaria pode reagir com Teimosia.<br><br>
            <strong>Caso não falhe:</strong> A montaria tenta executar a ação em seu turno.<br>
            <strong>Magnífico:</strong> Montaria fica em estado inspirado. E cada +1 ao seu teste.`
    },
    {
        nome: "Cozinhar",
        atributo: "Esperteza",
        descricao: "Cozinhar.",
        tags: ["MENTAL", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> Quantas pessoas e meios<br>
            0: Para si mesmo<br>
            1: Amigos e família<br>
            2: Grande festa<br>
            3: Banquete para todo o povoado<br>
            *Sem ingredientes suficientes: +1<br>
            *Improvisando com ervas: +2<br><br>
            <strong>Caso não falhe:</strong> Elimina estado esfomeado.<br>
            <strong>Magnífico:</strong><br>
            1: Metade recebe estado (Empanturrado, impressionado, doente) por 1 cena.<br>
            2: Todos recebem o estado.`
    },
    {
        nome: "Decifrar",
        atributo: "Esperteza",
        descricao: "Auxiliar na resolução de um enigma, charada, etc.",
        tags: ["MENTAL"],
        detalhes: `<strong>Dificuldade:</strong> Complexidade do enigma (Falha: sem confirmação)<br>
            0: Para crianças<br>
            1: Precisa de um tempinho<br>
            2: Um racha cuca<br>
            3: Pode fazer pensar o dia todo<br>
            4: Que!!???<br><br>
            <strong>Caso não falhe:</strong> Confirmação da teoria.<br>
            <strong>Magnífico:</strong> Deixa 1 personagem impressionado ou surpreso por 1 turno (cada magnífico afeta +1 ou aumenta duração).`
    },
    {
        nome: "Imitar",
        atributo: "Esperteza",
        descricao: "Pode tentar copiar e usar uma proeza de um personagem.",
        tags: ["SOCIAL"],
        detalhes: `*Deve ser feito na mesma cena que foi utilizada.<br>
            <strong>Dificuldade:</strong> Efeito da proeza<br>
            0: Proeza normal<br>
            1: Proeza poderosa<br>
            2: Proeza mágica<br>
            3: Proeza poderosa mágica<br><br>
            <strong>Caso não falhe:</strong> Pode usar uma vez na mesma cena.<br>
            <strong>Magnífico:</strong> +1 na quantidade de uso na cena por magnífico.`
    },
    {
        nome: "Jogar",
        atributo: "Esperteza",
        descricao: "Jogar um jogo com regras.",
        tags: ["MENTAL", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> Complexidade do jogo (Competição)<br>
            0: Fácil, formar pares com cartas<br>
            1: Regras fáceis, jogo complexo, xadrez<br>
            2: Yu-gi-oh<br>
            3: Muito difícil, com muitas regras<br><br>
            <strong>Magnífico:</strong> Pode deixar o oponente confuso, furioso, impressionado, etc. por:<br>
            1: Três turnos<br>
            2: Uma cena<br>
            3: O resto da história`
    },
    {
        nome: "Lembrar",
        atributo: "Esperteza",
        descricao: "Permite lembrar de nome, rosto ou detalhes.",
        tags: ["MENTAL"],
        detalhes: `<strong>Dificuldade:</strong> Relevância da informação<br>
            0: Ouviu falar muitas vezes<br>
            1: Ouviu falar algumas vezes<br>
            2: Ouviu falar só uma vez<br>
            3: Viu uma vez, que pareceu irrelevante<br><br>
            <strong>Magnífico:</strong> Para cada um, um detalhe adicional.`
    },
    {
        nome: "Perceber",
        atributo: "Esperteza",
        descricao: "Para pra sentir, escutar ou ver algo.",
        tags: ["MENTAL"],
        detalhes: `<strong>Dificuldade:</strong> Sutileza do que quer discernir<br>
            0: Bem evidente<br>
            1: Sutil, mas perceptível<br>
            2: Muito tênue ou camuflado<br>
            3: Muito sutil<br><br>
            <strong>Magnífico:</strong> Para cada, uma pergunta adicional.`
    },
    {
        nome: "Rastrear",
        atributo: "Esperteza",
        descricao: "Procurar por rastros deixados.",
        tags: ["MENTAL", "FALASTRICE", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> O quão recente é o rastro<br>
            0: Alguns minutos<br>
            1: Algumas horas<br>
            2: Alguns dias<br>
            3: Uma semana<br>
            *+1 se a área for movimentada<br>
            *+2 se algo ofuscou o rastro<br><br>
            <strong>Magnífico:</strong> Cada = +1 turno do alvo surpreso.<br>
            *Alvo pode reagir com Falastrice se tentou não deixar rastros.`
    },
    // === FALASTRICE ===
    {
        nome: "Distrair",
        atributo: "Falastrice",
        descricao: "Pode desviar a atenção de um personagem.",
        tags: ["MENTAL", "ESPERTEZA", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> O quão crível você é<br>
            0: Há algo chamativo que realmente está acontecendo<br>
            1: Uma situação crível nas circunstâncias<br>
            2: Situação pouco crível<br>
            3: Inverossímil<br><br>
            <strong>Caso não falhe:</strong> Personagem fica em estado concentrado na ação escolhida.<br>
            <strong>Magnífico:</strong> Cada aumenta um turno de duração do estado.`
    },
    {
        nome: "Enganar",
        atributo: "Falastrice",
        descricao: "Dar informação falsa ao personagem.",
        tags: ["SOCIAL", "ESPERTEZA", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> Verossimilhança da mentira<br>
            0: Tão verossímil quanto a verdade<br>
            1: Mentira com algumas lacunas<br>
            2: Incoerente<br>
            3: Inverossímil, cheio de incongruências<br><br>
            <strong>Magnífico:</strong> Deixa o personagem em estado crédulo por:<br>
            1: Três turnos<br>
            2: Uma cena<br>
            3: Esta aventura<br>
            *Ou cada magnífico = -1 adicional para o estado crédulo.`
    },
    {
        nome: "Esconder",
        atributo: "Falastrice",
        descricao: "Esconder a si mesmo ou um objeto.",
        tags: ["FÍSICO", "ESPERTEZA"],
        detalhes: `<strong>Dificuldade:</strong> Possibilidades no local<br>
            0: Em um labirinto escuro<br>
            1: Um lugar escuro, com muitos lugares possíveis<br>
            2: Com uma luz mais forte e um ou 2 lugares<br>
            3: Um lugar muito iluminado, quase sem esconderijos<br>
            *Pequeno/Diminuto: -1 ou -2 na dificuldade.<br>
            *Grande/Gigante: +1 ou +2 na dificuldade.<br><br>
            <strong>Caso não falhe:</strong> Ganha estado escondido.<br>
            <strong>Magnífico:</strong> Cada aumenta em 1 a dificuldade para procurar.`
    },
    {
        nome: "Espreitar",
        atributo: "Falastrice",
        descricao: "Se move sigilosamente.",
        tags: ["FÍSICO", "ESPERTEZA"],
        detalhes: `<strong>Dificuldade:</strong> Lugar onde está<br>
            0: Escuro e barulhento<br>
            1: Algumas sombras e barulhos<br>
            2: Lugar quieto e iluminado<br>
            3: Silêncio absoluto, muito iluminado<br><br>
            <strong>Caso não falhe:</strong> Não é percebido. Se agir, alvo ganha estado surpreso por 1 turno.<br>
            <strong>Magnífico:</strong> Cada aumenta a duração em 1 turno.`
    },
    {
        nome: "Roubar",
        atributo: "Falastrice",
        descricao: "Pegar ou deixar algo sem perceberem.",
        tags: ["FÍSICO", "ESPERTEZA"],
        detalhes: `<strong>Dificuldade:</strong> Quantidade de distrações<br>
            0: Um show, muitas distrações<br>
            1: Muitas pessoas ao redor (rua principal)<br>
            2: Ambiente tranquilo, poucas pessoas<br>
            3: Apenas você e o alvo em um lugar deserto<br><br>
            <strong>Magnífico:</strong> Cada magnífico adiciona objeto a mais ao roubo.`
    },
    // === MANEIRICE ===
    {
        nome: "Animar",
        atributo: "Maneirice",
        descricao: "Inspira um personagem no turno seguinte.",
        tags: ["SOCIAL", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> 1 (ou igual a da ação que o alvo fará).<br><br>
            <strong>Caso não falhe:</strong> Personagem ganha estado inspirado.<br>
            <strong>Magnífico:</strong> Estende a duração (benefício só na ação dedicada).`
    },
    {
        nome: "Cantar",
        atributo: "Maneirice",
        descricao: "Deixa as pessoas que ouvem em X estado.",
        tags: ["SOCIAL", "TEIMOSIA", "COOPERATIVO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> Recepção do público<br>
            0: Está em um karaokê<br>
            1: Mais ou menos dispostos a escutar<br>
            2: Estão fazendo as próprias coisas<br>
            3: Não querem saber de você<br><br>
            <strong>Caso não falhe:</strong> Deixa todos que escutam em um estado correspondente.<br>
            <strong>Magnífico:</strong> Para cada, pode excluir 1 pessoa do efeito.`
    },
    {
        nome: "Convencer",
        atributo: "Maneirice",
        descricao: "Pode fazer outra personagem fazer o que você queira.",
        tags: ["SOCIAL", "TEIMOSIA", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> O quão razoável foi o que pediu<br>
            0: Que convém a personagem<br>
            1: Não faz diferença para o personagem<br>
            2: Pedido contrário aos interesses dele<br>
            3: Pedido perigoso, ou contrário as crenças e valores<br>
            4: Coloca a personagem em muito perigo<br><br>
            <strong>Magnífico:</strong> Deixa o personagem em estado crédulo por:<br>
            1: Três turnos<br>
            2: Esta cena<br>
            3: Esta aventura<br>
            *Ou cada magnífico = -1 adicional para o estado crédulo.`
    },
    {
        nome: "Dançar",
        atributo: "Maneirice",
        descricao: "Pode se livrar de alguns estados: assustado, furioso, confuso, para baixo...",
        tags: ["FÍSICO", "CENA"],
        detalhes: `<strong>Dificuldade:</strong> 2 (duração de história) ou 1 (demais casos).<br><br>
            <strong>Caso não falhe:</strong> Elimina o estado desejado.<br>
            <strong>Magnífico:</strong> Recebe estado inspirado na cena seguinte. Cada magnífico incrementa +1 no modificador do estado.`
    },
    {
        nome: "Flertar",
        atributo: "Maneirice",
        descricao: "Essas coisas aí.",
        tags: ["SOCIAL", "TEIMOSIA"],
        detalhes: `<strong>Dificuldade:</strong> Depende da relação com a personagem<br>
            0: São bons amigos<br>
            1: São conhecidos e simpatizam-se<br>
            2: Não se conhecem<br>
            3: Se conhecem e não vão com a cara<br>
            4: São inimigos<br><br>
            <strong>Caso não falhe:</strong> A personagem recebe estado deslumbrado no turno seguinte.<br>
            <strong>Magnífico:</strong> Aumenta a duração do estado<br>
            1: Três turnos<br>
            2: Esta cena<br>
            3: Esta aventura`
    },
    // === TEIMOSIA ===
    {
        nome: "Assustar",
        atributo: "Teimosia",
        descricao: "O que diz.",
        tags: ["SOCIAL", "TEIMOSIA", "COOPERATIVO"],
        detalhes: `<strong>Dificuldade:</strong> É igual a 2, mas modifica com:<br>
            +1: É menor que o alvo<br>
            -1: É maior que o alvo<br>
            -1: Aparece de surpresa<br>
            -1: Ambiente sombrio, tenso<br>
            +1: Ambiente festivo, alegre<br><br>
            <strong>Caso não falhe:</strong> Estado assustado no alvo (1 turno).<br>
            <strong>Magnífico (Duração):</strong><br>
            1: Três turnos<br>
            2: Esta cena<br>
            3: Esta aventura<br>
            <strong>OU (Efeito):</strong><br>
            1: Cai algo da mão do personagem<br>
            2: Afasta-se 1 área de você<br>
            3: Foge de você`
    },
    {
        nome: "Concentrar-se",
        atributo: "Teimosia",
        descricao: "Serve para se sair bem em algo.",
        tags: ["MENTAL"],
        detalhes: `*Não pode ser usada para ações de cena.<br>
            <strong>Dificuldade:</strong> Quão tranquilo o ambiente é<br>
            0: Uma biblioteca da vida<br>
            1: Pouco estimulo. Em sua casa<br>
            2: Gente berrando e se mexendo<br>
            3: Ruídos estrondosos, muita gente correndo<br><br>
            <strong>Caso não falhe:</strong> Concentrado por 1 turno na ação que deseja.<br>
            <strong>Magnífico:</strong> Cada magnífico adiciona +1 turno de duração.`
    },
    {
        nome: "Conjurar (Mago)",
        atributo: "Teimosia",
        descricao: "Serve para conjurar feitiços (especial de magos).",
        tags: [],
        detalhes: `<strong>Nível:</strong> Define o custo (em PS) e a dificuldade.<br>
            0: Acender uma fogueira ou algo assim<br>
            1: Lançar raios de fogo, equipar espadas de gelo<br>
            2: Mão esmagadora, fendas no chão<br>
            3: Como assim isso é possível?<br><br>
            <strong>Caso não falhe:</strong> O efeito tem êxito e é pago os PS.<br>
            <strong>Magnífico:</strong><br>
            - Cada magnífico ignora 1 PS que iria perder.<br>
            - Coloca um estado apropriado no alvo por 1 turno.<br>
            - (Duração) 1: Três turnos, 2: Esta cena, 3: Esta aventura.`
    }
];