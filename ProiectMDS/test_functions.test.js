const esteJocCastigat = require('./test_functions');

test('X pe orizontala da castig (1)', () => {
  expect(esteJocCastigat(["X", "X", "X", "", "", "", "", "", ""])).toBe(true);
});

test('X pe orizontala da castig (2)', () => {
  expect(esteJocCastigat(["", "", "", "X", "X", "X", "", "", ""])).toBe(true);
});

test('X pe orizontala da castig (3)', () => {
  expect(esteJocCastigat(["", "", "", "", "", "", "X", "X", "X"])).toBe(true);
});

test('X pe verticala da castig (1)', () => {
  expect(esteJocCastigat(["X", "", "", "X", "", "", "X", "", ""])).toBe(true);
});

test('X pe verticala da castig (2)', () => {
  expect(esteJocCastigat(["", "X", "", "", "X", "", "", "X", ""])).toBe(true);
});

test('X pe verticala da castig (3)', () => {
  expect(esteJocCastigat(["", "", "X", "", "", "X", "", "", "X"])).toBe(true);
});

test('X pe diagonala da castig (1)', () => {
  expect(esteJocCastigat(["X", "", "", "", "X", "", "", "", "X"])).toBe(true);
});

test('X pe diagonala da castig (2)', () => {
  expect(esteJocCastigat(["", "", "X", "", "X", "", "X", "", ""])).toBe(true);
});

test('X castiga jocul', () => {
  expect(esteJocCastigat(["X", "O", "", "", "X", "", "O", "O", "X"])).toBe(true);
});

test('O castiga jocul', () => {
  expect(esteJocCastigat(["X", "O", "X", "X", "X", "", "O", "O", "O"])).toBe(true);
});