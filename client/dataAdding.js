
const env = 'http://localhost:5757'

async function fetchAndProcessServices() {
  try {
    const response = await fetch(`${env}/services`);
    const data = await response.json();
    console.log(data);

    data?.data?.map((item) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-sm-6 col-md-4 col-xl-4";

      const tsItemDiv = document.createElement("div");
      tsItemDiv.className = "ts-item";
      tsItemDiv.setAttribute("data-animate", "ts-fadeInUp");
      tsItemDiv.setAttribute("data-delay", ".4s");

      const tsItemContentDiv = document.createElement("div");
      tsItemContentDiv.className = "ts-item-content";

      const tsItemHeaderDiv = document.createElement("div");
      tsItemHeaderDiv.className = "ts-item-header";

      const figureElement = document.createElement("figure");
      figureElement.className = "icon";
      const imgElement = document.createElement("img");
      imgElement.src = "assets/img/icon-lcd.png";
      imgElement.alt = "";
      figureElement.appendChild(imgElement);

      const tsItemBodyDiv = document.createElement("div");
      tsItemBodyDiv.className = "ts-item-body";
      const h4Element = document.createElement("h4");
      h4Element.textContent = item.name;
      const pElement = document.createElement("p");
      pElement.className = "mb-0";
      pElement.textContent = item.description;

      const tsItemFooterDiv = document.createElement("div");
      tsItemFooterDiv.className = "ts-item-footer";
      const aElement = document.createElement("a");
      aElement.href = "#";
      aElement.setAttribute("data-toggle", "modal");
      aElement.setAttribute("data-target", "#modal");
      aElement.className = "ts-link-arrow-effect";
      const spanElement = document.createElement("span");
      aElement.appendChild(spanElement);

      tsItemHeaderDiv.appendChild(figureElement);
      tsItemBodyDiv.appendChild(h4Element);
      tsItemBodyDiv.appendChild(pElement);
      tsItemFooterDiv.appendChild(aElement);
      tsItemContentDiv.appendChild(tsItemHeaderDiv);
      tsItemContentDiv.appendChild(tsItemBodyDiv);
      tsItemContentDiv.appendChild(tsItemFooterDiv);
      tsItemDiv.appendChild(tsItemContentDiv);
      colDiv.appendChild(tsItemDiv);

      document.getElementById("service-row").appendChild(colDiv);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAndProcessSkills() {
  try {
    const response = await fetch(`${env}/skills`);
    const data = await response.json();

    data?.data?.map((item) => {
      const progressDiv = document.createElement("div");
      progressDiv.className = "progress";
      progressDiv.setAttribute("data-progress-width", `${item.percent}%`);

      const h5Element = document.createElement("h5");
      h5Element.className = "ts-progress-title";
      h5Element.textContent = item.name;

      const figureElement = document.createElement("figure");
      figureElement.className = "ts-progress-value";

      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      progressBar.setAttribute("role", "progressbar");
      progressBar.setAttribute("aria-valuenow", item.percent);
      progressBar.setAttribute("aria-valuemin", "0");
      progressBar.setAttribute("aria-valuemax", "100");

      progressDiv.appendChild(h5Element);
      progressDiv.appendChild(figureElement);
      progressDiv.appendChild(progressBar);

      document.getElementById("skills-row").appendChild(progressDiv);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAndProcessPortfolios() {
  try {
    const response = await fetch(`${env}/portfolios`);
    const data = await response.json();

    data?.data?.map((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card ts-gallery__item";
      cardDiv.setAttribute("data-animate", "ts-fadeInUp");

      const descriptionDiv = document.createElement("div");
      descriptionDiv.className = "ts-gallery__item-description";

      const h6Element = document.createElement("h6");
      h6Element.className = "ts-opacity__50";
      h6Element.textContent = item.description;

      const h4Element = document.createElement("h4");
      h4Element.textContent = item.name;

      const imgElement = document.createElement("img");
      imgElement.src = item.imageUrl;
      imgElement.className = "card-img";
      imgElement.alt = "";

      descriptionDiv.appendChild(h6Element);
      descriptionDiv.appendChild(h4Element);
      cardDiv.appendChild(descriptionDiv);
      cardDiv.appendChild(imgElement);

      document.getElementById("portfolio-row").appendChild(cardDiv);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAndProcessExperiences() {
  try {
    const response = await fetch(`${env}/experiences`);
    const data = await response.json();

    data?.data?.map((item) => {
      const slideDiv = document.createElement("a");
      const imageElement = document.createElement("img");
      const paragraph = document.createElement("h5");
      const paragraphDate = document.createElement("p");

      paragraph.style.marginTop = '10px';

      slideDiv.appendChild(imageElement);
      slideDiv.appendChild(paragraph);
      slideDiv.appendChild(paragraphDate);

      imageElement.src = item.imageUrl;
      imageElement.style.width = '200px'
      paragraph.innerText = item.position;

      const startDate = new Date(item.startDate).toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const endDate = item.endDate
        ? new Date(item.endDate).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Present';

      paragraphDate.innerText = `${startDate} - ${endDate}`;

      document.getElementById("experience-row").appendChild(slideDiv);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}


document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-contact");
  const formStatus = document.querySelector(".form-contact-status");

  form.addEventListener("submit", async function(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
          formDataObject[key] = value;
      });

      try {
        const response = await fetch(`${env}/message`, {
          method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formDataObject)
          });

          if (response.ok) {
              formStatus.textContent = "Message sent successfully.";
              form.reset();
      event.preventDefault();

          } else {
              throw new Error("Failed to send message.");
          }
      } catch (error) {
          formStatus.textContent = "An error occurred while sending the message.";
          console.error("Error sending message:", error);
      }
  });
});

fetchAndProcessSkills();
fetchAndProcessServices();
fetchAndProcessPortfolios();
fetchAndProcessExperiences();