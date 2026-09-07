const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

/*
  ============================================================
  GALLERY — CHỈNH Ở ĐÂY KHI MUỐN THÊM TRANH / ẢNH
  ============================================================

  Ví dụ một tác phẩm:
  {
    image: "gallery/paintings/tranh-cua-ban.jpg",
    category: "paintings",
    title: "Mùa hạ",
    author: "Nguyễn A",
    description: "Acrylic / 2026"
  }

  Sau khi thêm ảnh vào GitHub, chỉ cần thêm object vào mảng bên dưới.
*/
const artworks = [
  // BỎ DẤU // Ở 3 DÒNG DƯỚI KHI CẬU CÓ ẢNH THẬT:
  // { image: "gallery/paintings/tranh-01.jpg", category: "paintings", title: "Tên tác phẩm", author: "Tên bạn", description: "Hội họa • 2026" },
];

const galleryGrid = document.getElementById("galleryGrid");

function renderGallery(items) {
  const placeholders = galleryGrid.querySelectorAll(".placeholder-card");
  placeholders.forEach(el => el.remove());

  if (!items.length) {
    galleryGrid.innerHTML = `
      <article class="gallery-card placeholder-card" data-category="paintings">
        <div class="placeholder-art">YOUR<br>ART<br>HERE</div>
        <div class="gallery-info"><h3>Chưa có tác phẩm</h3><p>Thêm ảnh trong mảng "artworks" của script.js.</p></div>
      </article>
      <article class="gallery-card placeholder-card" data-category="digital-art">
        <div class="placeholder-art alt">CREATE<br>SOMETHING</div>
        <div class="gallery-info"><h3>Digital Art</h3><p>Thêm tác phẩm của thành viên.</p></div>
      </article>
    `;
    return;
  }

  galleryGrid.innerHTML = items.map((art, index) => `
    <article class="gallery-card" data-category="${art.category}" data-index="${index}">
      <img src="${art.image}" alt="${art.title}" loading="lazy">
      <div class="gallery-info">
        <h3>${art.title}</h3>
        <p>${art.author} • ${art.description}</p>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".gallery-card:not(.placeholder-card)").forEach(card => {
    card.addEventListener("click", () => {
      const art = items[Number(card.dataset.index)];
      openLightbox(art.image, `${art.title} — ${art.author}`);
    });
  });
}

renderGallery(artworks);

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".gallery-card").forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("no-scroll");
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});
