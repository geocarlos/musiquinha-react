import { CSSProperties, ReactNode } from 'react';
import classes from './Measure.module.scss';
import { Clef } from './Stave';

export type IMeasure = {
    clef: Clef;
    timeSignature: ReactNode;
    staveLines: ReactNode | ReactNode[];
    ticks: ReactNode | ReactNode[] | null;
    isFirst?: boolean;
    isLineBeginning?: boolean;
    isLast?: boolean;
    style?: CSSProperties
}

const Measure = ({ clef, timeSignature, staveLines, ticks, isFirst, isLineBeginning, isLast, style }: IMeasure) => {

    const notesPaddingLeft = isFirst ? '1.5em' : isLineBeginning ? '1em' : '0';

    return (
        <div className={classes.measure} style={style}>
            {isLineBeginning ? <>
                <div className={classes.barLine} style={{ left: 0 }}>&#x1D100;</div>
                <div className={classes.clef}>{clef}</div>
                {isFirst ? <div className={classes.timeSignature}>{timeSignature}</div> : null}
                <div className={classes.staveLines}>
                    &#x1D11A;&#x1D11A;
                </div> </> : null}
            <div className={classes.staveLines}>
                {staveLines}{isLast ? <div style={{ position: 'absolute', right: 0 }}>&#x1D102;</div> : <>&#x1D100;</>}
            </div>
            <div className={classes.notes} style={{ paddingLeft: notesPaddingLeft }}>{ticks}</div>
        </div>
    )
}

export default Measure;