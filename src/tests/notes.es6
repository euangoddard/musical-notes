import should from 'should';

import {Note} from '../notes';

describe('Notes', () => {
  it('should be described be a letter', () => {
    'A B C D E F G'.split(' ').forEach((note_name) => {
      let note = new Note(note_name);
      note.name.should.equal(note_name);
      note.is_sharp.should.be.false;
      note.is_flat.should.be.false;
    });
  });

  it('should only accept letters in the range A-G', () => {
    (() => {
      new Note('H');
    }).should.throw();
  });

  it('should be possible to describe notes as lower case version', () => {
    'a b c d e f g'.split(' ').forEach((note_name) => {
      let note = new Note(note_name);
      note.name.should.equal(note_name.toUpperCase());
    });
  });

  it('should accept sharps', () => {
    let note = new Note('A#');
    note.name.should.equal('A');
    note.is_sharp.should.be.true;
    note.is_flat.should.be.false;
  });

  it('should accept flats', () => {
    let note = new Note('A♭');
    note.name.should.equal('A');
    note.is_sharp.should.be.false;
    note.is_flat.should.be.true;
  });

  it('should reject other modifiers', () => {
    (() => {
      new Note('A♮');
    }).should.throw();
  });

  it('should have a default octave of 0', () => {
    let note = new Note('A');
    note.name.should.equal('A');
    note.octave.should.equal(0);
  });

  it('should accept higher octaves', () => {
    let note = new Note('A', 1);
    note.name.should.equal('A');
    note.octave.should.equal(1);
  });

  it('should accept lower octaves', () => {
    let note = new Note('A', -1);
    note.name.should.equal('A');
    note.octave.should.equal(-1);
  });

  it('should have concert A defined as 440Hz', () => {
    let note = new Note('A');
    note.frequency.should.equal(440);
  });

  it('should compute upper octaves', () => {
    [1, 2, 3].forEach((octave) => {
      let note = new Note('A', octave);
      note.frequency.should.equal(440 * Math.pow(2, octave));
    });
  });

  it('should compute lower octaves', () => {
    [-1, -2, -3].forEach((octave) => {
      let note = new Note('A', octave);
      note.frequency.should.equal(440 * Math.pow(2, octave));
    });
  });

  it('should give identical frequencies for differently representations of the same semitone', () => {
    let pairs = [
      ['A#', 'B♭'],
      ['B#', 'C'],
      ['C#', 'D♭'],
      ['D#', 'E♭'],
      ['E#', 'F'],
      ['F#', 'G♭'],
      ['B', 'C♭'],
      ['E', 'F♭']
    ];
    pairs.forEach((pair) => {
      let note1 = new Note(pair[0]);
      let note2 = new Note(pair[1]);
      note1.frequency.should.equal(note2.frequency);
    });
    // Special case for G# and A♭ since they are around the octave break
    let g_sharp = new Note('G#');
    let a_flat = new Note('A♭', 1);
    g_sharp.frequency.should.equal(a_flat.frequency);
  });

});
