import { Fragment } from 'react';
import Measure from './Measure';
import classes from './MultilineMeasure.module.scss';
import { INote } from './Note';
import { clefs, getStaveLines, getTimeSignature, renderNotes } from './Stave';

export type IMultilineMeasure = {
    measureLines: Array<INote[][]>; // measures x lines
    timeSignature: number[];
    measuresPerLine?: number
}

const MultilineMeasure = ({ measureLines, timeSignature, measuresPerLine = 0 }: IMultilineMeasure) => {
    return (
        <>
            {measureLines.map((measures, index) => (
                <div className={classes.multilineMeasure} key={`__multiline_measure_${index}`}>
                    {measures.map((measureNotes, i) => (
                        <Measure
                            key={`__multiline_measure_${index}_${i}`}
                            clef={clefs[measureNotes[0].clef]}
                            timeSignature={getTimeSignature(timeSignature)}
                            staveLines={getStaveLines(timeSignature[1])}
                            ticks={renderNotes(measureNotes)}
                            isFirst={index === 0}
                            isLineBeginning={index % measuresPerLine === 0}
                            isLast={index === measureLines.length - 1}
                            style={{margin: '1.1em 0'}}
                        />
                    ))}
                    {index === measureLines.length - 1 ? 
                    <div style={{ position: 'absolute', right: '.03em', top: '2.1em' }}>&#x1D102;</div> : 
                    <div style={{ position: 'absolute', right: 0, top: '2.1em' }}>&#x1D100;</div>}
                    {index === measureLines.length - 1 ? 
                    <div style={{ position: 'absolute', right: '.03em', top: '3.1em' }}>&#x1D102;</div> : 
                    <div style={{ position: 'absolute', right: 0, top: '3.1em' }}>&#x1D100;</div>}
                    {index === measureLines.length - 1 ? 
                    <div style={{ position: 'absolute', right: '.03em', top: '4.1em' }}>&#x1D102;</div> : 
                    <div style={{ position: 'absolute', right: 0, top: '4.1em' }}>&#x1D100;</div>}

                    {index % measuresPerLine === 0 && <div style={{ position: 'absolute', left: 0, top: '2.1em' }}>&#x1D100;</div>}
                    {index % measuresPerLine === 0 && <div style={{ position: 'absolute', left: 0, top: '3.1em' }}>&#x1D100;</div>}
                    {index % measuresPerLine === 0 && <div style={{ position: 'absolute', left: 0, top: '4.1em' }}>&#x1D100;</div>}
                </div>))}
        </>
    )
}

export default MultilineMeasure;