/* =========================================================
   JAMIL PORTFOLIO
   Main JavaScript File
========================================================= */


/* =========================================================
   1. WAIT FOR THE HTML DOCUMENT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Jamil Portfolio loaded successfully.");



    /* =====================================================
       2. SELECT HTML ELEMENTS
    ===================================================== */

    const menuButton = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    const contactForm = document.querySelector(".contact-form");

    const heroHeading = document.querySelector(".hero h2");



    /* =====================================================
       3. MOBILE NAVIGATION MENU
    ===================================================== */

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            /*
                Change menu icon
            */

            if (navLinks.classList.contains("active")) {

                menuButton.textContent = "✕";

                menuButton.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });


        /*
            Close mobile menu when
            a navigation link is clicked
        */

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });

    }



    /* =====================================================
       4. TYPING ANIMATION
    ===================================================== */

    if (heroHeading) {

        const typingWords = [
            "Web Developer",
            "Frontend Developer",
            "UI Designer",
            "JavaScript Developer",
            "Computer Science Learner"
        ];

        let wordIndex = 0;
        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                typingWords[wordIndex];


            /*
                Add characters
            */

            if (!deleting) {

                characterIndex++;

            } else {

                characterIndex--;

            }


            heroHeading.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            /*
                Change typing direction
            */

            if (
                !deleting &&
                characterIndex === currentWord.length
            ) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }


            /*
                Move to next word
            */

            if (
                deleting &&
                characterIndex === 0
            ) {

                deleting = false;

                wordIndex++;

                if (
                    wordIndex === typingWords.length
                ) {

                    wordIndex = 0;

                }

            }


            const typingSpeed =
                deleting ? 60 : 100;


            setTimeout(
                typeEffect,
                typingSpeed
            );

        }


        /*
            Start typing animation
        */

        typeEffect();

    }



    /* =====================================================
       5. SMOOTH SCROLLING
    ===================================================== */

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allAnchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID =
                link.getAttribute("href");


            /*
                Ignore empty #
            */

            if (
                !targetID ||
                targetID === "#"
            ) {

                return;

            }


            const targetElement =
                document.querySelector(targetID);


            if (targetElement) {

                event.preventDefault();


                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });



    /* =====================================================
       6. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            const currentScroll =
                window.scrollY;


            if (
                currentScroll >= sectionTop &&
                currentScroll <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");


            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =====================================================
       7. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .skill-card, .project-card, .service-card, .certificate-card, .testimonial-card, .timeline-item"
        );


    /*
        Add reveal class
    */

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    /*
        Intersection Observer
    */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =====================================================
       8. CONTACT FORM VALIDATION
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                /*
                    Stop the browser from
                    refreshing the page
                */

                event.preventDefault();


                /*
                    Get form fields
                */

                const name =
                    document.querySelector("#name");

                const email =
                    document.querySelector("#email");

                const message =
                    document.querySelector("#message");


                /*
                    Remove old errors
                */

                clearFormErrors();


                let isValid = true;


                /* -----------------------------------------
                   NAME VALIDATION
                ----------------------------------------- */

                if (
                    !name.value.trim() ||
                    name.value.trim().length < 2
                ) {

                    showFieldError(
                        name,
                        "Please enter your name."
                    );

                    isValid = false;

                }


                /* -----------------------------------------
                   EMAIL VALIDATION
                ----------------------------------------- */

                if (!isValidEmail(email.value)) {

                    showFieldError(
                        email,
                        "Please enter a valid email address."
                    );

                    isValid = false;

                }


                /* -----------------------------------------
                   MESSAGE VALIDATION
                ----------------------------------------- */

                if (
                    !message.value.trim() ||
                    message.value.trim().length < 10
                ) {

                    showFieldError(
                        message,
                        "Message must contain at least 10 characters."
                    );

                    isValid = false;

                }


                /*
                    Stop if form is invalid
                */

                if (!isValid) {

                    showNotification(
                        "Please correct the highlighted fields.",
                        "error"
                    );

                    return;

                }


                /*
                    Form is valid
                */

                showNotification(
                    "Thank you! Your message is ready to send.",
                    "success"
                );


                /*
                    Clear form
                */

                contactForm.reset();

            }
        );

    }



    /* =====================================================
       9. EMAIL VALIDATION FUNCTION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return emailPattern.test(
            email.trim()
        );

    }



    /* =====================================================
       10. SHOW FIELD ERROR
    ===================================================== */

    function showFieldError(
        field,
        message
    ) {

        field.classList.add("input-error");


        const errorMessage =
            document.createElement("small");


        errorMessage.className =
            "field-error";


        errorMessage.textContent =
            message;


        field.parentElement.appendChild(
            errorMessage
        );

    }



    /* =====================================================
       11. CLEAR FORM ERRORS
    ===================================================== */

    function clearFormErrors() {

        const errorFields =
            document.querySelectorAll(
                ".input-error"
            );


        errorFields.forEach((field) => {

            field.classList.remove(
                "input-error"
            );

        });


        const errorMessages =
            document.querySelectorAll(
                ".field-error"
            );


        errorMessages.forEach((error) => {

            error.remove();

        });

    }



    /* =====================================================
       12. NOTIFICATION SYSTEM
    ===================================================== */

    function showNotification(
        message,
        type = "success"
    ) {

        /*
            Remove existing notification
        */

        const oldNotification =
            document.querySelector(
                ".notification"
            );


        if (oldNotification) {

            oldNotification.remove();

        }


        /*
            Create notification
        */

        const notification =
            document.createElement("div");


        notification.className =
            `notification ${type}`;


        notification.textContent =
            message;


        document.body.appendChild(
            notification
        );


        /*
            Show notification
        */

        setTimeout(() => {

            notification.classList.add(
                "show"
            );

        }, 10);


        /*
            Hide notification
        */

        setTimeout(() => {

            notification.classList.remove(
                "show"
            );


            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 3500);

    }



    /* =====================================================
       13. SCROLL TO TOP BUTTON
    ===================================================== */

    const scrollTopButton =
        document.createElement("button");


    scrollTopButton.className =
        "scroll-top";


    scrollTopButton.innerHTML =
        "↑";


    scrollTopButton.setAttribute(
        "aria-label",
        "Scroll to top"
    );


    document.body.appendChild(
        scrollTopButton
    );


    /*
        Show button after scrolling
    */

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add(
                    "show"
                );

            } else {

                scrollTopButton.classList.remove(
                    "show"
                );

            }

        }
    );


    /*
        Scroll to top
    */

    scrollTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       14. DYNAMIC COPYRIGHT YEAR
    ===================================================== */

    const footerCopyright =
        document.querySelector(
            ".footer-content > p"
        );


    if (footerCopyright) {

        const currentYear =
            new Date().getFullYear();


        footerCopyright.textContent =
            `© ${currentYear} Jamil. All Rights Reserved.`;

    }



    /* =====================================================
       15. PROJECT LINK PROTECTION
    ===================================================== */

    const projectLinks =
        document.querySelectorAll(
            ".project-links a"
        );


    projectLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        /*
            Prevent empty project links
            from jumping to the top
        */

        if (
            !href ||
            href === "#"
        ) {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    showNotification(
                        "Project link will be added soon.",
                        "error"
                    );

                }
            );

        }

    });



    /* =====================================================
       16. IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                /*
                    Prevent broken-image
                    appearance
                */

                image.style.opacity = "0.4";

                console.warn(
                    `Image could not be loaded: ${image.src}`
                );

            }
        );

    });



    /* =====================================================
       17. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
                Press Escape to close
                mobile navigation
            */

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                navLinks.classList.remove(
                    "active"
                );


                if (menuButton) {

                    menuButton.textContent =
                        "☰";

                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }

            }

        }
    );



    /* =====================================================
       18. PAGE LOADED
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "loaded"
            );

        }
    );

});
