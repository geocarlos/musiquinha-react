import React from 'react';
import classes from './Note.module.scss';

export {classes as noteStyleClasses};

type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'R';
type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Accidental = '#' | 'b' | '##' | 'bb' | 'n';
type Duration = '0' | 'w' | 'h' | 'q' | '8' | '16' | '32' | '64' | '128';
type NaturalKey = `${NoteName}${Octave}`;
type AccidentalKey = `${NoteName}${Accidental}${Octave}`;
type RestKey = `R${Duration}`;
type KeyType = 'note' | 'rest';

export type INote = {
    id?: string;
    keys: Array<NaturalKey | AccidentalKey | RestKey>;
    duration: Duration;
    toneDuration?: string;
    clef: 'bass' | 'treble';
    dots?: number;
    time?: number | string;
}

const durationTicks = {
    '0': { note: <>&#x1D15C;</>, rest: <>&#x1D13A;</> },
    'w': { note: <>&#x1D15D;</>, rest: <>&#x1D13B;</> },
    'h': { note: <>&#x1D15E;</>, rest: <>&#x1D13C;</> },
    'q': { note: <>&#x1D15F;</>, rest: <>&#x1D13D;</> },
    '8': { note: <>&#x1D160;</>, rest: <>&#x1D13E;</> },
    '16': { note: <>&#x1D161;</>, rest: <>&#x1D13F;</> },
    '32': { note: <>&#x1D162;</>, rest: <>&#x1D140;</> },
    '64': { note: <>&#x1D163;</>, rest: <>&#x1D141;</> },
    '128': { note: <>&#x1D164;</>, rest: <>&#x1D142;</> }
}



const noteTickPositions: any = {
    treble: {
        F3: 7, G3: 6, A3: 5, B3: 4, C4: 3, D4: 2, E4: 1, F4: 0, G4: -1, A4: -2, B4: -3, C5: -4, D5: -5, E5: -6, F5: -7, G5: -8, A5: -9, B5: -10,
        C6: -11, D6: -12, E6: -13, F6: -14, G6: -15, A6: -16, B6: -17, C7: -18, D7: -19, E7: -20, F7: -21, G7: -22, A7: -23, B7: -24, C8: -25,
    },
    bass: {
        A0: 14, B0: 13, C1: 12, D1: 11, E1: 10, F1: 9, G1: 8, A1: 7, B1: 6, C2: 5, D2: 4, E2: 3, F2: 2, G2: 1, A2: 0, B2: -1, C3: -2, D3: -3, E3: -4,
        F3: -5, G3: -6, A3: -7, B3: -8, C4: -9, D4: -10, E4: -12, F4: -13, G4: -14
    }
}

const restTickPositions: any = {
    treble: {
        R0: 0,
        Rw: -2,
        Rh: -2.1,
        Rq: 0,
        R8: 0,
        R16: 0,
        R32: 0,
        R64: 0,
        R128: 0
    },
    bass: {
        R0: 0,
        Rw: -2,
        Rh: 2.1,
        Rq: 0,
        R8: 0,
        R16: 0,
        R32: 0,
        R64: 0,
        R128: 0
    }
}

const getTickPosition = (keyNumber: number, duration: Duration) => {
    const style: any = {};
    style.top = `${keyNumber * 0.124}em`;
    if (duration !== '0' && duration !== 'w' && keyNumber < -2) {
        style.transform = `rotate(180deg)`;
        style.top = `${keyNumber * 0.124 + .75}em`;
    }
    return style;
}

const getDurationTicks = (duration: Duration, type: KeyType, keyNumber: number) => {
    if (keyNumber < -2 && duration !== '0' && duration !== 'w' && duration !== 'h' && duration !== 'q') {
        return {
            '8': <>&#x1D15F;<div className={classes.stemDownwardsFlag}>&#x1D16E;</div></>,
            '16': <>&#x1D15F;<div className={classes.stemDownwardsFlag}>&#x1D16F;</div></>,
            '32': <>&#x1D15F;<div className={classes.stemDownwardsFlag}>&#x1D170;</div></>,
            '64': <>&#x1D15F;<div className={classes.stemDownwardsFlag}>&#x1D171;</div></>,
            '128': <>&#x1D15F;<div className={classes.stemDownwardsFlag}>&#x1D172;</div></>
        }[duration]
    }
    return durationTicks[duration][type];
}

const Note = (props: INote) => {
    const isRest = props.keys[0][0] === 'R';
    const type: KeyType = isRest ? 'rest' : 'note';
    const staveItem = isRest ? restTickPositions : noteTickPositions;

    return (
        <div id={props.id} className={classes.note}>
            {props.keys.map((key, i) => (
                <div
                    className={classes.duration}
                    style={getTickPosition(staveItem[props.clef][key.replace(/b|bb|#|##|n/, '')], props.duration)}
                    key={`__note_key__${key}${i}`}
                    title={key}
                >{getDurationTicks(props.duration, type, staveItem[props.clef][key.replace(/b|bb|#|##|n/, '')])}</div>))}
        </div>
    )
}

export default Note;