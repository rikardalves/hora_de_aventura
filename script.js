// === ADICIONADO DE VOLTA ===
// Estas duas linhas estavam faltando e impediam o script de rodar.
const atributosLista = ['Jeitinho', 'Confusão', 'Músculos', 'Cachola', 'Contatos', 'Esperteza', 'Falastrice', 'Maneirice', 'Teimosia'];
const estadosLista = ["QUEIMANDO", "CANSADO", "CONCENTRADO", "ASSUSTADO", "CEGADO", "CRÉDULO", "ATURDIDO", "MANCANDO", "CONFUSO", "CONGELADO", "DESLUMBRADO", "ENSURDECIDO", "PARA BAIXO", "EMPANTURRADO", "FURIOSO", "DECEPCIONADO", "ENAMORADO", "ESFOMEADO", "ENFEITIÇADO", "IMOBILIZADO", "MORTO", "INCONSCIENTE", "INSPIRADO", "ESCONDIDO", "IMPRESSIONADO", "MIOLO MOLE", "PARALISADO", "DOENTE", "DIMINUTO", "PEQUENO", "MÉDIO", "GRANDE", "GIGANTE", "SURPRESO", "ESQUISITÃO"];
// =============================

// --- FUNÇÕES DE INICIALIZAÇÃO (EXECUTADAS QUANDO A PÁGINA CARREGA) ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Popula dropdown de equipamentos
    popularPresetsEquipamentos();

    // Loop inicial para criar os atributos
    const atributosContainer = document.getElementById('atributos');
    for (let i = 0; i < 3; i++) {
        const div = document.createElement('div');
        div.className = 'attr-box'; // O CSS vai estilizar esta classe
        div.innerHTML = `
        <select class="atributo" onchange="atualizarProezas(this.closest('.attr-box'))">
          <option value="">Atributo</option>
          ${atributosLista.map(a => `<option value="${a}">${a}</option>`).join('')}
        </select>
        <select class="valor" onchange="atualizarProezas(this.closest('.attr-box'))">
          <option value="2" selected>2</option> <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div class="proezas-container"></div>
      `;
        atributosContainer.appendChild(div);
        atualizarProezas(div);
    }

    // Loop inicial para criar Níveis de Saúde
    const vidaContainer = document.getElementById('vida');
    for (let i = 0; i < 5; i++) {
        const chk = document.createElement('input'); chk.type = 'checkbox'; chk.onchange = verificarVida;
        vidaContainer.appendChild(chk);
    }

    // === INÍCIO: NOVO CÓDIGO DE ESTADOS ===
    
    // Loop inicial para criar campos de Estado
    const estadosContainer = document.getElementById('estados');
    for (let i = 0; i < 3; i++) {
        const div = document.createElement('div'); 
        div.className = 'state-box';
        div.innerHTML = `
            <span class="estado-nome"></span>
            <button type="button" class="remove-estado-btn hidden" onclick="removerEstado(this)">-</button>
        `;
        estadosContainer.appendChild(div);
    }
    
    // Popula o dropdown mestre de estados
    const estadoMasterSelect = document.getElementById('estado-master-select');
    estadoMasterSelect.innerHTML += estadosLista.map(e => `<option value="${e}">${e}</option>`).join('');

    // Adiciona listener ao botão
    document.getElementById('add-estado-btn').addEventListener('click', adicionarEstado);
    
    // === FIM: NOVO CÓDIGO DE ESTADOS ===
});

// --- FUNÇÕES DAS PROEZAS ---
function mostrarProezaDesc(buttonElement) {
    const proezaSlot = buttonElement.closest('.proeza-slot');
    const select = proezaSlot.querySelector('select.proeza');
    const proezaName = select.value;

    if (!proezaName) {
        alert("Selecione uma proeza primeiro para ver sua descrição.");
        return;
    }

    const attrBox = buttonElement.closest('.attr-box');
    const atributoName = attrBox.querySelector('.atributo').value;

    if (!atributoName || !proezaMap[atributoName]) {
        alert("Erro: Atributo não encontrado.");
        return;
    }

    const feat = proezaMap[atributoName].find(p => p.name === proezaName);

    if (feat && feat.desc) {
        alert(`--- ${feat.name} ---\n\n${feat.desc}`);
    } else {
        alert("Descrição não encontrada para esta proeza.");
    }
}

/**
 * ATUALIZADO: Aceita um argumento opcional 'savedProezas'
 * @param {HTMLElement} attrBox - O elemento .attr-box
 * @param {string[] | null} [savedProezas=null] - Um array de nomes de proezas salvas
 */
function atualizarProezas(attrBox, savedProezas = null) {
    // Verifica se as variáveis de 'data.js' existem. Se não, para.
    if (typeof proezaMap === 'undefined' || typeof slotMap === 'undefined') {
        console.error("Erro: Arquivo data.js não foi carregado a tempo.");
        return;
    }

    const selectedAtributo = attrBox.querySelector('.atributo').value;
    const selectedValor = attrBox.querySelector('.valor').value;
    const container = attrBox.querySelector('.proezas-container');
    const totalSlots = slotMap[selectedValor] || 0;
    const featList = proezaMap[selectedAtributo] || [];

    // Lógica corrigida para carregar proezas salvas
    const currentSelections = savedProezas
        ? savedProezas
        : [...container.querySelectorAll('select.proeza')].map(s => s.value);

    container.innerHTML = '';
    let slotsUsados = 0;
    let selectIndex = 0;

    while (slotsUsados < totalSlots) {
        const slotsRestantes = totalSlots - slotsUsados;
        const optionsList = featList.filter(feat => feat.cost <= slotsRestantes);

        const slotDiv = document.createElement('div');
        slotDiv.className = 'proeza-slot';

        const select = document.createElement('select');
        select.className = 'proeza';
        select.onchange = () => atualizarProezas(attrBox, null); 

        let optionsHTML = '<option value="">-- Proeza --</option>';
        let currentValue = currentSelections[selectIndex] || "";
        let costOfThisSlot = 1;

        optionsList.forEach(feat => {
            const selected = (feat.name === currentValue) ? ' selected' : '';
            optionsHTML += `<option value="${feat.name}" data-cost="${feat.cost}"${selected}>${feat.name} (${feat.cost} slot${feat.cost > 1 ? 's' : ''})</option>`;
            if (selected) {
                costOfThisSlot = feat.cost;
            }
        });

        select.innerHTML = optionsHTML;
        select.value = currentValue; 

        const descButton = document.createElement('button');
        descButton.className = 'proeza-desc-btn';
        descButton.textContent = '!';
        descButton.type = 'button';
        descButton.setAttribute('onclick', 'mostrarProezaDesc(this)');

        slotDiv.appendChild(select);
        slotDiv.appendChild(descButton);

        container.appendChild(slotDiv);

        slotsUsados += costOfThisSlot;
        selectIndex++;
    }
}
// --- FIM DO CÓDIGO DE PROEZAS ---

// --- CÓDIGO DE EQUIPAMENTOS ---
function adicionarEquipamento(itemData) {
    const container = document.getElementById('equipamentos');
    const div = document.createElement('div');
    div.className = 'equip-item';
    const data = itemData || { arma: '', acao: '', reacao: '', maos: '', alcance: '' };

    div.innerHTML = `
    <input type="text" class="equip-arma" value="${data.arma}" placeholder="Arma">
    <input type="text" class="equip-acao" value="${data.acao}" placeholder="Ação">
    <input type="text" class="equip-reacao" value="${data.reacao}" placeholder="Reação">
    <input type="text" class="equip-maos" value="${data.maos}" placeholder="Mãos">
    <input type="text" class="equip-alcance" value="${data.alcance}" placeholder="Alcance">
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
    container.appendChild(div);
}

function adicionarPreset() {
    const select = document.getElementById('equip-preset-select');
    const itemName = select.value;
    if (itemName && equipmentMap[itemName]) {
        adicionarEquipamento(equipmentMap[itemName]);
        select.value = "";
    }
}

function adicionarEquipamentoCustomizado() {
    adicionarEquipamento(null);
}

function popularPresetsEquipamentos() {
    // Verifica se equipmentMap está carregado
    if (typeof equipmentMap === 'undefined') {
        console.error("Erro: Arquivo data.js não foi carregado a tempo.");
        return;
    }
    
    const select = document.getElementById('equip-preset-select');
    let optionsHTML = '<option value="">-- Selecione um item --</option>';

    optionsHTML += '<optgroup label="Corpo a Corpo">';
    optionsHTML += '<option value="Espada">Espada</option>';
    optionsHTML += '<option value="Espada Pesada">Espada Pesada</option>';
    optionsHTML += '<option value="Nunchaku">Nunchaku</option>';
    optionsHTML += '<option value="Machado">Machado</option>';
    optionsHTML += '<option value="Machado Grande">Machado Grande</option>';
    optionsHTML += '<option value="Faca (C/C)">Faca (C/C)</option>';
    optionsHTML += '</optgroup>';
    optionsHTML += '<optgroup label="Escudos">';
    optionsHTML += '<option value="Escudo Pequeno">Escudo Pequeno</option>';
    optionsHTML += '<option value="Escudo Grande">Escudo Grande</option>';
    optionsHTML += '</optgroup>';
    optionsHTML += '<optgroup label="Arremesso">';
    optionsHTML += '<option value="Faca (Arremesso)">Faca (Arremesso)</option>';
    optionsHTML += '<option value="Shuriken">Shuriken</option>';
    optionsHTML += '<option value: "Dardo">Dardo</option>';
    optionsHTML += '</optgroup>';
    optionsHTML += '<optgroup label="A Distância">';
    optionsHTML += '<option value="Funda">Funda</option>';
    optionsHTML += '<option value="Arco Curto">Arco Curto</option>';
    optionsHTML += '<option value="Arco Longo">Arco Longo</option>';
    optionsHTML += '<option value="Pistola Laser">Pistola Laser</option>';
    optionsHTML += '<option value="Rifle Laser">Rifle Laser</option>';
    optionsHTML += '</optgroup>';

    select.innerHTML = optionsHTML;
}
// --- FIM DO CÓDIGO DE EQUIPAMENTOS ---


// === INÍCIO: NOVAS FUNÇÕES DE ESTADO ===

/** Define o estado em um slot específico */
function setEstadoSlot(slot, estadoNome) {
    const nomeSpan = slot.querySelector('.estado-nome');
    const removeBtn = slot.querySelector('.remove-estado-btn');
    
    if (estadoNome) {
        nomeSpan.textContent = estadoNome;
        removeBtn.classList.remove('hidden');
    } else {
        nomeSpan.textContent = '';
        removeBtn.classList.add('hidden');
    }
}

/** Função principal para adicionar estados */
function adicionarEstado() {
    const select = document.getElementById('estado-master-select');
    const estadoNovo = select.value;
    if (!estadoNovo) return;

    // Verifica se as novas regras de estado foram carregadas
    if (typeof estadosData === 'undefined') {
        console.error("Erro: Arquivo data.js não foi carregado a tempo com 'estadosData'.");
        alert("Erro: Não foi possível carregar as regras dos estados.");
        return;
    }

    const slots = document.querySelectorAll('#estados .state-box');
    const estadosAtuais = [...slots].map(s => s.querySelector('.estado-nome').textContent).filter(Boolean);
    const regrasEstadoNovo = estadosData[estadoNovo];

    // Se já possui o estado, não faz nada
    if (estadosAtuais.includes(estadoNovo)) {
        select.value = ""; // Reseta o dropdown
        return;
    }

    // --- LÓGICA DE IGNORE/CANCELA ---

    // 1. Regra "Ignora": Verifica se um estado ATUAL ignora o NOVO
    for (const estadoExistente of estadosAtuais) {
        const regrasExistente = estadosData[estadoExistente];
        
        // Regras especiais "TODOS"
        if (regrasExistente.ignora.includes("TODOS")) {
            alert(`O estado ${estadoExistente} ignora o estado ${estadoNovo}.`);
            select.value = "";
            return;
        }
        if (regrasExistente.ignora.includes("TODOS (EXCETO MORTO)") && estadoNovo !== "MORTO") {
            alert(`O estado ${estadoExistente} ignora o estado ${estadoNovo}.`);
            select.value = "";
            return;
        }

        // Regra normal
        if (regrasExistente.ignora.includes(estadoNovo)) {
            alert(`O estado ${estadoExistente} ignora o estado ${estadoNovo}.`);
            select.value = "";
            return;
        }
    }

    // 2. Regra "Cancela": Verifica se o NOVO estado cancela um ATUAL
    let slotSubstituido = null;
    if (regrasEstadoNovo.cancela.length > 0) {
        // Regra especial "TODOS"
        if (regrasEstadoNovo.cancela.includes("TODOS")) {
            // Remove todos os estados e adiciona o novo
            slots.forEach(slot => setEstadoSlot(slot, null));
            setEstadoSlot(slots[0], estadoNovo);
            mostrarDescricao();
            select.value = "";
            return;
        }

        // Regra normal
        for (const estadoParaCancelar of regrasEstadoNovo.cancela) {
            for (const slot of slots) {
                if (slot.querySelector('.estado-nome').textContent === estadoParaCancelar) {
                    // Encontrou um estado para cancelar!
                    // Substitui o estado antigo pelo novo neste slot
                    setEstadoSlot(slot, estadoNovo);
                    slotSubstituido = slot;
                    break; // Para o loop interno
                }
            }
            if (slotSubstituido) break; // Para o loop externo
        }
    }

    // Se o estado foi adicionado via substituição, atualiza e sai
    if (slotSubstituido) {
        mostrarDescricao();
        select.value = "";
        return;
    }

    // 3. Adiciona em slot vazio
    let slotVazio = null;
    for (const slot of slots) {
        if (!slot.querySelector('.estado-nome').textContent) {
            slotVazio = slot;
            break;
        }
    }

    if (slotVazio) {
        setEstadoSlot(slotVazio, estadoNovo);
        mostrarDescricao();
        select.value = "";
        return;
    }

    // 4. Slots cheios
    alert(`É preciso remover um estado para adicionar ${estadoNovo}.`);
    select.value = "";
}

/** Remove um estado do slot */
function removerEstado(buttonElement) {
    const slot = buttonElement.closest('.state-box');
    setEstadoSlot(slot, null); // Limpa o slot
    mostrarDescricao(); // Atualiza a lista de descrições
}

/** Mostra a descrição dos estados ativos */
function mostrarDescricao() {
    const box = document.getElementById('descricaoEstado');
    box.innerHTML = '';
    
    // Verifica se estadosData está carregado
    if (typeof estadosData === 'undefined') {
        console.error("Erro: Arquivo data.js não foi carregado a tempo com 'estadosData'.");
        return;
    }

    // Lê os nomes dos estados dos spans
    document.querySelectorAll('#estados .state-box').forEach(slot => {
        const estadoNome = slot.querySelector('.estado-nome').textContent;
        if (estadoNome && estadosData[estadoNome]) {
            const p = document.createElement('div');
            p.className = 'descricao-estado';
            // Usa .desc para pegar só a descrição
            p.innerText = `${estadoNome}: ${estadosData[estadoNome].desc}`;
            box.appendChild(p);
        }
    });
}
// === FIM: NOVAS FUNÇÕES DE ESTADO ===


function alterarValor(id, delta) {
    const el = document.getElementById(id); let v = parseInt(el.textContent) + delta; if (v < 0) v = 0; el.textContent = v;
}

function verificarVida() {
    const hearts = [...document.querySelectorAll('#vida input')];
    if (hearts.every(h => h.checked)) {
        // Tenta adicionar 'INCONSCIENTE' usando a nova lógica
        // Seleciona o dropdown mestre e o botão
        const select = document.getElementById('estado-master-select');
        const addButton = document.getElementById('add-estado-btn');
        
        // Salva o valor atual do select para restaurar
        const valorAntigo = select.value;
        
        // Tenta adicionar
        select.value = 'INCONSCIENTE';
        adicionarEstado();
        
        // Restaura o valor do select
        select.value = valorAntigo;
    }
}

function salvarFicha() {
    const data = {
        nome: document.getElementById('nome').value,
        conceito: document.getElementById('conceito').value,
        historico: document.getElementById('historico').value,
        defeito: document.getElementById('defeito').value,
        heroi: document.getElementById('heroi').textContent,
        xp: document.getElementById('xp').textContent,
        vida: [...document.querySelectorAll('#vida input')].map(c => c.checked),
        atributos: [...document.querySelectorAll('.attr-box')].map(d => ({
            atrib: d.querySelector('.atributo').value,
            valor: d.querySelector('.valor').value,
            proezas: [...d.querySelectorAll('.proeza-slot select.proeza')].map(p => p.value)
        })),
        // ATUALIZADO: Salva os estados lendo dos spans
        estados: [...document.querySelectorAll('#estados .state-box .estado-nome')].map(span => span.textContent),
        equip: [...document.querySelectorAll('#equipamentos .equip-item')].map(row => ({
            arma: row.querySelector('.equip-arma').value,
            acao: row.querySelector('.equip-acao').value,
            reacao: row.querySelector('.equip-reacao').value,
            maos: row.querySelector('.equip-maos').value,
            alcance: row.querySelector('.equip-alcance').value
        })),
        personagens: document.getElementById('personagens').value,
        feiticos: document.getElementById('feiticos').value,
        notas: document.getElementById('notas').value,
        diario: document.getElementById('diario').value
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    const nome = (data.nome || 'personagem').toLowerCase().replace(/\s+/g, '');
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome + '.txt'; a.click();
}

function carregarFicha() {
    document.getElementById('fileInput').click();
}

function lerArquivo(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader(); r.onload = function () {
        try {
            const data = JSON.parse(r.result);
            document.getElementById('nome').value = data.nome || '';
            document.getElementById('conceito').value = data.conceito || '';
            document.getElementById('historico').value = data.historico || '';
            document.getElementById('defeito').value = data.defeito || '';
            document.getElementById('heroi').textContent = data.heroi || 5;
            document.getElementById('xp').textContent = data.xp || 0;
            
            // Preenche a vida
            [...document.querySelectorAll('#vida input')].forEach((c, i) => {
                if (data.vida && data.vida[i]) {
                    c.checked = data.vida[i];
                } else {
                    c.checked = false;
                }
            });

            // Bloco de carregamento de atributos CORRIGIDO
            [...document.querySelectorAll('.attr-box')].forEach((b, i) => {
                if (data.atributos && data.atributos[i]) {
                    b.querySelector('.atributo').value = data.atributos[i].atrib || '';
                    b.querySelector('.valor').value = data.atributos[i].valor || '2';
                    
                    // Pega o array de proezas salvas
                    const savedProezas = data.atributos[i].proezas || [];
                    
                    // Chama 'atualizarProezas' e passa as proezas salvas
                    // Isso vai forçar a função a usar os dados do save
                    atualizarProezas(b, savedProezas);
                } else {
                    // Se não houver dados salvos para este bloco, apenas reseta
                    b.querySelector('.atributo').value = '';
                    b.querySelector('.valor').value = '2';
                    atualizarProezas(b, []);
                }
            });

            // ATUALIZADO: Preenche os slots de estado
            const slots = document.querySelectorAll('#estados .state-box');
            slots.forEach((slot, i) => {
                if (data.estados && data.estados[i]) {
                    setEstadoSlot(slot, data.estados[i]);
                } else {
                    setEstadoSlot(slot, null);
                }
            });
            mostrarDescricao();

            // Preenche equipamentos
            const eqDiv = document.getElementById('equipamentos');
            eqDiv.innerHTML = '';
            if (data.equip && data.equip.length) {
                if (typeof data.equip[0] === 'object' && data.equip[0] !== null) {
                    data.equip.forEach(itemData => {
                        adicionarEquipamento(itemData);
                    });
                } else {
                    data.equip.forEach(equipItem => {
                        adicionarEquipamento({ arma: equipItem, acao: '', reacao: '', maos: '', alcance: '' });
                    });
                }
            }

            document.getElementById('personagens').value = data.personagens || '';
            document.getElementById('feiticos').value = data.feiticos || '';
            document.getElementById('notas').value = data.notas || '';
            document.getElementById('diario').value = data.diario || '';
        
        } catch (err) {
            console.error("Erro ao ler o arquivo:", err);
            alert("Houve um erro ao carregar o arquivo. O arquivo pode estar corrompido ou não ser um JSON válido.");
        }
    };
    r.readAsText(file);
    // Limpa o input de arquivo para permitir carregar o mesmo arquivo novamente
    e.target.value = null; 
}