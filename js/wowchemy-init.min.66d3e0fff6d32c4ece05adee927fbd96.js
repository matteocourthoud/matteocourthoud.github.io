(() => {
  // <stdin>
  (() => {
    var t, n, e = document.body;
    function s() {
      return parseInt(localStorage.getItem("wcTheme") || 2);
    }
    function o() {
      return Boolean(window.wc.darkLightEnabled);
    }
    function i() {
      if (!o())
        return console.debug("User theming disabled."), { isDarkTheme: window.wc.isSiteThemeDark, themeMode: window.wc.isSiteThemeDark ? 1 : 0 };
      console.debug("User theming enabled.");
      let t2, n2 = s();
      switch (console.debug(`User's theme variation: ${n2}`), n2) {
        case 0:
          t2 = false;
          break;
        case 1:
          t2 = true;
          break;
        default:
          window.matchMedia("(prefers-color-scheme: dark)").matches ? t2 = true : window.matchMedia("(prefers-color-scheme: light)").matches ? t2 = false : t2 = window.wc.isSiteThemeDark;
          break;
      }
      return t2 && !e.classList.contains("dark") ? (console.debug("Applying Wowchemy dark theme"), document.body.classList.add("dark")) : !t2 && e.classList.contains("dark") && (console.debug("Applying Wowchemy light theme"), document.body.classList.remove("dark")), { isDarkTheme: t2, themeMode: n2 };
    }
    t = false, n = false, window.wc = { darkLightEnabled: t, isSiteThemeDark: n }, window.netlifyIdentity && window.netlifyIdentity.on("init", (e2) => {
      e2 || window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }), i(), window.PlotlyConfig = { MathJaxConfig: "local" };
  })();
})();
/*! Wowchemy v5.1.0 | https://wowchemy.com/ */
/*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
/*! License: https://github.com/wowchemy/wowchemy-hugo-modules/blob/main/LICENSE.md */
