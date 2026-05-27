/* =========================
   LOAD DATA
========================= */

const rawData =

    localStorage.getItem(
        "kundliResult"
    );

if (!rawData) {

    alert(
        "No Kundli Data Found"
    );

    window.location.href =
        "/";

    throw new Error(
        "No Kundli Data"
    );

}

const data =
    JSON.parse(rawData);

const kundli =
    data.kundli;

/* =========================
   ELEMENTS
========================= */

const userName =
    document.querySelector(
        "#userName"
    );

const userInfo =
    document.querySelector(
        "#userInfo"
    );

const basicContainer =
    document.querySelector(
        "#basicContainer"
    );

const summaryContainer =
    document.querySelector(
        "#summaryContainer"
    );

const planetContainer =
    document.querySelector(
        "#planetContainer"
    );

const predictionContainer =
    document.querySelector(
        "#predictionContainer"
    );

const dashaContainer =
    document.querySelector(
        "#dashaContainer"
    );

const doshaContainer =
    document.querySelector(
        "#doshaContainer"
    );

const kundliChart =
    document.querySelector(
        "#kundliChart"
    );

const yogaContainer =
    document.querySelector(
        "#yogaContainer"
    );

const aspectContainer =
    document.querySelector(
        "#aspectContainer"
    );

const navamsaContainer =
    document.querySelector(
        "#navamsaContainer"
    );

const transitContainer =
    document.querySelector(
        "#transitContainer"
    );

/* =========================
   HELPERS
========================= */

function createCard(

    title,
    value

) {

    return `

        <div class="info-card">

            <h3>
                ${title}
            </h3>

            <p>
                ${value}
            </p>

        </div>

    `;

}

/* =========================
   HERO
========================= */

function renderHero(){

    const heroTitle =
    document.querySelector(
        "#userName"
    );

    const heroInfo =
    document.querySelector(
        "#userInfo"
    );

    if(

        !kundli ||

        !kundli.personal

    ){

        heroTitle.innerHTML =
        "AstroKundli AI";

        heroInfo.innerHTML =
        "Kundli data unavailable";

        return;

    }

    heroTitle.innerHTML =

    kundli.personal.name ||

    "Unknown User";

    heroInfo.innerHTML =

    `
    ${kundli.personal.dob || ""}
    •
    ${kundli.personal.place || ""}
    `;

}

/* =========================
   BASIC INFO
========================= */

function renderBasicInfo() {

    basicContainer.innerHTML =

        createCard(
            "Name",
            kundli.basic.name
        )

        +

        createCard(
            "Gender",
            kundli.basic.gender
        )

        +

        createCard(
            "Date of Birth",
            kundli.basic.dob
        )

        +

        createCard(
            "Time of Birth",
            kundli.basic.tob
        )

        +

        createCard(
            "Place",
            kundli.basic.place
        );

}

/* =========================
   ASTROLOGY SUMMARY
========================= */

function renderSummary() {

    summaryContainer.innerHTML =

        createCard(
            "Lagna",
            kundli.astrology.lagna
        )

        +

        createCard(
            "Moon Sign",
            kundli.astrology.moonSign
        )

        +

        createCard(
            "Sun Sign",
            kundli.astrology.sunSign
        )

        +

        createCard(
            "Nakshatra",
            kundli.astrology.nakshatra
        )

        +

        createCard(
            "Manglik",
            kundli.astrology.manglik
        );

}

/* =========================
   PLANETS
========================= */

function renderPlanets() {

    let html = "";

    Object.entries(
        kundli.planets
    )

        .forEach(([name, planet]) => {

            html += `

        <div class="planet-card">

            <div class="planet-top">

                <h3>

                    ${name.toUpperCase()}

                </h3>

                <span>

                    ${planet.sign}

                </span>

            </div>

            <div class="planet-grid">

                <div>

                    Degree:
                    ${planet.degree}

                </div>

                <div>

                    House:
                    ${planet.house}

                </div>

                <div>

                    Dignity:
                    ${planet.dignity}

                </div>

                <div>

                    Retrograde:
                    ${planet.retrograde ? "Yes" : "No"}

                </div>

            </div>

        </div>

        `;

        });

    planetContainer.innerHTML =
        html;

}

/* =========================
   PREDICTIONS
========================= */

function renderPredictions() {

    const p =
        kundli.predictions;

    predictionContainer.innerHTML =

        createCard(
            "Career",
            p.career
        )

        +

        createCard(
            "Finance",
            p.finance
        )

        +

        createCard(
            "Relationship",
            p.relationship
        )

        +

        createCard(
            "Marriage",
            p.marriage
        )

        +

        createCard(
            "Health",
            p.health
        )

        +

        createCard(
            "Personality",
            p.personality
        )

        +

        createCard(
            "Spirituality",
            p.spirituality
        );

}

/* =========================
   DASHA
========================= */

function renderDashas() {

    const p =
        kundli.predictions;

    let html = `

    <div class="dasha-main">

        <h3>

            Current Dasha:
            ${p.currentDasha}

        </h3>

        <p>

            ${p.dashaPeriod}

        </p>

        <div class="dasha-effect">

            ${p.dashaEffect}

        </div>

    </div>

    `;

    if (

        p.dashas &&

        Array.isArray(p.dashas)

    ) {

        p.dashas.forEach(dasha => {

            html += `

        <div class="dasha-card">

            <h4>

                ${dasha.lord}

            </h4>

            <p>

                ${dasha.start}
                -
                ${dasha.end}

            </p>

        </div>

        `;

        });

    }

    dashaContainer.innerHTML =
        html;

}

/* =========================
   YOGAS
========================= */

function renderYogas() {

    const yogas =
        kundli.predictions.yogas;

    if (

        !yogas ||

        yogas.length === 0

    ) {

        yogaContainer.innerHTML =

            `
        <div class="empty-card">

            No major yogas detected

        </div>
        `;

        return;

    }

    let html = "";

    yogas.forEach(yoga => {

        html += `

        <div class="yoga-card">

            <h3>

                ✨ ${yoga.name}

            </h3>

            <p>

                ${yoga.effect}

            </p>

        </div>

        `;

    });

    yogaContainer.innerHTML =
        html;

}

/* =========================
   ASPECTS
========================= */

function renderAspects() {

    const aspects =

        kundli.predictions.aspects;

    if (

        !aspects ||

        aspects.length === 0

    ) {

        aspectContainer.innerHTML =

            `
        <div class="empty-card">

            No strong aspects found

        </div>
        `;

        return;

    }

    let html = "";

    aspects.forEach(aspect => {

        html += `

        <div class="aspect-card">

            <h3>

                ${aspect.planets}

            </h3>

            <div class="aspect-badge">

                ${aspect.aspect}

            </div>

            <p>

                ${aspect.effect}

            </p>

        </div>

        `;

    });

    aspectContainer.innerHTML =
        html;

}

/* =========================
   NAVAMSA
========================= */

function renderNavamsa() {

    const insights =

        kundli.predictions.navamsaInsights;

    if (

        !insights ||

        insights.length === 0

    ) {

        navamsaContainer.innerHTML =

            `
        <div class="empty-card">

            No Navamsa insights available

        </div>
        `;

        return;

    }

    let html = "";

    insights.forEach(insight => {

        html += `

        <div class="navamsa-card">

            <p>

                🌙 ${insight}

            </p>

        </div>

        `;

    });

    navamsaContainer.innerHTML =
        html;

}

/* =========================
   TRANSITS
========================= */

function renderTransits() {

    const insights =

        kundli.predictions.transitInsights;

    if (

        !insights ||

        insights.length === 0

    ) {

        transitContainer.innerHTML =

            `
        <div class="empty-card">

            No transit insights available

        </div>
        `;

        return;

    }

    let html = "";

    insights.forEach(insight => {

        html += `

        <div class="transit-card">

            <p>

                🪐 ${insight}

            </p>

        </div>

        `;

    });

    transitContainer.innerHTML =
        html;

}

/* =========================
   DOSHA
========================= */

function renderDosha() {

    doshaContainer.innerHTML =

        createCard(
            "Manglik",
            kundli.astrology.manglik
        );

}

/* =========================================================
   ULTRA LIVE COSMIC BIRTH CHART ENGINE
========================================================= */
function renderChart() {

    const chart =
        document.querySelector(
            "#kundliChart"
        );

    if (!chart) return;

    chart.innerHTML = `

    <div class="solar-system">

        <div class="space-glow"></div>

        <div class="sun-core">

            <div class="sun-inner">

                Aries

            </div>

        </div>

    </div>

    `;

    const solarSystem =
        chart.querySelector(
            ".solar-system"
        );

    const planets = [

        {
            name: "Moon",
            color: "#cfd8ff",
            size: 28,
            orbit: 170,
            speed: 18
        },

        {
            name: "Mercury",
            color: "#77dd77",
            size: 20,
            orbit: 220,
            speed: 24
        },

        {
            name: "Venus",
            color: "#ff66c4",
            size: 24,
            orbit: 280,
            speed: 16
        },

        {
            name: "Mars",
            color: "#ff3d3d",
            size: 22,
            orbit: 340,
            speed: 10
        },

        {
            name: "Jupiter",
            color: "#ffb347",
            size: 40,
            orbit: 420,
            speed: 7
        }

    ];

    planets.forEach(planet => {

        const orbit =
            document.createElement("div");

        orbit.className =
            "planet-orbit";

        orbit.style.width =
            `${planet.orbit * 2}px`;

        orbit.style.height =
            `${planet.orbit * 2}px`;

        orbit.style.animationDuration =
            `${planet.speed}s`;

        const node =
            document.createElement("div");

        node.className =
            "planet-node-live";

        node.style.width =
            `${planet.size}px`;

        node.style.height =
            `${planet.size}px`;

        node.style.background =
            `radial-gradient(circle at top,#fff,${planet.color})`;

        node.style.boxShadow =
            `0 0 30px ${planet.color}`;

        node.innerHTML =
            `<span>${planet.name}</span>`;

        orbit.appendChild(node);

        solarSystem.appendChild(
            orbit
        );

    });

}




/* =========================
   INIT
========================= */

function init() {

    renderHero();

    renderBasicInfo();

    renderSummary();

    renderPlanets();

    renderPredictions();

    renderDashas();

    renderDosha();

    renderChart();

    renderYogas();

    renderAspects();

    renderNavamsa();

    renderTransits();

    const loader =
        document.querySelector(
            "#pageLoader"
        );

    if (loader) {

        loader.style.display =
            "none";

    }

}

/* =========================
   PDF DOWNLOAD
========================= */

async function downloadPDF(){

    const button =
    document.querySelector(
        ".download-btn"
    );

    button.innerHTML =
    "⌛";

    try{

        /* =========================
           TARGET
        ========================= */

        const target =
        document.querySelector(
            ".dashboard-grid"
        );

        /* =========================
           WAIT FOR RENDER
        ========================= */

        await new Promise(
            resolve =>
            setTimeout(
                resolve,
                1500
            )
        );

        /* =========================
           CREATE CANVAS
        ========================= */

        const canvas =

        await html2canvas(

            target,

            {

                scale:2,

                useCORS:true,

                backgroundColor:"#050505",

                logging:false,

                allowTaint:true,

                scrollY:
                -window.scrollY

            }

        );

        /* =========================
           IMAGE
        ========================= */

        const imgData =

        canvas.toDataURL(
            "image/png"
        );

        /* =========================
           PDF
        ========================= */

        const {

            jsPDF

        } = window.jspdf;

        const pdf =
        new jsPDF(

            "p",
            "mm",
            "a4"

        );

        const pdfWidth =
        210;

        const pdfHeight =
        297;

        const imgWidth =
        pdfWidth;

        const imgHeight =

            (
                canvas.height
                *
                imgWidth
            )
            /
            canvas.width;

        let heightLeft =
        imgHeight;

        let position =
        0;

        /* =========================
           FIRST PAGE
        ========================= */

        pdf.addImage(

            imgData,

            "PNG",

            0,

            position,

            imgWidth,

            imgHeight

        );

        heightLeft -=
        pdfHeight;

        /* =========================
           MULTIPLE PAGES
        ========================= */

        while(

            heightLeft > 0

        ){

            position =
            heightLeft -
            imgHeight;

            pdf.addPage();

            pdf.addImage(

                imgData,

                "PNG",

                0,

                position,

                imgWidth,

                imgHeight

            );

            heightLeft -=
            pdfHeight;

        }

        /* =========================
           SAVE
        ========================= */

        pdf.save(
            "AstroKundli_Report.pdf"
        );

        button.innerHTML =
        "↓";

    }

    catch(error){

        console.error(
            error
        );

        alert(
            "PDF generation failed"
        );

        button.innerHTML =
        "↓";

    }

}

/* =========================
   EVENTS
========================= */

document
    .querySelector(
        ".download-btn"
    )
    .addEventListener(
        "click",
        downloadPDF
    );

/* =========================
   START
========================= */

init();

console.log(
    "AstroKundli AI Loaded"
);