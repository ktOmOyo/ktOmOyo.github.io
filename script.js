document.addEventListener("DOMContentLoaded", function () {
    fetch("papers.json")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("pubTable").querySelector("tbody");
            tableBody.innerHTML = "";

            let selectedPapers = data.filter(paper => paper.pickup);

            selectedPapers.forEach(paper => {
                let row = document.createElement("tr");

                let imgTd = document.createElement("td");
                let img = document.createElement("img");
                img.className = "paperImage";
                img.src = paper.image;
                imgTd.appendChild(img);

                let detailsTd = document.createElement("td");

                let titleDiv = document.createElement("div");
                titleDiv.className = "paperTitle";
                titleDiv.textContent = paper.title;

                let authorsDiv = document.createElement("div");
                authorsDiv.className = "paperAuthors";
                authorsDiv.textContent = paper.authors;

                let conferenceDiv = document.createElement("div");
                conferenceDiv.className = "paperConference";
                conferenceDiv.textContent = paper.conference || "Conference not available";

                let buttonsDiv = document.createElement("div");

                Object.keys(paper.links).forEach(key => {
                    let span = document.createElement("span");
                    span.innerHTML = ` [<a href="${paper.links[key]}" target="_blank">${key}</a>] `;
                    buttonsDiv.appendChild(span);
                });

                detailsTd.appendChild(titleDiv);
                detailsTd.appendChild(authorsDiv);
                detailsTd.appendChild(conferenceDiv);
                detailsTd.appendChild(buttonsDiv);

                row.appendChild(imgTd);
                row.appendChild(detailsTd);

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
