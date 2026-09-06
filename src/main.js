import './style.css';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

function setNavOpen(open) {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'סגרו תפריט' : 'פתחו תפריט');
  mobileNav.hidden = !open;
}

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  setNavOpen(open);
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNavOpen(false));
});

const form = document.getElementById('demo-form');
const success = document.getElementById('form-success');

const IL_PHONE =
  /^(?:(?:\+972|972|0)(?:-)?(?:[23489]|5[0-9]|7[2-9])(?:-)?\d{7})$/;

function normalizePhone(value) {
  return value.replace(/[\s()-]/g, '');
}

function setError(id, message) {
  const input = document.getElementById(id);
  const err = document.getElementById(`${id}-error`);
  if (!input || !err) return;
  if (message) {
    input.setAttribute('aria-invalid', 'true');
    err.hidden = false;
    err.textContent = message;
  } else {
    input.removeAttribute('aria-invalid');
    err.hidden = true;
    err.textContent = '';
  }
}

function validate() {
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const lot = document.getElementById('lot');
  const city = document.getElementById('city');
  let ok = true;

  if (!name.value.trim() || name.value.trim().length < 2) {
    setError('name', 'נא להזין שם מלא');
    ok = false;
  } else {
    setError('name', '');
  }

  const phoneNorm = normalizePhone(phone.value.trim());
  if (!phoneNorm) {
    setError('phone', 'נא להזין מספר טלפון');
    ok = false;
  } else if (!IL_PHONE.test(phoneNorm)) {
    setError('phone', 'מספר טלפון לא תקין');
    ok = false;
  } else {
    setError('phone', '');
  }

  if (!lot.value.trim()) {
    setError('lot', 'נא להזין שם מגרש');
    ok = false;
  } else {
    setError('lot', '');
  }

  if (!city.value.trim()) {
    setError('city', 'נא להזין עיר');
    ok = false;
  } else {
    setError('city', '');
  }

  return ok;
}

['name', 'phone', 'lot', 'city'].forEach((id) => {
  document.getElementById(id)?.addEventListener('input', () => {
    if (document.getElementById(id)?.getAttribute('aria-invalid') === 'true') {
      validate();
    }
  });
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());

  // Stub endpoint — replace with your CRM / webhook URL in production.
  // Documented in README. Always shows success after client-side validation.
  const STUB_ENDPOINT = '/api/demo-request';
  try {
    await fetch(STUB_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        source: 'auto360-landing',
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Expected for static hosting / missing stub — still show success UX.
  }

  form.classList.add('is-success');
  if (success) success.hidden = false;
});
