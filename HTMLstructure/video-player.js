class VideoPlayer extends HTMLElement {
  connectedCallback() {
    const yt = this.getAttribute("YTlink");
    const local = this.getAttribute("Local");

    // Grab the description text or HTML between the tags
    const descHTML = this.innerHTML.trim();

    // Clear inner HTML before inserting the player UI
    this.innerHTML = `
      <div class="video-container">
        <div class="player">
          <iframe src="${yt}" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="controls">
          <label for="sourceSelect">Source:</label>
          <select id="sourceSelect" class="source-select">
            <option value="yt">YouTube</option>
            <option value="local">Local</option>
          </select>
        </div>

        <div class="description">
          ${descHTML}
        </div>
      </div>
    `;

    // Get elements
    const select = this.querySelector(".source-select");
    const player = this.querySelector(".player");

    // Handle source switching
    select.addEventListener("change", () => {
      if (select.value === "yt") {
        player.innerHTML = `<iframe src="${yt}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        player.innerHTML = `<video controls><source src="${local}" type="video/mp4"></video>`;
      }
    });
  }
}

customElements.define("video-player", VideoPlayer);
