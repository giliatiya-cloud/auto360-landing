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
const formError = document.getElementById('form-error');

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

function setFormError(message) {
  if (!formError) return;
  if (message) {
    formError.hidden = false;
    formError.textContent = message;
  } else {
    formError.hidden = true;
    formError.textContent = '';
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

function showSuccessUi() {
  form?.classList.add('is-success');
  if (success) success.hidden = false;
  setFormError('');
}

function handleSentRedirect() {
  const params = new URLSearchParams(window.location.search);
  const sentFlag = params.get('sent') === '1' || params.has('sent');
  const thankFlag =
    /thank/i.test(window.location.search) ||
    /thank/i.test(window.location.hash);
  if (!sentFlag && !thankFlag) return;

  showSuccessUi();
  const url = new URL(window.location.href);
  url.searchParams.delete('sent');
  url.searchParams.delete('thank');
  const qs = url.searchParams.toString();
  const clean = url.pathname + (qs ? `?${qs}` : '') + (url.hash || '#demo');
  history.replaceState(null, '', clean);
}

handleSentRedirect();

let allowNativeSubmit = false;

form?.addEventListener('submit', (event) => {
  if (allowNativeSubmit) return;

  event.preventDefault();
  setFormError('');
  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
    return;
  }

  allowNativeSubmit = true;
  form.submit();
});
