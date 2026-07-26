document.addEventListener("DOMContentLoaded", function () {
  // 1. Create and inject the dynamic link for Modern-theme.css if not present
  let themeLink = document.getElementById("active-theme-link");
  if (!themeLink) {
    themeLink = document.createElement("link");
    themeLink.id = "active-theme-link";
    themeLink.rel = "stylesheet";
    document.head.appendChild(themeLink);
  }

  // 2. Load the saved theme preference from LocalStorage (defaults to 'modern')
  const savedTheme = localStorage.getItem("warrior_selected_theme") || "modern";
  applyTheme(savedTheme);

  // 3. Inject the Theme Switcher Dropdown into the Header
  const headerContainer = document.querySelector("header") || document.body;
  
  const themeContainer = document.createElement("div");
  themeContainer.style.cssText = "margin-left: auto; display: flex; align-items: center; gap: 8px;";

  const themeSelect = document.createElement("select");
  themeSelect.id = "app-theme-selector";
  themeSelect.style.cssText = `
    background: rgba(15, 23, 42, 0.8);
    color: #F8FAFC;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
  `;

  themeSelect.innerHTML = `
    <option value="modern">✨ Modern Glass</option>
    <option value="default">⚔️ Classic Dark</option>
  `;

  themeSelect.value = savedTheme;

  // 4. Handle Theme Change Event
  themeSelect.addEventListener("change", function (e) {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem("warrior_selected_theme", selectedTheme);
  });

  themeContainer.appendChild(themeSelect);
  headerContainer.appendChild(themeContainer);

  // Function to toggle stylesheets dynamically
  function applyTheme(theme) {
    if (theme === "modern") {
      themeLink.href = "Modern-theme.css"; // Points to your Modern-theme.css file
    } else {
      themeLink.href = ""; // Reverts to the original default styling in index.html
    }
  }
});

