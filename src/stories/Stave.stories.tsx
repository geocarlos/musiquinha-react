import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { INote, Note, Stave } from '../';
import { playNotes } from '../lib/audio-features/NotePlayer';
import notes from './assets/notes.json';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Stave/Examples',
    component: Stave,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Stave>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Stave> = (args) => {
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
            playNotes({ notes: toneNotes, bpm: 100, timeSignature: args.timeSignature });
        }}>Play</button>
    </div>
    return args.notes ?
        <>{playButton}<Stave {...{...args, toneNotesHandler: getToneNotesFromStave}} /></> :
        <Stave {...args}>{(notes.treble as INote[]).map((note, i) => (<Note key={`__note__${i}`} {...note} />))}</Stave>;
}
export const Children = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Children.args = {
    timeSignature: [4, 4]
};

export const Treble = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Treble.args = {
    notes: notes.treble,
    bpm: 120,
    timeSignature: [4, 4]
};

export const Bass = Template.bind({});
Bass.args = {
    notes: notes.bass,
    bpm: 120,
    timeSignature: [4, 4]
};

