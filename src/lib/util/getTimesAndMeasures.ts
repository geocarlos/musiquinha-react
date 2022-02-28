import { INote } from "../components/Note";

export const durationTable = {
    '0': 0,
    w: 1,
    h: 0.5,
    q: 0.25,
    "8": 0.125,
    "16": 0.0625,
    "32": 1/32,
    "64": 1/64,
    "128": 1/128
};

const getTimesAndMeasures = (notes: INote[], timeSignature: number[]) => {
    const startTime = {
        m: 0,
        q: 0, // q -> 1, h -> 2
        s: 0 // 16 -> 1, 8 -> 2
    };

    const measureDuration = timeSignature[0] / timeSignature[1];
    if (measureDuration !== 1) {
        durationTable.w = measureDuration;
    }    

    const result = notes.reduce(
        (acc, note, i) => {
            if (acc.count === measureDuration) {
                acc.count = 0;
                startTime.m += 1;
                startTime.q = 0;
                startTime.s = 0;
                acc.measures.push([])
            }

            const time = `${startTime.m}:${startTime.q}:${startTime.s}`;
            switch (note.duration) {
                case "q":
                    startTime.q += 1;
                    startTime.s += (note.dots || 0) * 2;
                    break;
                case "h":
                    startTime.q += 2;
                    startTime.q += note.dots || 0;
                    break;
                case "16":
                    startTime.s += 1;
                    break;
                case "8":
                    startTime.s += 2;
                    startTime.s += note.dots || 0;
                    break;
            }

            const toneDuration =
                1 / durationTable[note.duration] + (note.dots ? "n." : "n");
            acc.notes.push({
                ...note,
                toneDuration,
                time
            });
            if (note.dots) {
                acc.count +=
                durationTable[note.duration] + durationTable[note.duration] / 2;
            } else {
                acc.count += durationTable[note.duration];
            }
            acc.measures[startTime.m].push(note);
            return acc;
        },
        { count: 0, notes: [] as INote[], measures: [[]] as Array<INote[]> }
    );
    return {notesWithTimes: result.notes, measures: result.measures};
};

export default getTimesAndMeasures;
