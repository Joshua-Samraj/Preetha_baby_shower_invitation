document.addEventListener("DOMContentLoaded", function () {
    // 🔁 Removed audio setup and initAudio

    // Enhanced Slider Functionality
    function initializeSliders() {
        const sliders = document.querySelectorAll(".slider");

        if (sliders.length === 0) {
            console.log("No sliders found");
            return;
        }

        sliders.forEach((slider) => {
            let slideIndex = 0;
            const slidesContainer = slider.querySelector(".slides");
            const slides = slider.querySelectorAll(".slide");
            const totalSlides = slides.length;
            let autoSlideInterval;
            let isSwiping = false;
            let startX = 0;
            let endX = 0;
            let touchStartTime = 0;

            if (!slidesContainer || slides.length === 0) {
                console.log("Slider elements missing", slider);
                return;
            }

            function updateSlidePosition() {
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
                slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
            }

            function nextSlide() {
                slideIndex = (slideIndex + 1) % totalSlides;
                updateSlidePosition();
            }

            function prevSlide() {
                slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
                updateSlidePosition();
            }

            function startAutoSlide() {
                if (autoSlideInterval) clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(nextSlide, 5000);
            }

            function stopAutoSlide() {
                if (autoSlideInterval) clearInterval(autoSlideInterval);
            }

            // Initialize slider
            startAutoSlide();

            // Pause on hover
            slider.addEventListener("mouseenter", stopAutoSlide);
            slider.addEventListener("mouseleave", startAutoSlide);

            // Navigation buttons
            const nextBtn = slider.querySelector(".next");
            const prevBtn = slider.querySelector(".prev");

            if (nextBtn) {
                nextBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    stopAutoSlide();
                    nextSlide();
                    startAutoSlide();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    stopAutoSlide();
                    prevSlide();
                    startAutoSlide();
                });
            }

            // Touch events for mobile
            slider.addEventListener("touchstart", (e) => {
                if (e.touches.length > 1) return;
                startX = e.touches[0].clientX;
                touchStartTime = Date.now();
                isSwiping = true;
                stopAutoSlide();
            }, { passive: true });

            slider.addEventListener("touchmove", (e) => {
                if (!isSwiping) return;
                endX = e.touches[0].clientX;
            }, { passive: true });

            slider.addEventListener("touchend", () => {
                if (!isSwiping) return;
                isSwiping = false;

                const swipeDistance = startX - endX;
                const swipeTime = Date.now() - touchStartTime;

                if (Math.abs(swipeDistance) > 50 || swipeTime < 300) {
                    if (swipeDistance > 50) {
                        nextSlide();
                    } else if (swipeDistance < -50) {
                        prevSlide();
                    }
                }

                startAutoSlide();
            }, { passive: true });
        });
    }

    // Modal Handling with improved accessibility
    function setupModal(openBtnId, modalId, closeBtnId) {
        const openBtn = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);

        if (!openBtn || !modal || !closeBtn) {
            console.log(`Missing element(s) for modal: ${modalId}`);
            return;
        }

        function openModal() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            modal.setAttribute('aria-hidden', 'false');
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "";
            modal.setAttribute('aria-hidden', 'true');
        }

        openBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
        });

        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            closeModal();
        });

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && modal.style.display === "block") {
                closeModal();
            }
        });

        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    }

    // Copy Phone Number with better feedback
    function setupCopyFunctionality() {
        const copyPhoneBtn = document.getElementById("copyPhone");
        const phoneNumber = document.getElementById("phoneNumber");
        const copySuccessMsg = document.getElementById("copySuccess");

        if (!copyPhoneBtn || !phoneNumber) return;

        copyPhoneBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const textToCopy = phoneNumber.textContent.trim();

            navigator.clipboard.writeText(textToCopy).then(() => {
                if (copySuccessMsg) {
                    copySuccessMsg.style.display = "inline";
                    setTimeout(() => {
                        copySuccessMsg.style.display = "none";
                    }, 2000);
                }

                copyPhoneBtn.textContent = "Copied!";
                setTimeout(() => {
                    copyPhoneBtn.textContent = "Copy";
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    if (copySuccessMsg) {
                        copySuccessMsg.style.display = "inline";
                        setTimeout(() => {
                            copySuccessMsg.style.display = "none";
                        }, 2000);
                    }
                } catch (err) {
                    console.error("Fallback copy failed: ", err);
                }
                document.body.removeChild(textArea);
            });
        });
    }

    // Initialize all components
    function init() {
        initializeSliders();

        setupModal("openModal", "modal", "closeModal");
        setupModal("openMap", "mapModal", "closeMap");
        setupModal("openDonate", "donationModal", "closeDonate");
        setupModal("openContact", "contactModal", "closeContact");

        setupCopyFunctionality();

        // 🔁 Removed initAudioOnInteraction click listener
    }

    init();
});
