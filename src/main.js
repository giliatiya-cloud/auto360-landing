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

const DEMO_ENDPOINT = 'https://formsubmit.co/ajax/gili@webxp.co.il';

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

function isFormSubmitSuccess(payload) {
  if (!payload || typeof payload !== 'object') return false;
  return payload.success === true || payload.success === 'true';
}

function looksLikeActivation(payload, rawText) {
  const msg = [
    payload?.message,
    payload?.error,
    typeof rawText === 'string' ? rawText : '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return (
    msg.includes('activate') ||
    msg.includes('confirm your email') ||
    msg.includes('check your email') ||
    msg.includes('activation')
  );
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setFormError('');
  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn?.textContent ?? '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'שולחים…';
  }

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(DEMO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        lot: data.lot,
        city: data.city,
        source: 'auto360-landing',
        submittedAt: new Date().toISOString(),
        _subject: 'Auto360 — בקשת דמו 15 דקות',
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const rawText = await response.text();
    let payload = null;
    try {
      payload = rawText ? JSON.parse(rawText) : null;
    } catch {
      payload = null;
    }

    if (response.ok && isFormSubmitSuccess(payload)) {
      form.classList.add('is-success');
      if (success) success.hidden = false;
      return;
    }

    if (looksLikeActivation(payload, rawText)) {
      setFormError('נדרשת הפעלה ראשונה: בדקו את תיבת הדוא״ל של gili@webxp.co.il ולחצו Activate / Confirm באימייל מ־FormSubmit, ואז נסו שוב.');
    } else {
      const detail =
        (payload && (payload.message || payload.error)) ||
        (!response.ok ? `שגיאת שרת (${response.status})` : null);
      setFormError(
        detail
          ? `שליחת הבקשה נכשלה: ${detail}`
          : 'שליחת הבקשה נכשלה. נסו שוב בעוד רגע.',
      );
    }
  } catch {
    setFormError('שגיאת רשת — בדקו חיבור ונסו שוב.');
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
