// === ADICIONADO DE VOLTA ===
// Estas duas linhas estavam faltando e impediam o script de rodar.
const atributosLista = ['Jeitinho', 'Confusão', 'Músculos', 'Cachola', 'Contatos', 'Esperteza', 'Falastrice', 'Maneirice', 'Teimosia'];
const estadosLista = ["QUEIMANDO", "CANSADO", "CONCENTRADO", "ASSUSTADO", "CEGADO", "CRÉULO", "ATURDIDO", "MANCANDO", "CONFUSO", "CONGELADO", "DESLUMBRADO", "ENSURDECIDO", "PARA BAIXO", "EMPANTURRADO", "FURIOSO", "DECEPCIONADO", "ENAMORADO", "ESFOMEADO", "ENFEITIÇADO", "IMOBILIZADO", "MORTO", "INCONSCIENTE", "INSPIRADO", "ESCONDIDO", "IMPRESSIONADO", "MIOLO MOLE", "PARALISADO", "DOENTE", "DIMINUTO", "PEQUENO", "MÉDIO", "GRANDE", "GIGANTE", "SURPRESO", "ESQUISITÃO"];
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

    // Loop inicial para criar campos de Estado
    const estadosContainer = document.getElementById('estados');
    for (let i = 0; i < 3; i++) {
        const div = document.createElement('div'); div.className = 'state-box';
        const sel = document.createElement('select'); sel.innerHTML = '<option value="">Selecione...</option>' + estadosLista.map(e => `<option>${e}</option>`).join('');
        sel.onchange = e => mostrarDescricao();
        div.appendChild(sel);
        estadosContainer.appendChild(div);
    }
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


function mostrarDescricao() {
    const box = document.getElementById('descricaoEstado');
    box.innerHTML = '';
    // Verifica se descricoes está carregado
    if (typeof descricoes === 'undefined') {
        console.error("Erro: Arquivo data.js não foi carregado a tempo.");
        return;
    }
    document.querySelectorAll('#estados select').forEach(s => {
        if (s.value) {
            const p = document.createElement('div'); p.className = 'descricao-estado'; p.innerText = `${s.value}: ${descricoes[s.value]}`;
            box.appendChild(p);
        }
    });
}

function alterarValor(id, delta) {
    const el = document.getElementById(id); let v = parseInt(el.textContent) + delta; if (v < 0) v = 0; el.textContent = v;
}

function verificarVida() {
    const hearts = [...document.querySelectorAll('#vida input')];
    if (hearts.every(h => h.checked)) {
        const slots = [...document.querySelectorAll('#estados select')];
        const vazio = slots.find(s => !s.value);
        if (vazio) { vazio.value = 'INCONSCIENTE'; mostrarDescricao(); }
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
        estados: [...document.querySelectorAll('#estados select')].map(s => s.value),
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

            // Preenche os estados
            [...document.querySelectorAll('#estados select')].forEach((s, i) => {
                if (data.estados && data.estados[i]) {
                    s.value = data.estados[i];
                } else {
                    s.value = '';
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
