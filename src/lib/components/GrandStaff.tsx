import React, { useEffect, useState } from "react";
import getTimesAndMeasures from "../util/getTimesAndMeasures";
import MultilineMeasure from "./MultilineMeasure";
import { INote } from "./Note";
import { IStave } from "./Stave";
import classes from "./GrandStaff.module.scss";

export type IGradStaff = IStave & {
    noteLines: INote[][];
};

const GradStaff = (props: IGradStaff) => {
    const { noteLines, timeSignature } = props;
    const [measures, setMeasures] = useState<Array<INote[][]>>([]);
    const [toneNotes, setToneNotes] = useState<INote[]>([]);

    useEffect(() => {
        if (noteLines) {
            const _measures: INote[][][] = [];
            const _toneNotes: INote[] = [];
            noteLines.forEach((notes) => {
                const notesWithIds = notes.map((note, index) => ({ ...note, id: `_GrandStaff_${note.clef}_${note.keys.join('_')}_${index}` }));
                const { measures, notesWithTimes } = getTimesAndMeasures(notesWithIds, timeSignature);
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

    const { toneNotesHandler } = props;
    useEffect(() => {
        if (toneNotes.length && toneNotesHandler) {
            toneNotesHandler(toneNotes);
        }
    }, [toneNotes, toneNotesHandler])

    // Prevent invalid value for measuresPerLine
    const measuresPerLine = props.measuresPerLine > 0 ? props.measuresPerLine : 1;

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
        </div>
    );
}

export default GradStaff;