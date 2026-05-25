const products = ["Я", "Б"];

// Створюємо простір елементарних подій Ω для 4 виробів
const omega = [];

for (let first of products) {
    for (let second of products) {
        for (let third of products) {
            for (let fourth of products) {
                omega.push(first + second + third + fourth);
            }
        }
    }
}

// Подія A: хоча б один виріб бракований
const eventA = omega.filter(item => item.includes("Б"));

// Подія B: бракованих виробів не менше двох
const eventB = omega.filter(item => {
    const defectiveCount = item.split("").filter(symbol => symbol === "Б").length;
    return defectiveCount >= 2;
});

// Допоміжні операції над множинами
function complement(eventSet) {
    return omega.filter(item => !eventSet.includes(item));
}

function union(firstSet, secondSet) {
    return [...new Set([...firstSet, ...secondSet])];
}

function intersection(firstSet, secondSet) {
    return firstSet.filter(item => secondSet.includes(item));
}

const events = {
    omega: omega,
    A: eventA,
    B: eventB,
    notA: complement(eventA),
    notB: complement(eventB),
    union: union(eventA, eventB),
    intersection: intersection(eventA, eventB)
};

const explanations = {
    omega: `
        <p><span class="formula">Ω</span> — це всі можливі результати перевірки чотирьох виробів.</p>
        <p>Кожен виріб може бути якісним або бракованим, тому всього маємо 2⁴ = 16 елементарних подій.</p>
    `,

    A: `
        <p><span class="formula">A</span> — подія “хоча б один виріб є бракованим”.</p>
        <p>До цієї події входять усі результати, крім випадку, коли всі чотири вироби якісні.</p>
    `,

    B: `
        <p><span class="formula">B</span> — подія “серед перевірених виробів бракованих не менше двох”.</p>
        <p>Тобто в результаті має бути два, три або чотири символи “Б”.</p>
    `,

    notA: `
        <p><span class="formula">Ā</span> — протилежна подія до A.</p>
        <p>Якщо A означає “є хоча б один бракований виріб”, то Ā означає “усі вироби якісні”.</p>
    `,

    notB: `
        <p><span class="formula">B̄</span> — протилежна подія до B.</p>
        <p>Якщо B означає “бракованих не менше двох”, то B̄ означає “бракованих менше двох”.</p>
    `,

    union: `
        <p><span class="formula">A + B</span> — об'єднання подій A і B.</p>
        <p>Оскільки подія B входить у подію A, маємо: <span class="formula">A + B = A</span>.</p>
    `,

    intersection: `
        <p><span class="formula">AB</span> — перетин подій A і B.</p>
        <p>Це означає, що одночасно виконуються A і B. Оскільки B уже передбачає наявність бракованих виробів, маємо: <span class="formula">AB = B</span>.</p>
    `
};

const eventsGrid = document.getElementById("eventsGrid");
const explanation = document.getElementById("explanation");
const buttons = document.querySelectorAll(".controls button");

function renderOmega() {
    eventsGrid.innerHTML = "";

    omega.forEach(item => {
        const div = document.createElement("div");
        div.className = "event-item";
        div.textContent = item;
        div.dataset.value = item;

        eventsGrid.appendChild(div);
    });
}

function highlightEvent(eventName) {
    const selectedSet = events[eventName];

    document.querySelectorAll(".event-item").forEach(item => {
        if (selectedSet.includes(item.dataset.value)) {
            item.classList.add("selected");
        } else {
            item.classList.remove("selected");
        }
    });

    explanation.innerHTML = explanations[eventName];

    buttons.forEach(button => {
        if (button.dataset.event === eventName) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        highlightEvent(button.dataset.event);
    });
});

renderOmega();
highlightEvent("omega");
