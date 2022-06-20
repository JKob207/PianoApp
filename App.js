class PianoApp
{
    constructor() {
        this.init();
        this.tutor = false;
    }

    init()
    {
        this.applyDelay();
        window.addEventListener("keydown", this.playNote);
        document.querySelector(".slider").addEventListener("click", this.songTutor);
    }

    playNote(e)
    {
        const key = document.querySelector(`.hints[data-key=${e.key.toUpperCase()}]`);
        const noteText = document.querySelector(".note");
        
        if(!key) return;

        const noteFile = key.getAttribute("data-file");
        noteText.innerText = key.getAttribute("data-note");
        const audio = new Audio(`./notes/${noteFile}.wav`);
        audio.play();
    }

    applyDelay()
    {
        const hints = document.querySelectorAll(".hints");

        for(let i=0;i<hints.length;i++)
        {
            this.hintsDelay(hints[i], i);
        }
    }

    hintsDelay(e, index)
    {
        e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
    }

    songTutor()
    {
        const HappyBirtdayNotesKeys = ['G','G','H','G','K','J','G','G','H','G','V','K','G','G','H','D','K','J','H','F','F','D','K','V','K'];
        const HappyBirtdayNotes = document.querySelectorAll(".tutor-note");
        const HappyBirtdayDataFile = ['08','08','10','08','13','12','08','08','10','08','15','13','08','08','10','05','13','12','10','06','06','05','13','15','13'];
        let currentNote = 0;

        const checkNote = (e) => {
            if(this.tutor)
            {
                const pressedKey = e.key.toUpperCase();
                if(pressedKey == HappyBirtdayNotesKeys[currentNote])
                {
                    console.log("OK");
                    HappyBirtdayNotes[currentNote].classList.add("successNote");
                    let currentkeyOnPiano = document.querySelector('div[data-file="'+HappyBirtdayDataFile[currentNote]+'"]').parentNode;
                    let nextkeyOnPiano = document.querySelector('div[data-file="'+HappyBirtdayDataFile[currentNote+1]+'"]').parentNode;
                    currentkeyOnPiano.classList.remove("nextKey");
                    nextkeyOnPiano.classList.add("nextKey");
                    currentNote++;
                }else
                {
                    console.log("WRONG!");
                    HappyBirtdayNotes.forEach(el => {
                        el.classList.remove("successNote");
                    })
                    let currentkeyOnPiano = document.querySelector('div[data-file="'+HappyBirtdayDataFile[currentNote]+'"]').parentNode;
                    currentkeyOnPiano.classList.remove("nextKey");
                    document.querySelector('div[data-file="'+HappyBirtdayDataFile[0]+'"]').parentNode.classList.add("nextKey");
                    currentNote = 0;
                }   
            }
        }

        this.tutor = !this.tutor;
        
        if(this.tutor == true)
        {
            console.log("Good");
            console.log("Play a song!");
            document.querySelector('div[data-file="'+HappyBirtdayDataFile[0]+'"]').parentNode.classList.add("nextKey");
            window.addEventListener("keydown", checkNote);
        }else
        {
            console.log("Also good");
            console.log(this.tutor);
            window.removeEventListener("keydown", checkNote);
            HappyBirtdayNotes.forEach(el => {
                el.classList.remove("successNote");
            })
            document.querySelectorAll(".key").forEach(el => {
                el.classList.remove("nextKey");
            })
            currentNote = 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', new PianoApp());