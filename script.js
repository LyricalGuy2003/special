const backgroundMusic = document.getElementById('background-music');
        const initialGreetingPopup = document.getElementById('initial-greeting-popup');
        const birthdayMessagePopup = document.getElementById('birthday-message-popup');
        const openLetterBtn = document.getElementById('open-letter-btn');
        const teddyBear = document.getElementById('teddy-bear');
        const loveLetterContainer = document.getElementById('love-letter-container');
        const letterChatbox = document.getElementById('letter-chatbox');
        const messagesSection = document.querySelector('.messages-section');

        // Your beautiful love letter
        const fullLoveLetter = `Ami age bhabtam j chaand toh sudhu ekta gadda bhora gola — surjer alote alokito hoye bole ektu thik-thak lage dekhte.
        Kintu toke dekhar por bujhte perechi je chaand samne theke thik koto ta sundor hote pare… 😫

        Ami age thik jantam na je bhalobasha jinis ta asole kamon hoye. Tor sathe alap hoar por ami bhalobashar onek notun roop bujhte perechi.
        Ami emni ekjon kure-type manush, kintu tor jonno jani na keno mone hoye, ami sob kichu korte pari — sob kichu jano nije theke hoye jai.

        (Cinema-r dialogue gulo age amar kache bekar ebong unrealistic mone hoto… kintu akhon, segulor theke relatable kichu ar lage na 😁)

        Ami ghumale amar shopne tui asis, abar jege thakleo tor chhobi mathay ghore. Tor oi chokh gulo jeno amar shomoy ke thamiye daye — aar tor oi hashi… seta niye kichu bolar nei.
        Tor chokher dike takale mone hoye amar sara jibon sudhu oi chokh aar oi hashi dekhe katiye dite pari.

        Tor oi hashi ta, please, kokhono hariye felis na. Ami sobshomoy chai tui khushi thakis.
        Bhogoban jano toke prithibir shobcheye boro shukhgulo daye. Paglami ta sob somoy korte thakis — aar ami to achi-i, tor pashe… kach theke hok, ba dure thekei hok na keno.

        Enjoy your day, Madam!
        I love youuuu soooooo much ❤❤
        ~ Your Tubelight`;

        const paragraphs = fullLoveLetter.split('\n\n'); // Split the letter into paragraphs

        function deleteText(element, delay, callback) {
            let text = element.textContent;
            let i = text.length - 1;
            const interval = setInterval(() => {
                if (i >= 0) {
                    element.textContent = text.substring(0, i);
                    i--;
                } else {
                    clearInterval(interval);
                    if (callback) {
                        callback();
                    }
                }
            }, delay);
        }

        function typeText(element, text, delay, callback) {
            let i = 0;
            element.textContent = '';
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    if (callback) {
                        callback();
                    }
                }
            }, delay);
        }

        function showBirthdayMessage() {
            const initialGreetingTextElement = initialGreetingPopup.querySelector('h2');
            const birthdayMessageTextElement = birthdayMessagePopup.querySelector('h2');
            const birthdayMessageFullText = "Happy birthday to the most amazing partner a person could ask for! 🎉 Wishing you a day as wonderful as you are!!"; // Added "!!"

            // Show the teddy bear *first*
            teddyBear.style.display = 'block';

            // Delay the appearance of the first message
            setTimeout(() => {
                initialGreetingPopup.style.display = 'block';
                deleteText(initialGreetingTextElement, 80, () => { // Increased delay for disappearance
                    initialGreetingPopup.style.display = 'none';
                    birthdayMessagePopup.style.display = 'block';
                    typeText(birthdayMessageTextElement, birthdayMessageFullText, 80, () => { // Increased delay for appearance
                        deleteText(birthdayMessageTextElement, 80, () => { // Increased delay for disappearance
                            birthdayMessagePopup.style.display = 'none';
                            openLetterBtn.style.display = 'block'; // Make it visible *before* adding the class
                            setTimeout(() => {
                                openLetterBtn.classList.add('visible'); // Then add the class for the transition
                            }, 50); // Small delay to ensure display: block takes effect
                        });
                    });
                });
            }, 1000); // 1000ms (1 second) delay before the first text appears
        }

        // Function to show the "Open to smile" button (now handles display and class)
        function showOpenButton() {
            // No longer needed here as the logic is in showBirthdayMessage
        }

        // Function to handle the "Open to smile" button click
        openLetterBtn.addEventListener('click', () => {
            openLetterBtn.classList.remove('visible'); // Hide the button immediately
            setTimeout(() => {
                openLetterBtn.style.display = 'none'; // Then hide it completely
            }, 500); // Match the transition duration
            teddyBear.style.display = 'none';
            loveLetterContainer.style.display = 'block';
            displayParagraphs(paragraphs, 0); // Start displaying paragraphs
            messagesSection.style.display = 'block';
            playMusic();
        });

        // Modified function to display paragraphs one by one
        function displayParagraphs(paras, index) {
            if (index < paras.length) {
                const paragraph = document.createElement('p');
                paragraph.style.opacity = 0; // Initially hidden
                paragraph.style.transform = 'translateY(20px)';
                paragraph.textContent = paras[index];
                letterChatbox.appendChild(paragraph);

                // Fade in the paragraph
                setTimeout(() => {
                    paragraph.style.opacity = 1;
                    paragraph.style.transform = 'translateY(0);';
                }, 50);

                // Wait for a duration, then remove the paragraph and display the next
                const displayDuration = 8000; // Increased delay to 8 seconds
                const fadeOutDuration = 1500; // Increased fade out to 1.5 seconds

                setTimeout(() => {
                    paragraph.style.opacity = 0;
                    paragraph.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        paragraph.remove();
                        displayParagraphs(paras, index + 1); // Display the next paragraph
                    }, fadeOutDuration);
                }, displayDuration);
            }
        }

        function playMusic() {
            if (backgroundMusic) {
                backgroundMusic.play().catch(error => {
                    console.error("Autoplay prevented:", error);
                    // You might want to display a message to the user here,
                    // asking them to interact with the page to enable audio.
                });
            }
        }

        // Start the sequence
        showBirthdayMessage();
        window.addEventListener('load', playMusic);