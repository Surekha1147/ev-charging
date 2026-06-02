const stations = [
  {
    id: 'blr-mg-road',
    name: 'MG Road Fast Hub',
    distance: 2.4,
    availability: 'available',
    rating: 4.9,
    price: 38,
    type: 'fast',
    slots: 8,
    speed: '150 kW',
    address: 'MG Road, Bangalore',
    reviews: [
      { author: 'Mia', score: 5, note: 'Quick charging and friendly staff.' },
      { author: 'Arun', score: 4, note: 'Great spot near the metro station.' }
    ]
  },
  {
    id: 'chennai-marina',
    name: 'Marina View Station',
    distance: 3.1,
    availability: 'busy',
    rating: 4.6,
    price: 34,
    type: 'normal',
    slots: 5,
    speed: '60 kW',
    address: 'Marina Beach Road, Chennai',
    reviews: [
      { author: 'Nina', score: 5, note: 'Plenty of chargers and easy access.' },
      { author: 'Diego', score: 4, note: 'Affordable price, slight wait time.' }
    ]
  },
  {
    id: 'hyderabad-greenway',
    name: 'Greenway Plaza',
    distance: 1.8,
    availability: 'available',
    rating: 4.8,
    price: 41,
    type: 'fast',
    slots: 6,
    speed: '120 kW',
    address: 'Hitech City, Hyderabad',
    reviews: [
      { author: 'Sam', score: 5, note: 'Modern station with green energy options.' },
      { author: 'Priya', score: 4, note: 'Fast charger and smooth app experience.' }
    ]
  },
  {
    id: 'kochi-sunrise',
    name: 'Sunrise Charge Point',
    distance: 4.5,
    availability: 'available',
    rating: 4.4,
    price: 29,
    type: 'normal',
    slots: 10,
    speed: '50 kW',
    address: 'Marine Drive, Kochi',
    reviews: [
      { author: 'Karen', score: 4, note: 'Excellent price and clean area.' },
      { author: 'Jae', score: 5, note: 'Reliable station for daily trips.' }
    ]
  }
];

const locations = ['Bengaluru', 'Chennai', 'Hyderabad', 'Kochi', 'Thiruvananthapuram', 'Vijayawada', 'Mysuru', 'Pune'];
const settingsKey = 'ev2_app_settings';
const profileKey = 'ev2_user_profile';
const bookingsKey = 'ev2_bookings';

const pageLinks = document.querySelectorAll('[data-page]');
const translatableElements = document.querySelectorAll('[data-label]');
const pages = document.querySelectorAll('.page');
const locationInput = document.getElementById('search-location');
const suggestionsList = document.getElementById('location-suggestions');
const stationGrid = document.getElementById('station-grid');
const filterType = document.getElementById('filter-type');
const filterAvailability = document.getElementById('filter-availability');
const filterPrice = document.getElementById('filter-price');
const bookingStation = document.getElementById('booking-station');
const bookingForm = document.getElementById('booking-form');
const resetBooking = document.getElementById('reset-booking');
const travelTimeEl = document.getElementById('travel-time');
const arrivalTimeEl = document.getElementById('arrival-time');
const estimatedCostEl = document.getElementById('estimated-cost');
const summaryCard = document.getElementById('booking-summary-card');
const summaryName = document.getElementById('summary-name');
const summaryVehicle = document.getElementById('summary-vehicle');
const summaryStation = document.getElementById('summary-station');
const summaryTime = document.getElementById('summary-time');
const summaryType = document.getElementById('summary-type');
const summaryDuration = document.getElementById('summary-duration');
const summaryCost = document.getElementById('summary-cost');
const confirmBookingBtn = document.getElementById('confirm-booking');
const statusText = document.getElementById('status-text');
const statusDetails = document.getElementById('status-details');
const statusName = document.getElementById('status-name');
const statusVehicle = document.getElementById('status-vehicle');
const statusStation = document.getElementById('status-station');
const statusStart = document.getElementById('status-start');
const statusExpiry = document.getElementById('status-expiry');
const statusCountdown = document.getElementById('status-countdown');
const statusAlert = document.getElementById('status-alert');
const statusHistory = document.getElementById('status-history');
const rescheduleBookingBtn = document.getElementById('reschedule-booking');
const cancelBookingBtn = document.getElementById('cancel-booking');
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileVehicle = document.getElementById('profile-vehicle');
const profileStation = document.getElementById('profile-station');
const rewardPoints = document.getElementById('reward-points');
const rewardTier = document.getElementById('reward-tier');
const stationInfo = document.getElementById('station-info');
const stationReviews = document.getElementById('station-reviews');
const historyList = document.getElementById('history-list');
const contactForm = document.getElementById('contact-form');
const languageSelect = document.getElementById('language-select');
const toggleThemeBtn = document.getElementById('toggle-theme');
const toggleContrastBtn = document.getElementById('toggle-contrast');
const toggleTextBtn = document.getElementById('toggle-text');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

const root = document.documentElement;

let bookingCountdownInterval = null;
let activeBooking = null;
let appSettings = { theme: 'light', contrast: 'normal', largeText: false, language: 'en' };
let bookingPreview = null;

const translations = {
  en: {
    'Home': 'Home',
    'Book a Slot': 'Book a Slot',
    'Booking Status': 'Booking Status',
    'History': 'History',
    'Station Details': 'Station Details',
    'User Profile': 'User Profile',
    'FAQ': 'FAQ',
    'About': 'About',
    'Contact': 'Contact'
  },
  te: {
    'Home': 'ఇంటి',
    'Book a Slot': 'స్లాట్ బుక్ చేయండి',
    'Booking Status': 'బుకింగ్ స్థితి',
    'History': 'చారిత్రక',
    'Station Details': 'స్టేషన్ వివరాలు',
    'User Profile': 'వినియోగదారు ప్రొఫైల్',
    'FAQ': 'సాధారణ ప్రశ్నలు',
    'About': 'మా గురించి',
    'Contact': 'కాంటాక్ట్'
  },
  hi: {
    'Home': 'होम',
    'Book a Slot': 'स्लॉट बुक करें',
    'Booking Status': 'बुकिंग स्थिति',
    'History': 'इतिहास',
    'Station Details': 'स्टेशन विवरण',
    'User Profile': 'यूज़र प्रोफ़ाइल',
    'FAQ': 'अक्सर पूछे जाने वाले प्रश्न',
    'About': 'हमारे बारे में',
    'Contact': 'संपर्क'
  }
};

function saveSettings() {
  localStorage.setItem(settingsKey, JSON.stringify(appSettings));
}

function loadSettings() {
  const saved = localStorage.getItem(settingsKey);
  if (saved) {
    appSettings = { ...appSettings, ...JSON.parse(saved) };
  }
  applyTheme();
  applyContrast();
  applyTextSize();
  languageSelect.value = appSettings.language;
}

function applyTheme() {
  root.dataset.theme = appSettings.theme;
  toggleThemeBtn.textContent = appSettings.theme === 'dark' ? '☀️' : '🌙';
}

function applyContrast() {
  root.dataset.contrast = appSettings.contrast;
}

function applyTextSize() {
  document.body.classList.toggle('large-text', appSettings.largeText);
}

function loadProfile() {
  const saved = localStorage.getItem(profileKey);
  if (saved) {
    const profile = JSON.parse(saved);
    profileName.value = profile.name || '';
    profileVehicle.value = profile.vehicle || '';
    profileStation.value = profile.station || stations[0].id;
  }
}

function loadBookings() {
  const saved = localStorage.getItem(bookingsKey);
  const all = saved ? JSON.parse(saved) : [];
  activeBooking = all.find((item) => item.status === 'booked') || null;
  renderStatus();
  renderHistory(all);
}

function saveProfile(data) {
  localStorage.setItem(profileKey, JSON.stringify(data));
}

function saveBooking(booking) {
  const saved = localStorage.getItem(bookingsKey);
  const all = saved ? JSON.parse(saved) : [];
  all.push(booking);
  localStorage.setItem(bookingsKey, JSON.stringify(all));
}

function updateBookingStatus(id, status) {
  const saved = localStorage.getItem(bookingsKey);
  if (!saved) return;
  const all = JSON.parse(saved);
  const item = all.find((booking) => booking.id === id);
  if (item) {
    item.status = status;
    item.updatedAt = new Date().toISOString();
    localStorage.setItem(bookingsKey, JSON.stringify(all));
    loadBookings();
  }
}

function renderStations() {
  const type = filterType.value;
  const availability = filterAvailability.value;
  const price = filterPrice.value;
  const filtered = stations.filter((station) => {
    if (type !== 'all' && station.type !== type) return false;
    if (availability === 'available' && station.availability !== 'available') return false;
    if (availability === 'busy' && station.availability !== 'busy') return false;
    if (price === 'low' && station.price >= 30) return false;
    if (price === 'mid' && (station.price < 30 || station.price > 40)) return false;
    if (price === 'high' && station.price <= 40) return false;
    return true;
  });
  stationGrid.innerHTML = filtered.map((station) => `
    <article class="station-card">
      <h4>${station.name}</h4>
      <p>${station.address}</p>
      <div class="badge-row">
        <span class="badge ${station.availability}">${station.availability === 'available' ? 'Available' : 'Busy'}</span>
        <span class="badge">${station.type === 'fast' ? 'Fast' : 'Normal'}</span>
      </div>
      <div class="station-footer">
        <span>⭐ ${station.rating}</span>
        <span>${station.distance.toFixed(1)} km</span>
        <span>₹${station.price.toFixed(2)}/kWh</span>
      </div>
      <button type="button" data-action="view-station" data-id="${station.id}">View Details</button>
    </article>
  `).join('');
}

function populateStationSelects() {
  const options = stations.map((station) => `<option value="${station.id}">${station.name} • ${station.distance.toFixed(1)} km</option>`).join('');
  bookingStation.innerHTML = options;
  profileStation.innerHTML = options;
}

function renderStationDetails(stationId = stations[0].id) {
  const station = stations.find((item) => item.id === stationId) || stations[0];
  stationInfo.innerHTML = `
    <div class="detail-row"><strong>${station.name}</strong><span>${station.address}</span></div>
    <div class="detail-row"><span>Distance</span><strong>${station.distance.toFixed(1)} km</strong></div>
    <div class="detail-row"><span>Availability</span><strong>${station.availability === 'available' ? 'Available' : 'Busy'}</strong></div>
    <div class="detail-row"><span>Slots</span><strong>${station.slots}</strong></div>
    <div class="detail-row"><span>Charging speed</span><strong>${station.speed}</strong></div>
    <div class="detail-row"><span>Price per kWh</span><strong>₹${station.price.toFixed(2)}</strong></div>
  `;
  stationReviews.innerHTML = station.reviews.map((review) => `
    <article class="review-card">
      <h4>${review.author} • ${'⭐'.repeat(review.score)}</h4>
      <p>${review.note}</p>
    </article>
  `).join('');
}

function renderHistory(all = null) {
  const bookings = (all || JSON.parse(localStorage.getItem(bookingsKey) || '[]')).slice();
  statusHistory.innerHTML = bookings.slice(-3).reverse().map((booking) => `
    <div class="history-record">
      <div>
        <strong>${booking.stationName}</strong>
        <span>${new Date(booking.startTime).toLocaleString()}</span>
      </div>
      <span class="status-pill ${booking.status}">${booking.status}</span>
    </div>
  `).join('') || '<p>No past bookings yet.</p>';
  historyList.innerHTML = bookings.slice().reverse().map((booking) => `
    <article>
      <h3>${booking.stationName}</h3>
      <p>${new Date(booking.startTime).toLocaleString()} • ${booking.duration} mins</p>
      <p>Status: <strong>${booking.status}</strong></p>
      <button type="button" data-action="rebook" data-id="${booking.id}">Rebook</button>
    </article>
  `).join('') || '<p>No bookings recorded yet.</p>';
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function updateBookingEstimate() {
  const station = stations.find((item) => item.id === bookingStation.value) || stations[0];
  const duration = Number(document.getElementById('booking-duration').value) || 0;
  const type = document.getElementById('booking-type').value;
  const speedFactor = type === 'fast' ? 1 : 0.7;
  const travelMins = Math.max(8, Math.round(station.distance * 4 + (type === 'fast' ? 0 : 3)));
  const cost = duration * (type === 'fast' ? station.price * 0.95 : station.price * 0.75) / 15;
  travelTimeEl.textContent = `${travelMins} mins`;
  arrivalTimeEl.textContent = `~${new Date(Date.now() + travelMins * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  estimatedCostEl.textContent = `₹${cost.toFixed(2)}`;
}

function showSummary(values) {
  summaryName.textContent = values.name;
  summaryVehicle.textContent = values.vehicle;
  summaryStation.textContent = values.stationName;
  summaryTime.textContent = formatTime(values.startTime);
  summaryType.textContent = values.typeLabel;
  summaryDuration.textContent = `${values.duration} mins`;
  summaryCost.textContent = `₹${values.cost.toFixed(2)}`;
  summaryCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function createBookingPayload(values) {
  return {
    id: `booking-${Date.now()}`,
    name: values.name,
    vehicle: values.vehicle,
    stationId: values.stationId,
    stationName: values.stationName,
    startTime: values.startTime,
    duration: values.duration,
    type: values.type,
    cost: values.cost,
    status: 'booked',
    createdAt: new Date().toISOString()
  };
}

function refreshActiveStatus() {
  if (!activeBooking) {
    statusText.textContent = 'No active booking';
    statusDetails.querySelectorAll('span').forEach((span) => (span.textContent = '—'));
    statusAlert.textContent = 'Book a slot to see live countdown and arrival updates.';
    return;
  }
  const now = Date.now();
  const start = new Date(activeBooking.startTime).getTime();
  const end = start + activeBooking.duration * 60000;
  const timeUntilStart = Math.max(0, start - now);
  const timeUntilEnd = Math.max(0, end - now);
  statusName.textContent = activeBooking.name;
  statusVehicle.textContent = activeBooking.vehicle;
  statusStation.textContent = activeBooking.stationName;
  statusStart.textContent = formatTime(activeBooking.startTime);
  statusExpiry.textContent = formatTime(new Date(end).toISOString());
  statusCountdown.textContent = timeUntilStart > 0 ? `${Math.ceil(timeUntilStart / 60000)} mins until start` : `${Math.ceil(timeUntilEnd / 60000)} mins remaining`;
  statusText.textContent = timeUntilStart > 0 ? 'Pending' : timeUntilEnd > 0 ? 'Booked' : 'Expired';
  statusText.parentElement.className = `status-label ${statusText.textContent.toLowerCase()}`;
  if (timeUntilStart <= 600000 && timeUntilStart > 0) {
    statusAlert.textContent = 'Your slot starts in less than 10 minutes. Prepare to arrive on time.';
  } else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
    statusAlert.textContent = 'You are currently in your charging window. Enjoy the fast charging session!';
  } else if (timeUntilEnd <= 0) {
    statusAlert.textContent = 'This booking has expired. Check history or rebook a new slot.';
    updateBookingStatus(activeBooking.id, 'expired');
    activeBooking = null;
    return;
  } else {
    statusAlert.textContent = 'Your booking is confirmed and will begin at the scheduled time.';
  }
}

function startStatusInterval() {
  if (bookingCountdownInterval) clearInterval(bookingCountdownInterval);
  bookingCountdownInterval = setInterval(() => {
    loadBookings();
    renderStatus();
  }, 10000);
}

function renderStatus() {
  const all = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
  activeBooking = all.find((item) => item.status === 'booked') || null;
  if (activeBooking) {
    statusText.textContent = activeBooking.status;
    statusDetails.querySelectorAll('span').forEach((span) => (span.textContent = '—'));
    refreshActiveStatus();
  } else {
    refreshActiveStatus();
  }
  renderHistory(all);
}

function showPage(pageId) {
  pages.forEach((page) => page.classList.toggle('active', page.id === pageId));
  pageLinks.forEach((link) => link.classList.toggle('active', link.dataset.page === pageId));
}

function updateLanguage() {
  const lang = appSettings.language;
  translatableElements.forEach((element) => {
    const sourceLabel = element.dataset.label || element.textContent.trim();
    element.textContent = lang === 'en' ? sourceLabel : translations[lang][sourceLabel] || sourceLabel;
  });
}

function handleMenuToggle() {
  mainNav.classList.toggle('open');
}

function initListeners() {
  pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = link.dataset.page;
      showPage(page);
      if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
    });
  });

  menuToggle.addEventListener('click', handleMenuToggle);

  locationInput.addEventListener('input', () => {
    const query = locationInput.value.toLowerCase();
    suggestionsList.innerHTML = locations.filter((loc) => loc.toLowerCase().includes(query)).map((loc) => `<li>${loc}</li>`).join('');
  });

  suggestionsList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      locationInput.value = event.target.textContent;
      suggestionsList.innerHTML = '';
    }
  });

  [filterType, filterAvailability, filterPrice].forEach((input) => input.addEventListener('change', renderStations));

  bookingStation.addEventListener('change', updateBookingEstimate);
  document.getElementById('booking-type').addEventListener('change', updateBookingEstimate);
  document.getElementById('booking-duration').addEventListener('input', updateBookingEstimate);

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = {
      name: document.getElementById('booking-name').value,
      vehicle: document.getElementById('booking-vehicle').value,
      stationId: bookingStation.value,
      stationName: stations.find((item) => item.id === bookingStation.value).name,
      startTime: document.getElementById('booking-time').value,
      type: document.getElementById('booking-type').value,
      typeLabel: document.getElementById('booking-type').selectedOptions[0].textContent,
      duration: Number(document.getElementById('booking-duration').value),
      cost: Number(estimatedCostEl.textContent.replace('₹', ''))
    };
    bookingPreview = createBookingPayload(values);
    showSummary(values);
  });

  resetBooking.addEventListener('click', () => {
    bookingForm.reset();
    bookingStation.value = stations[0].id;
    updateBookingEstimate();
    summaryName.textContent = '—';
    summaryVehicle.textContent = '—';
    summaryStation.textContent = '—';
    summaryTime.textContent = '—';
    summaryType.textContent = '—';
    summaryDuration.textContent = '—';
    summaryCost.textContent = '—';
  });

  confirmBookingBtn.addEventListener('click', () => {
    if (!bookingPreview) return alert('Fill the booking form first.');
    saveBooking(bookingPreview);
    bookingPreview = null;
    activeBooking = bookingPreview;
    loadBookings();
    showPage('status');
    alert('Booking confirmed! Check the status page for updates.');
  });

  rescheduleBookingBtn.addEventListener('click', () => {
    if (!activeBooking) return;
    const newStart = prompt('Enter a new start time in ISO format (YYYY-MM-DDTHH:mm):', activeBooking.startTime.slice(0, 16));
    if (newStart) {
      activeBooking.startTime = new Date(newStart).toISOString();
      const all = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
      const item = all.find((booking) => booking.id === activeBooking.id);
      if (item) {
        item.startTime = activeBooking.startTime;
        localStorage.setItem(bookingsKey, JSON.stringify(all));
        loadBookings();
        alert('Booking rescheduled successfully.');
      }
    }
  });

  cancelBookingBtn.addEventListener('click', () => {
    if (!activeBooking) return;
    if (confirm('Cancel this booking?')) {
      updateBookingStatus(activeBooking.id, 'cancelled');
      activeBooking = null;
      alert('Booking cancelled.');
      loadBookings();
    }
  });

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveProfile({
      name: profileName.value,
      vehicle: profileVehicle.value,
      station: profileStation.value
    });
    alert('Profile updated successfully.');
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out. We will get back to you soon.');
    contactForm.reset();
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (action === 'view-station') {
      renderStationDetails(id);
      showPage('station-details');
    }
    if (action === 'rebook') {
      const booking = JSON.parse(localStorage.getItem(bookingsKey) || '[]').find((item) => item.id === id);
      if (booking) {
        document.getElementById('booking-name').value = booking.name;
        document.getElementById('booking-vehicle').value = booking.vehicle;
        bookingStation.value = booking.stationId;
        document.getElementById('booking-type').value = booking.type;
        document.getElementById('booking-duration').value = booking.duration;
        document.getElementById('booking-time').value = new Date().toISOString().slice(0, 16);
        updateBookingEstimate();
        showPage('booking');
      }
    }
  });

  languageSelect.addEventListener('change', () => {
    appSettings.language = languageSelect.value;
    updateLanguage();
    saveSettings();
  });

  toggleThemeBtn.addEventListener('click', () => {
    appSettings.theme = appSettings.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveSettings();
  });

  toggleContrastBtn.addEventListener('click', () => {
    appSettings.contrast = appSettings.contrast === 'high' ? 'normal' : 'high';
    applyContrast();
    saveSettings();
  });

  toggleTextBtn.addEventListener('click', () => {
    appSettings.largeText = !appSettings.largeText;
    applyTextSize();
    saveSettings();
  });
}

function init() {
  loadSettings();
  loadProfile();
  populateStationSelects();
  renderStations();
  renderStationDetails();
  loadBookings();
  updateBookingEstimate();
  initListeners();
  startStatusInterval();
  showPage('home');
}

init();
