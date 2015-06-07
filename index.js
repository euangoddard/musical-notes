'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _SEMITONES_BY_NOTE_NAME;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var VALID_NOTE_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

var SHARP_SYMBOL = '#';

var FLAT_SYMBOL = '♭';

var SEMITONES_BY_NOTE_NAME = (_SEMITONES_BY_NOTE_NAME = {}, _defineProperty(_SEMITONES_BY_NOTE_NAME, 'A' + FLAT_SYMBOL, -1), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'A', 0), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'A' + SHARP_SYMBOL, 1), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'B' + FLAT_SYMBOL, 1), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'B', 2), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'C' + FLAT_SYMBOL, 2), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'B' + SHARP_SYMBOL, 3), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'C', 3), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'C' + SHARP_SYMBOL, 4), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'D' + FLAT_SYMBOL, 4), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'D', 5), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'D' + SHARP_SYMBOL, 6), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'E' + FLAT_SYMBOL, 6), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'E', 7), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'F' + FLAT_SYMBOL, 7), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'E' + SHARP_SYMBOL, 8), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'F', 8), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'F' + SHARP_SYMBOL, 9), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'G' + FLAT_SYMBOL, 9), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'G', 10), _defineProperty(_SEMITONES_BY_NOTE_NAME, 'G' + SHARP_SYMBOL, 11), _SEMITONES_BY_NOTE_NAME);

var CONCERT_A_FREQUENCY = 440;

var SEMITONE_COUNT = 12;

var Note = (function () {
	function Note(note_raw) {
		var octave = arguments[1] === undefined ? 0 : arguments[1];

		_classCallCheck(this, Note);

		var note_parsed = parse_note(note_raw);
		this.name = note_parsed.name;
		this.is_sharp = note_parsed.is_sharp;
		this.is_flat = note_parsed.is_flat;
		this.octave = octave;
	}

	_createClass(Note, [{
		key: 'symbol',
		get: function () {
			var sharp_symbol = this.is_sharp ? SHARP_SYMBOL : '';
			var flat_symbol = this.is_flat ? FLAT_SYMBOL : '';
			return this.name + sharp_symbol + flat_symbol;
		}
	}, {
		key: 'frequency',
		get: function () {
			var semitone = SEMITONES_BY_NOTE_NAME[this.symbol];
			var frequency = CONCERT_A_FREQUENCY * Math.pow(2, this.octave + semitone / SEMITONE_COUNT);
			return frequency;
		}
	}]);

	return Note;
})();

exports.Note = Note;
;

var parse_note = function parse_note(note) {
	var note_name = note.slice(0, 1);
	var normalized_note_name = note_name.toUpperCase();
	if (VALID_NOTE_NAMES.indexOf(normalized_note_name) === -1) {
		throw new Error('' + note_name + ' is not a valid note!');
	}

	var note_modifier = note.slice(1, 2);
	if (note_modifier && [SHARP_SYMBOL, FLAT_SYMBOL].indexOf(note_modifier) === -1) {
		throw new Error('${note_modifier} is not a valid note note modifier');
	}
	var is_sharp = note_modifier === SHARP_SYMBOL;
	var is_flat = note_modifier === FLAT_SYMBOL;

	return {
		name: normalized_note_name,
		is_sharp: is_sharp,
		is_flat: is_flat
	};
};