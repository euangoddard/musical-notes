const VALID_NOTE_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const SHARP_SYMBOL = '#';

const FLAT_SYMBOL = '♭';

const SEMITONES_BY_NOTE_NAME = {
	['A' + FLAT_SYMBOL]: -1,
	A: 0,
	['A' + SHARP_SYMBOL]: 1,
	['B' + FLAT_SYMBOL]: 1,
	B: 2,
	['C' + FLAT_SYMBOL]: 2,
	['B' + SHARP_SYMBOL]: 3,
	C: 3,
	['C' + SHARP_SYMBOL]: 4,
	['D' + FLAT_SYMBOL]: 4,
	D: 5,
	['D' + SHARP_SYMBOL]: 6,
	['E' + FLAT_SYMBOL]: 6,
	E: 7,
	['F' + FLAT_SYMBOL]: 7,
	['E' + SHARP_SYMBOL]: 8,
	F: 8,
	['F' + SHARP_SYMBOL]: 9,
	['G' + FLAT_SYMBOL]: 9,
	G: 10,
	['G' + SHARP_SYMBOL]: 11,
};

const CONCERT_A_FREQUENCY = 440;

const SEMITONE_COUNT = 12;


export class Note {
	constructor (note_raw, octave=0) {
		let note_parsed = parse_note(note_raw);
		this.name = note_parsed.name;
		this.is_sharp = note_parsed.is_sharp;
		this.is_flat = note_parsed.is_flat;
		this.octave = octave;
	}

	get symbol () {
		let sharp_symbol = this.is_sharp ? SHARP_SYMBOL : '';
		let flat_symbol = this.is_flat ? FLAT_SYMBOL : '';
		return this.name + sharp_symbol + flat_symbol;
	}

	get frequency () {
		let semitone = SEMITONES_BY_NOTE_NAME[this.symbol];
		let frequency = CONCERT_A_FREQUENCY * Math.pow(2, (this.octave + semitone / SEMITONE_COUNT));
		return frequency;
	}
};


let parse_note = function (note) {
	let note_name = note.slice(0, 1);
	let normalized_note_name = note_name.toUpperCase();
	if (VALID_NOTE_NAMES.indexOf(normalized_note_name) === -1) {
		throw new Error(`${note_name} is not a valid note!`);
	}

	let note_modifier = note.slice(1, 2);
	if (note_modifier && [SHARP_SYMBOL, FLAT_SYMBOL].indexOf(note_modifier) === -1) {
		throw new Error('${note_modifier} is not a valid note note modifier');
	}
	let is_sharp = note_modifier === SHARP_SYMBOL;
	let is_flat = note_modifier === FLAT_SYMBOL;

	return {
		name: normalized_note_name,
		is_sharp: is_sharp,
		is_flat: is_flat
	};
};
