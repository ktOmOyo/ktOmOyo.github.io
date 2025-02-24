document.addEventListener("DOMContentLoaded", function () {
    fetch("../publication_list.json")
        .then(response => response.json())
        .then(data => {
            const publicationsDiv = document.getElementById("publications");

            let publicationsByYear = {};

            let publicationsByCategory = {
                "Papers": [],
                "Posters and Demos": [],
                "Domestic Conference": []
            };

            data.forEach(paper => {
                /* by year */
                // let yearMatch = paper.year.match(/\b(20\d{2})\b/);
                // let year = yearMatch ? yearMatch[1] : "Unknown";

                // if (!publicationsByYear[year]) {
                //     publicationsByYear[year] = [];
                // }

                /* by category */
                let categoryKey = "Papers";  // default = "Paper"
                if (["poster", "demo"].includes(paper.category)) {
                    categoryKey = "Posters and Demos";
                } else if (paper.category === "domestic") {
                    categoryKey = "Domestic Conference";
                }

                /* ========================= */
                let linksHTML = "";
                if (paper.links) {
                    for (let key of Object.keys(paper.links)) {
                        if (key === "ProjectPage") {
                            linksHTML = ` "<a href="${paper.links[key]}" target="_blank">${paper.title}</a>"`;
                            break;
                        } else if (key === "Paper") {
                            linksHTML = ` "<a href="${paper.links[key]}" target="_blank">${paper.title}</a>"`;
                            break;
                        }
                    }
                }
                if (linksHTML == "") {
                    linksHTML = ` "${paper.title}"`;
                }

                let extraHTML = "";
                if (Array.isArray(paper.extra)) {
                    extraHTML = paper.extra.map((text, index) => {
                        let link = (Array.isArray(paper.extra_links) && paper.extra_links[index]) ? paper.extra_links[index] : "";
                        if (link) {
                            return `<strong>【<a href="${link}" target="_blank">${text}</a>】</strong>`;
                        } else {
                            return `<strong>【${text}】</strong>`;
                        }
                    }).join(" ");
                } else if (typeof paper.extra === "string" && paper.extra.trim() !== "") {
                    extraHTML = `<strong>【${paper.extra}】</strong>`;
                }

                let paperHTML = `
                    <li>
                        ${paper.authors}${": "}
                        ${linksHTML}${", "}
                        <em>${paper.detailed_conference}</em>
                        ${"("}${paper.year}${")"}
                        ${extraHTML}
                    </li>
                `;

                // publicationsByYear[year].push(paperHTML); // by year
                publicationsByCategory[categoryKey].push(paperHTML); // by category
            });

            /* by year */
            // let finalHTML = "";
            // Object.keys(publicationsByYear).sort((a, b) => b - a).forEach(year => {
            //     finalHTML += `<h2>${year}</h2>${publicationsByYear[year].join("")}`;
            // });

            /* by category */
            let finalHTML = "";
            Object.keys(publicationsByCategory).forEach(category => {
                if (publicationsByCategory[category].length > 0) {
                    finalHTML += `<h2>${category}</h2><ul>${publicationsByCategory[category].join("")}</ul>`;
                }
            });

            /* ================== */
            publicationsDiv.innerHTML = finalHTML;
        })
        .catch(error => console.error("Error loading JSON:", error));
});
