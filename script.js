let filteredData = [...poetryData];
let authors = new Set();

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 提取所有作者
    poetryData.forEach(p => authors.add(p.author));
    // 填充作者下拉
    const authorSelect = document.getElementById('author-filter');
    Array.from(authors).sort().forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorSelect.appendChild(option);
    });

    // 渲染列表
    renderPoetryList();
    updateCount();

    // 绑定筛选事件
    document.getElementById('dynasty-filter').addEventListener('change', filter);
    document.getElementById('author-filter').addEventListener('change', filter);
    document.getElementById('style-filter').addEventListener('change', filter);
    document.getElementById('priority-filter').addEventListener('change', filter);

    // 绑定弹窗关闭
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // ESC 关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
});

// 筛选
function filter() {
    const dynasty = document.getElementById('dynasty-filter').value;
    const author = document.getElementById('author-filter').value;
    const style = document.getElementById('style-filter').value;
    const priority = document.getElementById('priority-filter').value;

    filteredData = poetryData.filter(p => {
        if (dynasty && p.dynasty !== dynasty) return false;
        if (author && p.author !== author) return false;
        if (style && p.style !== style) return false;
        if (priority === 'compulsory' && !p.compulsory) return false;
        return true;
    });

    // 按优先级和传唱度排序
    filteredData.sort((a, b) => {
        // 九年义务教育必背优先
        if (a.compulsory !== b.compulsory) {
            return a.compulsory ? -1 : 1;
        }
        // 然后按传唱度降序
        return b.spread - a.spread;
    });

    renderPoetryList();
    updateCount();
}

// 渲染列表
function renderPoetryList() {
    const container = document.getElementById('poetry-list');
    container.innerHTML = '';

    if (filteredData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 3rem;">没有找到匹配的古诗词</p>';
        return;
    }

    filteredData.forEach((poem, index) => {
        const card = document.createElement('div');
        card.className = 'poetry-card' + (poem.compulsory ? ' compulsory' : '');
        card.innerHTML = `
            <h3>
                ${poem.title}
                ${poem.compulsory ? '<span class="badge">必背</span>' : ''}
            </h3>
            <p class="author">${poem.author} · ${poem.dynasty}</p>
            <div class="meta">
                <span class="meta-tag">${poem.style}</span>
                <span class="meta-tag ${poem.popularity >= 90 ? 'high-popularity' : ''}">传唱 ${poem.spread}</span>
            </div>
            <p class="preview">${poem.content.split('\n').slice(0, 2).join('\n')}...</p>
        `;
        card.addEventListener('click', () => openModal(poem));
        container.appendChild(card);
    });
}

// 更新计数
function updateCount() {
    document.getElementById('total-count').textContent = filteredData.length;
}

// 打开弹窗
function openModal(poem) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <h2>${poem.title} ${poem.compulsory ? '<span class="badge">九年义务教育必背</span>' : ''}</h2>
        <div class="author-meta">${poem.author} · ${poem.dynasty} · ${poem.style}</div>
        <div class="content">${poem.content}</div>
        <div class="info">
            <div class="info-row">
                <span class="info-label">流行度</span>
                <span>${poem.popularity}/100</span>
            </div>
            <div class="info-row">
                <span class="info-label">传唱度</span>
                <span>${poem.spread}/100</span>
            </div>
            <div class="info-row">
                <span class="info-label">优先级</span>
                <span>${poem.compulsory ? '九年义务教育必背（高优先级）' : '推荐阅读'}</span>
            </div>
            ${poem.notes ? `<div class="info-row" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #eee;"><span class="info-label">说明</span><span>${poem.notes}</span></div>` : ''}
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
