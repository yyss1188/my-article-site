(function () {
  const posts = Array.isArray(window.SITE_POSTS) ? window.SITE_POSTS : [];
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  const escapeText = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const postGrid = document.getElementById("postGrid");
  const tagRow = document.getElementById("tagRow");
  const searchInput = document.getElementById("searchInput");

  if (postGrid && tagRow && searchInput) {
    let activeTag = "全部";
    const tags = ["全部", ...new Set(posts.flatMap((post) => post.tags))];

    const renderTags = () => {
      tagRow.innerHTML = tags.map((tag) => `
        <button class="tag-button ${tag === activeTag ? "is-active" : ""}" type="button" data-tag="${escapeText(tag)}">
          ${escapeText(tag)}
        </button>
      `).join("");
    };

    const matchesPost = (post, query) => {
      const haystack = [
        post.title,
        post.summary,
        post.author,
        post.tags.join(" ")
      ].join(" ").toLowerCase();

      const matchesTag = activeTag === "全部" || post.tags.includes(activeTag);
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesTag && matchesQuery;
    };

    const renderPosts = () => {
      const query = searchInput.value;
      const visiblePosts = posts.filter((post) => matchesPost(post, query));

      postGrid.innerHTML = visiblePosts.length ? visiblePosts.map((post) => `
        <article class="post-card">
          <div class="post-meta">
            <span>${escapeText(formatDate(post.date))}</span>
            <span>${escapeText(post.readingTime)}</span>
          </div>
          <h3><a href="./article.html?slug=${encodeURIComponent(post.slug)}">${escapeText(post.title)}</a></h3>
          <p>${escapeText(post.summary)}</p>
          <div class="card-footer">
            <div class="mini-tags">
              ${post.tags.map((tag) => `<span>${escapeText(tag)}</span>`).join("")}
            </div>
            <a class="read-link" href="./article.html?slug=${encodeURIComponent(post.slug)}">阅读</a>
          </div>
        </article>
      `).join("") : `<p class="empty-state">没有找到匹配的文章。</p>`;
    };

    tagRow.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-tag]");
      if (!button) return;
      activeTag = button.dataset.tag;
      renderTags();
      renderPosts();
    });

    searchInput.addEventListener("input", renderPosts);
    renderTags();
    renderPosts();
  }

  const article = document.getElementById("article");
  if (article) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || posts[0]?.slug;
    const post = posts.find((item) => item.slug === slug);

    if (!post) {
      document.title = "文章不存在 | 观星台";
      article.innerHTML = `
        <h1>文章不存在</h1>
        <p>这篇文章可能已经移动或删除。</p>
      `;
      return;
    }

    document.title = `${post.title} | 观星台`;
    article.innerHTML = `
      <header class="article-header">
        <div class="post-meta">
          <span>${escapeText(formatDate(post.date))}</span>
          <span>${escapeText(post.author)}</span>
          <span>${escapeText(post.readingTime)}</span>
        </div>
        <h1>${escapeText(post.title)}</h1>
        <p>${escapeText(post.summary)}</p>
        <div class="mini-tags">
          ${post.tags.map((tag) => `<span>${escapeText(tag)}</span>`).join("")}
        </div>
      </header>
      <div class="article-body">
        ${post.content}
      </div>
    `;
  }
}());
