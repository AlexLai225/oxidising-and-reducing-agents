import test from 'node:test';
import assert from 'node:assert/strict';
import { HKDSE_REAGENTS } from '../data/reagents';
import {
  advanceAfterFeedback,
  calculateAccuracy,
  createDeck,
  createInitialGameState,
  evaluateSwipe,
  getMasteryRank,
  getMistakes,
} from './engine';
import {
  detectGestureAxis,
  FEEDBACK_FLICK_MIN_DISTANCE,
  FEEDBACK_SWIPE_DISTANCE,
  QUESTION_FLICK_MIN_DISTANCE,
  QUESTION_SWIPE_DISTANCE,
  resolveHorizontalSwipe,
} from './swipe';

test('HKDSE dataset contains both OA and RA cards with zero table or past paper references', () => {
  const oas = HKDSE_REAGENTS.filter((r) => r.role === 'OA');
  const ras = HKDSE_REAGENTS.filter((r) => r.role === 'RA');
  assert.ok(oas.length >= 10, 'Expected at least 10 OA cards');
  assert.ok(ras.length >= 8, 'Expected at least 8 RA cards');

  const serialized = JSON.stringify(HKDSE_REAGENTS);
  assert.equal(/30\.5|30\.6|30\.7|pastPaper|DSE 20|CE 20/i.test(serialized), false);

  const hasCJK = (text: string) => /[\u4e00-\u9fff]/.test(text);
  for (const card of HKDSE_REAGENTS) {
    assert.ok(card.halfEquation.length > 0);
    assert.ok(card.observation.zh.length > 0);
    assert.ok(card.observation.en.length > 0);
    assert.equal(hasCJK(card.formula), false, `CJK found in formula of ${card.id}`);
    assert.equal(hasCJK(card.speciesChange), false, `CJK found in speciesChange of ${card.id}`);
    assert.equal(hasCJK(card.halfEquation), false, `CJK found in halfEquation of ${card.id}`);
    assert.equal(hasCJK(card.name.en), false, `CJK found in name.en of ${card.id}`);
    assert.equal(hasCJK(card.category.en), false, `CJK found in category.en of ${card.id}`);
    assert.equal(hasCJK(card.clue.en), false, `CJK found in clue.en of ${card.id}`);
    assert.equal(hasCJK(card.beforeLabel.en), false, `CJK found in beforeLabel.en of ${card.id}`);
    assert.equal(hasCJK(card.afterLabel.en), false, `CJK found in afterLabel.en of ${card.id}`);
    assert.equal(hasCJK(card.observation.en), false, `CJK found in observation.en of ${card.id}`);
    assert.equal(hasCJK(card.oxidationChange.en), false, `CJK found in oxidationChange.en of ${card.id}`);
    assert.equal(hasCJK(card.explanation.en), false, `CJK found in explanation.en of ${card.id}`);
    assert.equal(hasCJK(card.examTip?.en ?? ''), false, `CJK found in examTip.en of ${card.id}`);
  }

  for (const id of ['sodium-metal', 'potassium-metal']) {
    const card = HKDSE_REAGENTS.find((r) => r.id === id);
    assert.ok(card, `Expected ${id} in HKDSE_REAGENTS`);
    const questionText = `${card.name.zh} ${card.name.en} ${card.clue.zh} ${card.clue.en}`;
    assert.equal(
      /Strongest RA|最強還原劑|E\.C\.S\.|電化序|electrochemical series/i.test(questionText),
      false,
      `Question card ${id} should not expose E.C.S. or strongest RA description`
    );
  }
});

test('createDeck produces balanced 10-card deck in sprint mode and all cards in full mode', () => {
  const sprintDeck = createDeck(HKDSE_REAGENTS, 'sprint', () => 0.42);
  assert.equal(sprintDeck.length, 10);
  assert.equal(sprintDeck.filter((c) => c.role === 'OA').length, 5);
  assert.equal(sprintDeck.filter((c) => c.role === 'RA').length, 5);

  const fullDeck = createDeck(HKDSE_REAGENTS, 'full', () => 0.42);
  assert.equal(fullDeck.length, HKDSE_REAGENTS.length);
});

test('evaluateSwipe awards streak points on correct answer and deducts heart on wrong answer', () => {
  const initial = createInitialGameState(HKDSE_REAGENTS, 'sprint', true, () => 0.5);
  const firstCard = initial.deck[0];

  const afterCorrect = evaluateSwipe(initial, firstCard.role);
  assert.equal(afterCorrect.phase, 'feedback');
  assert.equal(afterCorrect.score, 100);
  assert.equal(afterCorrect.streak, 1);
  assert.equal(afterCorrect.hearts, 3);
  assert.equal(afterCorrect.lastAnswer?.correct, true);

  const step2 = advanceAfterFeedback(afterCorrect);
  assert.equal(step2.phase, 'playing');
  assert.equal(step2.currentIndex, 1);

  const secondCard = step2.deck[1];
  const wrongChoice = secondCard.role === 'OA' ? 'RA' : 'OA';
  const afterWrong = evaluateSwipe(step2, wrongChoice);
  assert.equal(afterWrong.phase, 'feedback');
  assert.equal(afterWrong.score, 100);
  assert.equal(afterWrong.streak, 0);
  assert.equal(afterWrong.hearts, 2);
  assert.equal(afterWrong.lastAnswer?.correct, false);
});

test('losing all 3 hearts transitions to gameover upon advancing', () => {
  let state = createInitialGameState(HKDSE_REAGENTS, 'sprint', true, () => 0.25);

  for (let i = 0; i < 3; i++) {
    const card = state.deck[state.currentIndex];
    const wrong = card.role === 'OA' ? 'RA' : 'OA';
    state = evaluateSwipe(state, wrong);
    state = advanceAfterFeedback(state);
  }

  assert.equal(state.hearts, 0);
  assert.equal(state.phase, 'gameover');
  assert.equal(getMistakes(state.records).length, 3);
  assert.equal(calculateAccuracy(state.records), 0);
});

test('practice mode never loses hearts even on wrong answers', () => {
  let state = createInitialGameState(HKDSE_REAGENTS, 'practice', true, () => 0.1);
  const startHearts = state.hearts;

  for (let i = 0; i < 4; i++) {
    const card = state.deck[state.currentIndex];
    const wrong = card.role === 'OA' ? 'RA' : 'OA';
    state = evaluateSwipe(state, wrong);
    state = advanceAfterFeedback(state);
  }

  assert.equal(state.hearts, startHearts);
  assert.equal(state.phase, 'playing');
});

test('mastery rank returns appropriate HKDSE grade tiers without table references', () => {
  assert.equal(getMasteryRank(95, false).grade, '5**');
  assert.equal(getMasteryRank(80, false).grade, '5*');
  assert.equal(getMasteryRank(40, true).grade, 'RETRY');
  const lowTier = getMasteryRank(40, false);
  assert.equal(/30\.5|30\.6|30\.7/.test(lowTier.zh + lowTier.en), false);
});

test('swipe helpers support lower question threshold, velocity flicks, and feedback axis locking', () => {
  // Question card: 56px distance triggers swipe, 30px slow drag does not, 30px fast flick does
  assert.equal(
    resolveHorizontalSwipe(-56, 0.1, QUESTION_SWIPE_DISTANCE, QUESTION_FLICK_MIN_DISTANCE),
    'left'
  );
  assert.equal(
    resolveHorizontalSwipe(32, 0.1, QUESTION_SWIPE_DISTANCE, QUESTION_FLICK_MIN_DISTANCE),
    null
  );
  assert.equal(
    resolveHorizontalSwipe(32, 0.55, QUESTION_SWIPE_DISTANCE, QUESTION_FLICK_MIN_DISTANCE),
    'right'
  );

  // Feedback card: accepts both left and right swipes past 64px or fast flick >= 32px
  assert.equal(
    resolveHorizontalSwipe(-66, 0.1, FEEDBACK_SWIPE_DISTANCE, FEEDBACK_FLICK_MIN_DISTANCE),
    'left'
  );
  assert.equal(
    resolveHorizontalSwipe(66, 0.1, FEEDBACK_SWIPE_DISTANCE, FEEDBACK_FLICK_MIN_DISTANCE),
    'right'
  );
  assert.equal(
    resolveHorizontalSwipe(-36, -0.45, FEEDBACK_SWIPE_DISTANCE, FEEDBACK_FLICK_MIN_DISTANCE),
    'left'
  );

  // Axis disambiguation: vertical scroll vs horizontal swipe
  assert.equal(detectGestureAxis(20, 4), 'horizontal');
  assert.equal(detectGestureAxis(4, 18), 'vertical');
  assert.equal(detectGestureAxis(5, 5), null);
});
