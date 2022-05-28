import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { GrandStaff } from '../';
import { playNotes, stopPlaying } from '../lib/audio-features/NotePlayer';
import { INote } from '../lib/components/Note';
import notes from './assets/notes.json';
import piece from './assets/sample-music-pieces/fuer-elise.json';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'GrandStaff/Examples',
    component: GrandStaff,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GrandStaff>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GrandStaff> = (args) => {
    const [toneNotes, setToneNotes] = useState<INote[]>([]);

    const getToneNotesFromStave = (notes: INote[]) => {
        setToneNotes(notes);
    }

    const playButton = <div style={{
        width: 'fit-content',
        height: 'fit-content',
        right: 10
    }}>
        <button disabled={args.notes?.length === 0} onClick={() => {
            playNotes({ notes: toneNotes, bpm: 130, timeSignature: args.timeSignature });
        }}>Play</button>&nbsp;<button onClick={stopPlaying}>Stop</button>
    </div>
    return <>{playButton}<GrandStaff {...{...args, toneNotesHandler: getToneNotesFromStave}} /></>
};

export const TwoDifferentClefs = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TwoDifferentClefs.args = {
    noteLines: [notes.treble, notes.bass],
    timeSignature: [4, 4],
    measuresPerLine: 4
};

export const TwoSameClefs = Template.bind({});
TwoSameClefs.args = {
    noteLines: [notes.treble, notes.treble],
    timeSignature: [4, 4],
    measuresPerLine: 4
};

export const ARealPiece = Template.bind({});
ARealPiece.args = {
    noteLines: piece.notes,
    timeSignature: piece.timeSignature,
    measuresPerLine: 3
};

