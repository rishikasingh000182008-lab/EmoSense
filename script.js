document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       GLITTER EFFECT
       ================================ */

    const glitterContainer =
        document.getElementById("glitterContainer");

    if (glitterContainer) {

        const symbols = ["○", "◦", "°", "•", "·"];
        const particleCount = 55;

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("span");

            particle.className = "glitter-particle";

            particle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.fontSize =
                Math.random() * 12 + 6 + "px";

            particle.style.animationDuration =
                Math.random() * 5 + 5 + "s";

            particle.style.animationDelay =
                Math.random() * 6 + "s";

            glitterContainer.appendChild(particle);
        }
    }


    /* ================================
       NAVBAR SCROLL EFFECT
       ================================ */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();
    const tryDetectionBtn =
    document.querySelector(".try-detection-btn");

if (tryDetectionBtn) {

    tryDetectionBtn.addEventListener("click", event => {

        const target =
            document.querySelector("#detector");

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


    /* ================================
       SMOOTH NAVIGATION
       ================================ */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId ||
                !targetId.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* ================================
       ACTIVE NAVBAR SECTION
       ================================ */

    const sections =
        document.querySelectorAll("section");

    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 220;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                current =
                    section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
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


    /* ================================
       SCROLL REVEAL ANIMATION
       ================================ */

    const revealElements =
        document.querySelectorAll(
            ".workflow-card, .psychology-card, .about-content, .about-visual, .emotion-item, .detector-card, .section-heading"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        revealObserver.observe(element);
    });


    /* ================================
       HERO MOUSE PARALLAX
       ================================ */

    const hero =
        document.querySelector(".hero-container");

    if (hero) {

        hero.addEventListener("mousemove", event => {

            const rect =
                hero.getBoundingClientRect();

            const mouseX =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const mouseY =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            hero.style.transform =
                `perspective(1200px)
                 rotateY(${mouseX * 3}deg)
                 rotateX(${-mouseY * 3}deg)
                 translateY(-3px)`;
        });

        hero.addEventListener("mouseleave", () => {

            hero.style.transform =
                "perspective(1200px) rotateY(0deg) rotateX(0deg)";
        });
    }


    /* ================================
       BUTTON INTERACTION
       ================================ */

    const buttons =
        document.querySelectorAll(
            ".hero-btn, .hero-btn-outline, #start-btn, #capture-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";
        });
    });


    /* ================================
       CLICK SPARKLE
       ================================ */

    document.addEventListener("click", event => {

        const sparkle =
            document.createElement("span");

        sparkle.textContent = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            event.clientX + "px";

        sparkle.style.top =
            event.clientY + "px";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "9999";

        sparkle.style.fontSize = "18px";

        sparkle.style.color = "#FFFFFF";

        sparkle.style.textShadow =
            "0 0 12px rgba(247,168,196,0.9)";

        sparkle.style.transform =
            "translate(-50%, -50%) scale(0.5)";

        sparkle.style.transition =
            "all 0.7s ease";

        document.body.appendChild(sparkle);

        requestAnimationFrame(() => {

            sparkle.style.transform =
                "translate(-50%, -80px) scale(1.5)";

            sparkle.style.opacity = "0";
        });

        setTimeout(() => {

            sparkle.remove();

        }, 700);
    });


    /* ================================
       EMOTION DETECTION
       ================================ */

    const video =
        document.getElementById("webcam");

    const startBtn =
        document.getElementById("start-btn");

    const canvas =
        document.getElementById("snapshot-canvas");

    const emotionOutput =
        document.getElementById("emotion-output");

    const resultText =
        document.getElementById("result-text");

    const confidenceBar =
        document.getElementById("confidence-bar");

    const confidenceText =
        document.getElementById("confidence-text");

    const cameraPlaceholder =
        document.getElementById("camera-placeholder");

    const cameraScreen =
        document.querySelector(".camera-screen");

    const cameraStatus =
        document.querySelector(".camera-status");

    const captureBtn =
        document.getElementById("capture-btn");

    let streamActive = false;

    let processingInterval = null;


    /* ================================
       EMOTION DATA
       ================================ */
function generateEmotionData() {

    return {
        emotion: "NEUTRAL",
        confidence: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        surprised: 0,
        neutral: 0,
        fear: 0,
        disgust: 0
    };

}

    /* ================================
       UPDATE PROGRESS BAR
       ================================ */

    function updateBar(id, value) {

        const bar =
            document.getElementById(id);

        if (bar) {

            bar.style.width =
                Math.max(0, Math.min(100, value)) + "%";
        }
    }


    /* ================================
       UPDATE VALUE
       ================================ */

    function updateValue(id, value) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                Math.round(value) + "%";
        }
    }


   /* ================================
   UPDATE RESULTS
   ================================ */

function updateResults(data) {

    /* ================================
       GET SAFE EMOTION VALUES
    ================================ */

    const emotion =
        data.emotion || "UNKNOWN";

    const confidence =
        Number(data.confidence) || 0;

    const happy =
        Number(data.happy) || 0;

    const sad =
        Number(data.sad) || 0;

    const angry =
        Number(data.angry) || 0;

    const surprised =
        Number(data.surprised) || 0;

    const neutral =
        Number(data.neutral) || 0;

    const fear =
        Number(data.fear) || 0;

    const disgust =
        Number(data.disgust) || 0;


    /* ================================
       PRIMARY EMOTION
    ================================ */

    if (emotionOutput) {

        emotionOutput.textContent =
            emotion;
    }


    /* ================================
       CONFIDENCE
    ================================ */

    if (confidenceBar) {

        confidenceBar.style.width =
            confidence + "%";
    }

    if (confidenceText) {

        confidenceText.textContent =
            `Confidence: ${Math.round(confidence)}%`;
    }


    /* ================================
       EMOTION PROGRESS BARS
    ================================ */

    updateBar("bar-happy", happy);
    updateBar("bar-sad", sad);
    updateBar("bar-angry", angry);
    updateBar("bar-surprised", surprised);
    updateBar("bar-neutral", neutral);
    updateBar("bar-fear", fear);
    updateBar("bar-disgust", disgust);


    /* ================================
       EMOTION PERCENTAGES
    ================================ */

    updateValue("val-happy", happy);
    updateValue("val-sad", sad);
    updateValue("val-angry", angry);
    updateValue("val-surprised", surprised);
    updateValue("val-neutral", neutral);
    updateValue("val-fear", fear);
    updateValue("val-disgust", disgust);


    /* ================================
       AI MESSAGE
    ================================ */

    if (resultText) {

        const messages = {

            HAPPY:
                "The AI detected a positive and cheerful expression.",

            SAD:
                "The AI detected a sad facial expression.",

            NEUTRAL:
                "The AI detected a calm or neutral expression.",

            SURPRISED:
                "The AI detected a surprised facial expression.",

            ANGRY:
                "The AI detected an angry facial expression.",

            FEAR:
                "The AI detected a fearful facial expression.",

            DISGUST:
                "The AI detected a disgusted facial expression."
        };

        resultText.textContent =
            messages[emotion] ||
            "Emotion analysis completed.";
    }
}


/* ================================
   RESET RESULTS
   ================================ */

function resetResults() {

    if (emotionOutput)
        emotionOutput.textContent = "IDLE";


    if (confidenceBar)
        confidenceBar.style.width = "0%";


    if (confidenceText)
        confidenceText.textContent =
            "Confidence: 0%";


    if (resultText)
        resultText.textContent =
            "Start the camera to begin emotion analysis.";


    /* Reset all 7 emotions */

    [
        "happy",
        "sad",
        "neutral",
        "surprised",
        "angry",
        "fear",
        "disgust"

    ].forEach(emotion => {

        updateBar(
            "bar-" + emotion,
            0
        );

        updateValue(
            "val-" + emotion,
            0
        );
    });
}

    /* ================================
       START WEBCAM
       ================================ */

    async function startWebcam() {

        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {

            alert(
                "Camera access is not supported in this browser."
            );

            return;
        }

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: {
                            ideal: 640
                        },
                        height: {
                            ideal: 480
                        },
                        facingMode: "user"
                    },
                    audio: false
                });

            if (!video) return;

            video.srcObject = stream;

            await video.play();

            streamActive = true;

            if (cameraPlaceholder) {
                cameraPlaceholder.style.display =
                    "none";
            }

            video.style.display = "block";

            if (cameraScreen) {
                cameraScreen.classList.add("active");
            }

            if (cameraStatus) {
                cameraStatus.textContent =
                    "Camera active • AI analyzing";
            }

            if (startBtn) {

                startBtn.innerHTML =
                    '<i class="fa-solid fa-power-off"></i> Stop Camera';
            }

            if (emotionOutput) {

                emotionOutput.textContent =
                    "ANALYZING...";
            }

            if (resultText) {

                resultText.textContent =
                    "Camera connected. AI emotion analysis is running...";
            }

            startProcessing();

        } catch (error) {

            console.error(
                "Camera error:",
                error
            );

            if (error.name === "NotAllowedError") {

                alert(
                    "Camera permission was denied. Please allow camera access and try again."
                );

            } else if (error.name === "NotFoundError") {

                alert(
                    "No camera was found on this device."
                );

            } else {

                alert(
                    "Unable to access your camera. Please check your browser permissions."
                );
            }
        }
    }


    /* ================================
       STOP WEBCAM
       ================================ */

    function stopWebcam() {

        if (video &&
            video.srcObject) {

            video.srcObject
                .getTracks()
                .forEach(track => {
                    track.stop();
                });

            video.srcObject = null;
        }

        streamActive = false;

        if (processingInterval) {

            clearInterval(
                processingInterval
            );

            processingInterval = null;
        }

        if (video) {
            video.style.display = "none";
        }

        if (cameraPlaceholder) {
            cameraPlaceholder.style.display =
                "flex";
        }

        if (cameraScreen) {
            cameraScreen.classList.remove("active");
        }

        if (cameraStatus) {
            cameraStatus.textContent =
                "Camera is off";
        }

        if (startBtn) {

            startBtn.innerHTML =
                '<i class="fa-solid fa-power-off"></i> Start Camera';
        }

        resetResults();
    }
    const stopBtn = document.getElementById("stop-btn");

if (stopBtn && startBtn) {

    stopBtn.addEventListener("click", function () {
        startBtn.click();
    });

    startBtn.addEventListener("click", function () {
        setTimeout(function () {

            const isCameraOn =
                startBtn.textContent
                    .toLowerCase()
                    .includes("stop");

            stopBtn.style.display =
                isCameraOn ? "block" : "none";

        }, 300);
    });
}


    /* ================================
   PROCESSING LOOP
   ================================ */

function startProcessing() {

    if (processingInterval) {

        clearInterval(
            processingInterval
        );
    }

    processingInterval =
        setInterval(() => {

            if (!streamActive) return;

            if (
                canvas &&
                video &&
                video.readyState >= 2
            ) {

                const context =
                    canvas.getContext("2d");

                canvas.width =
                    video.videoWidth || 640;

                canvas.height =
                    video.videoHeight || 480;

                context.save();

                context.scale(-1, 1);

                context.drawImage(
                    video,
                    -canvas.width,
                    0,
                    canvas.width,
                    canvas.height
                );

                context.restore();
            }



        }, 1800);
}

    /* ================================
       CAMERA BUTTON
       ================================ */

    if (startBtn) {

        startBtn.addEventListener(
            "click",
            () => {

                if (!streamActive) {

                    startWebcam();

                } else {

                    stopWebcam();
                }
            }
        );
    }


  /* ================================
   CAPTURE + EMOTION ANALYSIS
   ================================ */

if (captureBtn) {

    captureBtn.addEventListener(
        "click",
        () => {

            if (
                !streamActive ||
                !video ||
                video.readyState < 2
            ) {

                alert(
                    "Please start the camera first."
                );

                return;
            }

            if (!canvas) return;

            const context =
                canvas.getContext("2d");

            canvas.width =
                video.videoWidth || 640;

            canvas.height =
                video.videoHeight || 480;


            /* CAPTURE CURRENT CAMERA FRAME */

            context.save();

            context.scale(-1, 1);

            context.drawImage(
                video,
                -canvas.width,
                0,
                canvas.width,
                canvas.height
            );

            context.restore();


            /* STOP CURRENT ANALYSIS */

            if (processingInterval) {

                clearInterval(
                    processingInterval
                );

                processingInterval = null;
            }


            /* START RAINBOW SCAN */

            if (cameraScreen) {

                cameraScreen.classList.add(
                    "scanning"
                );

                let scanMessage =
                    cameraScreen.querySelector(
                        ".emotion-scanning-message"
                    );

                if (!scanMessage) {

                    scanMessage =
                        document.createElement("div");

                    scanMessage.className =
                        "emotion-scanning-message";

                    scanMessage.innerHTML =
                        '<span>✦ Finding emotions...</span>';

                    cameraScreen.appendChild(
                        scanMessage
                    );
                }
            }


            /* SHOW ANALYZING */

            if (emotionOutput) {

                emotionOutput.textContent =
                    "ANALYZING...";
            }

            if (confidenceText) {

                confidenceText.textContent =
                    "Finding emotions...";
            }

            if (resultText) {

                resultText.textContent =
                    "AI is analyzing your facial expression...";
            }


            /* =================================
               SEND CAPTURED IMAGE TO PYTHON
               ================================= */

            canvas.toBlob(
                (blob) => {

                    if (!blob) {

                        console.error(
                            "Could not create image."
                        );

                        return;
                    }


                    const formData =
                        new FormData();

                    formData.append(
                        "image",
                        blob,
                        "capture.jpg"
                    );


                    fetch(
                        "/analyze",
                        {
                            method: "POST",
                            body: formData
                        }
                    )

                    .then(
                        response => response.json()
                    )

                    .then(
                        data => {

                            console.log(
                                "DeepFace response:",
                                data
                            );


                            if (!data.success) {

                                throw new Error(
                                    data.message ||
                                    "Emotion analysis failed."
                                );
                            }


                            /* =================================
                               CREATE RESULT FOR EXISTING UI
                               ================================= */

                          const emotionData = {

    emotion:
        data.emotion,

    confidence:
        data.confidence,

    happy:
        data.happy,

    sad:
        data.sad,

    angry:
        data.angry,

    surprised:
        data.surprised,

    neutral:
        data.neutral,

    fear:
        data.fear,

    disgust:
        data.disgust
};


                            /* UPDATE EXISTING UI */

                            updateResults(
                                emotionData
                            );


                            /* STOP RAINBOW SCAN */

                            if (cameraScreen) {

                                cameraScreen.classList.remove(
                                    "scanning"
                                );
                            }


                            /* RESULT ANIMATION */

                            const resultsPanel =
                                document.querySelector(
                                    ".results-panel"
                                );

                            if (resultsPanel) {

                                resultsPanel.classList.remove(
                                    "result-opening"
                                );

                                void resultsPanel.offsetWidth;

                                resultsPanel.classList.add(
                                    "result-opening"
                                );
                            }


                            if (resultText) {

                                resultText.textContent =
                                    "Emotion detected successfully from the captured frame.";
                            }


                            /* ALLOW ANALYSIS AGAIN */

                            setTimeout(
                                () => {

                                    if (streamActive) {

                                        startProcessing();

                                    }

                                },
                                1200
                            );

                        }
                    )

                    .catch(
                        error => {

                            console.error(
                                "DeepFace error:",
                                error
                            );


                            /* STOP SCAN */

                            if (cameraScreen) {

                                cameraScreen.classList.remove(
                                    "scanning"
                                );
                            }


                            /* SHOW ERROR */

                            if (emotionOutput) {

                                emotionOutput.textContent =
                                    "ERROR";
                            }

                            if (confidenceText) {

                                confidenceText.textContent =
                                    "Analysis failed";
                            }

                            if (resultText) {

                                resultText.textContent =
                                    "Unable to analyze the captured image.";
                            }

                        }
                    );

                },
                "image/jpeg",
                0.9
            );

        }
    );
}

    /* ================================
       INITIAL STATE
       ================================ */

    resetResults();

    if (video) {
        video.style.display = "none";
    }

    if (cameraPlaceholder) {
        cameraPlaceholder.style.display = "flex";
    }


    /* ================================
       CLEAN CAMERA ON EXIT
       ================================ */

    window.addEventListener(
        "beforeunload",
        () => {

            if (
                video &&
                video.srcObject
            ) {

                video.srcObject
                    .getTracks()
                    .forEach(track => {
                        track.stop();
                    });
            }
        }
    );

});