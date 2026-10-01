'use strict';

document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
    menuButton.hidden = false;

    function closeMenu(returnFocus = false) {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
        if (returnFocus) menuButton.focus();
    }

    menuButton.addEventListener('click', () => {
        const open = menuButton.getAttribute('aria-expanded') !== 'true';
        navigation.classList.toggle('is-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.textContent = open ? 'Close' : 'Menu';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            closeMenu(true);
        }
    });

    navigation.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link || menuButton.getAttribute('aria-expanded') !== 'true') return;
        closeMenu(true);
        const samePage = link.origin === location.origin && link.pathname === location.pathname;
        const target = samePage && link.hash ? document.getElementById(link.hash.slice(1)) : null;
        if (target && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            history.pushState(null, '', link.hash);
            target.scrollIntoView();
        }
    });

    const mobileLayout = window.matchMedia('(max-width: 767px)');
    mobileLayout.addEventListener('change', () => {
        const focusWillBeHidden = mobileLayout.matches && navigation.contains(document.activeElement);
        closeMenu(focusWillBeHidden);
    });
}

const tabs = Array.from(document.querySelectorAll('[data-video-id]'));
const tabList = document.querySelector('.demo-tabs');
const panel = document.querySelector('#demo-panel');
const stage = document.querySelector('.video-stage');
const poster = document.querySelector('#demo-poster');
const playButton = document.querySelector('.video-play');
const playLabel = document.querySelector('.play-label');
const videoCaption = document.querySelector('#video-caption');
const watchLink = document.querySelector('#watch-link');

if (tabs.length && tabList && panel && stage && poster && playButton && playLabel && videoCaption && watchLink) {
    let selectedTab = tabs[0];
    tabList.hidden = false;
    tabList.setAttribute('role', 'tablist');
    panel.setAttribute('role', 'tabpanel');
    playButton.hidden = false;

    function selectVideo(tab) {
        stage.querySelector('iframe')?.remove();
        selectedTab = tab;
        tabs.forEach((item) => {
            const selected = item === tab;
            item.setAttribute('role', 'tab');
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', tab.id);
        poster.src = tab.dataset.poster;
        poster.alt = tab.dataset.posterAlt;
        poster.hidden = false;
        playButton.hidden = false;
        playButton.setAttribute('aria-label', `Play ${tab.textContent.trim()} on YouTube`);
        playLabel.textContent = `Play ${tab.textContent.trim().toLowerCase()}`;
        videoCaption.textContent = tab.dataset.caption;
        watchLink.href = `https://www.youtube.com/watch?v=${tab.dataset.videoId}`;
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            if (tab !== selectedTab) selectVideo(tab);
        });
        tab.addEventListener('keydown', (event) => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            tabs[next].focus();
            if (tabs[next] !== selectedTab) selectVideo(tabs[next]);
        });
    });

    playButton.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${selectedTab.dataset.videoId}?autoplay=1`;
        frame.title = `ClutchReframe Clips — ${selectedTab.textContent.trim()}`;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        poster.hidden = true;
        playButton.hidden = true;
        stage.append(frame);
        frame.focus();
    });

    selectVideo(selectedTab);
}
