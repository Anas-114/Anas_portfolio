/* Anas Portfolio JavaScript - Navigation & Interactive Phone Call Simulator */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ESC key to close drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Phone Call Simulation State Manager
  const acceptCallBtn = document.getElementById('acceptCallBtn');
  const declineCallBtn = document.getElementById('declineCallBtn');
  const phoneScreen = document.getElementById('phoneScreen');
  const callStatusLabel = document.getElementById('callStatusLabel');
  const phoneActions = document.getElementById('phoneActions');

  let callTimer = null;
  let callSeconds = 0;

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  if (acceptCallBtn && phoneScreen) {
    acceptCallBtn.addEventListener('click', () => {
      phoneScreen.classList.add('connected');
      callSeconds = 0;
      callStatusLabel.textContent = 'CONNECTED · 00:00';
      
      // Update action UI to hang up state
      phoneActions.innerHTML = `
        <button class="phone-action-btn" id="hangupCallBtn" aria-label="End call">
          <div class="icon-circle decline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67 19.42 19.42 0 0 1-2.67-3.33 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" transform="rotate(135 12 12)"></path>
            </svg>
          </div>
          <span class="action-label">End Call</span>
        </button>
      `;

      if (callTimer) clearInterval(callTimer);
      callTimer = setInterval(() => {
        callSeconds++;
        callStatusLabel.textContent = `CONNECTED · ${formatTime(callSeconds)}`;
      }, 1000);

      document.getElementById('hangupCallBtn').addEventListener('click', resetCallState);
    });
  }

  function resetCallState() {
    if (callTimer) clearInterval(callTimer);
    phoneScreen.classList.remove('connected');
    callStatusLabel.textContent = 'ZEGOCLOUD INCOMING CALL...';
    
    phoneActions.innerHTML = `
      <button class="phone-action-btn" id="declineCallBtn" aria-label="Decline incoming call">
        <div class="icon-circle decline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67 19.42 19.42 0 0 1-2.67-3.33 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" transform="rotate(135 12 12)"></path>
          </svg>
        </div>
        <span class="action-label">Decline</span>
      </button>
      <button class="phone-action-btn" id="acceptCallBtn" aria-label="Accept incoming call">
        <div class="icon-circle accept">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <span class="action-label">Accept</span>
      </button>
    `;

    document.getElementById('acceptCallBtn').addEventListener('click', () => {
      acceptCallBtn.click();
    });
    document.getElementById('declineCallBtn').addEventListener('click', () => {
      callStatusLabel.textContent = 'CALL ENDED';
      setTimeout(resetCallState, 1500);
    });
  }

  if (declineCallBtn) {
    declineCallBtn.addEventListener('click', () => {
      callStatusLabel.textContent = 'CALL ENDED';
      setTimeout(resetCallState, 1500);
    });
  }
});
