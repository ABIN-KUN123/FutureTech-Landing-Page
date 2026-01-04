// 1. Inisialisasi AOS (Cukup sekali saja)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// 2. Logic Dark Mode (Cek LocalStorage & Toggle)
const darkToggle = document.getElementById('dark-toggle');
const htmlElem = document.querySelector('html');

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElem.classList.add('dark');
} else {
    htmlElem.classList.remove('dark');
}

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        htmlElem.classList.toggle('dark');
        localStorage.theme = htmlElem.classList.contains('dark') ? 'dark' : 'light';
    });
}

// 3. Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// 4. FAQ Accordion (Hanya jalan jika ada elemen faqList)
const faqList = document.getElementById('faqList');
if (faqList) {
    faqList.addEventListener('click', (e) => {
        const header = e.target.closest('.faq-question');
        if (!header) return;

        const item = header.parentElement;
        const answer = header.nextElementSibling;
        const isVisible = !answer.classList.contains('hidden');

        // Tutup FAQ lainnya
        document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

        // Toggle yang diklik
        if (!isVisible) {
            answer.classList.remove('hidden');
            item.classList.add('active');
        }
    });
}

// 5. Input Pertanyaan Baru (Khusus halaman FAQ)
const submitFaqBtn = document.getElementById('submitQuestion');
if (submitFaqBtn && faqList) {
    const userInpField = document.getElementById('userQuestion');
    const faqInpFeedback = document.getElementById('faqFeedback');

    submitFaqBtn.addEventListener('click', () => {
        const qText = userInpField.value.trim();
        if (qText !== "") {
            const newDiv = document.createElement('div');
            newDiv.className = 'faq-item border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-indigo-50/50 dark:bg-slate-900/50';
            newDiv.innerHTML = `
                <button class="faq-question w-full flex justify-between items-center p-6 text-left font-bold text-slate-800 dark:text-white">
                    ${qText}
                    <span class="text-indigo-600 text-2xl">+</span>
                </button>
                <div class="faq-answer px-6 pb-6 text-slate-500 dark:text-slate-400 hidden text-sm">
                    Pertanyaan Anda sudah masuk ke moderator. Kami akan menjawabnya melalui email segera!
                </div>
            `;
            faqList.appendChild(newDiv);
            userInpField.value = "";
            if (faqInpFeedback) {
                faqInpFeedback.classList.remove('hidden');
                setTimeout(() => faqInpFeedback.classList.add('hidden'), 3000);
            }
        }
    });
}

// 6. Form Submission (Hanya jalan jika ada elemen regForm)
const regForm = document.getElementById('regForm');
const successBox = document.getElementById('successMsg');
const successText = document.getElementById('successText');

if (regForm && successBox) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        
        regForm.classList.add('hidden');
        successBox.classList.remove('hidden');
        if (successText) {
            successText.innerText = `Halo ${name}, pendaftaran berhasil! Tiket telah dikirim ke email Anda. Sampai jumpa di UNIDA Gontor!`;
        }
    });
}