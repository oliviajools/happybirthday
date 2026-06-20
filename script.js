(function () {
    'use strict';

    const events = {
        'bewegte-gespraeche': {
            title: 'Bewegte Gespräche',
            subtitle: 'Demokratie unter Druck, Protest in Bewegung',
            location: 'Nachtasyl, Hamburg',
            description: 'Der zweite Salon des ipb mit Diskussion, Kunst und Musik. Ein Abend über No Kings, Anti-ICE und die Zukunft der Demokratie – mit Live-Gesprächen, Graphic Recording und DJ-Set.',
            extra: 'Mit Dr. Ella Müller (Campact), Elaine Thomas (US-Aktivistin) und Prof. Peter N. Funke. Gastgeberin: Dr. Nina Wienkoop. Einlass ab 18:30 Uhr. Die Veranstaltung ist kostenlos, aber mit begrenzten Plätzen.',
            url: 'http://nachtasyl.de/index.php/1341-bewegte-gespraeche',
            dates: [
                { date: '9. Juli 2026 · 19:00 Uhr', note: 'Einlass ab 18:30 Uhr' }
            ]
        },
        'fabian': {
            title: 'Fabian oder Der Gang vor die Hunde',
            subtitle: 'Nach Erich Kästner',
            location: 'Schauspielhaus Hamburg',
            description: 'Berlin in der Weimarer Republik: ein Großstadtroman mit autobiografischen Zügen, der vor dem Abgrund warnt. Ein Theaterabend über Zeitgeist, Moral und das Drama eines gewöhnlichen Lebens.',
            extra: 'Regie und Bühne: Dušan David Pařízek. Mit Henning Hartmann, Christoph Jöde, Markus John und Mirco Kreibich. Kästners Roman, der 1933 in Flammen aufging – hier als scharfsinnige Bühnenadaption.',
            url: 'https://schauspielhaus.de/stuecke/fabian-oder-der-gang-vor-die-hunde',
            dates: [
                { date: '23. Juni 2026 · 20:00 Uhr', note: '' },
                { date: '4. Okt. 2026 · 19:30 Uhr', note: 'Einführung um 19:00 Uhr' },
                { date: '23. Okt. 2026 · 19:30 Uhr', note: '' }
            ]
        },
        'poetry-slam': {
            title: 'Poetry Slam Finale',
            subtitle: 'Kampf der Künste Jahresfinale',
            location: 'Schauspielhaus Hamburg',
            description: 'Die besten Poet*innen des deutschsprachigen Raums treffen aufeinander. Ein Abend voller Wortgewalt, Pointen und Emotionen – um den Titel des Jahreschampions 2026.',
            extra: 'Monatelang kämpften Poet*innen beim Zeise Poetry Slam um einen Startplatz. Nachts mit der besten Texten, den schönsten Reimen und den knalligsten Witzen geht es um Ruhm, Ehre und Pokale.',
            url: 'https://schauspielhaus.de/stuecke/poetry-slam-finale',
            dates: [
                { date: '26. Juni 2026 · 20:00 Uhr', note: '' }
            ]
        },
        'herr-puntila': {
            title: 'Herr Puntila und sein Knecht Matti',
            subtitle: 'Mit Live-Musik',
            location: 'Schauspielhaus Hamburg',
            description: 'Ein groteskes Bild einer moralisch wie ökonomisch verschuldeten Gesellschaft. Der betrunkene Gutsbesitzer Puntila und sein Knecht Matti – ein Stück über Macht, Menschlichkeit und den traurigen Witz der Geschichte.',
            extra: 'Regie: Karin Beier. Mit Markus John, Jan-Peter Kampwirth, Joachim Meyerhoff, Lilith Stangenberg, Michael Wittenborn und Live-Musik von Vlatko Kučan & Jakob Neubauer. Ein Klassiker von Brecht, frisch und voller Energie.',
            url: 'https://schauspielhaus.de/stuecke/herr-puntila-und-sein-knecht-matti',
            dates: [
                { date: '28. Juni 2026 · 18:00 Uhr', note: '' }
            ]
        }
    };

    const toggleButtons = document.querySelectorAll('.event-card__toggle');
    const selectButtons = document.querySelectorAll('.event-card__select');
    const modal = document.getElementById('confirm-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalEventName = document.getElementById('modal-event-name');
    const resultSection = document.getElementById('result');
    const resultCard = document.getElementById('result-card');
    const copyButton = document.getElementById('copy-link');
    const whatsappShare = document.getElementById('whatsapp-share');
    const mailShare = document.getElementById('mail-share');
    const copyHint = document.getElementById('copy-hint');
    const resetButton = document.getElementById('reset-choice');

    let pendingChoice = null;
    let chosenChoice = null;

    function init() {
        bindToggles();
        bindSelectButtons();
        bindModal();
        bindResultActions();
        restoreFromUrl();
    }

    function getSelectedDateIndex(eventId) {
        const radios = document.querySelectorAll(`input[name="date-${eventId}"]`);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return parseInt(radios[i].value, 10);
            }
        }
        return 0;
    }

    function getDateInfo(eventId, dateIndex) {
        const event = events[eventId];
        if (!event || !event.dates[dateIndex]) return null;
        return event.dates[dateIndex];
    }

    function bindToggles() {
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('aria-controls');
                const details = document.getElementById(targetId);
                if (!details) return;

                const isHidden = details.hasAttribute('hidden');
                if (isHidden) {
                    details.removeAttribute('hidden');
                    button.setAttribute('aria-expanded', 'true');
                    button.textContent = 'Details ausblenden';
                } else {
                    details.setAttribute('hidden', '');
                    button.setAttribute('aria-expanded', 'false');
                    button.textContent = 'Details anzeigen';
                }
            });
        });
    }

    function bindSelectButtons() {
        selectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const eventId = button.getAttribute('data-select');
                if (!events[eventId]) return;
                const dateIndex = getSelectedDateIndex(eventId);
                openModal(eventId, dateIndex);
            });
        });
    }

    function openModal(eventId, dateIndex) {
        pendingChoice = { eventId, dateIndex };
        const dateInfo = getDateInfo(eventId, dateIndex);
        modalEventName.innerHTML = `${events[eventId].title}<br><span style="font-size:0.85em;font-weight:400;color:var(--ink-soft)">${dateInfo.date}</span>`;
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        modalConfirm.focus();
    }

    function closeModal() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        pendingChoice = null;
    }

    function bindModal() {
        modalOverlay.addEventListener('click', closeModal);
        modalClose.addEventListener('click', closeModal);
        modalCancel.addEventListener('click', closeModal);

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        modalConfirm.addEventListener('click', () => {
            if (pendingChoice) {
                confirmChoice(pendingChoice.eventId, pendingChoice.dateIndex);
                closeModal();
            }
        });
    }

    function confirmChoice(eventId, dateIndex) {
        chosenChoice = { eventId, dateIndex };
        localStorage.setItem('natalie-choice', JSON.stringify(chosenChoice));
        updateUrl(eventId, dateIndex);
        markSelectedDate(eventId, dateIndex);
        renderResult(eventId, dateIndex);
        resultSection.removeAttribute('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateUrl(eventId, dateIndex) {
        const url = new URL(window.location.href);
        url.searchParams.set('wahl', eventId);
        url.searchParams.set('termin', dateIndex);
        window.history.replaceState({}, '', url.toString());
    }

    function clearUrl() {
        const url = new URL(window.location.href);
        url.searchParams.delete('wahl');
        url.searchParams.delete('termin');
        window.history.replaceState({}, '', url.toString());
    }

    function markSelectedDate(eventId, dateIndex) {
        document.querySelectorAll('.event-card').forEach(card => {
            card.classList.remove('is-selected');
            const button = card.querySelector('.event-card__select');
            if (button) {
                button.classList.remove('is-chosen');
                button.textContent = 'Diesen Termin wählen';
            }
        });

        const radios = document.querySelectorAll(`input[name="date-${eventId}"]`);
        radios.forEach(radio => {
            radio.checked = parseInt(radio.value, 10) === dateIndex;
        });

        const selectedCard = document.querySelector(`.event-card[data-event="${eventId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('is-selected');
            const button = selectedCard.querySelector('.event-card__select');
            if (button) {
                button.classList.add('is-chosen');
                button.textContent = 'Deine aktuelle Wahl';
            }
        }
    }

    function renderResult(eventId, dateIndex) {
        const event = events[eventId];
        const dateInfo = getDateInfo(eventId, dateIndex);
        if (!event || !dateInfo) return;

        const noteHtml = dateInfo.note ? `<p style="margin-top:0.5rem;font-size:0.95rem;color:var(--muted)">${dateInfo.note}</p>` : '';

        resultCard.innerHTML = `
            <h4>${event.title}</h4>
            <p class="meta">${dateInfo.date} · ${event.location}</p>
            <p>${event.description}</p>
            ${noteHtml}
            <p style="margin-top: 1rem;">${event.extra}</p>
        `;

        const shareUrl = window.location.href;
        const message = encodeURIComponent(`Ich habe mich entschieden: ${event.title} am ${dateInfo.date}. Hier ist der Link: ${shareUrl}`);
        whatsappShare.href = `https://wa.me/?text=${message}`;
        mailShare.href = `mailto:?subject=Mein Geburtstagsgeschenk&body=${message}`;
    }

    function bindResultActions() {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                copyHint.classList.add('is-visible');
                setTimeout(() => {
                    copyHint.classList.remove('is-visible');
                }, 3000);
            });
        });

        resetButton.addEventListener('click', () => {
            chosenChoice = null;
            localStorage.removeItem('natalie-choice');
            clearUrl();
            resultSection.setAttribute('hidden', '');
            document.querySelectorAll('.event-card').forEach(card => {
                card.classList.remove('is-selected');
                const button = card.querySelector('.event-card__select');
                if (button) {
                    button.classList.remove('is-chosen');
                    button.textContent = 'Diesen Termin wählen';
                }
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function restoreFromUrl() {
        const url = new URL(window.location.href);
        const eventId = url.searchParams.get('wahl');
        const dateIndexRaw = url.searchParams.get('termin');
        const dateIndex = dateIndexRaw !== null ? parseInt(dateIndexRaw, 10) : 0;

        if (eventId && events[eventId]) {
            const validIndex = events[eventId].dates[dateIndex] ? dateIndex : 0;
            confirmChoice(eventId, validIndex);
            return;
        }

        const stored = localStorage.getItem('natalie-choice');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && events[parsed.eventId]) {
                    markSelectedDate(parsed.eventId, parsed.dateIndex);
                }
            } catch (e) {
                localStorage.removeItem('natalie-choice');
            }
        }
    }

    init();
})();
