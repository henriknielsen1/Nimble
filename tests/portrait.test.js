const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock browser globals for app.js in Node
const mockLocalStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
};

global.localStorage = mockLocalStorage;
global.window = {
  addEventListener: () => {}
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ appendChild: () => {}, addEventListener: () => {} })
};

const app = require('../app.js');

test('buildCharacterPrompt generates fantasy portrait prompt with character attributes', () => {
  const sampleChar = {
    character_name: 'Thorin Egebryder',
    class: 'The Berserker (Barbarian)',
    level: 2,
    ancestry: 'Dværg',
    background: 'Wild One (vildmarkskriger)',
    quote: 'En voldsom urkraft drevet af blodtørst.',
    notes: 'Kendetegn: Brede skuldre og flettet rødt skæg.\nPersonligt mål: Besejre en drage.',
    inventory: ['Stor økse', 'Læderrustning', 'Klatrereb'],
    gender: 'Mand',
    age: 65,
    alignment: 'Chaotic Good'
  };

  const prompt = app.buildCharacterPrompt(sampleChar, 'bærer en bjørneskindskappe');

  assert.match(prompt, /Thorin Egebryder/);
  assert.match(prompt, /The Berserker/);
  assert.match(prompt, /Dværg/);
  assert.match(prompt, /Level 2/);
  assert.match(prompt, /Wild One/);
  assert.match(prompt, /Brede skuldre og flettet rødt skæg/);
  assert.match(prompt, /Stor økse/);
  assert.match(prompt, /Mand/);
  assert.match(prompt, /65 years old/);
  assert.match(prompt, /Chaotic Good/);
  assert.match(prompt, /bjørneskindskappe/);
  assert.match(prompt, /tabletop RPG character bust portrait/);
});

test('buildCharacterPrompt handles empty or minimal character gracefully', () => {
  const minimal = {};
  const prompt = app.buildCharacterPrompt(minimal);
  assert.ok(prompt.length > 20);
  assert.match(prompt, /tabletop RPG character bust portrait/);

  const nullPrompt = app.buildCharacterPrompt(null);
  assert.strictEqual(nullPrompt, '');
});

test('buildCharacterPrompt works on all 11 predefined characters in data.js', () => {
  let dataCode = fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8');
  dataCode = dataCode.replace('const NIMBLE_DATA', 'var NIMBLE_DATA');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(dataCode, ctx);

  assert.strictEqual(ctx.NIMBLE_DATA.characters.length, 11);
  ctx.NIMBLE_DATA.characters.forEach(char => {
    const prompt = app.buildCharacterPrompt(char);
    assert.ok(prompt.includes(char.character_name), `Prompt for ${char.character_name} must include name`);
    assert.ok(prompt.includes(char.ancestry), `Prompt for ${char.character_name} must include ancestry`);
    assert.ok(prompt.includes(char.class), `Prompt for ${char.character_name} must include class`);
  });
});

test('callGeminiImageApi rejects missing API key', async () => {
  await assert.rejects(
    () => app.callGeminiImageApi('', 'a brave warrior'),
    /Mangler Gemini API-nøgle/
  );
  await assert.rejects(
    () => app.callGeminiImageApi('   ', 'a brave warrior'),
    /Mangler Gemini API-nøgle/
  );
});

test('callGeminiImageApi successfully parses inlineData image', async () => {
  const fakeBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const originalFetch = global.fetch;

  let requestUrl = '';
  let requestHeaders = {};
  let requestBody = {};

  global.fetch = async (url, opts) => {
    requestUrl = url;
    requestHeaders = opts.headers;
    requestBody = JSON.parse(opts.body);

    return {
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                {
                  inlineData: {
                    mimeType: 'image/png',
                    data: fakeBase64
                  }
                }
              ]
            },
            finishReason: 'STOP'
          }
        ]
      })
    };
  };

  try {
    const dataUrl = await app.callGeminiImageApi('test-key-123', 'A noble knight portrait');
    assert.strictEqual(dataUrl, `data:image/png;base64,${fakeBase64}`);
    assert.ok(requestUrl.includes('test-key-123'));
    assert.ok(requestUrl.includes('gemini-2.5-flash-image:generateContent'));
    assert.strictEqual(requestHeaders['x-goog-api-key'], 'test-key-123');
    assert.strictEqual(requestBody.contents[0].parts[0].text, 'A noble knight portrait');
    assert.deepStrictEqual(requestBody.generationConfig.responseModalities, ['IMAGE']);
  } finally {
    global.fetch = originalFetch;
  }
});

test('callGeminiImageApi parses snake_case inline_data image', async () => {
  const fakeBase64 = 'abc123==';
  const originalFetch = global.fetch;

  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [
        {
          content: {
            parts: [
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: fakeBase64
                }
              }
            ]
          },
          finishReason: 'STOP'
        }
      ]
    })
  });

  try {
    const dataUrl = await app.callGeminiImageApi('test-key-123', 'prompt');
    assert.strictEqual(dataUrl, `data:image/jpeg;base64,${fakeBase64}`);
  } finally {
    global.fetch = originalFetch;
  }
});

test('callGeminiImageApi handles 400 invalid API key', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: false,
    status: 400,
    json: async () => ({
      error: { message: 'API_KEY_INVALID' }
    })
  });

  try {
    await assert.rejects(
      () => app.callGeminiImageApi('bad-key', 'prompt'),
      /Ugyldig Gemini API-nøgle/
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('callGeminiImageApi handles 429 rate limit', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: false,
    status: 429,
    json: async () => ({
      error: { message: 'Resource has been exhausted' }
    })
  });

  try {
    await assert.rejects(
      () => app.callGeminiImageApi('key', 'prompt'),
      /Rate limit overskredet/
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('callGeminiImageApi handles safety blocks', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [
        {
          finishReason: 'SAFETY'
        }
      ]
    })
  });

  try {
    await assert.rejects(
      () => app.callGeminiImageApi('key', 'prompt'),
      /sikkerhedsfilter \(Safety\)/
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('callGeminiImageApi handles network failure', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => {
    throw new Error('Failed to fetch');
  };

  try {
    await assert.rejects(
      () => app.callGeminiImageApi('key', 'prompt'),
      /Netværksfejl/
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('getStoredGeminiApiKey and setStoredGeminiApiKey persist key in localStorage', () => {
  mockLocalStorage.clear();
  assert.strictEqual(app.getStoredGeminiApiKey(), '');

  app.setStoredGeminiApiKey('AIzaSyCustomKey123');
  assert.strictEqual(app.getStoredGeminiApiKey(), 'AIzaSyCustomKey123');

  // Verify legacy fallback
  mockLocalStorage.clear();
  mockLocalStorage.setItem(app.GEMINI_KEY_STORAGE_NAME, 'LegacyKey456');
  assert.strictEqual(app.getStoredGeminiApiKey(), 'LegacyKey456');
});

test('compressImage resolves with input when Image or Canvas is unavailable', async () => {
  const dummy = 'data:image/png;base64,sample';
  const res = await app.compressImage(dummy);
  assert.strictEqual(res, dummy);
});

test('renderPortrait updates DOM elements appropriately', () => {
  const elements = {};
  function makeElem(id) {
    const el = {
      id,
      style: { display: '' },
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); },
        toggle(c, force) {
          if (force === undefined) {
            if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c);
          } else if (force) {
            this.classes.add(c);
          } else {
            this.classes.delete(c);
          }
        }
      },
      src: '',
      alt: '',
      textContent: '',
      title: '',
      addEventListener: () => {}
    };
    elements[id] = el;
    return el;
  }

  const ids = [
    'sheet-portrait-frame',
    'portrait-placeholder',
    'portrait-loading',
    'portrait-display',
    'f-portrait-img',
    'portrait-actions-bar',
    'portrait-error',
    'portrait-error-msg'
  ];
  ids.forEach(makeElem);

  const originalGetElementById = global.document.getElementById;
  global.document.getElementById = (id) => elements[id] || null;

  try {
    // 1. Render with dataUrl
    app.renderPortrait('data:image/jpeg;base64,1234');
    assert.match(elements['f-portrait-img'].src, /^blob:/);
    assert.strictEqual(elements['portrait-display'].style.display, 'block');
    assert.strictEqual(elements['portrait-placeholder'].style.display, 'none');
    assert.strictEqual(elements['portrait-actions-bar'].style.display, 'flex');
    assert.strictEqual(elements['sheet-portrait-frame'].classList.contains('has-no-portrait'), false);

    // 2. Render with null (no portrait)
    app.renderPortrait(null);
    assert.strictEqual(elements['f-portrait-img'].src, '');
    assert.strictEqual(elements['portrait-display'].style.display, 'none');
    assert.strictEqual(elements['portrait-placeholder'].style.display, 'flex');
    assert.strictEqual(elements['portrait-actions-bar'].style.display, 'none');
    assert.strictEqual(elements['sheet-portrait-frame'].classList.contains('has-no-portrait'), true);

    // 3. Loading state
    app.setPortraitLoading(true);
    assert.strictEqual(elements['portrait-loading'].style.display, 'flex');
    assert.strictEqual(elements['portrait-placeholder'].style.display, 'none');
    assert.strictEqual(elements['portrait-display'].style.display, 'none');

    app.setPortraitLoading(false);
    assert.strictEqual(elements['portrait-loading'].style.display, 'none');

    // 4. Error state
    app.setPortraitError('Test error message');
    assert.strictEqual(elements['portrait-error-msg'].textContent, 'Test error message');
    assert.strictEqual(elements['portrait-error'].style.display, 'flex');

    app.renderPortrait(null);
    assert.strictEqual(elements['portrait-error'].style.display, 'none');
  } finally {
    global.document.getElementById = originalGetElementById;
  }
});


test('buildCharacterPrompt prioritizes simple hand-drawn illustration over faux realism', () => {
  const inst = { character_name: 'Mira', ancestry: 'Elf', class: 'Mage' };
  const prompt = app.buildCharacterPrompt(inst, 'rødt hår');
  assert.match(prompt, /opaque gouache color blocks/);
  assert.match(prompt, /confident dark ink contours/);
  assert.match(prompt, /simplified expressive features/);
  assert.match(prompt, /broad flat color areas and just a few clear shadow shapes/);
  assert.match(prompt, /Avoid: photographic or realistic rendering/);
  assert.match(prompt, /dramatic cinematic lighting/);
  assert.doesNotMatch(prompt, /photorealistic key art|soft natural diffused light|believable materials/i);
  assert.ok(prompt.indexOf('rødt hår') > prompt.indexOf('Mira'));

  const legends = app.buildCharacterPrompt(inst, '', 'legends');
  assert.match(legends, /varied line weight/);
  assert.match(legends, /sparse translucent watercolor washes/);
  assert.match(legends, /open paper/);
  const oil = app.buildCharacterPrompt(inst, '', 'oil');
  assert.match(oil, /stylized storybook fantasy illustration painted in matte oil/);
  assert.strictEqual(app.buildCharacterPrompt(inst, '', 'unknown'), app.buildCharacterPrompt(inst));
});
