import { PolySynth, Transport, Part, Time, start, Sampler } from "tone";
import { INote, noteStyleClasses } from "../../";

window.onclick = () => start();

export type INotePlayer = PolySynth | Sampler;

let part: Part | null = null;

export type IPlayer = {
    bpm: number;
    timeSignature: number[];
    notes: INote[];
    instrument?: string; 
}

export const playNotes = ({ bpm, timeSignature, notes, instrument }: IPlayer) => {
    const playSound = () => {
        if (Transport.state !== "started") {
            Transport.start();
        } else {
            Transport.stop();
        }
    };

    const load = (instrument = 'synth') => {

        if (part) {
            part.dispose();
            part = null;
        }

        const player: INotePlayer = ((instrument: string) => {
            if (instrument === 'synth') {
                return new PolySynth();
            }
            return new Sampler();
        })(instrument);

        player.toDestination();

        Transport.stop();

        Transport.bpm.value = bpm;

        Transport.timeSignature = timeSignature;

        part = new Part(function (time, note: INote) {
            if (!note.keys[0].startsWith('R')) {
                const noteElement = document.getElementById(note.id || '');
                if (noteElement) {
                    noteElement.classList.add(noteStyleClasses.isPlaying);
                    setTimeout(() => {
                        noteElement.classList.remove(noteStyleClasses.isPlaying);
                    }, Time(note.toneDuration!).toMilliseconds())
                }
                player.triggerAttackRelease(note.keys, note.toneDuration!, time);
                
            }
        }, notes);

        part.loop = false;
        part.loopEnd = notes[notes.length - 1].time || 0;
        part.start(1);

        playSound();
    };

    load(instrument);
};
