/* ============================================
   cardopoli. - Site JS
   ============================================ */

(function() {
    'use strict';

    var allImages = [];
    var currentFilter = 'all';
    var currentImages = [];
    var currentIndex = 0;

    var grid = document.getElementById('grid');
    var filters = document.getElementById('filters');
    var banner = document.getElementById('banner');
    var main = document.getElementById('main');
    var pageView = document.getElementById('page-view');
    var pageContent = document.getElementById('page-content');
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('modal-img');
    var modalCaption = document.getElementById('modal-caption');
    var modalBg = document.getElementById('modal-bg');
    var modalClose = document.getElementById('modal-close');
    var modalPrev = document.getElementById('modal-prev');
    var modalNext = document.getElementById('modal-next');
    var topnav = document.querySelectorAll('#topnav a, .page-back');

    // ============================================
    // DATA
    // ============================================

    async function loadProjects() {
        try {
            var r = await fetch('/content/projects/index.json');
            if (!r.ok) throw new Error();
            var data = await r.json();
            var projects = data.projects || [];
            projects.sort(function(a, b) { return (a.order || 99) - (b.order || 99); });
            return projects;
        } catch (e) {
            return getSampleProjects();
        }
    }

    async function loadPage(slug) {
        try {
            var r = await fetch('/content/pages/' + slug + '.json');
            if (!r.ok) throw new Error();
            return await r.json();
        } catch (e) {
            return {
                title: 'Info',
                body: '<p>Enrico Policardo - photographer, creative director, multimedia artist.</p><p>Based in London since 2010.</p><p><a href="mailto:cardopoli@gmail.com">cardopoli@gmail.com</a></p>'
            };
        }
    }

    function getSampleProjects() {
        var imgs = [
            { id: 'photo-1513475382585-d06e58bcb0e0', tags: ['still-life'], caption: '' },
            { id: 'photo-1490312278390-ab64016e0aa9', tags: ['still-life'], caption: '', wide: true },
            { id: 'photo-1502672260266-1c1ef2d93688', tags: ['interiors'], caption: '' },
            { id: 'photo-1531746020798-e6953c6e8e04', tags: ['people'], caption: '' },
            { id: 'photo-1477959858617-67f85cf4f1df', tags: ['street'], caption: '' },
            { id: 'photo-1518709268805-4e9042af9f23', tags: ['still-life'], caption: '' },
            { id: 'photo-1532996122724-e3c354a0b15b', tags: ['street'], caption: '', wide: true },
            { id: 'photo-1505576399279-0d06b1fcea71', tags: ['people'], caption: '' },
            { id: 'photo-1495474472287-4d71bcdd2085', tags: ['ecommerce'], caption: '' },
            { id: 'photo-1494438639946-1ebd1d20bf85', tags: ['interiors'], caption: '' },
            { id: 'photo-1518756131217-31eb79b20e8f', tags: ['still-life'], caption: '' },
            { id: 'photo-1497366216548-37526070297c', tags: ['ecommerce'], caption: '' },
            { id: 'photo-1519710164239-da123dc03ef4', tags: ['interiors'], caption: '', wide: true },
            { id: 'photo-1507003211169-0a1dd7228f2d', tags: ['people'], caption: '' }
        ];
        return [{
            slug: 'portfolio',
            title: 'Portfolio',
            order: 1,
            images: imgs.map(function(img) {
                return {
                    src: 'https://images.unsplash.com/' + img.id + '?w=600&h=600&fit=crop',
                    hires: 'https://images.unsplash.com/' + img.id + '?w=1600',
                    caption: img.caption,
                    tags: img.tags,
                    wide: img.wide || false
                };
            })
        }];
    }

    // ============================================
    // RENDER
    // ============================================

    function buildAllImages(projects) {
        allImages = [];
        projects.forEach(function(project) {
            if (!project.images) return;
            project.images.forEach(function(img) {
                allImages.push({
                    src: img.src,
                    hires: img.hires || img.src,
                    caption: img.caption || '',
                    tags: img.tags || [],
                    wide: img.wide || false
                });
            });
        });
    }

    function buildFilters() {
        var tagSet = {};
        allImages.forEach(function(img) {
            (img.tags || []).forEach(function(t) { tagSet[t] = true; });
        });

        filters.innerHTML = '';
        var allBtn = makeFilterBtn('All', 'all', true);
        filters.appendChild(allBtn);

        Object.keys(tagSet).sort().forEach(function(tag) {
            filters.appendChild(makeFilterBtn(tag.replace(/-/g, ' '), tag, false));
        });
    }

    function makeFilterBtn(label, value, active) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn' + (active ? ' active' : '');
        btn.textContent = label;
        btn.setAttribute('data-filter', value);
        btn.addEventListener('click', function() {
            currentFilter = value;
            filters.querySelectorAll('.filter-btn').forEach(function(b) {
                b.classList.toggle('active', b.getAttribute('data-filter') === value);
            });
            renderGrid();
        });
        return btn;
    }

    function renderGrid() {
        var filtered = currentFilter === 'all'
            ? allImages
            : allImages.filter(function(img) {
                return img.tags && img.tags.indexOf(currentFilter) !== -1;
            });

        grid.innerHTML = '';
        currentImages = filtered;

        filtered.forEach(function(img, i) {
            var item = document.createElement('div');
            item.className = 'grid-item' + (img.wide ? ' wide' : '');
            item.style.animationDelay = Math.min(i * 0.02, 0.4) + 's';

            var imgEl = document.createElement('img');
            imgEl.src = img.src;
            imgEl.alt = img.caption || '';
            imgEl.loading = 'lazy';
            imgEl.onload = function() { this.classList.add('loaded'); };
            item.appendChild(imgEl);

            var overlay = document.createElement('div');
            overlay.className = 'overlay';
            if (img.caption) {
                overlay.innerHTML = '<span>' + img.caption + '</span>';
            }
            item.appendChild(overlay);

            item.addEventListener('click', function() { openModal(i); });
            grid.appendChild(item);
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="loading">No images in this category yet.</div>';
        }
    }

    // ============================================
    // MODAL
    // ============================================

    function openModal(index) {
        currentIndex = index;
        showModalImg();
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    function showModalImg() {
        var img = currentImages[currentIndex];
        modalImg.src = img.hires || img.src;
        modalCaption.textContent = img.caption || '';
        modalPrev.style.display = currentIndex > 0 ? 'block' : 'none';
        modalNext.style.display = currentIndex < currentImages.length - 1 ? 'block' : 'none';
    }

    modalBg.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', function() {
        if (currentIndex > 0) { currentIndex--; showModalImg(); }
    });
    modalNext.addEventListener('click', function() {
        if (currentIndex < currentImages.length - 1) { currentIndex++; showModalImg(); }
    });

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; showModalImg(); }
        if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) { currentIndex++; showModalImg(); }
    });

    // ============================================
    // NAVIGATION
    // ============================================

    function navigateTo(page, push) {
        if (push !== false) {
            history.pushState({ page: page }, '', page === 'home' ? '/' : '/' + page);
        }

        if (page === 'home') {
            banner.style.display = '';
            filters.style.display = '';
            main.style.display = '';
            pageView.classList.remove('active');
            renderGrid();
        } else {
            banner.style.display = 'none';
            filters.style.display = 'none';
            main.style.display = 'none';
            pageView.classList.add('active');
            loadPage(page).then(function(data) {
                pageContent.innerHTML = '<h1>' + data.title + '</h1>' + data.body;
            });
        }
        window.scrollTo(0, 0);
    }

    topnav.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-page'));
        });
    });

    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('home');
    });

    window.addEventListener('popstate', function(e) {
        var page = e.state && e.state.page ? e.state.page : getPageFromPath();
        navigateTo(page, false);
    });

    function getPageFromPath() {
        var p = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
        return p || 'home';
    }

    // ============================================
    // INIT
    // ============================================

    async function init() {
        grid.innerHTML = '<div class="loading">Loading...</div>';
        var projects = await loadProjects();
        buildAllImages(projects);
        buildFilters();
        navigateTo(getPageFromPath(), false);
    }

    init();

})();
