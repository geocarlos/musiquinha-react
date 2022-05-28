import Note, {INote, noteStyleClasses} from "./lib/components/Note";
import Stave, {IStave, Clef} from "./lib/components/Stave";
import GrandStaff, {IGradStaff} from "./lib/components/GrandStaff";
import Measure, {IMeasure} from "./lib/components/Measure";
import MultilineMeasure, {IMultilineMeasure} from "./lib/components/MultilineMeasure";
import { playNotes, stopPlaying } from "./lib/audio-features/NotePlayer";

export {Note, Stave, GrandStaff, Measure, MultilineMeasure, noteStyleClasses, playNotes, stopPlaying};
export type {INote, IStave, Clef, IGradStaff, IMeasure, IMultilineMeasure};
