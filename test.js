import test from 'ava';
import parser from './index'
import fs from 'fs';

const sampleDataPath = './test_content/hn.html'
const expectedOutputPath = './test_content/expected_output.json'

test('sync-parse', t => {
  const sampleData = fs.readFileSync(sampleDataPath);
  const expectedResult = JSON.parse(fs.readFileSync(expectedOutputPath));
  const items = parser.parse(sampleData);
  t.deepEqual(items, expectedResult)
});

test('async-parse', t => {
  const sampleData = fs.readFileSync(sampleDataPath);
  parser.parseAsync(sampleData, (items) => {
    const expectedResult = JSON.parse(fs.readFileSync(expectedOutputPath));
    t.deepEqual(items, expectedResult)
  });
});