// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bhaskaraForm');
    const output = document.getElementById('output');
    const limparBtn = document.getElementById('limpar');

    function formatNumber(n) {
        // remove trailing zeros desnecessários
        return Number.isFinite(n) ? parseFloat(n.toFixed(8)).toString() : String(n);
    }

    function mostrarHTML(html) {
        output.innerHTML = html;
    }

    function calcularBhaskara(a, b, c) {
        const steps = [];
        steps.push(`Equação: ${a}x² + ${b}x + ${c} = 0`);
        steps.push(`Calculando o discriminante Δ = b² - 4ac`);

        const b2 = b * b;
        const fourac = 4 * a * c;
        const delta = b2 - fourac;

        steps.push(`b² = ${b}² = ${formatNumber(b2)}`);
        steps.push(`4ac = 4 · ${a} · ${c} = ${formatNumber(fourac)}`);
        steps.push(`Δ = ${formatNumber(b2)} - ${formatNumber(fourac)} = ${formatNumber(delta)}`);

        if (delta > 0) {
            const sqrtDelta = Math.sqrt(delta);
            const x1 = (-b + sqrtDelta) / (2 * a);
            const x2 = (-b - sqrtDelta) / (2 * a);
            steps.push(`Δ > 0 → duas raízes reais e distintas.`);
            steps.push(`√Δ = ${formatNumber(sqrtDelta)}`);
            steps.push(`x1 = (-b + √Δ) / (2a) = (${-b} + ${formatNumber(sqrtDelta)}) / (${2 * a}) = ${formatNumber(x1)}`);
            steps.push(`x2 = (-b - √Δ) / (2a) = (${-b} - ${formatNumber(sqrtDelta)}) / (${2 * a}) = ${formatNumber(x2)}`);
            return { steps, roots: [x1, x2], delta };
        } else if (delta === 0) {
            const x = -b / (2 * a);
            steps.push(`Δ = 0 → uma raiz real dupla.`);
            steps.push(`x = -b / (2a) = ${-b} / (${2 * a}) = ${formatNumber(x)}`);
            return { steps, roots: [x], delta };
        } else {
            // raízes complexas
            const sqrtAbs = Math.sqrt(Math.abs(delta));
            const realPart = -b / (2 * a);
            const imagPart = sqrtAbs / (2 * a);
            steps.push(`Δ < 0 → raízes complexas conjugadas.`);
            steps.push(`|√Δ| = √(${Math.abs(delta)}) = ${formatNumber(sqrtAbs)}`);
            steps.push(`x1 = ${formatNumber(realPart)} + ${formatNumber(imagPart)}i`);
            steps.push(`x2 = ${formatNumber(realPart)} - ${formatNumber(imagPart)}i`);
            return { steps, roots: [`${formatNumber(realPart)} + ${formatNumber(imagPart)}i`, `${formatNumber(realPart)} - ${formatNumber(imagPart)}i`], delta };
        }
    }

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const c = parseFloat(document.getElementById('c').value);

        if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
            mostrarHTML(`<p class="notice">Por favor preencha a, b e c com números válidos.</p>`);
            return;
        }
        if (a === 0) {
            mostrarHTML(`<p class="notice">O coeficiente <strong>a</strong> não pode ser zero (não é uma equação quadrática).</p>`);
            return;
        }

        const res = calcularBhaskara(a, b, c);
        // Monta HTML do resultado
        let html = '';
        html += `<div class="step"><strong>Δ =</strong> ${formatNumber(res.delta)}</div>`;
        res.steps.forEach(s => {
            html += `<div class="step">${s}</div>`;
        });

        if (res.roots.length === 1) {
            html += `<p><strong>Raiz (dupla):</strong> ${res.roots[0]}</p>`;
        } else {
            html += `<p><strong>Raízes:</strong> ${res.roots[0]} , ${res.roots[1]}</p>`;
        }

        mostrarHTML(html);
    });

    limparBtn.addEventListener('click', () => {
        form.reset();
        mostrarHTML(`<p>Preencha os valores e clique em <em>Calcular</em>.</p>`);
    });
});
