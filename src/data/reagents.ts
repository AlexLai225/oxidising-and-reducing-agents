import { ReagentCard } from '../types/chemistry';

export const HKDSE_REAGENTS: ReagentCard[] = [
  // ==========================================
  // COMMON OXIDIZING AGENTS - Swipe Left (OA)
  // ==========================================
  {
    id: 'kmno4-acidified',
    name: {
      zh: '酸化高錳酸鉀溶液',
      en: 'Acidified Potassium Permanganate',
    },
    formula: 'MnO₄⁻(aq) / H⁺(aq)',
    category: {
      zh: '常見強氧化劑',
      en: 'Strong Oxidizing Agent',
    },
    clue: {
      zh: '深紫色溶液；通常以稀硫酸酸化，常見於滴定及檢驗還原劑。',
      en: 'Deep purple solution acidified with dilute H₂SO₄; classic redox reagent.',
    },
    role: 'OA',
    bannerBg: '#6B5B95',
    illustration: 'flask_purple',
    beforeColor: '#7C3AED',
    beforeLabel: { zh: '紫色', en: 'Purple' },
    afterColor: '#FDF2F8',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色（或極淺粉紅）', en: 'Colourless / Very pale pink' },
    speciesChange: 'MnO₄⁻(aq) → Mn²⁺(aq)',
    observation: {
      zh: '溶液由紫色變為無色（或非常淺的粉紅色）。',
      en: 'Purple solution turns colourless (or very pale pink).',
    },
    halfEquation: 'MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ → Mn²⁺(aq) + 4H₂O(l)',
    oxidationChange: {
      zh: 'Mn 的氧化數由 +7 減少至 +2',
      en: 'Oxidation number of Mn decreases from +7 to +2',
    },
    explanation: {
      zh: 'MnO₄⁻(aq) 在酸性介質中獲得 5 個電子並還原成 Mn²⁺(aq)，把其他物種氧化，因此是強氧化劑。',
      en: 'MnO₄⁻(aq) gains 5 electrons in acidic medium to form Mn²⁺(aq), oxidizing other species.',
    },
    examTip: {
      zh: '「酸化」一詞是 HKDSE 必寫關鍵字，不可略去！通常以稀硫酸 (H₂SO₄) 酸化，不可用稀氫氯酸（Cl⁻ 會被氧化成 Cl₂）。',
      en: 'Always include "acidified" in exam answers! Acidified with dilute H₂SO₄ (never HCl, as Cl⁻ gets oxidized).',
    },
  },
  {
    id: 'k2cr2o7-acidified',
    name: {
      zh: '酸化重鉻酸鉀溶液',
      en: 'Acidified Potassium Dichromate',
    },
    formula: 'Cr₂O₇²⁻(aq) / H⁺(aq)',
    category: {
      zh: '常見強氧化劑',
      en: 'Strong Oxidizing Agent',
    },
    clue: {
      zh: '鮮橙色溶液；在酸性環境下容易接受電子，常見於酒精測試及氧化反應。',
      en: 'Bright orange solution acidified with dilute H₂SO₄; used to test reducing agents.',
    },
    role: 'OA',
    bannerBg: '#C25E3E',
    illustration: 'flask_orange',
    beforeColor: '#F97316',
    beforeLabel: { zh: '橙色', en: 'Orange' },
    afterColor: '#16A34A',
    afterLabel: { zh: '綠色', en: 'Green' },
    speciesChange: 'Cr₂O₇²⁻(aq) → Cr³⁺(aq)',
    observation: {
      zh: '溶液由橙色變為綠色。',
      en: 'Orange solution turns green.',
    },
    halfEquation: 'Cr₂O₇²⁻(aq) + 14H⁺(aq) + 6e⁻ → 2Cr³⁺(aq) + 7H₂O(l)',
    oxidationChange: {
      zh: 'Cr 的氧化數由 +6 減少至 +3',
      en: 'Oxidation number of Cr decreases from +6 to +3',
    },
    explanation: {
      zh: 'Cr₂O₇²⁻(aq) 獲得 6 個電子並還原為綠色的 Cr³⁺(aq) 離子，是 HKDSE 核心氧化劑。',
      en: 'Cr₂O₇²⁻(aq) gains 6 electrons and is reduced to green Cr³⁺(aq) ions.',
    },
    examTip: {
      zh: '「酸化」二字不可省去！注意顏色變化是「橙色 → 綠色」（不要誤寫成深綠或無色）。',
      en: 'Remember to state "acidified" and the exact colour change: orange to green.',
    },
  },
  {
    id: 'dilute-hno3',
    name: {
      zh: '稀硝酸',
      en: 'Dilute Nitric Acid',
    },
    formula: 'Dilute HNO₃(aq)',
    category: {
      zh: '氧化性酸',
      en: 'Oxidizing Acid',
    },
    clue: {
      zh: '無色酸溶液；即使與銅等較不活潑金屬反應，仍能展現氧化性。',
      en: 'Colourless oxidizing acid; reacts even with unreactive metals like copper.',
    },
    role: 'OA',
    bannerBg: '#5B708B',
    illustration: 'bottle_acid',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色溶液', en: 'Colourless solution' },
    afterColor: '#E2E8F0',
    afterColorBorder: '#94A3B8',
    afterLabel: { zh: '無色 NO(g)', en: 'Colourless NO(g)' },
    speciesChange: 'NO₃⁻(aq) → NO(g)',
    observation: {
      zh: '生成無色氣體一氧化氮 NO(g)（遇空氣後迅速氧化為棕色 NO₂ 氣體）。',
      en: 'Colourless NO(g) is evolved (which turns brown in air as NO₂ forms).',
    },
    halfEquation: 'NO₃⁻(aq) + 4H⁺(aq) + 3e⁻ → NO(g) + 2H₂O(l)',
    oxidationChange: {
      zh: 'N 的氧化數由 +5 減少至 +2',
      en: 'Oxidation number of N decreases from +5 to +2',
    },
    explanation: {
      zh: '稀硝酸中的 NO₃⁻(aq) 在 H⁺(aq) 存在下獲得 3 個電子，還原為無色的 NO(g)。',
      en: 'Nitrate ions in dilute HNO₃ gain 3 electrons with H⁺(aq) to be reduced to colourless NO(g).',
    },
    examTip: {
      zh: '題目問剛生成的氣體是無色 NO(g)，但試管口接觸空氣後會見到棕色氣體 NO₂(g)！',
      en: 'Initial gas formed is colourless NO(g), which reacts with air at the mouth of the tube to give brown NO₂(g).',
    },
  },
  {
    id: 'conc-hno3',
    name: {
      zh: '濃硝酸',
      en: 'Concentrated Nitric Acid',
    },
    formula: 'Conc. HNO₃(aq)',
    category: {
      zh: '強氧化性酸',
      en: 'Strong Oxidizing Acid',
    },
    clue: {
      zh: '具強氧化性的濃酸；與金屬、碳或硫反應時會釋出刺鼻棕色氣體。',
      en: 'Concentrated oxidizing acid; produces pungent brown fumes upon reduction.',
    },
    role: 'OA',
    bannerBg: '#8B5E4B',
    illustration: 'gas_jar_brown',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色溶液', en: 'Colourless acid' },
    afterColor: '#9A3412',
    afterLabel: { zh: '棕色 NO₂(g)', en: 'Brown NO₂(g)' },
    speciesChange: 'NO₃⁻(aq) → NO₂(g)',
    observation: {
      zh: '生成棕色、具刺激性氣味的二氧化氮氣體 NO₂(g)。',
      en: 'Pungent brown nitrogen dioxide gas NO₂(g) is evolved.',
    },
    halfEquation: 'NO₃⁻(aq) + 2H⁺(aq) + e⁻ → NO₂(g) + H₂O(l)',
    oxidationChange: {
      zh: 'N 的氧化數由 +5 減少至 +4',
      en: 'Oxidation number of N decreases from +5 to +4',
    },
    explanation: {
      zh: '濃硝酸中的 NO₃⁻(aq) 獲得電子並還原成棕色的二氧化氮 NO₂(g)，能氧化金屬及非金屬（如碳）。',
      en: 'Concentrated NO₃⁻(aq) accepts electrons to form brown NO₂(g), acting as a strong oxidant.',
    },
    examTip: {
      zh: '切記區分：稀硝酸還原生成無色 NO(g)（+5 → +2）；濃硝酸還原生成棕色 NO₂(g)（+5 → +4）。',
      en: 'Distinguish carefully: dilute HNO₃ → NO(g) (+5 to +2); conc. HNO₃ → brown NO₂(g) (+5 to +4).',
    },
  },
  {
    id: 'conc-h2so4',
    name: {
      zh: '濃硫酸',
      en: 'Concentrated Sulphuric Acid',
    },
    formula: 'Conc. H₂SO₄(l)',
    category: {
      zh: '強氧化性酸',
      en: 'Strong Oxidizing Acid',
    },
    clue: {
      zh: '黏稠無色液體；加熱時不僅呈酸性及脫水性，還具強氧化力。',
      en: 'Viscous colourless liquid; acts as a strong oxidant especially when heated.',
    },
    role: 'OA',
    bannerBg: '#475569',
    illustration: 'bottle_acid',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色液體', en: 'Colourless liquid' },
    afterColor: '#E2E8F0',
    afterColorBorder: '#94A3B8',
    afterLabel: { zh: '無色 SO₂(g)', en: 'Colourless SO₂(g)' },
    speciesChange: 'H₂SO₄(l) → SO₂(g)',
    observation: {
      zh: '生成無色、具刺鼻氣味的二氧化硫氣體 SO₂(g)（可使酸化重鉻酸鉀試紙由橙變綠）。',
      en: 'Colourless, pungent SO₂(g) is given off (turns acidified dichromate paper green).',
    },
    halfEquation: 'H₂SO₄(l) + 2H⁺(aq) + 2e⁻ → SO₂(g) + 2H₂O(l)',
    oxidationChange: {
      zh: 'S 的氧化數由 +6 減少至 +4',
      en: 'Oxidation number of S decreases from +6 to +4',
    },
    explanation: {
      zh: '濃硫酸在反應中獲得 2 個電子並還原為 SO₂(g)，能把銅、碳或溴化物/碘化物氧化。',
      en: 'Conc. H₂SO₄ gains 2 electrons to form SO₂(g), oxidizing Cu, C, Br⁻ or I⁻.',
    },
    examTip: {
      zh: '稀硫酸一般只作為普通酸，不作氧化劑；只有「濃硫酸」才是常見強氧化劑！',
      en: 'Dilute H₂SO₄ is non-oxidizing towards Cu/Br⁻/I⁻; only concentrated H₂SO₄ acts as this oxidant.',
    },
  },
  {
    id: 'oxygen',
    name: {
      zh: '氧',
      en: 'Oxygen',
    },
    formula: 'O₂(g)',
    category: {
      zh: '常見非金屬氧化劑',
      en: 'Common Non-metal Oxidant',
    },
    clue: {
      zh: '存在於空氣中的無色氣體；參與燃燒及生鏽等日常氧化還原反應。',
      en: 'Colourless gas in air; drives combustion and rusting.',
    },
    role: 'OA',
    bannerBg: '#4F6D8A',
    illustration: 'gas_jar_clear',
    beforeColor: '#F1F5F9',
    beforeColorBorder: '#94A3B8',
    beforeLabel: { zh: '無色氣體', en: 'Colourless gas' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: 'OH⁻(aq) / O²⁻(s)', en: 'OH⁻(aq) / O²⁻(s)' },
    speciesChange: 'O₂(g) → OH⁻(aq) / O²⁻(s)',
    observation: {
      zh: '無色氧氣被還原成無色的氫氧離子 OH⁻(aq) 或金屬氧化物中的 O²⁻(s)。',
      en: 'Colourless O₂(g) is reduced to colourless OH⁻(aq) or oxide ions O²⁻(s).',
    },
    halfEquation: 'O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq)',
    oxidationChange: {
      zh: 'O 的氧化數由 0 減少至 −2',
      en: 'Oxidation number of O decreases from 0 to −2',
    },
    explanation: {
      zh: 'O₂ 獲得電子生成 OH⁻ 或 O²⁻，O 的氧化數由 0 變為 -2。',
      en: 'O₂ gains electrons to form OH⁻ or O²⁻, the oxidation number of O changes from 0 to -2.',
    },
    examTip: {
      zh: '氧（存在於空氣中）是價格最便宜的氧化劑。寫半方程式時切勿漏寫 OH⁻ 的負電荷（不是 OH 分子）！',
      en: 'Oxygen (from air) is the cheapest oxidizing agent. Never write OH(aq) without the negative charge!',
    },
  },
  {
    id: 'chlorine',
    name: {
      zh: '氯 / 氯水',
      en: 'Chlorine / Chlorine Water',
    },
    formula: 'Cl₂(g) / Cl₂(aq)',
    category: {
      zh: '鹵素氧化劑',
      en: 'Halogen Oxidizing Agent',
    },
    clue: {
      zh: '黃綠色氣體（水溶液呈非常淺的黃綠色）；能把溴離子和碘離子置換出來。',
      en: 'Yellowish-green gas; displaces Br⁻ and I⁻ from halide solutions.',
    },
    role: 'OA',
    bannerBg: '#5C7C66',
    illustration: 'gas_jar_green',
    beforeColor: '#BEF264',
    beforeLabel: { zh: '黃綠色', en: 'Yellowish-green' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 Cl⁻(aq)', en: 'Colourless Cl⁻(aq)' },
    speciesChange: 'Cl₂(g) → Cl⁻(aq)',
    observation: {
      zh: '黃綠色的氯變為無色的氯離子 Cl⁻(aq)（若與 Br⁻ 或 I⁻ 反應則呈現棕色）。',
      en: 'Yellowish-green Cl₂ turns into colourless Cl⁻(aq).',
    },
    halfEquation: 'Cl₂(g) + 2e⁻ → 2Cl⁻(aq)',
    oxidationChange: {
      zh: 'Cl 的氧化數由 0 減少至 −1',
      en: 'Oxidation number of Cl decreases from 0 to −1',
    },
    explanation: {
      zh: '氯的電負性高，容易獲得電子還原成 Cl⁻(aq)，氧化能力比溴和碘強。',
      en: 'Chlorine readily gains electrons to form Cl⁻(aq), stronger than Br₂ and I₂.',
    },
    examTip: {
      zh: '鹵素氧化能力次序：Cl₂ > Br₂ > I₂。Cl₂ 可氧化 Br⁻、I⁻ 及 Fe²⁺。',
      en: 'Halogen oxidizing power: Cl₂ > Br₂ > I₂.',
    },
  },
  {
    id: 'bromine-water',
    name: {
      zh: '溴（水溶液）',
      en: 'Bromine Water',
    },
    formula: 'Br₂(aq)',
    category: {
      zh: '鹵素氧化劑',
      en: 'Halogen Oxidizing Agent',
    },
    clue: {
      zh: '黃色至棕色的水溶液；常用於與亞硫酸鹽、二氧化硫或碘化物反應。',
      en: 'Yellow to brown aqueous solution; reacts with SO₃²⁻, Fe²⁺ or I⁻.',
    },
    role: 'OA',
    bannerBg: '#9E6240',
    illustration: 'beaker_amber',
    beforeColor: '#D97706',
    beforeLabel: { zh: '黃色 / 棕色', en: 'Yellow / Brown' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 Br⁻(aq)', en: 'Colourless Br⁻(aq)' },
    speciesChange: 'Br₂(aq) → Br⁻(aq)',
    observation: {
      zh: '黃色 / 棕色的溴水褪色，變為無色的溴離子 Br⁻(aq)。',
      en: 'Yellow/brown bromine water decolourizes to colourless Br⁻(aq).',
    },
    halfEquation: 'Br₂(aq) + 2e⁻ → 2Br⁻(aq)',
    oxidationChange: {
      zh: 'Br 的氧化數由 0 減少至 −1',
      en: 'Oxidation number of Br decreases from 0 to −1',
    },
    explanation: {
      zh: 'Br₂(aq) 獲得 2 個電子還原為無色的 Br⁻(aq)，在過程中把還原劑氧化。',
      en: 'Br₂(aq) gains 2 electrons to form colourless Br⁻(aq).',
    },
  },
  {
    id: 'silver-ion',
    name: {
      zh: '銀離子',
      en: 'Silver Ion',
    },
    formula: 'Ag⁺(aq)',
    category: {
      zh: '金屬離子氧化劑',
      en: 'Metal Ion Oxidizing Agent',
    },
    clue: {
      zh: '無色溶液（如硝酸銀溶液 AgNO₃(aq)）。',
      en: 'Colourless aqueous solution (e.g. AgNO₃(aq)).',
    },
    role: 'OA',
    bannerBg: '#64748B',
    illustration: 'silver_ion',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色 Ag⁺(aq)', en: 'Colourless Ag⁺(aq)' },
    afterColor: '#CBD5E1',
    afterLabel: { zh: '銀色固體 Ag(s)', en: 'Silvery solid Ag(s)' },
    speciesChange: 'Ag⁺(aq) → Ag(s)',
    observation: {
      zh: '無色溶液中有閃亮的銀色金屬銀 Ag(s) 析出。',
      en: 'Silvery solid silver Ag(s) is deposited from the colourless solution.',
    },
    halfEquation: 'Ag⁺(aq) + e⁻ → Ag(s)',
    oxidationChange: {
      zh: 'Ag 的氧化數由 +1 減少至 0',
      en: 'Oxidation number of Ag decreases from +1 to 0',
    },
    explanation: {
      zh: '位於電化序較低位置的金屬離子（如 Ag⁺、Cu²⁺）較容易獲得電子還原成金屬原子。',
      en: 'Metal ions lower in the electrochemical series readily gain electrons to form metal atoms.',
    },
    examTip: {
      zh: '切勿誤以為 K⁺(aq) 或 Na⁺(aq) 是常見氧化劑！它們在電化序頂端，氧化能力極弱。',
      en: 'K⁺(aq) and Na⁺(aq) at the top of the E.C.S. have negligible oxidizing power in normal reactions.',
    },
  },
  {
    id: 'iron-iii-salt',
    name: {
      zh: '鐵(III) 鹽溶液',
      en: 'Iron(III) Salt Solution',
    },
    formula: 'Fe³⁺(aq)',
    category: {
      zh: '過渡金屬離子氧化劑',
      en: 'Transition Metal Ion Oxidant',
    },
    clue: {
      zh: '黃色溶液（如 Fe₂(SO₄)₃ 或 FeCl₃）；可與亞硫酸鹽或碘離子發生氧化還原反應。',
      en: 'Yellow aqueous solution (e.g. FeCl₃); oxidizes I⁻ or SO₃²⁻.',
    },
    role: 'OA',
    bannerBg: '#B78C32',
    illustration: 'beaker_yellow',
    beforeColor: '#FACC15',
    beforeLabel: { zh: '黃色', en: 'Yellow' },
    afterColor: '#A7F3D0',
    afterLabel: { zh: '淺綠色', en: 'Pale green' },
    speciesChange: 'Fe³⁺(aq) → Fe²⁺(aq)',
    observation: {
      zh: '溶液由黃色變為淺綠色（若與 I⁻ 反應則被碘的棕色遮蓋）。',
      en: 'Yellow solution turns pale green (unless masked by brown I₂).',
    },
    halfEquation: 'Fe³⁺(aq) + e⁻ → Fe²⁺(aq)',
    oxidationChange: {
      zh: 'Fe 的氧化數由 +3 減少至 +2',
      en: 'Oxidation number of Fe decreases from +3 to +2',
    },
    explanation: {
      zh: 'Fe³⁺(aq) 獲得 1 個電子還原為 Fe²⁺(aq)，因此在許多反應中作為溫和氧化劑。',
      en: 'Fe³⁺(aq) gains 1 electron to be reduced to Fe²⁺(aq).',
    },
  },

  // ==========================================
  // COMMON REDUCING AGENTS - Swipe Right (RA)
  // ==========================================
  {
    id: 'sodium-metal',
    name: {
      zh: '鈉',
      en: 'Sodium',
    },
    formula: 'Na(s)',
    category: {
      zh: '活潑金屬還原劑',
      en: 'Reactive Metal Reducing Agent',
    },
    clue: {
      zh: '質軟的銀灰色第 I 族金屬，須貯存於石蠟油中。',
      en: 'Soft silvery-grey Group I metal stored under paraffin oil.',
    },
    role: 'RA',
    bannerBg: '#5A6B7C',
    illustration: 'metal_block',
    beforeColor: '#94A3B8',
    beforeLabel: { zh: '灰色固體', en: 'Grey solid' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 Na⁺(aq)', en: 'Colourless Na⁺(aq)' },
    speciesChange: 'Na(s) → Na⁺(aq)',
    observation: {
      zh: '灰色的金屬固體溶解，生成無色的鈉離子溶液 Na⁺(aq)。',
      en: 'Grey solid metal dissolves to form a colourless Na⁺(aq) solution.',
    },
    halfEquation: 'Na(s) → Na⁺(aq) + e⁻',
    oxidationChange: {
      zh: 'Na 的氧化數由 0 增加至 +1',
      en: 'Oxidation number of Na increases from 0 to +1',
    },
    explanation: {
      zh: '位於電化序較高位置的金屬容易失去電子形成正離子，因此是強還原劑。',
      en: 'Metals high in the electrochemical series lose electrons readily to form cations.',
    },
    examTip: {
      zh: '在電化序中，金屬位置越高，失去電子的傾向越大，還原能力亦越強（其中以鉀 K(s) 最強）。',
      en: 'In the electrochemical series (E.C.S.), higher metal position means stronger reducing power (with K(s) the strongest).',
    },
  },
  {
    id: 'potassium-metal',
    name: {
      zh: '鉀',
      en: 'Potassium',
    },
    formula: 'K(s)',
    category: {
      zh: '最強金屬還原劑',
      en: 'Strongest Reducing Agent',
    },
    clue: {
      zh: '原子序 19 的第 I 族鹼金屬，質軟，須貯存於石蠟油中。',
      en: 'Atomic no. 19 Group I alkali metal; soft solid stored under paraffin oil.',
    },
    role: 'RA',
    bannerBg: '#64748B',
    illustration: 'metal_block',
    beforeColor: '#94A3B8',
    beforeLabel: { zh: '銀灰色固體', en: 'Silvery-grey solid' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 K⁺(aq)', en: 'Colourless K⁺(aq)' },
    speciesChange: 'K(s) → K⁺(aq)',
    observation: {
      zh: '金屬鉀劇烈反應並溶解成無色 K⁺(aq)（與水反應會產生紫色火焰）。',
      en: 'Potassium dissolves vigorously to form colourless K⁺(aq) (lilac flame with water).',
    },
    halfEquation: 'K(s) → K⁺(aq) + e⁻',
    oxidationChange: {
      zh: 'K 的氧化數由 0 增加至 +1',
      en: 'Oxidation number of K increases from 0 to +1',
    },
    explanation: {
      zh: 'K(s) 位於電化序的最高位置，失去電子的傾向最大，是 HKDSE 課程中最強的還原劑。',
      en: 'K(s) sits at the top of the electrochemical series and has the highest tendency to lose electrons.',
    },
    examTip: {
      zh: '電化序重點：最強還原劑是鉀 K(s)，最強氧化劑是氟 F₂(g)。',
      en: 'Key E.C.S. fact: K(s) is the strongest reducing agent; F₂(g) is the strongest oxidizing agent.',
    },
  },
  {
    id: 'sulphur-dioxide',
    name: {
      zh: '二氧化硫',
      en: 'Sulphur Dioxide',
    },
    formula: 'SO₂(g)',
    category: {
      zh: '常見氣體還原劑',
      en: 'Common Gaseous Reducing Agent',
    },
    clue: {
      zh: '無色刺鼻氣體；常通入酸化重鉻酸鉀或酸化高錳酸鉀溶液中進行測試。',
      en: 'Colourless pungent gas; commonly bubbled into acidified KMnO₄ or K₂Cr₂O₇.',
    },
    role: 'RA',
    bannerBg: '#5E748B',
    illustration: 'gas_jar_clear',
    beforeColor: '#F1F5F9',
    beforeColorBorder: '#94A3B8',
    beforeLabel: { zh: '無色氣體', en: 'Colourless gas' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 SO₄²⁻(aq)', en: 'Colourless SO₄²⁻(aq)' },
    speciesChange: 'SO₂(g) → SO₄²⁻(aq)',
    observation: {
      zh: '無色氣體溶解並被氧化成無色硫酸根離子 SO₄²⁻(aq)，能使酸化重鉻酸鉀由橙變綠。',
      en: 'Colourless gas is oxidized to colourless SO₄²⁻(aq); turns acidified Cr₂O₇²⁻ green.',
    },
    halfEquation: 'SO₂(g) + 2H₂O(l) → SO₄²⁻(aq) + 4H⁺(aq) + 2e⁻',
    oxidationChange: {
      zh: 'S 的氧化數由 +4 增加至 +6',
      en: 'Oxidation number of S increases from +4 to +6',
    },
    explanation: {
      zh: 'SO₂ 中的硫處於中間氧化數 (+4)，在水溶液中容易失去 2 個電子被氧化為 +6 的硫酸根離子。',
      en: 'Sulphur (+4) in SO₂ loses 2 electrons in water to form sulphate ion (+6).',
    },
    examTip: {
      zh: 'SO₂ 與酸化 KMnO₄ 或酸化 K₂Cr₂O₇ 反應時作還原劑；但與 H₂S 反應生成 S 時卻作氧化劑。',
      en: 'SO₂ acts as a reducing agent with acidified KMnO₄/K₂Cr₂O₇, though it acts as an oxidizing agent with H₂S.',
    },
  },
  {
    id: 'sulphite-ion',
    name: {
      zh: '亞硫酸鹽溶液',
      en: 'Sulphite Solution',
    },
    formula: 'SO₃²⁻(aq)',
    category: {
      zh: '常見離子還原劑',
      en: 'Common Ionic Reducing Agent',
    },
    clue: {
      zh: '無色溶液（如 Na₂SO₃(aq)）；遇強氧化劑時能把其還原並自身轉化為硫酸根。',
      en: 'Colourless solution (e.g. Na₂SO₃(aq)); oxidized to sulphate by oxidants.',
    },
    role: 'RA',
    bannerBg: '#546E7A',
    illustration: 'beaker_clear',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色溶液', en: 'Colourless solution' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 SO₄²⁻(aq)', en: 'Colourless SO₄²⁻(aq)' },
    speciesChange: 'SO₃²⁻(aq) → SO₄²⁻(aq)',
    observation: {
      zh: '無色的亞硫酸根離子 SO₃²⁻(aq) 被氧化成無色的硫酸根離子 SO₄²⁻(aq)。',
      en: 'Colourless SO₃²⁻(aq) is oxidized to colourless SO₄²⁻(aq).',
    },
    halfEquation: 'SO₃²⁻(aq) + H₂O(l) → SO₄²⁻(aq) + 2H⁺(aq) + 2e⁻',
    oxidationChange: {
      zh: 'S 的氧化數由 +4 增加至 +6',
      en: 'Oxidation number of S increases from +4 to +6',
    },
    explanation: {
      zh: 'SO₃²⁻(aq) 失去 2 個電子並把氧化劑還原（如使溴水褪色或使酸化 KMnO₄ 褪色）。',
      en: 'SO₃²⁻(aq) donates 2 electrons, reducing oxidants such as Br₂(aq) or acidified MnO₄⁻(aq).',
    },
  },
  {
    id: 'iron-ii-salt',
    name: {
      zh: '鐵(II) 鹽溶液',
      en: 'Iron(II) Salt Solution',
    },
    formula: 'Fe²⁺(aq)',
    category: {
      zh: '過渡金屬離子還原劑',
      en: 'Transition Metal Ion Reductant',
    },
    clue: {
      zh: '淺綠色溶液（如 FeSO₄(aq)）；在空氣中或遇氧化劑時容易進一步被氧化。',
      en: 'Pale green solution (e.g. FeSO₄(aq)); readily oxidized to higher state.',
    },
    role: 'RA',
    bannerBg: '#3D7A68',
    illustration: 'beaker_green',
    beforeColor: '#86EFAC',
    beforeLabel: { zh: '淺綠色', en: 'Pale green' },
    afterColor: '#FACC15',
    afterLabel: { zh: '黃色', en: 'Yellow' },
    speciesChange: 'Fe²⁺(aq) → Fe³⁺(aq)',
    observation: {
      zh: '溶液由淺綠色變為黃色（Fe³⁺(aq)）。',
      en: 'Pale green solution turns yellow (Fe³⁺(aq)).',
    },
    halfEquation: 'Fe²⁺(aq) → Fe³⁺(aq) + e⁻',
    oxidationChange: {
      zh: 'Fe 的氧化數由 +2 增加至 +3',
      en: 'Oxidation number of Fe increases from +2 to +3',
    },
    explanation: {
      zh: 'Fe²⁺(aq) 容易失去 1 個電子，被氧化成較穩定的黃色 Fe³⁺(aq)，是經典滴定還原劑。',
      en: 'Fe²⁺(aq) loses 1 electron to form yellow Fe³⁺(aq).',
    },
  },
  {
    id: 'hydrogen-gas',
    name: {
      zh: '氫',
      en: 'Hydrogen',
    },
    formula: 'H₂(g)',
    category: {
      zh: '非金屬還原劑',
      en: 'Non-metal Reducing Agent',
    },
    clue: {
      zh: '無色氣體；在高溫下可把銅(II) 氧化物還原為銅金屬，或在燃料電池中失去電子。',
      en: 'Colourless gas; reduces heated CuO to Cu or loses electrons in fuel cells.',
    },
    role: 'RA',
    bannerBg: '#4E6B8C',
    illustration: 'gas_jar_clear',
    beforeColor: '#F1F5F9',
    beforeColorBorder: '#94A3B8',
    beforeLabel: { zh: '無色 H₂(g)', en: 'Colourless H₂(g)' },
    afterColor: '#F8FAFC',
    afterColorBorder: '#CBD5E1',
    afterLabel: { zh: '無色 H⁺(aq)', en: 'Colourless H⁺(aq)' },
    speciesChange: 'H₂(g) → H⁺(aq)',
    observation: {
      zh: '無色氫氣被氧化生成無色氫離子 H⁺(aq)（燃燒或還原金屬氧化物時則生成水）。',
      en: 'Colourless H₂(g) is oxidized to colourless H⁺(aq) (or water with oxides).',
    },
    halfEquation: 'H₂(g) → 2H⁺(aq) + 2e⁻',
    oxidationChange: {
      zh: 'H 的氧化數由 0 增加至 +1',
      en: 'Oxidation number of H increases from 0 to +1',
    },
    explanation: {
      zh: 'H₂(g) 在化學反應中失去電子使 H 的氧化數由 0 升至 +1，把其他物質還原。',
      en: 'H₂(g) loses electrons as hydrogen is oxidized from 0 to +1.',
    },
  },
  {
    id: 'carbon-coke',
    name: {
      zh: '碳（焦炭）',
      en: 'Carbon (Coke)',
    },
    formula: 'C(s)',
    category: {
      zh: '工業還原劑',
      en: 'Industrial Reducing Agent',
    },
    clue: {
      zh: '黑色固體；於高爐內高溫加熱時，廣泛用於從礦石提取金屬（如鐵、銅）。',
      en: 'Black solid; heated in blast furnaces to extract metals like Fe and Cu from ores.',
    },
    role: 'RA',
    bannerBg: '#374151',
    illustration: 'coke_solid',
    beforeColor: '#1E293B',
    beforeLabel: { zh: '黑色固體', en: 'Black solid' },
    afterColor: '#F1F5F9',
    afterColorBorder: '#94A3B8',
    afterLabel: { zh: '無色 CO(g) / CO₂(g)', en: 'Colourless CO / CO₂(g)' },
    speciesChange: 'C(s) → CO(g) / CO₂(g)',
    observation: {
      zh: '黑色固體消耗，生成無色氣體一氧化碳 CO(g) 或二氧化碳 CO₂(g)。',
      en: 'Black solid is consumed to give colourless CO(g) or CO₂(g).',
    },
    halfEquation: 'C(s) + 2O²⁻ → CO₂(g) + 4e⁻',
    oxidationChange: {
      zh: 'C 的氧化數由 0 增加至 +2 (CO) 或 +4 (CO₂)',
      en: 'Oxidation number of C increases from 0 to +2 (CO) or +4 (CO₂)',
    },
    explanation: {
      zh: '碳在高溫下能奪取金屬氧化物中的氧，碳的氧化數增加至 +2 或 +4，是重要的還原劑。',
      en: 'Carbon removes oxygen from metal oxides at high temperatures, increasing its oxidation state.',
    },
    examTip: {
      zh: '碳（焦炭）是價格最便宜的還原劑！（相對地，氧是最便宜的氧化劑。）',
      en: 'Carbon (coke) is the cheapest reducing agent used in industry!',
    },
  },
  {
    id: 'iodide-ion',
    name: {
      zh: '碘化物溶液',
      en: 'Iodide Solution',
    },
    formula: 'I⁻(aq)',
    category: {
      zh: '鹵化物還原劑',
      en: 'Halide Reducing Agent',
    },
    clue: {
      zh: '無色溶液（如碘化鉀 KI(aq)）；遇酸化高錳酸鉀、氯水或濃硫酸時顏色變化極為明顯。',
      en: 'Colourless solution (e.g. KI(aq)); gives an unmistakable colour change with oxidants.',
    },
    role: 'RA',
    bannerBg: '#7C5841',
    illustration: 'beaker_clear',
    beforeColor: '#F8FAFC',
    beforeColorBorder: '#CBD5E1',
    beforeLabel: { zh: '無色 I⁻(aq)', en: 'Colourless I⁻(aq)' },
    afterColor: '#92400E',
    afterLabel: { zh: '棕色 I₂(aq)', en: 'Brown I₂(aq)' },
    speciesChange: '2I⁻(aq) → I₂(aq)',
    observation: {
      zh: '溶液由無色變為棕色（溶於水的碘 I₂(aq) 呈棕色；若加入澱粉溶液會呈深藍色）。',
      en: 'Colourless solution turns brown (aqueous I₂ is brown; blue-black with starch).',
    },
    halfEquation: '2I⁻(aq) → I₂(aq) + 2e⁻',
    oxidationChange: {
      zh: 'I 的氧化數由 −1 增加至 0',
      en: 'Oxidation number of I increases from −1 to 0',
    },
    explanation: {
      zh: 'I⁻(aq) 容易失去電子並氧化為棕色的碘 I₂(aq)，是 HKDSE 常見的還原劑。',
      en: 'Iodide ions readily lose electrons to form brown aqueous iodine I₂(aq).',
    },
    examTip: {
      zh: '注意：碘水 I₂(aq) 呈「棕色」（只有固體 I₂ 才是紫黑色，溶於有機溶劑則呈紫色）！',
      en: 'Important HKDSE wording: I₂(aq) is brown (not purple — purple only in organic solvent).',
    },
  },
];
