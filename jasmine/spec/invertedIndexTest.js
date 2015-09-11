var inverted, texts, parser;
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

  inverted = new getIndex();

});

describe("Read book data,", function() {

  it("should not be empty", function() {

    indexRunner = inverted.readTexts(texts);

    expect(indexRunner).toBeDefined();
    expect(indexRunner).not.toBe(null);
    expect(indexRunner).not.toEqual('');
    expect(indexRunner).toContain("alice in wonderland alice falls into a rabbit hole and enters a world full of imagination.");
    expect(indexRunner).toContain("the lord of the rings: the fellowship of the ring. an unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.");
  });
});

describe("Populate Index,", function() {

  beforeEach(function() {
    indexRunner = inverted.createIndex(texts);

  });

  it("should create index on JSON file read", function() {

    console.log(indexRunner);
    expect(indexRunner).toBeDefined();
    expect(indexRunner).not.toBe(null);
    expect(indexRunner).not.toEqual('');
    expect(indexRunner).toContain([0]);
    expect(indexRunner).toContain([0, 1]);
    expect(indexRunner).toContain([1]);

  });

  it("should map string keys to the correct object", function() {

   parser = JSON.parse(indexRunner);

    console.log(parser);
    expect(parser.hasOwnProperty('of')).toBe(true);
    expect(parser.of).toEqual([0, 1]);
    expect(parser.hasOwnProperty('a')).toBe(true);
    expect(parser.a).toEqual([0, 1]);
    expect(parser.hasOwnProperty('ring')).toBe(true);
    expect(parser.ring).toEqual([1]);
    expect(parser.hasOwnProperty('rings')).toBe(true);
    expect(parser.rings).toEqual([1]);
    expect(parser.hasOwnProperty('dwarf')).toBe(true);
    expect(parser.dwarf).toEqual([1]);
    expect(parser.hasOwnProperty('imagination')).toBe(true);
    expect(parser.imagination).toEqual([0]);
  });

});

describe("Search Index", function() {

  it("should return an array of the indices of the correct objects", function() {

    indexRunner = inverted.searchIndex(texts, "a lord RING Wonderland dwarf");

    parser = JSON.parse(indexRunner);

    expect(parser).toBeDefined();
    expect(parser).not.toBe(null);
    expect(parser).toEqual({
      a: [0, 1],
      lord: [1],
      ring: [1],
      wonderland: [0],
      dwarf: [1]
    });

  });

});
