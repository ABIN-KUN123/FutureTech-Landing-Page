// Inisialisasi AOS (Animations)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 1. FAQ Accordion Interaction (HCI: Feedback)
document.getElementById('faqList').addEventListener('click', (e) => {
    const header = e.target.closest('.faq-question');
    if (!header) return;

    const item = header.parentElement;
    const answer = header.nextElementSibling;
    const isVisible = !answer.classList.contains('hidden');

    // Tutup yang lain
    document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.faq-question').forEach(el => el.classList.remove('active'));

    // Toggle yang diklik
    if (!isVisible) {
        answer.classList.remove('hidden');
        item.classList.add('active');
        header.classList.add('active');
    }
});

// 2. Input Pertanyaan Baru Dinamis (HCI: User Engagement)
const submitFaqBtn = document.getElementById('submitQuestion');
const userInpField = document.getElementById('userQuestion');
const faqInpFeedback = document.getElementById('faqFeedback');
const faqList = document.getElementById('faqList');

submitFaqBtn.addEventListener('click', () => {
    const qText = userInpField.value.trim();

    if (qText !== "") {
        const newDiv = document.createElement('div');
        newDiv.className = 'faq-item border border-slate-100 rounded-2xl overflow-hidden transition-all bg-indigo-50/50';
        newDiv.innerHTML = `
            <button class="faq-question w-full flex justify-between items-center p-6 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors">
                ${qText}
                <span class="text-indigo-600 text-2xl">+</span>
            </button>
            <div class="faq-answer px-6 pb-6 text-slate-500 hidden">
                Pertanyaan Anda sudah masuk ke moderator. Kami akan menjawabnya melalui email Anda segera!
            </div>
        `;
        faqList.appendChild(newDiv);
        userInpField.value = "";
        faqInpFeedback.classList.remove('hidden');
        setTimeout(() => faqInpFeedback.classList.add('hidden'), 3000);
    }
});

// 3. Form Submission (HCI: Visibility of Status)
const regForm = document.getElementById('regForm');
const successBox = document.getElementById('successMsg');
const successText = document.getElementById('successText');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    regForm.style.display = 'none';
    successBox.classList.remove('hidden');
    successText.innerText = `Halo ${name}, tiket seminar Anda telah kami kirimkan ke email. Sampai jumpa di FutureTech 2025!`;
});