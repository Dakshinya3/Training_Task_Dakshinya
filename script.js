
document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const header = document.querySelector("center");
    const headings = document.querySelectorAll("h2");
    const tables = document.querySelectorAll("table");

    // ==========================================
    // 1. FLOATING CONTROL PANEL
    // ==========================================

    const controls = document.createElement("div");

    controls.id = "floating-controls";

    controls.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
    `;

    body.appendChild(controls);

    // ==========================================
    // 2. CREATE BUTTON FUNCTION
    // ==========================================

    function createButton(text, action) {

        const button = document.createElement("button");

        button.textContent = text;

        button.style.cssText = `
            padding: 11px 15px;
            background: #12355b;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        `;

        button.addEventListener("click", action);

        controls.appendChild(button);

        return button;
    }

    // ==========================================
    // 3. BACK TO TOP BUTTON
    // ==========================================

    const topButton = createButton("⬆ Back to Top", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    // Hidden initially
    topButton.style.display = "none";

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }

    });

    // ==========================================
    // 4. SECTION NAVIGATION
    // ==========================================

    const menuButton = createButton("☰ Sections", function () {

        menu.style.display =
            menu.style.display === "none" ? "block" : "none";

    });

    const menu = document.createElement("div");

    menu.style.cssText = `
        display: none;
        position: fixed;
        right: 20px;
        bottom: 135px;
        width: 220px;
        max-width: calc(100vw - 40px);
        max-height: 60vh;
        overflow-y: auto;
        padding: 12px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.25);
    `;

    body.appendChild(menu);

    headings.forEach(function (heading, index) {

        heading.id = "section-" + index;

        const link = document.createElement("button");

        link.textContent = heading.textContent;

        link.style.cssText = `
            display: block;
            width: 100%;
            margin: 5px 0;
            padding: 9px;
            text-align: left;
            border: 1px solid #ddd;
            background: #f4f6f9;
            color: #12355b;
            border-radius: 5px;
            cursor: pointer;
        `;

        link.addEventListener("click", function () {

            heading.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            menu.style.display = "none";

        });

        menu.appendChild(link);

    });

    // ==========================================
    // 5. DARK MODE BUTTON
    // ==========================================

    let darkMode = false;

    const darkButton = createButton("🌙 Dark Mode", function () {

        darkMode = !darkMode;

        if (darkMode) {

            body.style.backgroundColor = "#121212";
            body.style.color = "#eeeeee";

            headings.forEach(function (heading) {
                heading.style.backgroundColor = "#26384d";
                heading.style.color = "#ffffff";
            });

            menu.style.backgroundColor = "#222222";

            menu.querySelectorAll("button").forEach(function (button) {
                button.style.backgroundColor = "#333333";
                button.style.color = "#ffffff";
            });

            darkButton.textContent = "☀️ Light Mode";

        } else {

            body.style.backgroundColor = "white";
            body.style.color = "#222";

            headings.forEach(function (heading) {
                heading.style.backgroundColor = "#e8f1fa";
                heading.style.color = "#12355b";
            });

            menu.style.backgroundColor = "white";

            menu.querySelectorAll("button").forEach(function (button) {
                button.style.backgroundColor = "#f4f6f9";
                button.style.color = "#12355b";
            });

            darkButton.textContent = "🌙 Dark Mode";

        }

    });

    // ==========================================
    // 6. PRINT BUTTON
    // ==========================================

    createButton("🖨 Print Resume", function () {

        window.print();

    });

    // ==========================================
    // 7. SCROLL PROGRESS BAR
    // ==========================================

    const progress = document.createElement("div");

    progress.id = "scroll-progress";

    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        width: 0%;
        background: #1e88e5;
        z-index: 10000;
    `;

    body.appendChild(progress);

    window.addEventListener("scroll", function () {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progress.style.width = percentage + "%";

    });

    // ==========================================
    // 8. RESPONSIVE TABLE SCROLLING
    // ==========================================

    tables.forEach(function (table) {

        const wrapper = document.createElement("div");

        wrapper.style.cssText = `
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        `;

        table.parentNode.insertBefore(wrapper, table);

        wrapper.appendChild(table);

    });

    // ==========================================
    // 9. RESPONSIVE MOBILE STYLES
    // ==========================================

    const style = document.createElement("style");

    style.textContent = `
        @media screen and (max-width: 600px) {

            #floating-controls {
                right: 12px;
                bottom: 12px;
            }

            #floating-controls button {
                font-size: 12px;
                padding: 9px 12px;
            }

            #floating-controls > button {
                max-width: 160px;
            }

            table {
                min-width: 450px;
            }

            center p {
                overflow-wrap: anywhere;
            }

            #section-menu {
                right: 12px;
                bottom: 120px;
                width: 200px;
            }

        }

        @media print {

            #floating-controls,
            #section-menu,
            #scroll-progress {
                display: none !important;
            }

        }
    `;

    document.head.appendChild(style);

    // ==========================================
    // 10. SECTION HIGHLIGHTING
    // ==========================================

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.borderLeftColor = "#1e88e5";

            }

        });

    }, {
        threshold: 0.5
    });

    headings.forEach(function (heading) {

        observer.observe(heading);

    });

    console.log("Responsive resume JavaScript loaded successfully!");

});