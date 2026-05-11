const page = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === page || (page === "doctor-detail.html" && href === "doctors.html")) {
    link.classList.add("active");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

document.querySelectorAll("[data-appointment-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector("[data-form-message]");
    if (message) {
      message.textContent = "Thank you. Our clinic team will contact you shortly.";
      message.classList.remove("d-none");
    }
    form.reset();
  });
});

document.querySelectorAll("[data-video-card]").forEach((card) => {
  const video = card.querySelector("video");
  const playButton = card.querySelector(".video-play");

  if (!video || !playButton) return;

  playButton.addEventListener("click", () => {
    card.classList.add("playing");
    video.setAttribute("controls", "controls");
    video.play();
  });

  video.addEventListener("ended", () => {
    card.classList.remove("playing");
    video.removeAttribute("controls");
  });
});
