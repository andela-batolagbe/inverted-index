var inverted, texts, indexRunner;
var indexRunner;

beforeEach(function() {
  texts = [{
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
  ];

  inverted = new Index();
});

describe("Read book data,", function() {

  it("should not be empty", function() {

    indexRunner = inverted.readTexts(texts);

    expect(indexRunner).toBeDefined();
    expect(indexRunner).not.toBe(null);
    expect(typeof indexRunner).toEqual(typeof []);
    expect(indexRunner)
      .toContain("alice in wonderland alice falls into a rabbit hole and enters a world full of imagination.");
    expect(indexRunner)
      .toContain("the lord of the rings: the fellowship of the ring. an unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.");
  });
});

describe("Populate Index,", function() {

  beforeEach(function() {

    inverted.createIndex(texts);
    indexRunner = inverted.index;
  });

  it("should create index on JSON file read", function() {

    expect(indexRunner).toBeDefined();
    expect(indexRunner).not.toBe(null);
    expect(typeof indexRunner).toEqual(typeof {});
    expect(indexRunner.hasOwnProperty('of')).toBe(true);
    expect(indexRunner.hasOwnProperty('alice')).toBe(true);
    expect(indexRunner.hasOwnProperty('wonderland')).toBe(true);
    expect(indexRunner.hasOwnProperty('enters')).toBe(true);
    expect(indexRunner.hasOwnProperty('unusual')).toBe(true);
    expect(indexRunner.hasOwnProperty('wizard')).toBe(true);
    expect(indexRunner.hasOwnProperty('a')).toBe(true);
    expect(indexRunner.hasOwnProperty('ring')).toBe(true);
    expect(indexRunner.hasOwnProperty('rings')).toBe(true);
    expect(indexRunner.hasOwnProperty('dwarf')).toBe(true);
    expect(indexRunner.hasOwnProperty('imagination')).toBe(true);

  });

  it("should map string keys to the correct object", function() {

    expect(indexRunner.alice).toEqual([0]);
    expect(indexRunner.of).toEqual([0, 1]);
    expect(indexRunner.into).toEqual([0]);
    expect(indexRunner.hole).toEqual([0]);
    expect(indexRunner.enters).toEqual([0]);
    expect(indexRunner.fellowship).toEqual([1]);
    expect(indexRunner.alliance).toEqual([1]);
    expect(indexRunner.man).toEqual([1]);
    expect(indexRunner.a).toEqual([0, 1]);
    expect(indexRunner.hobbit).toEqual([1]);
    expect(indexRunner.powerful).toEqual([1]);

  });

});

describe("Search Index", function() {

  it("should return an array of the indices of the correct objects", function() {

    indexRunner = inverted.searchIndex(texts, "a lord RING Wonderland dwarf");

    expect(indexRunner).toBeDefined();
    expect(indexRunner).not.toBe(null);
    expect(indexRunner).toEqual({
      a: [0, 1],
      lord: [1],
      ring: [1],
      wonderland: [0],
      dwarf: [1]
    });

  });

});
