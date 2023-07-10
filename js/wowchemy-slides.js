(() => {
  // ns-params:@params
  var slides = { highlight_style: "dracula", theme: "black" };

  // ns-hugo:/Users/mcourt/Dropbox/Website/themes/custom-wowchemy-theme/assets/js/wowchemy-utils.js
  function fixMermaid(render = false) {
    let mermaids = [];
    [].push.apply(mermaids, document.getElementsByClassName("language-mermaid"));
    for (let i = 0; i < mermaids.length; i++) {
      let mermaidCodeElement = mermaids[i];
      let newElement = document.createElement("div");
      newElement.innerHTML = mermaidCodeElement.innerHTML;
      newElement.classList.add("mermaid");
      if (render) {
        window.mermaid.mermaidAPI.render(`mermaid-${i}`, newElement.textContent, function(svgCode) {
          newElement.innerHTML = svgCode;
        });
      }
      mermaidCodeElement.parentNode.replaceWith(newElement);
    }
    console.debug(`Processed ${mermaids.length} Mermaid code blocks`);
  }

  // <stdin>
  var enabledPlugins = [RevealMarkdown, RevealHighlight, RevealSearch, RevealNotes, RevealMath, RevealZoom];
  var isObject = function(o) {
    return o === Object(o) && !isArray(o) && typeof o !== "function";
  };
  var isArray = function(a) {
    return Array.isArray(a);
  };
  var toCamelCase = function(s) {
    return s.replace(/([-_][a-z])/gi, function(term) {
      return term.toUpperCase().replace("-", "").replace("_", "");
    });
  };
  var keysToCamelCase = function(o) {
    if (isObject(o)) {
      const n = {};
      Object.keys(o).forEach(function(k) {
        n[toCamelCase(k)] = keysToCamelCase(o[k]);
      });
      return n;
    } else if (isArray(o)) {
      return o.map(function(i) {
        return keysToCamelCase(i);
      });
    }
    return o;
  };
  var pluginOptions = {};
  if (typeof slides.reveal_options !== "undefined") {
    pluginOptions = slides.reveal_options;
  }
  pluginOptions = keysToCamelCase(pluginOptions);
  if (typeof pluginOptions.menu_enabled === "undefined") {
    pluginOptions.menu_enabled = true;
  }
  if (pluginOptions.menu_enabled) {
    enabledPlugins.push(RevealMenu);
  }
  pluginOptions["plugins"] = enabledPlugins;
  Reveal.initialize(pluginOptions);
  function mermaidSlidesReadyToRender(mslide) {
    var diag = mslide.querySelector(".mermaid");
    if (diag) {
      var background = mslide.slideBackgroundElement;
      var currentHorizontalIndex = Reveal.getState()["indexh"];
      var diagramSlideIndex = Reveal.getIndices(mslide)["h"];
      if (
        // find slides with non-rendered mermaid tags
        // these will not have the attribute data-processed
        !diag.hasAttribute("data-processed") && // check also that reveal slide is already loaded
        // reveal slides seem to be lazily loaded
        // things could be easier if reveal had a slide-loaded event
        background.hasAttribute("data-loaded") && // loaded slides must also have the display attribute set to block
        background.style.display === "block" && // render diagrams that are 1 slide away
        diagramSlideIndex - currentHorizontalIndex <= 1
      )
        return mslide;
    }
    return null;
  }
  function renderMermaidSlides() {
    var diagramSlides = Reveal.getSlides().filter(mermaidSlidesReadyToRender);
    diagramSlides.forEach(function(item) {
      mermaid.init(item.querySelector(".mermaid"));
    });
  }
  Reveal.on("slidechanged", function() {
    renderMermaidSlides();
  });
  Reveal.on("Ready", function() {
    if (Reveal.isReady()) {
      renderMermaidSlides();
    }
  });
  if (typeof slides.diagram === "undefined") {
    slides.diagram = false;
  }
  if (slides.diagram) {
    mermaidOptions = {};
    if (typeof slides.diagram_options !== "undefined") {
      mermaidOptions = slides.diagram_options;
    }
    mermaidOptions["startOnLoad"] = false;
    mermaid.initialize(mermaidOptions);
    document.addEventListener("DOMContentLoaded", function() {
      fixMermaid(false);
    });
  }
  var mermaidOptions;
})();
