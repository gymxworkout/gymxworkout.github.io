/**
 * GymX 2.0 - Main Interactive Engine
 * High-performance, zero-dependency ES6 module
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initQRModal();
  initExerciseTabs();
  initCalculators();
  initFAQ();
  initSmoothScroll();
  initBackToTop();
});

/* ==========================================================================
   Smooth Scroll Helper
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 76;
        const elemPos = targetElem.getBoundingClientRect().top;
        const offsetPos = elemPos + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.nav-backdrop');
  const closeBtn = document.querySelector('.nav-close-btn');

  if (!toggleBtn || !navLinks) return;

  function openNav() {
    navLinks.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    navLinks.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
      closeNav();
    }
  });
}

/* ==========================================================================
   QR Code Modal
   ========================================================================== */
function initQRModal() {
  const triggers = document.querySelectorAll('.btn-qr-trigger');
  const modal = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3D Exercise Showcase Interactive Tabs (Clean View Without Crop)
   ========================================================================== */
const EXERCISE_DATA = {
  chest: {
    title: "Machine Pec Deck Fly",
    equipment: "Machine",
    targetMuscle: "Pectorals",
    secondaryMuscles: "Front Deltoids, Anterior Deltoids",
    video: "assets/chest_sample.mp4",
    poster: "assets/bodypart.webp",
    muscleImg: "assets/pectoralis_major.webp",
    instructions: [
      "Adjust the seat so the handles are at shoulder height.",
      "Grip the handles with elbows slightly bent.",
      "Bring your arms together and squeeze your chest.",
      "Slowly return to the start and repeat."
    ]
  },
  arms: {
    title: "Ez Bar Biceps Curl",
    equipment: "Barbell",
    targetMuscle: "Biceps",
    secondaryMuscles: "Forearms, Front delts",
    video: "assets/arms_sample.mp4",
    poster: "assets/workout.webp",
    muscleImg: "assets/biceps_brachii.webp",
    instructions: [
      "Stand shoulder-width apart and grip the EZ bar with palms facing up.",
      "Keep your arms extended and elbows close to your sides.",
      "Curl the bar toward your shoulders and squeeze your biceps.",
      "Slowly lower the bar to the starting position and repeat."
    ]
  },
  back: {
    title: "Wide Grip Seated Cable Row",
    equipment: "Cable & Bar",
    targetMuscle: "Latissimus Lats",
    secondaryMuscles: "Rhomboids, Rear Delts, Traps, Biceps",
    video: "assets/back_sample.mp4",
    poster: "assets/workout.webp",
    muscleImg: "assets/latissimus_dorsi.webp",
    instructions: [
      "Sit at the cable machine with knees slightly bent.",
      "Grip the bar wider than shoulder-width with palms facing down.",
      "Pull the bar toward your lower chest and squeeze your shoulder blades.",
      "Slowly extend your arms to the starting position and repeat."
    ]
  },
  shoulders: {
    title: "Dumbbell Shoulder Press",
    equipment: "Dumbbells",
    targetMuscle: "Front Deltoids",
    secondaryMuscles: "Side delts, Triceps, Trapz, Abs",
    video: "assets/shoulder_sample.mp4",
    poster: "assets/workout_details.webp",
    muscleImg: "assets/anterior_deltoid.webp",
    "instructions": [
		"Sit or stand with dumbbells at shoulder height, palms facing forward.",
		"Engage your core and press the dumbbells overhead.",
		"Keep your elbows slightly bent at the top.",
		"Slowly lower the dumbbells to shoulder height and repeat."
	]
  },
  abs: {
    title: "Half Sit Ups (Crunch)",
    equipment: "Bodyweight",
    targetMuscle: "Rectus Abdominis",
    secondaryMuscles: "Hip Flexors, Obliques",
    video: "assets/abs_sample.mp4",
    poster: "assets/home.webp",
    muscleImg: "assets/rectus_abdominis.webp",
    instructions: [
      "Lie on your back with knees bent, feet flat, and hands behind your head.",
	  "Engage your core and lift your upper body to a 45-degree angle.",
	  "Pause briefly while keeping your abs tight.",
	  "Slowly lower your upper body to the starting position and repeat."
	]
  },
  legs: {
    title: "Leg Extension Machine",
    equipment: "Machine",
    targetMuscle: "Quadriceps",
    secondaryMuscles: "Glutes, Hamstrings",
    video: "assets/legs_sample.mp4",
    poster: "assets/bodypart.webp",
    muscleImg: "assets/quadriceps.webp",
    instructions: [
      "Sit on the machine with the pad resting on your shins.",
      "Grip the handles and extend your legs until straight.",
      "Pause briefly at the top and squeeze your quads.",
      "Slowly lower your legs to the starting position and repeat."
    ]
  }
};

function initExerciseTabs() {
  const tabs = document.querySelectorAll('.exercise-categories .tab-btn, .exercise-tabs .tab-btn');
  const titleEl = document.getElementById('exTitle');
  const equipEl = document.getElementById('exEquipment');
  const targetMuscleEl = document.getElementById('exTargetMuscle');
  const secondaryMuscleEl = document.getElementById('exSecondaryMuscle');
  const videoEl = document.getElementById('exVideo');
  const muscleImgEl = document.getElementById('exMuscleImg');
  const instructionsListEl = document.getElementById('exInstructions');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.category;
      const data = EXERCISE_DATA[cat];
      if (!data) return;

      // Update text
      titleEl.textContent = data.title;
      equipEl.textContent = data.equipment;
      targetMuscleEl.textContent = data.targetMuscle;
      secondaryMuscleEl.textContent = data.secondaryMuscles;
      muscleImgEl.src = data.muscleImg;
      muscleImgEl.alt = data.targetMuscle;

      // Update video source smoothly with error catch
      if (videoEl) {
        videoEl.src = data.video;
        videoEl.load();
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      // Update instructions
      instructionsListEl.innerHTML = '';
      data.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsListEl.appendChild(li);
      });
    });
  });
}

/* ==========================================================================
   Interactive Fitness Calculators (BMI & Protein)
   ========================================================================== */
function initCalculators() {
  // Tab Switching (BMI vs Protein)
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcPanes = document.querySelectorAll('.calc-pane');

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      calcPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.dataset.target);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // --- BMI Calculator Logic ---
  const bmiForm = document.getElementById('bmiForm');
  const bmiResultBox = document.getElementById('bmiResultBox');
  const bmiScoreEl = document.getElementById('bmiScore');
  const bmiCategoryEl = document.getElementById('bmiCategory');
  const bmiMsgEl = document.getElementById('bmiMessage');
  const unitBtns = document.querySelectorAll('.bmi-unit-btn');
  let currentUnit = 'metric';

  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.dataset.unit;

      const metricFields = document.querySelectorAll('.field-metric');
      const imperialFields = document.querySelectorAll('.field-imperial');

      if (currentUnit === 'metric') {
        metricFields.forEach(f => f.style.display = 'flex');
        imperialFields.forEach(f => f.style.display = 'none');
      } else {
        metricFields.forEach(f => f.style.display = 'none');
        imperialFields.forEach(f => f.style.display = 'flex');
      }
    });
  });

  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let bmi = 0;

      if (currentUnit === 'metric') {
        const heightCm = parseFloat(document.getElementById('bmiHeightCm').value);
        const weightKg = parseFloat(document.getElementById('bmiWeightKg').value);

        if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
          alert('Please enter valid positive numbers for height and weight.');
          return;
        }
        const heightM = heightCm / 100;
        bmi = weightKg / (heightM * heightM);
      } else {
        const feet = parseFloat(document.getElementById('bmiHeightFt').value) || 0;
        const inches = parseFloat(document.getElementById('bmiHeightIn').value) || 0;
        const weightLbs = parseFloat(document.getElementById('bmiWeightLbs').value);

        const totalInches = (feet * 12) + inches;
        if (totalInches <= 0 || !weightLbs || weightLbs <= 0) {
          alert('Please enter valid positive numbers for height and weight.');
          return;
        }
        bmi = (weightLbs * 703) / (totalInches * totalInches);
      }

      const roundedBmi = bmi.toFixed(1);
      bmiScoreEl.textContent = roundedBmi;

      let category = '';
      let color = '';
      let msg = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = '#f59e0b';
        msg = 'Your BMI indicates you are below optimal weight. Consider our Bulky Body plan inside GymX to build clean lean muscle mass.';
      } else if (bmi < 25) {
        category = 'Normal / Healthy Weight';
        color = '#10b981';
        msg = 'Great job! You are in the optimal weight range. Focus on progressive strength training and muscle toning with GymX.';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = '#ff4b00';
        msg = 'You are slightly above healthy parameters. Check our Lean Body or Home Workout split combined with calorie control.';
      } else {
        category = 'Obese Range';
        color = '#ef4444';
        msg = 'We recommend prioritizing daily physical activity and a structured calorie-deficit diet guide inside GymX.';
      }

      bmiCategoryEl.textContent = category;
      bmiCategoryEl.style.color = color;
      bmiScoreEl.style.color = color;
      bmiMsgEl.textContent = msg;
      bmiResultBox.classList.add('visible');
    });
  }

  // --- Protein Calculator Logic ---
  const proteinForm = document.getElementById('proteinForm');
  const proteinResultBox = document.getElementById('proteinResultBox');
  const proteinScoreEl = document.getElementById('proteinScore');
  const proteinMsgEl = document.getElementById('proteinMessage');

  if (proteinForm) {
    proteinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('protWeight').value);
      const unit = document.getElementById('protUnit').value;
      const activity = parseFloat(document.getElementById('protActivity').value);

      if (!weight || weight <= 0) {
        alert('Please enter a valid positive body weight.');
        return;
      }

      const weightKg = unit === 'lbs' ? weight * 0.453592 : weight;
      const dailyProteinGrams = Math.round(weightKg * activity);

      proteinScoreEl.textContent = `${dailyProteinGrams}g - ${dailyProteinGrams + 20}g`;
      proteinMsgEl.textContent = `Recommended daily protein intake to fuel muscle recovery. For best results, divide this into 4–5 balanced meals of 25–40g each. Check GymX diet plans for complete food lists!`;
      proteinResultBox.classList.add('visible');
    });
  }
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const qBtn = i.querySelector('.faq-question');
        if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
