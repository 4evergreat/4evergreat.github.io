(() => {
  // <stdin>
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "\u2026": "&hellip;"
  };
  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }
  function replaceHTMLEnt(str) {
    return str.replace(/[&<>"]/g, replaceTag);
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  var Search = class _Search {
    data;
    form;
    input;
    list;
    resultTitle;
    resultTitleTemplate;
    constructor({ form, input, list, resultTitle, resultTitleTemplate }) {
      this.form = form;
      this.input = input;
      this.list = list;
      this.resultTitle = resultTitle;
      this.resultTitleTemplate = resultTitleTemplate;
      this.handleQueryString();
      this.bindQueryStringChange();
      this.bindSearchForm();
    }
    async searchKeywords(keywords) {
      const rawData = await this.getData();
      let results = [];
      keywords.sort((a, b) => {
        return b.length - a.length;
      });
      for (const item of rawData) {
        let result = {
          ...item,
          preview: "",
          matchCount: 0
        };
        let matched = false;
        for (const keyword of keywords) {
          if (keyword === "") continue;
          const regex = new RegExp(escapeRegExp(replaceHTMLEnt(keyword)), "gi");
          const contentMatch = regex.exec(result.content);
          regex.lastIndex = 0;
          const titleMatch = regex.exec(result.title);
          regex.lastIndex = 0;
          if (titleMatch) {
            result.title = result.title.replace(regex, _Search.marker);
          }
          if (titleMatch || contentMatch) {
            matched = true;
            ++result.matchCount;
            let start = 0, end = 100;
            if (contentMatch) {
              start = contentMatch.index - 20;
              end = contentMatch.index + 80;
              if (start < 0) start = 0;
            }
            if (result.preview.indexOf(keyword) !== -1) {
              result.preview = result.preview.replace(regex, _Search.marker);
            } else {
              if (start !== 0) result.preview += `[...] `;
              result.preview += `${result.content.slice(start, end).replace(regex, _Search.marker)} `;
            }
          }
        }
        if (matched) {
          result.preview += "[...]";
          results.push(result);
        }
      }
      return results.sort((a, b) => {
        return b.matchCount - a.matchCount;
      });
    }
    static marker(match) {
      return "<mark>" + match + "</mark>";
    }
    async doSearch(keywords) {
      const startTime = performance.now();
      const results = await this.searchKeywords(keywords);
      this.clear();
      for (const item of results) {
        this.list.append(_Search.render(item));
      }
      const endTime = performance.now();
      this.resultTitle.innerText = this.generateResultTitle(results.length, ((endTime - startTime) / 1e3).toPrecision(1));
    }
    generateResultTitle(resultLen, time) {
      return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }
    async getData() {
      if (!this.data) {
        const jsonURL = this.form.dataset.json;
        this.data = await fetch(jsonURL).then((res) => res.json());
      }
      return this.data;
    }
    bindSearchForm() {
      let lastSearch = "";
      const eventHandler = (e) => {
        e.preventDefault();
        const keywords = this.input.value;
        _Search.updateQueryString(keywords, true);
        if (keywords === "") {
          return this.clear();
        }
        if (lastSearch === keywords) return;
        lastSearch = keywords;
        this.doSearch(keywords.split(" "));
      };
      this.input.addEventListener("input", eventHandler);
      this.input.addEventListener("compositionend", eventHandler);
    }
    clear() {
      this.list.innerHTML = "";
      this.resultTitle.innerText = "";
    }
    bindQueryStringChange() {
      window.addEventListener("popstate", (e) => {
        this.handleQueryString();
      });
    }
    handleQueryString() {
      const pageURL = new URL(window.location.toString());
      const keywords = pageURL.searchParams.get("keyword");
      this.input.value = keywords;
      if (keywords) {
        this.doSearch(keywords.split(" "));
      } else {
        this.clear();
      }
    }
    static updateQueryString(keywords, replaceState = false) {
      const pageURL = new URL(window.location.toString());
      if (keywords === "") {
        pageURL.searchParams.delete("keyword");
      } else {
        pageURL.searchParams.set("keyword", keywords);
      }
      if (replaceState) {
        window.history.replaceState("", "", pageURL.toString());
      } else {
        window.history.pushState("", "", pageURL.toString());
      }
    }
    static render(item) {
      return /* @__PURE__ */ createElement("article", null, /* @__PURE__ */ createElement("a", { href: item.permalink }, /* @__PURE__ */ createElement("div", { class: "article-details" }, /* @__PURE__ */ createElement("h2", { class: "article-title", dangerouslySetInnerHTML: { __html: item.title } }), /* @__PURE__ */ createElement("secion", { class: "article-preview", dangerouslySetInnerHTML: { __html: item.preview } })), item.image && /* @__PURE__ */ createElement("div", { class: "article-image" }, /* @__PURE__ */ createElement("img", { src: item.image, loading: "lazy" }))));
    }
  };
  window.addEventListener("load", () => {
    setTimeout(function() {
      const searchForm = document.querySelector(".search-form"), searchInput = searchForm.querySelector("input"), searchResultList = document.querySelector(".search-result--list"), searchResultTitle = document.querySelector(".search-result--title");
      new Search({
        form: searchForm,
        input: searchInput,
        list: searchResultList,
        resultTitle: searchResultTitle,
        resultTitleTemplate: window.searchResultTitleTemplate
      });
    }, 0);
  });
  var stdin_default = Search;
})();
