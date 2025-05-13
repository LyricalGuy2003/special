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
    const birthdayMessageFullText = "Happy birthday to the most amazing partner a person could ask for! 🎉 Wishing you a day as wonderful as you are!!";

    teddyBear.style.display = 'block';

    setTimeout(() => {
        initialGreetingPopup.style.display = 'block';
        deleteText(initialGreetingTextElement, 80, () => {
            initialGreetingPopup.style.display = 'none';
            birthdayMessagePopup.style.display = 'block';
            typeText(birthdayMessageTextElement, birthdayMessageFullText, 80, () => {
                deleteText(birthdayMessageTextElement, 80, () => {
                    birthdayMessagePopup.style.display = 'none';
                    openLetterBtn.style.display = 'block';
                    setTimeout(() => {
                        openLetterBtn.classList.add('visible');
                    }, 50);
                });
            });
        });
    }, 1000);
}

openLetterBtn.addEventListener('click', () => {
    openLetterBtn.classList.remove('visible');
    setTimeout(() => {
        openLetterBtn.style.display = 'none';
    }, 500);
    teddyBear.style.display = 'none';
    loveLetterContainer.style.display = 'block';
    displayParagraphs(paragraphs, 0);
    playMusic();
});

function displayParagraphs(paras, index) {
    if (index < paras.length) {
        const paragraph = document.createElement('p');
        paragraph.style.opacity = 0;
        paragraph.style.transform = 'translateY(20px)';
        paragraph.textContent = paras[index];
        letterChatbox.appendChild(paragraph);

        setTimeout(() => {
            paragraph.style.opacity = 1;
            paragraph.style.transform = 'translateY(0)';
        }, 50);

        const displayDuration = 8000;
        const fadeOutDuration = 1500;

        setTimeout(() => {
            paragraph.style.opacity = 0;
            paragraph.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                paragraph.remove();
                displayParagraphs(paras, index + 1);
            }, fadeOutDuration);
        }, displayDuration);
    } else {
        // Fade out letter container, then show PS section
        setTimeout(() => {
            loveLetterContainer.style.opacity = 1;
            loveLetterContainer.style.transition = 'opacity 1s';
            loveLetterContainer.style.opacity = 0;

            setTimeout(() => {
                loveLetterContainer.style.display = 'none';

                messagesSection.style.display = 'block';
                messagesSection.style.opacity = 0;
                messagesSection.style.transition = 'opacity 1s';
                setTimeout(() => {
                    messagesSection.style.opacity = 1;
                }, 50);
            }, 1000);
        }, 500);
    }
}

function playMusic() {
    if (backgroundMusic) {
        backgroundMusic.play().catch(error => {
            console.error("Autoplay prevented:", error);
        });
    }
}

showBirthdayMessage();
window.addEventListener('load', playMusic);
