document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initTranslations();
    initPasswordToggle();
    initLiveEvents();
});

// --- 1. LÓGICA DE INTERFAZ (UI) ---
function initUI() {
    const header = document.querySelector("header");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Efecto Scroll en Header
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // Menú Hamburguesa Móvil
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar menú al hacer click en un link
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }
}

// --- 2. SISTEMA DE TRADUCCIÓN (I18N) ---
const translations = {
    es: {
        nav_home: "Inicio", nav_about: "Nosotros", nav_events: "Eventos", nav_login: "Panel",
        hero_title: "¡Sé parte de nuestra comunidad!", hero_btn: "Unirme al Discord",
        origin_title: "El Origen de Toxic Under Groove",
        origin_text: "Todo comenzó con un grupo de amigos cansados de la monotonía. Lo que empezó como unas simples partidas nocturnas se transformó en una hermandad. Hoy somos una comunidad consolidada buscando crear un espacio donde la competitividad y la diversión van de la mano.",
        staff_title: "Nuestros Referentes", role_admin: "Administrador & Desarollador", role_team_leader: "Líder de Clan", role_clan_co_leader: "Colíder",
        rotation_title: "Nuestra Rotación", rotation_subtitle: "Además de desarrollar, competimos y nos divertimos en:",
        game_core: "Servidores Privados", game_comp: "Competitivo", game_ranked: "Clasificatorio", game_fornite: "Cero Construcción",
        projects_title: "Nuestros Proyectos",
        
        // PROYECTOS ACTIVOS
        proj_l2_title: "⚔️ Próximamente: Lineage 2", proj_l2_desc: "Estamos desarrollando nuestro propio servidor Crónica High Five (H5) con mecánicas retail.",
        proj_l2_feat1: "🔹 Files Java PTS (Mecánicas retail)", proj_l2_feat2: "🔹 Estabilidad garantizada", proj_l2_feat3: "🔹 Comunidad competitiva", proj_l2_status: "🛠️ En construcción",
        
        proj_scrydex_title: "🔥 Actualmente: ScrydeX", 
        proj_scrydex_desc: "El clan está activo y compitiendo en el servidor de ScrydeX con gran presencia diaria.",
        proj_scrydex_sub: "Si buscas un clan organizado para cualquier contenido del juego, este es tu lugar. ¡Súmate a la familia!",
        proj_scrydex_recruiting: "✅ Reclutando",
        proj_scrydex_web: "Sitio Web Oficial",

        footer_copy: "© 2026 Toxic Under Groove. Todos los derechos reservados.",
        
        // LOGIN & PANEL
        login_title: "ACCESO", login_user_label: "USUARIO", login_user_ph: "Usuario", login_pass_label: "CONTRASEÑA", login_pass_ph: "Contraseña",
        login_btn: "INGRESAR", login_back: "Volver a la portada", login_discord_btn: "Ingresar con Discord",
        panel_welcome: "Bienvenido", panel_rank: "Rango", panel_dkp: "Mis DKP", panel_avail: "Puntos disponibles", panel_att: "Asistencia", panel_evts: "Eventos",
        panel_hist_title: "Historial de Puntos", panel_th_date: "Fecha", panel_th_evt: "Evento", panel_th_pts: "Puntos", panel_no_activity: "Aún no tienes actividad registrada.",
        panel_admin: "Gestión (Admin)", panel_logout: "Salir"
    },
    en: {
        nav_home: "Home", nav_about: "About Us", nav_events: "Events", nav_login: "Panel",
        hero_title: "Be part of our community!", hero_btn: "Join Discord",
        origin_title: "The Origin of Toxic Under Groove",
        origin_text: "It all started with a group of friends tired of monotony. What began as simple late-night games transformed into a brotherhood. Today we are a consolidated community looking to create a space where competitiveness and fun go hand in hand.",
        staff_title: "Our Staff", role_admin: "Admin & Developer", role_team_leader: "Clan Leader", role_clan_co_leader: "Co-Leader",
        rotation_title: "Our Rotation", rotation_subtitle: "Besides developing, we compete and have fun in:",
        game_core: "Private Servers", game_comp: "Competitive", game_ranked: "Ranked", game_fornite: "Zero Build",
        projects_title: "Our Projects",
        
        // ACTIVE PROJECTS
        proj_l2_title: "⚔️ Coming Soon: Lineage 2", proj_l2_desc: "We are developing our own High Five (H5) Chronicle server with retail mechanics.",
        proj_l2_feat1: "🔹 Java PTS Files (Retail mechanics)", proj_l2_feat2: "🔹 Guaranteed stability", proj_l2_feat3: "🔹 Competitive community", proj_l2_status: "🛠️ Under Construction",
        
        proj_scrydex_title: "🔥 Currently: ScrydeX", 
        proj_scrydex_desc: "The clan is active and competing in the ScrydeX server with great daily presence.",
        proj_scrydex_sub: "If you are looking for an organized clan for any game content, this is your place. Join the family!",
        proj_scrydex_recruiting: "✅ Recruiting",
        proj_scrydex_web: "Official Website",

        footer_copy: "© 2026 Toxic Under Groove. All rights reserved.",

        // LOGIN & PANEL
        login_title: "LOGIN", login_user_label: "USERNAME", login_user_ph: "Username", login_pass_label: "PASSWORD", login_pass_ph: "Password",
        login_btn: "ENTER", login_back: "Back to home", login_discord_btn: "Login with Discord",
        panel_welcome: "Welcome", panel_rank: "Rank", panel_dkp: "My DKP", panel_avail: "Points available", panel_att: "Attendance", panel_evts: "Events",
        panel_hist_title: "Points History", panel_th_date: "Date", panel_th_evt: "Event", panel_th_pts: "Points", panel_no_activity: "No activity registered yet.",
        panel_admin: "Management (Admin)", panel_logout: "Logout"
    }
};

function initTranslations() {
    // Recuperar idioma guardado o defecto
    const savedLang = localStorage.getItem('toxic_lang') || 'es';
    setLanguage(savedLang, null);
}

// Función global para ser llamada desde el HTML
window.setLanguage = function(lang, element) {
    localStorage.setItem('toxic_lang', lang);

    // 1. Traducir elementos estáticos
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                // Preservar iconos si existen dentro del elemento
                if (el.querySelector('i')) {
                    const icon = el.querySelector('i').outerHTML;
                    // Detectar si el icono va antes o después (básico: asume antes)
                    el.innerHTML = icon + " " + translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        }
    });

    // 2. Actualizar estado visual de banderas
    document.querySelectorAll('.flag-btn').forEach(flag => {
        flag.classList.remove('active');
        if(flag.getAttribute('onclick') && flag.getAttribute('onclick').includes(lang)) {
            flag.classList.add('active');
        }
    });

    // 3. Traducir mensajes dinámicos del Backend (Errores de Login)
    document.querySelectorAll('.js-dynamic-msg').forEach(el => {
        const raw = el.getAttribute('data-raw');
        
        // Verificamos si es un código enviado desde Python
        if (raw && raw.includes('|')) {
            const parts = raw.split('|');
            const code = parts[0];
            const val = parts[1];

            if (code === 'LOCKED') {
                el.textContent = lang === 'en' 
                    ? `System locked for security. Wait ${val} minutes.` 
                    : `Sistema bloqueado por seguridad. Espera ${val} minutos.`;
            } 
            else if (code === 'MAX_ATTEMPTS') {
                el.textContent = lang === 'en' 
                    ? `Maximum attempts exceeded. Access blocked for ${val} minutes.` 
                    : `Has excedido los 3 intentos. Acceso bloqueado por ${val} minutos.`;
            } 
            else if (code === 'WARNING') {
                if (lang === 'en') {
                    const attemptWord = val == 1 ? 'attempt' : 'attempts';
                    el.textContent = `Invalid credentials. You have ${val} ${attemptWord} left.`;
                } else {
                    const attemptWord = val == 1 ? 'Te queda 1 intento.' : `Te quedan ${val} intentos.`;
                    el.textContent = `Credenciales incorrectas. ${attemptWord}`;
                }
            }
        }
    });
};

// --- 3. FUNCIONALIDADES ESPECÍFICAS (Login) ---
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('passwordInput');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
}

// --- 4. SISTEMA DE EVENTOS EN VIVO (HORARIO ARGENTINA) ---

function getARTTime() {
    // Convierte el reloj de cualquier usuario al horario estricto de Argentina (UTC-3)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc - (3 * 3600000));
}

function initLiveEvents() {
    const container = document.getElementById('liveEventsContainer');
    if (!container) return;

    // Base de datos de eventos (Configurado exactamente como pediste)
    // "duration" es cuánto tiempo en minutos dura el evento para decir "EN VIVO"
    // "days" representa los días de la semana: 0=Domingo, 1=Lunes, 2=Martes, etc.
    const categories = [
        {
            id: 'daily', title: 'Eventos Diarios', icon: 'fa-flag',
            schedule: [
                { name: 'TvT', hour: 1, min: 0, duration: 10, days: [0,1,2,3,4,5,6] },
                { name: 'TvT', hour: 9, min: 0, duration: 10, days: [0,1,2,3,4,5,6] },
                { name: 'CTF', hour: 12, min: 0, duration: 10, days: [0,1,2,3,4,5,6] },
                { name: 'TvT', hour: 13, min: 0, duration: 10, days: [0,1,2,3,4,5,6] },
                { name: 'CTF', hour: 15, min: 0, duration: 10, days: [0,1,2,3,4,5,6] },
                { name: 'TvT', hour: 16, min: 0, duration: 10, days: [0,1,2,3,4,5,6] }
            ]
        },
        {
            id: 'oly', title: 'Olimpiadas 3v3', icon: 'fa-shield-halved',
            schedule: [
                { name: 'Olimpiadas', hour: 8, min: 0, duration: 480, days: [0, 4] }, // Dom(0) y Jue(4) - 8hs de duración
                { name: 'Olimpiadas', hour: 12, min: 0, duration: 360, days: [5, 6] } // Vie(5) y Sab(6) - 6hs de duración
            ]
        },
        {
            id: 'raid', title: 'Raid Bosses', icon: 'fa-skull',
            schedule: [
                { name: 'Raid Boss', hour: 8, min: 0, duration: 15, days: [0,1,2,3,4,5,6] },
                { name: 'Raid Boss', hour: 14, min: 0, duration: 15, days: [0,1,2,3,4,5,6] }
            ]
        }
    ];

    // Inyectamos el esqueleto HTML de las 3 tarjetas
    container.innerHTML = categories.map(cat => `
        <div class="event-card" id="cat-${cat.id}">
            <div class="event-header">
                <span class="event-title"><i class="fa-solid ${cat.icon}"></i> ${cat.title}</span>
                <span class="event-time" id="name-${cat.id}">Buscando...</span>
            </div>
            <div class="event-countdown" id="timer-${cat.id}">--h --m --s</div>
        </div>
    `).join('');

    // Función matemática para encontrar el próximo evento de la lista
    function getNextEvent(schedule, nowART) {
        let bestTimeDiff = Infinity;
        let bestEvent = null;
        let eventStart = null;

        // Buscamos desde hoy hasta 7 días en el futuro
        for (let dayOffset = 0; dayOffset <= 7; dayOffset++) {
            let checkDate = new Date(nowART.getTime());
            checkDate.setDate(checkDate.getDate() + dayOffset);
            let currentDayOfWeek = checkDate.getDay();

            for (let ev of schedule) {
                if (ev.days.includes(currentDayOfWeek)) {
                    let evStart = new Date(checkDate.getTime());
                    evStart.setHours(ev.hour, ev.min, 0, 0);
                    let evEnd = new Date(evStart.getTime() + (ev.duration * 60000));

                    // ¿Está en vivo en este exacto momento?
                    if (dayOffset === 0 && nowART >= evStart && nowART < evEnd) {
                        return { live: true, name: ev.name };
                    }

                    // ¿Es en el futuro? Comparamos para quedarnos con el más cercano
                    if (evStart > nowART) {
                        let diff = evStart.getTime() - nowART.getTime();
                        if (diff < bestTimeDiff) {
                            bestTimeDiff = diff;
                            bestEvent = ev;
                            eventStart = evStart;
                        }
                    }
                }
            }
            // Si ya encontramos el evento más cercano en este día, dejamos de buscar en el futuro
            if (bestEvent) break; 
        }
        return { live: false, name: bestEvent.name, start: eventStart };
    }

    // Bucle principal: Actualiza los relojes cada 1 segundo (1000ms)
    setInterval(() => {
        const nowART = getARTTime();
        
        categories.forEach(cat => {
            const nextEv = getNextEvent(cat.schedule, nowART);
            const elCard = document.getElementById(`cat-${cat.id}`);
            const elName = document.getElementById(`name-${cat.id}`);
            const elTimer = document.getElementById(`timer-${cat.id}`);

            if (nextEv.live) {
                if(!elCard.classList.contains('live-now')) elCard.classList.add('live-now');
                elName.innerHTML = `<i class="fa-solid fa-circle-play"></i> ${nextEv.name}`;
                elTimer.innerHTML = '¡EN VIVO! 🔥';
            } else {
                elCard.classList.remove('live-now');
                const diff = nextEv.start.getTime() - nowART.getTime();
                
                // Calculamos días, horas, minutos y segundos restantes
                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                
                // Si falta más de 1 día, mostramos "Xd", sino solo horas
                let timeStr = d > 0 
                    ? `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
                    : `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
                
                // Formato de hora (ej: 09:00hs)
                let hourStr = nextEv.start.getHours().toString().padStart(2, '0');
                let minStr = nextEv.start.getMinutes().toString().padStart(2, '0');
                
                elName.innerHTML = `<i class="fa-regular fa-clock"></i> ${nextEv.name} (${hourStr}:${minStr}hs)`;
                elTimer.innerHTML = timeStr;
            }
        });
    }, 1000);
}