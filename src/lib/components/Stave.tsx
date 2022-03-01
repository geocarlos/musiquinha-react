import React, { Children, Fragment, ReactNode, useEffect, useState } from 'react';
import getTimesAndMeasures from '../util/getTimesAndMeasures';
import Measure from './Measure';
import Note, { INote } from './Note';
import { playNotes } from '../audio-features/NotePlayer';
import classes from './Stave.module.scss';

export const clefs: any = {
    treble: <>&#x1D11E;</>,
    bass: <div style={{ marginTop: '-2px' }}>&#x1D122;</div>
}

export type Clef = 'treble' | 'bass';

export type IStave = {
    clef?: Clef;
    timeSignature: number[];
    bpm?: number;
    keySignature?: string;
    children?: ReactNode | ReactNode[];
    notes?: INote[];
    measuresPerLine?: number;
    showPlayButton?: boolean;
}

export const getStaveLines = (length?: number) => {
    if (length) {
        return [...new Array(length)].map((e, i) => <Fragment key={'__stave_lines_' + i}>&#x1D11A;</Fragment>);
    }
    return null;
}

export const getTimeSignature = (signature: number[]) => {
    return (
        <div style={{ display: 'grid', width: 'fit-content', fontWeight: 'bold', lineHeight: .8 }}>
            <sup>{signature[0]}</sup><sub>{signature[1]}</sub>
        </div>
    )
}

export const renderNotes = (notes: INote[]) => {
    return notes.map((note, i) => (
        <Note key={`${note.keys.join('_')}_${i}`} {...note} />
    ));
}

const Stave = (props: IStave) => {

    const { notes, timeSignature, bpm = 100, measuresPerLine = 4, showPlayButton = notes !== undefined, children } = props;
    const [measures, setMeasures] = useState<Array<INote[]>>([]);
    const [toneNotes, setToneNotes] = useState<INote[]>([]);

    useEffect(() => {
        if (notes) {
            const notesWithIds = notes.map((note, index) => ({...note, id: `_${note.clef}_${note.keys.join('_')}_${index}`}));
            const { measures, notesWithTimes } = getTimesAndMeasures(notesWithIds, props.timeSignature);
            setMeasures(measures);
            setToneNotes(notesWithTimes);
        }
    }, [notes, timeSignature]);

    return (
        <div
            className={classes.stave}
            style={{
                gridTemplateColumns: `repeat(${measuresPerLine}, min-content)`
            }}
        >
            {children ?
                <Measure
                    clef={clefs[props.clef || 'treble']}
                    staveLines={getStaveLines(Children.count(children))}
                    ticks={children}
                    timeSignature={getTimeSignature(timeSignature)}
                    isFirst={true}
                    isLineBeginning={true}
                    isLast={true}
                /> :
                measures.map((measureNotes, index) => (
                    <Measure
                        key={`__measure__${index}`}
                        clef={clefs[measureNotes[0].clef]}
                        staveLines={getStaveLines(timeSignature[1])}
                        ticks={renderNotes(measureNotes)}
                        timeSignature={getTimeSignature(timeSignature)}
                        isFirst={index === 0}
                        isLineBeginning={index % measuresPerLine === 0}
                        isLast={index === measures.length - 1}
                    />
                ))}
            {showPlayButton && <div style={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'absolute',
                right: 10
            }}>
                <button disabled={toneNotes.length === 0} onClick={() => {
                    playNotes({ notes: toneNotes, bpm, timeSignature });
                }}>Play</button>
            </div>}
        </div>
    );
}

export default Stave;