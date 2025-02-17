document.addEventListener("DOMContentLoaded", function () {
    fetch("papers.json")
        .then(response => response.json())
        .then(data => {
            const publicationsDiv = document.getElementById("publications");

            let publicationsByYear = {};

            data.forEach(paper => {
                let yearMatch = paper.year.match(/\b(20\d{2})\b/);
                let year = yearMatch ? yearMatch[1] : "Unknown";

                if (!publicationsByYear[year]) {
                    publicationsByYear[year] = [];
                }

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

                publicationsByYear[year].push(paperHTML);
            });

            let finalHTML = "";
            Object.keys(publicationsByYear).sort((a, b) => b - a).forEach(year => {
                finalHTML += `<h2>${year}</h2>${publicationsByYear[year].join("")}`;
            });

            publicationsDiv.innerHTML = finalHTML;
        })
        .catch(error => console.error("Error loading JSON:", error));
});
