// Espera a página carregar
document.addEventListener('DOMContentLoaded', () => {
    
    // Pega os containers
    const filterAtributos = document.getElementById('filter-atributos');
    const filterTipos = document.getElementById('filter-tipos');
    const actionsList = document.getElementById('actions-list');
    const searchBar = document.getElementById('search-bar');

    // 1. Popula os filtros
    LISTA_ATRIBUTOS.forEach(attr => {
        filterAtributos.innerHTML += `
            <label>
                <input type="checkbox" class="filter-check" value="${attr}">
                <span>${attr}</span>
            </label>
        `;
    });
    
    LISTA_TIPOS.forEach(tipo => {
        filterTipos.innerHTML += `
            <label>
                <input type="checkbox" class="filter-check" value="${tipo}">
                <span>${tipo}</span>
            </label>
        `;
    });

    // 2. Renderiza a lista de ações
    let htmlAcoes = "";
    LISTA_ATRIBUTOS.forEach(attr => {
        // Filtra ações por atributo principal
        const acoesDoAtributo = allActions.filter(a => a.atributo === attr);
        if (acoesDoAtributo.length > 0) {
            htmlAcoes += `<h3 class="action-category" data-category="${attr}">${attr.toUpperCase()}</h3>`;
            
            acoesDoAtributo.forEach(acao => {
                // Cria as tags
                const tagsHTML = acao.tags.map(tag => `<span data-tipo="${tag}">${tag}</span>`).join('');
                
                htmlAcoes += `
                    <div class="action-item" 
                         data-nome="${acao.nome.toLowerCase()}" 
                         data-atributo="${acao.atributo}" 
                         data-tags="${acao.tags.join(',')}">
                         
                        <div class="action-item-header">
                            <span>${acao.nome}</span>
                            <div class="tags">${tagsHTML}</div>
                        </div>
                    </div>
                    <div class="action-details">
                        <p><strong>Descrição:</strong> ${acao.descricao}</p>
                        <hr>
                        <p>${acao.detalhes.replace(/\n/g, '<br>')}</p>
                    </div>
                `;
            });
        }
    });
    actionsList.innerHTML = htmlAcoes;

    // 3. Adiciona todos os Event Listeners
    
    // Listener para Pesquisa
    searchBar.addEventListener('input', filterList);
    
    // Listener para Checkboxes
    document.querySelectorAll('.filter-check').forEach(check => {
        check.addEventListener('change', filterList);
    });

    // Listener para Clicar e Expandir Ação
    actionsList.addEventListener('click', (e) => {
        const actionItem = e.target.closest('.action-item');
        if (actionItem) {
            actionItem.classList.toggle('open');
        }
    });

});

// 4. A Função de Filtragem Principal
function filterList() {
    const searchText = document.getElementById('search-bar').value.toLowerCase();
    
    // Pega os filtros ativos
    const activeAtributos = [...document.querySelectorAll('#filter-atributos input:checked')].map(cb => cb.value);
    const activeTipos = [...document.querySelectorAll('#filter-tipos input:checked')].map(cb => cb.value);

    const allItems = document.querySelectorAll('.action-item');

    // Itera por cada item de ação
    allItems.forEach(item => {
        const nome = item.dataset.nome;
        const atributo = item.dataset.atributo;
        const tags = item.dataset.tags.split(',');

        // 1. Checagem da Pesquisa
        const searchMatch = nome.includes(searchText);

        // 2. Checagem de Atributo (Se nenhum selecionado, mostra todos)
        const atributoMatch = activeAtributos.length === 0 || activeAtributos.includes(atributo);

        // 3. Checagem de Tipo (Precisa ter TODOS os tipos selecionados)
        const tipoMatch = activeTipos.length === 0 || activeTipos.every(tipo => tags.includes(tipo));

        // Esconde ou mostra
        if (searchMatch && atributoMatch && tipoMatch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    // 5. Esconde os cabeçalhos (H3) se não houver ações
    document.querySelectorAll('.action-category').forEach(category => {
        // Encontra todos os items *visíveis* depois deste H3
        const items = [...category.parentNode.querySelectorAll(`.action-item[data-atributo="${category.dataset.category}"]`)]
            .filter(item => !item.classList.contains('hidden'));
            
        if (items.length === 0) {
            category.classList.add('hidden');
        } else {
            category.classList.remove('hidden');
        }
    });
}