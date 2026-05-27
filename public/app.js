/* =========================
   ASTROKUNDLI AI
========================= */

console.log(
    "AstroKundli AI Loaded"
);

/* =========================
   ELEMENTS
========================= */

const maleBtn =

document.querySelector(
    ".male-btn"
);

const femaleBtn =

document.querySelector(
    ".female-btn"
);

const generateBtn =

document.querySelector(
    ".generate-btn"
);

/* =========================
   GENDER
========================= */

let selectedGender =
"Male";

/* =========================
   MALE BUTTON
========================= */

maleBtn.addEventListener(

    "click",

    ()=>{

        selectedGender =
        "Male";

        maleBtn.classList.add(
            "active"
        );

        femaleBtn.classList.remove(
            "active"
        );

    }

);

/* =========================
   FEMALE BUTTON
========================= */

femaleBtn.addEventListener(

    "click",

    ()=>{

        selectedGender =
        "Female";

        femaleBtn.classList.add(
            "active"
        );

        maleBtn.classList.remove(
            "active"
        );

    }

);

/* =========================
   GENERATE
========================= */

generateBtn.addEventListener(

    "click",

    generateKundli

);

/* =========================
   MAIN FUNCTION
========================= */

async function generateKundli(){

    try{

        /* =========================
           INPUTS
        ========================== */

        const name =

        document.querySelector(
            "#name"
        ).value.trim();

        const day =

        document.querySelector(
            "#day"
        ).value.trim();

        const month =

        document.querySelector(
            "#month"
        ).value.trim();

        const year =

        document.querySelector(
            "#year"
        ).value.trim();

        const hour =

        document.querySelector(
            "#hour"
        ).value.trim();

        const minute =

        document.querySelector(
            "#minute"
        ).value.trim();

        const second =

        document.querySelector(
            "#second"
        ).value.trim();

        const place =

        document.querySelector(
            "#place"
        ).value.trim();

        /* =========================
           VALIDATION
        ========================== */

        if(

            !name ||
            !day ||
            !month ||
            !year ||
            !hour ||
            !minute ||
            !place

        ){

            alert(
                "Please fill all fields"
            );

            return;

        }

        /* =========================
           USER DATA
        ========================== */

        const payload = {

            name,
            gender:selectedGender,
            day,
            month,
            year,
            hour,
            minute,
            second:
            second || "00",
            place

        };

        console.log(
            "Submitting:",
            payload
        );

        /* =========================
           BUTTON LOADING
        ========================== */

        generateBtn.disabled =
        true;

        generateBtn.innerHTML =

        "Generating Kundli...";

        /* =========================
           FETCH
        ========================== */

        const response =

        await fetch(

            "/submit",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify(
                    payload
                )

            }

        );

        console.log(
            "Response:",
            response
        );

        /* =========================
           JSON
        ========================== */

        const data =

        await response.json();

        console.log(
            "Server Data:",
            data
        );

        /* =========================
           SERVER ERROR
        ========================== */

        if(

            !response.ok ||

            !data.success

        ){

            throw new Error(

                data.message ||

                "Server Error"

            );

        }

        /* =========================
           SAVE
        ========================== */

        localStorage.setItem(

            "kundliResult",

            JSON.stringify(data)

        );

        console.log(

            "LOCAL STORAGE SAVED"

        );

        console.log(

            localStorage.getItem(
                "kundliResult"
            )

        );

        /* =========================
           REDIRECT
        ========================== */

        window.location.href =

        "/kundli";

    }

    catch(error){

        console.log(
            "APP ERROR:",
            error
        );

        alert(

            error.message ||

            "Failed To Generate Kundli"

        );

    }

    finally{

        generateBtn.disabled =
        false;

        generateBtn.innerHTML =

        "Generate Kundli";

    }

}