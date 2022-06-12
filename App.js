class PianoApp
{
    constructor() {
        this.init();
    }

    init()
    {
        this.applyDelay();
        window.addEventListener("keydown", this.playNote);
    }

    playNote(e)
    {
        const key = document.querySelector(`.hints[data-key=${e.key.toUpperCase()}]`);
        if(!key) return;

        const noteFile = key.getAttribute("data-file");
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
}

document.addEventListener('DOMContentLoaded', new PianoApp());