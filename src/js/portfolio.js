document.querySelector('header').classList.add('visivel');

const produtos = [
    { id: 1, nome: "Guitar Hero III",                tipo: "Xbox 360",    genero: "jogo",       badge: "jogo",       preco: 199.99, precoOld: null,    tamanho: "75%",  img: "../assets/guitar-hero.jpg" },
    { id: 2, nome: "Teclado Alloy Origins",          tipo: "HyperX",      genero: "periferico", badge: "periferico", preco: 299.99, precoOld: null,    tamanho: "100%", img: "../assets/alloy-origins.jpg" },
    { id: 3, nome: "Processador Ryzen 5 4500",       tipo: "AMD",         genero: "hardware",   badge: "hardware",   preco: 669.99, precoOld: 1299.99, tamanho: "85%",  img: "../assets/ryzen-5.jpg" },
    { id: 4, nome: "Suporte para microfone",         tipo: "Fifine",      genero: "acessorio",  badge: "acessorio",  preco: 169.99, precoOld: null,    tamanho: "70%",  img: "../assets/suporte.jpg" },
    { id: 5, nome: "Tom Clancy's Rainbow Six Siege", tipo: "PS4",         genero: "jogo",       badge: "jogo",       preco: 89.99,  precoOld: 199.99,  tamanho: "80%",  img: "../assets/r6.jpg" },
    { id: 6, nome: "Memória RAM 16GB DDR4",          tipo: "Kingston",    genero: "hardware",   badge: "hardware",   preco: 1199.99,precoOld: 1999.99, tamanho: "100%", img: "../assets/ram.jpg" },
    { id: 7, nome: "Mouse Astrolabe Lite",           tipo: "Redragon",    genero: "periferico", badge: "periferico", preco: 159.99, precoOld: null,    tamanho: "80%",  img: "../assets/mouse.jpg" },
    { id: 8, nome: "Rock Band 4",                    tipo: "Xbox One",    genero: "jogo",       badge: "jogo",       preco: 199.99, precoOld: 299.99,  tamanho: "80%",  img: "../assets/rock-band.jpg" },
    { id: 9, nome: "Tela Verde",                     tipo: "Streamplify", genero: "acessorio",  badge: "acessorio",  preco: 1299.99,precoOld: null,    tamanho: "85%",  img: "../assets/tela-verde.jpg" },
];

const badgeLabel = {
    jogo:       { texto: "Jogo",       classe: "badge-jogo"       },
    periferico: { texto: "Periférico", classe: "badge-periferico" },
    hardware:   { texto: "Hardware",   classe: "badge-hardware"   },
    acessorio:  { texto: "Acessório",  classe: "badge-acessorio"  },
};

function renderCard(p) {
    const badge = p.badge && badgeLabel[p.badge]
        ? `<span class="produto-badge ${badgeLabel[p.badge].classe}">${badgeLabel[p.badge].texto}</span>`
        : "";

    const preco = p.precoOld
        ? `<p class="produto-preco-old">R$ ${p.precoOld.toFixed(2).replace(".", ",")} <span class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span></p>`
        : `<p class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>`;

    const parcela = (p.preco / 12).toFixed(2).replace(".", ",");
    const tamanho = p.tamanho || "75%";

    return `
        <div class="produto-card" data-tipo="${p.tipo}" data-genero="${p.genero}" data-badge="${p.badge}">
            <div class="produto-capa">
                <img src="${p.img}" alt="${p.nome}" style="width:${tamanho}; height:${tamanho};">
                ${badge}
            </div>
            <div class="produto-info">
                <p class="produto-nome">${p.nome}</p>
                <p class="produto-empresa">${p.tipo}</p>
                ${preco}
                <p class="produto-parcela">ou 12x de R$ ${parcela}</p>
            </div>
        </div>`;
}

function renderGrid(lista) {
    const grid = document.getElementById("portfolio-grid");
    grid.innerHTML = lista.length
        ? lista.map(renderCard).join("")
        : `<p style="color:#555;font-family:var(--fonte-corpo);grid-column:1/-1;text-align:center;padding:3rem">Nenhum produto encontrado.</p>`;
}

function filtrar() {
    const tipo  = document.querySelector(".filtro-tipo.ativo")?.dataset.tipo || "todos";
    const marca = document.getElementById("filtro-marca").value;
    const promo = document.getElementById("filtro-preco").value;

    const resultado = produtos.filter(p => {
        const okTipo  = tipo  === "todos" || p.genero === tipo;
        const okMarca = marca === "todos" || p.tipo   === marca;
        const okPromo = promo === "todos" || (promo === "promocao" && p.precoOld !== null);
        return okTipo && okMarca && okPromo;
    });

    renderGrid(resultado);
}

function renderTabela() {
    const promos = produtos.filter(p => p.precoOld);
    const tbody  = document.getElementById("tabela-body");

    tbody.innerHTML = promos.map(p => {
        const desconto = Math.round((1 - p.preco / p.precoOld) * 100);
        return `
            <tr>
                <td>${p.nome}</td>
                <td>${p.tipo}</td>
                <td>${badgeLabel[p.badge]?.texto || p.badge}</td>
                <td class="td-preco-old">R$ ${p.precoOld.toFixed(2).replace(".", ",")}</td>
                <td class="td-preco-novo">R$ ${p.preco.toFixed(2).replace(".", ",")}</td>
                <td class="td-desconto">-${desconto}%</td>
            </tr>`;
    }).join("");
}

// botões de tipo
document.querySelectorAll(".filtro-tipo").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filtro-tipo").forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        filtrar();
    });
});

document.getElementById("filtro-marca").addEventListener("change", filtrar);
document.getElementById("filtro-preco").addEventListener("change", filtrar);

// hamburguer
const hamburguer = document.getElementById("hamburguer");
const menu       = document.getElementById("link-menu");
hamburguer.addEventListener("click", () => {
    menu.classList.toggle("aberto");
    hamburguer.classList.toggle("aberto");
});

renderGrid(produtos);
filtrar();
renderTabela();