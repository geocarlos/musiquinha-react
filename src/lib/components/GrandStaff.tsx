import { useEffect, useState } from "react";
import getTimesAndMeasures from "../util/getTimesAndMeasures";
import MultilineMeasure from "./MultilineMeasure";
import { INote } from "./Note";
import { IStave } from "./Stave";
import classes from "./GrandStaff.module.scss";
import { playNotes } from "../audio-features/NotePlayer";

export type IGradStaff = IStave & {
    noteLines: INote[][]
};

const GradStaff = (props: IGradStaff) => {
    const { noteLines, timeSignature, measuresPerLine = 4, showPlayButton = true } = props;
    const [measures, setMeasures] = useState<Array<INote[][]>>([]);
    const [toneNotes, setToneNotes] = useState<INote[]>([]);

    useEffect(() => {
        if (noteLines) {
            const _measures: INote[][][] = [];
            const _toneNotes: INote[] = [];
            noteLines.forEach((notes) => {
                const notesWithIds = notes.map((note, index) => ({...note, id: `_GrandStaff_${note.clef}_${note.keys.join('_')}_${index}`}));
                const { measures, notesWithTimes } = getTimesAndMeasures(notesWithIds, props.timeSignature);
                _measures.push(measures);
                _toneNotes.push(...notesWithTimes);
            })

            const transformedMeasures = [];

            for (let i = 0; i < _measures[0].length; i++) {
                for (let j = 0; j < _measures.length; j++) {
                    if (transformedMeasures[i]) {
                        transformedMeasures[i].push(_measures[j][i]);
                    } else {
                        transformedMeasures[i] = [_measures[j][i]];
                    }
                }
            }

            setMeasures(transformedMeasures)
            setToneNotes(_toneNotes);
        }
    }, [noteLines, timeSignature]);

    return (
        <div
            className={classes.grandStaff}
            style={{
                gridTemplateColumns: `repeat(${measuresPerLine}, min-content)`
            }}
        >
            <MultilineMeasure
                measureLines={measures}
                timeSignature={timeSignature}
                measuresPerLine={measuresPerLine}
            />
            {showPlayButton && <div style={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'absolute',
                right: 10
            }}>
                <button disabled={toneNotes.length === 0} onClick={() => {
                    playNotes({ notes: toneNotes, bpm: props.bpm || 100, timeSignature });
                }}>Play</button>
            </div>}
        </div>
    );
}

export default GradStaff;