const fs = require("fs");

const files = [
    "library-RTL.css",
    "library.css",
    "library-parameters.json",
];

files.forEach((sFile) => {
    fs.copyFileSync(
        `./dist/resources/kellojo/m/themes/sap_fiori_3/${sFile}`,
        `./src/kellojo/m/themes/sap_fiori_3/${sFile}`
    );
});


console.log("Copied themes!");