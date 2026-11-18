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

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
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
    title: "Incline Barbell Bench Press",
    equipment: "Barbell & Incline Bench",
    targetMuscle: "Pectoralis Major (Clavicular Head)",
    secondaryMuscles: "Triceps Brachii, Anterior Deltoids",
    video: "assets/chest_sample.mp4",
    poster: "assets/bodypart.webp",
    muscleImg: "assets/pectoralis_major.webp",
    instructions: [
      "Set your bench to a 30 to 45-degree angle with barbell racked safely above.",
      "Grip the bar slightly wider than shoulder-width and unrack with elbows angled slightly inward.",
      "Lower the bar under control toward upper chest while driving shoulder blades into bench.",
      "Pause for half a second at bottom, then press back up explosively."
    ]
  },
  arms: {
    title: "Wide Grip Barbell Curl",
    equipment: "Barbell",
    targetMuscle: "Biceps Brachii (Short & Long Head)",
    secondaryMuscles: "Forearms, Anterior Deltoids",
    video: "assets/arms_sample.mp4",
    poster: "assets/workout.webp",
    muscleImg: "assets/biceps_brachii.webp",
    instructions: [
      "Stand holding a barbell with an underhand grip wider than shoulder-width.",
      "Let the bar hang at arm's length in front of your thighs with elbows tucked close.",
      "Curl the bar upward toward your shoulders, keeping your elbows stationary.",
      "Pause and squeeze your biceps at the top, then slowly lower back to start."
    ]
  },
  back: {
    title: "Wide Grip Seated Cable Row",
    equipment: "Cable Machine & Straight Bar",
    targetMuscle: "Latissimus Dorsi",
    secondaryMuscles: "Rhomboids, Rear Delts, Traps, Biceps",
    video: "assets/back_sample.mp4",
    poster: "assets/workout.webp",
    muscleImg: "assets/latissimus_dorsi.webp",
    instructions: [
      "Attach a straight bar to the low pulley cable and sit upright with knees slightly bent.",
      "Grasp the bar with an overhand grip wider than shoulder-width.",
      "Pull the bar toward your lower chest, driving your elbows wide and squeezing shoulder blades.",
      "Slowly extend your arms back to the starting position under full control."
    ]
  },
  shoulders: {
    title: "Dumbbell Shoulder Press",
    equipment: "Dumbbells",
    targetMuscle: "Anterior & Lateral Deltoids",
    secondaryMuscles: "Triceps, Upper Trapezius, Core",
    video: "assets/shoulder_sample.mp4",
    poster: "assets/workout_details.webp",
    muscleImg: "assets/anterior_deltoid.webp",
    instructions: [
      "Sit or stand holding a dumbbell in each hand at shoulder height with palms facing forward.",
      "Engage your core and press the dumbbells overhead until arms are comfortably extended.",
      "Avoid locking out your elbows sharply at the top of the movement.",
      "Lower the dumbbells slowly back to shoulder height and repeat under control."
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
      "Lie flat on your back with knees bent, feet flat on the floor, and hands behind your head.",
      "Engage your core and curl your upper body upward until your torso reaches a 45-degree angle.",
      "Pause briefly at the halfway point while keeping your lower back pressed to the floor.",
      "Slowly lower your torso back to the starting position while keeping tension on the abs."
    ]
  },
  legs: {
    title: "Leg Press Machine",
    equipment: "Leg Press Machine",
    targetMuscle: "Quadriceps",
    secondaryMuscles: "Glutes, Hamstrings, Calves",
    video: "assets/legs_sample.mp4",
    poster: "assets/bodypart.webp",
    muscleImg: "assets/quadriceps.webp",
    instructions: [
      "Sit in the leg press machine with feet placed shoulder-width apart on the platform.",
      "Release the safety handles and lower the platform toward your chest by bending your knees.",
      "Pause at the bottom when your thighs are just above parallel to the platform.",
      "Press the platform forcefully away by extending your knees without locking out."
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

