/*! bento-shad-ui v0.2.1 | MIT | https://github.com/SaadNiaziDev/bento-shad-ui */
"use strict";
var BentoIllustrations = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/illustrations/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    characters: () => characters,
    draw: () => draw,
    isCharacterId: () => isCharacterId,
    isMood: () => isMood,
    moods: () => moods,
    mount: () => mount,
    renderCharacter: () => renderCharacter
  });

  // src/illustrations/characters.ts
  var ground = (s, x1 = 44, x2 = 156, y = 189) => {
    const mid = (x1 + x2) / 2;
    s.hatch(`M${x1} ${y} Q${mid} ${y - 8} ${x2} ${y} Q${mid} ${y + 8} ${x1} ${y}Z`);
    s.soft(`M${x1 + 6} ${y + 2} Q${mid} ${y + 7} ${x2 - 6} ${y + 2}`, 0.9);
  };
  var mira = {
    id: "mira",
    name: "Mira",
    kind: "person",
    role: "The planner. Curious, organised, always one step ahead with a paper map.",
    traits: ["Curly top bun", "Round glasses", "Freckles", "Striped scarf", "Folded paper map"],
    bestFor: ["Onboarding", "Success", "Plans and schedules"],
    face: { eyes: [[86, 82], [114, 82]], eyeScale: 0.95, mouth: { at: [100, 101], w: 6 }, cheeks: [[78, 95], [122, 95]], bubble: [136, 46] },
    draw(s) {
      ground(s);
      s.line("M88 172 L87 186 M112 172 L113 186");
      s.fill("M80 186 q7 -5 13 0 q0 4 -13 3Z M107 186 q7 -5 13 0 q0 4 -13 3Z", s.palette.brand, 0.85);
      s.line("M80 186 q7 -5 13 0 q0 4 -13 3Z M107 186 q7 -5 13 0 q0 4 -13 3Z", 1.4);
      const sweater = "M71 126 C76 118 88 116 100 116 C112 116 124 118 129 126 L136 172 Q100 180 64 172Z";
      s.fill(sweater, s.palette.sky);
      s.line(sweater);
      s.soft("M74 160 Q100 166 126 160");
      s.line("M72 130 Q60 148 62 164");
      s.line("M128 130 Q141 146 140 166");
      s.dot(140, 167, 3.6);
      const map = "M44 146 L66 141 L70 168 L48 173Z";
      s.paper(map);
      s.fill(map, s.palette.butter, 0.9);
      s.line(map, 1.5);
      s.soft("M51 144.5 L55 171.2 M58 143 L62 169.6", 0.9);
      s.raw('<path d="M48 166 C52 158 56 162 58 154 S64 150 66 146" fill="none" stroke="currentColor" stroke-width="1.1" stroke-dasharray="2.2 2.4" opacity=".8"/>');
      s.line("M64 147 l3 -3 M64 144 l3 3", 1.3);
      const scarf = "M72 117 C84 127 116 127 128 117 L130 127 C116 138 84 138 70 127Z";
      s.fill(scarf, s.palette.peach);
      s.line(scarf);
      s.soft("M80 122 L79 133 M90 125 L89 136 M100 126 L100 137 M110 125 L111 136 M120 122 L121 133", 1.6);
      const tail = "M108 133 L116 160 L105 162 L100 135Z";
      s.fill(tail, s.palette.peach);
      s.line(tail);
      s.soft("M104 146 L113 144 M106 154 L115 152", 1.6);
      s.line("M64 78 q-8 1 -6 10 q2 5 7 3 M136 78 q8 1 6 10 q-2 5 -7 3", 1.4);
      s.line("M63 80 C62 56 80 42 100 42 C120 42 138 56 137 80 C137 102 121 116 100 116 C79 116 63 102 63 80Z");
      const hair = "M62 76 C58 50 80 34 100 34 C122 34 143 50 138 76 C130 63 118 56 103 58 C94 67 80 71 62 76Z";
      s.hatch(hair, true, true);
      s.line(hair);
      const bun = "M84 30 C80 16 92 6 102 7 C114 8 121 19 116 31 C110 36 90 36 84 30Z";
      s.hatch(bun, true, true);
      s.line(bun);
      s.soft("M89 22 q4 -6 9 -1 q5 5 10 -1 M88 29 q5 -4 9 0 q5 4 10 -1", 1.2);
      s.paper("M76 82 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0Z M104 82 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0Z");
      s.line("M76 82 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 M104 82 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 M96 81 Q100 77.5 104 81 M76 80 L64 77 M124 80 L136 77", 1.5);
      s.soft("M100 89 q-2.5 4 1 5", 1.2);
      for (const [x, y] of [[77, 97], [81, 100], [74, 100], [123, 97], [119, 100], [126, 100]]) s.dot(x, y, 0.9);
    }
  };
  var theo = {
    id: "theo",
    name: "Theo",
    kind: "person",
    role: "The guide. Unhurried and kind, has seen every trail twice.",
    traits: ["Bucket hat", "Bushy moustache and brows", "Binoculars", "Smile lines", "Field jacket"],
    bestFor: ["Welcome screens", "Tips and help", "Guided tours"],
    face: { eyes: [[88, 84], [112, 84]], eyeScale: 0.85, brow: 2.8, mouth: { at: [100, 112], w: 5 }, bubble: [140, 44] },
    draw(s) {
      ground(s, 42, 158);
      s.line("M88 174 L87 186 M112 174 L113 186");
      s.fill("M78 186 q8 -6 14 0 q0 4 -14 3Z M108 186 q8 -6 14 0 q0 4 -14 3Z", s.palette.butter);
      s.line("M78 186 q8 -6 14 0 q0 4 -14 3Z M108 186 q8 -6 14 0 q0 4 -14 3Z", 1.4);
      const jacket = "M66 130 C72 122 86 120 100 120 C114 120 128 122 134 130 L141 175 Q100 183 59 175Z";
      s.fill(jacket, s.palette.mint);
      s.line(jacket);
      s.line("M88 121 L100 138 L112 121", 1.5);
      s.soft("M100 138 L100 176 M72 158 h14 v10 h-14Z M114 158 h14 v10 h-14Z", 1.2);
      s.line("M66 134 Q55 152 59 170 M134 134 Q146 152 141 170");
      s.dot(59, 171, 3.8);
      s.dot(141, 171, 3.8);
      s.soft("M86 122 Q100 152 114 122", 1.3);
      s.fill("M85 142 h13 v15 h-13Z M102 142 h13 v15 h-13Z", s.palette.paper);
      s.hatch("M85 142 h13 v15 h-13Z M102 142 h13 v15 h-13Z", true);
      s.line("M85 142 h13 v15 h-13Z M102 142 h13 v15 h-13Z M98 147 h4", 1.5);
      s.line("M86.5 157 a5 3 0 0 0 10 0 M103.5 157 a5 3 0 0 0 10 0", 1.3);
      s.line("M65 86 q-8 0 -7 11 q2 6 8 4 M135 86 q8 0 7 11 q-2 6 -8 4", 1.4);
      s.line("M65 86 C65 62 80 50 100 50 C120 50 135 62 135 86 C135 108 120 120 100 120 C80 120 65 108 65 86Z");
      s.soft("M75 82 l-5 -3 M75 86.5 l-5 1.2 M125 82 l5 -3 M125 86.5 l5 1.2", 1.1);
      s.line("M96 91 C92 99 98 104 105 100", 1.5);
      const stache = "M83 106 C87 97 98 99 100 103 C102 99 113 97 117 106 C111 110 104 108 100 105.5 C96 108 89 110 83 106Z";
      s.hatch(stache, true, true);
      s.line(stache, 1.5);
      const crown = "M71 62 C71 40 85 31 100 31 C115 31 129 40 129 62Z";
      s.fill(crown, s.palette.butter);
      s.line(crown);
      s.hatch("M71 56 C85 52 115 52 129 56 L129 62 C115 58 85 58 71 62Z", true);
      const brim = "M55 65 C70 56 130 56 145 65 C138 73 62 73 55 65Z";
      s.fill(brim, s.palette.butter);
      s.line(brim);
      s.soft("M62 66 C80 62 120 62 138 66", 1);
    }
  };
  var zara = {
    id: "zara",
    name: "Zara",
    kind: "person",
    role: "The connector. Always on a call, always the first to know.",
    traits: ["Hijab", "Over-ear headphones", "Phone with a star sticker", "Long lashes"],
    bestFor: ["Messages and chat", "Notifications", "Offline states"],
    face: { eyes: [[90, 87], [110, 87]], eyeScale: 0.9, mouth: { at: [100, 104], w: 5.5 }, cheeks: [[83, 97], [117, 97]], bubble: [142, 40] },
    draw(s) {
      ground(s);
      s.line("M89 176 L88 186 M111 176 L112 186");
      s.fill("M80 186 q7 -5 13 0 q0 4 -13 3Z M107 186 q7 -5 13 0 q0 4 -13 3Z", s.palette.lilac);
      s.line("M80 186 q7 -5 13 0 q0 4 -13 3Z M107 186 q7 -5 13 0 q0 4 -13 3Z", 1.4);
      const dress = "M64 146 L136 146 L143 176 Q100 184 57 176Z";
      s.fill(dress, s.palette.sky);
      s.line(dress);
      s.soft("M82 150 L78 176 M118 150 L122 176", 1.1);
      const hijab = "M58 88 C56 56 78 38 100 38 C122 38 144 56 142 88 C142 112 130 126 118 132 L138 148 L62 148 L82 132 C70 126 58 112 58 88Z";
      s.fill(hijab, s.palette.lilac);
      s.line(hijab);
      s.soft("M66 112 C72 128 86 134 96 136 M134 112 C128 128 114 134 104 136 M70 138 Q100 146 130 138", 1.2);
      const face = "M75 88 C75 66 87 56 100 56 C113 56 125 66 125 88 C125 106 114 117 100 117 C86 117 75 106 75 88Z";
      s.paper(face);
      s.line(face, 1.6);
      s.soft("M100 92 q-2 4 1.5 5", 1.2);
      s.soft("M84 84 l-2.5 -2.2 M85.5 82.6 l-1.6 -2.6 M116 84 l2.5 -2.2 M114.5 82.6 l1.6 -2.6", 1);
      s.line("M62 74 C62 34 138 34 138 74", 3.2);
      s.fill("M54 70 q0 -6 7 -6 h3 q4 0 4 5 v18 q0 5 -4 5 h-3 q-7 0 -7 -6Z M146 70 q0 -6 -7 -6 h-3 q-4 0 -4 5 v18 q0 5 4 5 h3 q7 0 7 -6Z", s.palette.brand, 0.9);
      s.line("M54 70 q0 -6 7 -6 h3 q4 0 4 5 v18 q0 5 -4 5 h-3 q-7 0 -7 -6Z M146 70 q0 -6 -7 -6 h-3 q-4 0 -4 5 v18 q0 5 4 5 h3 q7 0 7 -6Z", 1.5);
      s.line("M64 150 Q56 164 60 174");
      s.line("M136 150 Q150 140 143 122");
      const phone = "M131 98 L147 96 L150 124 L134 126Z";
      s.paper(phone);
      s.line(phone, 1.6);
      s.soft("M134.5 103 L146 101.6 L148.4 119.6 L136.6 121", 1);
      s.fill("M139 108 l1.6 3.4 l3.6 0.4 l-2.7 2.4 l0.8 3.6 l-3.2 -1.9 l-3.2 1.7 l0.9 -3.5 l-2.6 -2.5 l3.6 -0.3Z", s.palette.butter);
      s.soft("M139 108 l1.6 3.4 l3.6 0.4 l-2.7 2.4 l0.8 3.6 l-3.2 -1.9 l-3.2 1.7 l0.9 -3.5 l-2.6 -2.5 l3.6 -0.3Z", 1);
      s.dot(144, 124, 3.6);
    }
  };
  var kofi = {
    id: "kofi",
    name: "Kofi",
    kind: "person",
    role: "The explorer. Nine years old, unstoppable, folds a paper plane for every trip.",
    traits: ["Twists", "Gap-tooth grin", "Backpack with a star patch", "Paper plane", "Hoodie"],
    bestFor: ["Celebrations", "First-run moments", "Achievements"],
    face: { eyes: [[88, 92], [112, 92]], eyeScale: 1.1, mouth: { at: [100, 108], w: 6, style: "gap" }, cheeks: [[79, 103], [121, 103]], bubble: [134, 52] },
    draw(s) {
      ground(s, 50, 150);
      s.line("M90 168 L89 182 M110 168 L111 182");
      s.fill("M80 182 q8 -6 15 0 q0 5 -15 4Z M105 182 q8 -6 15 0 q0 5 -15 4Z", s.palette.brand, 0.85);
      s.line("M80 182 q8 -6 15 0 q0 5 -15 4Z M105 182 q8 -6 15 0 q0 5 -15 4Z", 1.4);
      s.soft("M83 184 h9 M108 184 h9", 1);
      const pack = "M64 128 q-2 -6 6 -8 L76 120 L76 162 L68 162 q-6 0 -6 -6Z M136 128 q2 -6 -6 -8 L124 120 L124 162 L132 162 q6 0 6 -6Z";
      s.fill(pack, s.palette.butter);
      s.line(pack, 1.5);
      const hoodie = "M74 128 C78 121 89 119 100 119 C111 119 122 121 126 128 L130 168 Q100 175 70 168Z";
      s.fill(hoodie, s.palette.mint);
      s.line(hoodie);
      s.soft("M86 150 h28 v12 h-28Z M95 124 L94 136 M105 124 L106 136", 1.2);
      s.fill("M80 134 l1.8 3.8 l4 0.5 l-3 2.7 l0.9 4 l-3.6 -2.1 l-3.6 1.9 l1 -3.9 l-2.9 -2.8 l4 -0.4Z", s.palette.brand, 0.9);
      s.soft("M80 134 l1.8 3.8 l4 0.5 l-3 2.7 l0.9 4 l-3.6 -2.1 l-3.6 1.9 l1 -3.9 l-2.9 -2.8 l4 -0.4Z", 1);
      s.line("M76 132 Q66 148 68 162");
      s.line("M124 132 Q138 124 142 108");
      s.dot(142, 106, 3.6);
      const plane = "M134 92 L170 80 L150 102 L146 94Z";
      s.paper(plane);
      s.line(plane + " M146 94 L170 80", 1.4);
      s.raw('<path d="M132 96 q-8 4 -14 2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2.6" opacity=".6"/>');
      s.line("M67 92 q-8 1 -6 11 q2 5 7 3 M133 92 q8 1 6 11 q-2 5 -7 3", 1.4);
      s.line("M66 92 C66 68 82 56 100 56 C118 56 134 68 134 92 C134 112 119 124 100 124 C81 124 66 112 66 92Z");
      s.soft("M100 98 q-2.5 4 1 5", 1.2);
      const twists = [[70, 76], [76, 64], [86, 56], [98, 52], [110, 54], [121, 60], [129, 70]];
      for (const [x, y] of twists) {
        const d = `M${x - 5} ${y + 6} C${x - 7} ${y - 2} ${x - 2} ${y - 8} ${x + 2} ${y - 7} C${x + 7} ${y - 6} ${x + 7} ${y + 2} ${x + 5} ${y + 6}Z`;
        s.hatch(d, true, true);
        s.line(d, 1.4);
      }
    }
  };
  var pip = {
    id: "pip",
    name: "Pip",
    kind: "animal",
    role: "The owl who has read everything. Calm, a little smug, never lost for an answer.",
    traits: ["Mismatched eyes", "Monocle on a chain", "Ear tufts", "Sits on a stack of books"],
    bestFor: ["Empty states", "Search with no results", "Help and docs"],
    face: { eyes: [[83, 88], [117, 89]], eyeScale: 1.25, bubble: [140, 46] },
    draw(s) {
      const b1 = "M56 176 h88 q4 0 4 4 v4 q0 4 -4 4 h-88Z";
      const b2 = "M64 166 h74 q3 0 3 3 v4 q0 3 -3 3 h-74Z";
      s.fill(b1, s.palette.sky);
      s.fill(b2, s.palette.peach);
      s.line(b1 + " " + b2, 1.5);
      s.soft("M60 180 h80 M68 170 h66 M132 166 v10", 1);
      const tufts = "M70 62 C66 52 60 44 58 34 C66 38 74 44 80 52 C78 46 78 42 79 38 C84 44 88 50 88 56Z M130 62 C134 52 140 44 142 34 C134 38 126 44 120 52 C122 46 122 42 121 38 C116 44 112 50 112 56Z";
      s.fill(tufts, s.palette.butter);
      s.line(tufts, 1.5);
      s.soft("M64 42 l6 6 M73 46 l3 6 M136 42 l-6 6 M127 46 l-3 6", 1);
      const body = "M60 112 C60 72 78 48 100 48 C122 48 140 72 140 112 C140 148 124 166 100 166 C76 166 60 148 60 112Z";
      s.fill(body, s.palette.butter);
      s.line(body);
      const belly = "M78 122 C78 112 88 106 100 106 C112 106 122 112 122 122 C122 146 112 160 100 160 C88 160 78 146 78 122Z";
      s.fill(belly, s.palette.peach, 0.9);
      s.line(belly, 1.3);
      s.soft("M88 124 q4 4 8 0 M104 124 q4 4 8 0 M96 134 q4 4 8 0 M88 144 q4 4 8 0 M104 144 q4 4 8 0", 1.2);
      const wings = "M62 104 C46 120 50 146 66 154 C70 140 70 120 62 104Z M138 104 C154 120 150 146 134 154 C130 140 130 120 138 104Z";
      s.hatch(wings);
      s.line(wings);
      s.line("M88 166 l-4 9 M91 166 l0 10 M94 166 l4 9 M106 166 l-4 9 M109 166 l0 10 M112 166 l4 9", 1.5);
      s.paper("M65 88 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0Z M102 89 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0Z");
      s.line("M65 88 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0 M102 89 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0", 1.6);
      s.line("M62 88 a21 21 0 1 0 42 0 a21 21 0 1 0 -42 0", 1.2);
      s.raw('<path d="M66 102 C60 118 66 132 76 140" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1.6 2.2" opacity=".75"/>');
      const beak = "M95 103 L105 103 L100 114Z";
      s.fill(beak, s.palette.brand);
      s.line(beak, 1.5);
    }
  };
  var dumpling = {
    id: "dumpling",
    name: "Dumpling",
    kind: "animal",
    role: "The cat who knocks things off tables, then looks very sorry about it.",
    traits: ["One bent ear", "Bell collar", "Striped tail", "Very round"],
    bestFor: ['Errors and "oops" moments', "Failed actions", "Undo prompts"],
    face: { eyes: [[86, 82], [114, 82]], eyeScale: 1.05, mouth: { at: [100, 97], w: 5, style: "cat" }, cheeks: [[78, 94], [122, 94]], bubble: [138, 46] },
    draw(s) {
      ground(s, 48, 162);
      const tail = "M134 168 C156 166 168 146 160 126 C156 118 148 120 150 128 C156 144 148 158 132 160Z";
      s.fill(tail, s.palette.peach);
      s.line(tail);
      s.soft("M156 128 l-6 3 M160 140 l-7 1 M156 152 l-7 -2", 1.6);
      const body = "M58 150 C52 120 72 102 100 102 C128 102 148 120 142 150 C140 172 122 184 100 184 C78 184 60 172 58 150Z";
      s.fill(body, s.palette.peach);
      s.line(body);
      s.soft("M66 134 l8 2 M64 146 l9 0 M136 134 l-8 2 M138 146 l-9 0", 1.4);
      const belly = "M87 146 C87 134 93 128 100 128 C107 128 113 134 113 146 C113 160 107 169 100 169 C93 169 87 160 87 146Z";
      s.fill(belly, s.palette.butter, 0.85);
      s.soft(belly, 1);
      s.line("M86 180 q-6 0 -6 -5 q0 -5 7 -4 M114 180 q6 0 6 -5 q0 -5 -7 -4", 1.5);
      const ears = "M66 64 L66 34 L91 50Z M110 50 L130 40 L136 64Z";
      s.fill(ears, s.palette.peach);
      s.line("M66 64 L66 34 L91 50 M110 50 L130 40 L136 64");
      s.fill("M71 56 L71 43 L83 51Z", s.palette.blush, 0.4, false);
      const fold = "M130 40 L139 33 L135 48Z";
      s.fill(fold, s.palette.peach);
      s.line(fold, 1.5);
      const head = "M62 82 C62 60 80 48 100 48 C120 48 138 60 138 82 C138 104 120 114 100 114 C80 114 62 104 62 82Z";
      s.fill(head, s.palette.peach);
      s.line(head);
      s.soft("M94 52 l2 9 M100 50 l0 10 M106 52 l-2 9", 1.6);
      s.fill("M96 90 h8 l-4 4Z", s.palette.blush, 0.8);
      s.line("M96 90 h8 l-4 4Z", 1.2);
      s.soft("M74 92 l-17 -4 M74 96 l-17 1 M126 92 l17 -4 M126 96 l17 1", 1);
      s.line("M72 110 Q100 124 128 110", 2.4);
      s.fill("M95 120 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0Z", s.palette.butter);
      s.line("M95 120 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M96 121.5 h8", 1.3);
      s.dot(100, 124, 1);
    }
  };
  var biscuit = {
    id: "biscuit",
    name: "Biscuit",
    kind: "animal",
    role: "The dachshund who will sniff out anything, as long as it is roughly at nose height.",
    traits: ["Extra-long body", "Floppy ear", "Polka-dot bandana", "Wagging tail"],
    bestFor: ["404 and not found", "Search", "Lost connections"],
    face: { eyes: [[146, 88], [162, 86]], eyeScale: 0.9, mouth: { at: [170, 108], w: 4.5 }, bubble: [172, 56] },
    draw(s) {
      ground(s, 34, 178, 176);
      s.line("M46 128 Q30 116 34 100", 2);
      s.soft("M40 120 l-4 -2 M36 110 l-4 1", 1);
      const legs = "M58 144 q-3 24 4 26 h8 q4 -2 2 -26Z M76 148 q-2 22 4 23 h8 q4 -2 1 -23Z M124 148 q-2 22 4 23 h8 q4 -2 1 -23Z M140 144 q-2 24 4 26 h8 q4 -2 2 -26Z";
      s.fill(legs, s.palette.butter);
      s.line(legs, 1.5);
      s.soft("M62 170 v-3 M66 170 v-3 M80 171 v-3 M84 171 v-3 M128 171 v-3 M132 171 v-3 M144 170 v-3 M148 170 v-3", 0.9);
      const body = "M46 132 C46 116 60 110 78 110 L138 110 C154 110 162 120 160 136 C158 150 148 156 134 156 L70 156 C56 156 46 148 46 132Z";
      s.fill(body, s.palette.butter);
      s.line(body);
      s.soft("M70 150 Q100 158 130 150", 1.1);
      s.hatch("M78 112 L132 112 C126 120 86 120 78 112Z");
      const head = "M128 92 C128 72 142 62 156 64 C172 66 180 80 176 96 C172 110 158 116 146 112 C134 108 128 102 128 92Z";
      s.fill(head, s.palette.butter);
      s.line(head);
      const snout = "M168 94 C182 92 190 100 186 108 C182 114 170 112 166 106Z";
      s.fill(snout, s.palette.butter);
      s.line(snout);
      s.dot(186, 100, 3.6, 3);
      const ear = "M140 70 C126 72 122 96 128 112 C136 114 144 100 146 84Z";
      s.hatch(ear, true, true);
      s.line(ear);
      const bandana = "M132 108 L160 114 L146 132Z";
      s.fill(bandana, s.palette.peach);
      s.line(bandana, 1.5);
      for (const [x, y] of [[141, 113], [150, 116], [146, 123], [154, 120]]) s.dot(x, y, 1.2);
    }
  };
  var moss = {
    id: "moss",
    name: "Moss",
    kind: "animal",
    role: "The turtle who is never late, just takes the scenic route. A sprout grows from its shell.",
    traits: ["Sprout on the shell", "Hexagon shell", "Stubby legs", "Patient smile"],
    bestFor: ["Loading", "Waiting and progress", "Slow connections"],
    face: { eyes: [[38, 108], [54, 106]], eyeScale: 0.9, mouth: { at: [44, 120], w: 4.5 }, cheeks: [[30, 116], [60, 114]], bubble: [56, 74] },
    draw(s) {
      ground(s, 30, 172, 161);
      const legs = "M68 140 q-3 16 7 16 q9 0 7 -16Z M88 142 q-2 15 7 15 q8 0 7 -15Z M120 142 q-2 15 7 15 q8 0 7 -15Z M140 140 q-2 16 7 16 q9 0 6 -16Z";
      s.fill(legs, s.palette.mint, 0.8);
      s.line(legs, 1.5);
      s.line("M158 134 L172 138 L158 142", 1.5);
      const shell = "M54 140 C54 104 78 84 106 84 C134 84 158 104 158 140Z";
      s.fill(shell, s.palette.mint);
      s.line(shell);
      s.line("M46 140 Q106 150 166 140", 2.2);
      s.soft("M82 102 l12 -6 l12 6 l0 13 l-12 6 l-12 -6Z M106 102 l12 -6 l12 6 l0 13 l-12 6 l-12 -6Z M94 121 l12 -6 l12 6 l0 12 M70 121 l12 -6 l0 0 M130 115 l10 6 l0 12 M70 121 l0 12", 1.3);
      s.line("M106 84 C106 72 108 64 112 58", 1.6);
      const leaves = "M112 64 C120 54 130 58 128 66 C121 69 115 68 112 64Z M107 71 C99 62 92 66 93 73 C99 76 104 75 107 71Z";
      s.fill(leaves, s.palette.mint);
      s.hatch(leaves);
      s.line(leaves, 1.5);
      const head = "M66 132 C60 128 50 126 40 126 C26 126 20 116 22 106 C24 94 34 88 46 90 C58 92 66 102 68 116Z";
      s.fill(head, s.palette.mint, 0.75);
      s.line(head);
      s.soft("M60 120 q-4 4 -2 10", 1);
    }
  };
  var CHARACTERS = [mira, theo, zara, kofi, pip, dumpling, biscuit, moss];

  // src/illustrations/kit.ts
  var TOKEN_PALETTE = {
    peach: "var(--tint-peach, #ffd2b5)",
    sky: "var(--tint-sky, #cfe2fb)",
    mint: "var(--tint-mint, #cdeedb)",
    lilac: "var(--tint-lilac, #e2d8fb)",
    butter: "var(--tint-butter, #f9e7a8)",
    brand: "var(--brand, #ff7a45)",
    blush: "var(--chart-1, #ff7a45)",
    paper: "var(--card, #ffffff)"
  };
  var STATIC_PALETTE = {
    peach: "#ffd2b5",
    sky: "#cfe2fb",
    mint: "#cdeedb",
    lilac: "#e2d8fb",
    butter: "#f9e7a8",
    brand: "#ff7a45",
    blush: "#ff7a45",
    paper: "#ffffff"
  };
  var GRAPHITE = "#3b3b42";
  var n = (v) => +v.toFixed(2);
  var Sketch = class {
    constructor(id, palette) {
      this.id = id;
      this.palette = palette;
      this.out = [];
      this.buf = [];
      this.mode = null;
    }
    push(mode, svg) {
      if (mode !== this.mode) this.flush();
      this.mode = mode;
      this.buf.push(svg);
    }
    flush() {
      if (this.buf.length) {
        const inner = this.buf.join("");
        this.out.push(this.mode === "line" ? `<g filter="url(#${this.id}-wobble)">${inner}</g>` : this.mode === "grain" ? `<g filter="url(#${this.id}-grain)">${inner}</g>` : inner);
      }
      this.buf = [];
      this.mode = null;
    }
    /** A pencil line. `w` is the main stroke width. */
    line(d, w = 1.7) {
      this.push(
        "line",
        `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="${n(w * 0.55)}" stroke-linecap="round" stroke-linejoin="round" opacity=".42" transform="translate(.9 -.7)"/>`
      );
      return this;
    }
    /** A light single stroke (wrinkles, fur, folds). */
    soft(d, w = 1.1) {
      this.push("line", `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`);
      return this;
    }
    /** Coloured-pencil fill with paper grain. Opaque by default, so it hides what was drawn before. */
    fill(d, color, opacity = 1, opaque = true) {
      if (opaque) this.push("plain", `<path d="${d}" fill="${this.palette.paper}"/>`);
      this.push("grain", `<path d="${d}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`);
      return this;
    }
    /** Graphite hatching. `dense` for dark areas such as hair; `opaque` hides what is behind. */
    hatch(d, dense = false, opaque = false) {
      if (opaque) this.push("plain", `<path d="${d}" fill="${this.palette.paper}"/>`);
      this.push("plain", `<path d="${d}" fill="url(#${this.id}-${dense ? "hatch2" : "hatch"})"/>`);
      return this;
    }
    /** A solid graphite dot (pupils, freckles, noses). */
    dot(x, y, r, ry = r) {
      this.push("line", r === ry ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="currentColor"/>` : `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(r)}" ry="${n(ry)}" fill="currentColor"/>`);
      return this;
    }
    /** Paper-coloured area that hides what is behind it (eye whites, lenses, skin). */
    paper(d) {
      this.push("plain", `<path d="${d}" fill="${this.palette.paper}"/>`);
      return this;
    }
    /** Raw SVG drawn in pencil (wobbled). */
    raw(svg) {
      this.push("line", svg);
      return this;
    }
    defs() {
      const id = this.id;
      return `<defs><filter id="${id}-wobble" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="11" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.5 0 0 0 1.32" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter><pattern id="${id}-hatch" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="currentColor" stroke-width=".9" opacity=".38"/></pattern><pattern id="${id}-hatch2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-42)"><line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" stroke-width="1" opacity=".62"/></pattern></defs>`;
    }
    body() {
      this.flush();
      return this.out.join("");
    }
  };
  function drawFace(s, face, mood) {
    const k = face.eyeScale ?? 1;
    const bw = face.brow ?? 1.6;
    const [[lx, ly], [rx, ry]] = face.eyes;
    for (const [x, y, side] of [[lx, ly, -1], [rx, ry, 1]]) {
      if (mood === "happy") s.line(`M${n(x - 4.2 * k)} ${n(y + 1.5 * k)} Q${n(x)} ${n(y - 4.5 * k)} ${n(x + 4.2 * k)} ${n(y + 1.5 * k)}`, 1.9);
      else if (mood === "sleepy") s.line(`M${n(x - 4 * k)} ${n(y)} Q${n(x)} ${n(y + 3.4 * k)} ${n(x + 4 * k)} ${n(y)}`, 1.7);
      else if (mood === "surprised") {
        s.paper(`M${n(x - 5.6 * k)} ${n(y)} a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(11.2 * k)} 0 a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(-11.2 * k)} 0Z`);
        s.line(`M${n(x - 5.6 * k)} ${n(y)} a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(11.2 * k)} 0 a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(-11.2 * k)} 0`, 1.3);
        s.dot(x, y + 0.6 * k, 2.4 * k);
      } else if (mood === "thinking") {
        s.dot(x + 1.6 * k, y - 1.8 * k, 3 * k, 3.6 * k);
        s.raw(`<circle cx="${n(x + 2.6 * k)}" cy="${n(y - 3.2 * k)}" r="${n(0.9 * k)}" fill="${s.palette.paper}"/>`);
      } else {
        s.dot(x, y, 3.1 * k, 3.9 * k);
        s.raw(`<circle cx="${n(x + 1.1 * k)}" cy="${n(y - 1.4 * k)}" r="${n(1 * k)}" fill="${s.palette.paper}"/>`);
      }
      const bx2 = x;
      const by2 = y - 9 * k;
      if (mood === "sad") s.line(side < 0 ? `M${n(bx2 - 5 * k)} ${n(by2 + 1.5)} L${n(bx2 + 4.5 * k)} ${n(by2 - 2.5)}` : `M${n(bx2 + 5 * k)} ${n(by2 + 1.5)} L${n(bx2 - 4.5 * k)} ${n(by2 - 2.5)}`, bw);
      else if (mood === "surprised") s.line(`M${n(bx2 - 5 * k)} ${n(by2 - 3)} Q${n(bx2)} ${n(by2 - 7)} ${n(bx2 + 5 * k)} ${n(by2 - 3)}`, bw);
      else if (mood === "thinking") s.line(side > 0 ? `M${n(bx2 - 5 * k)} ${n(by2 - 2)} Q${n(bx2)} ${n(by2 - 6)} ${n(bx2 + 5 * k)} ${n(by2 - 3)}` : `M${n(bx2 - 5 * k)} ${n(by2)} L${n(bx2 + 5 * k)} ${n(by2 + 0.5)}`, bw);
      else if (mood !== "sleepy") s.line(`M${n(bx2 - 4.5 * k)} ${n(by2)} Q${n(bx2)} ${n(by2 - 2.5)} ${n(bx2 + 4.5 * k)} ${n(by2)}`, bw);
    }
    if (face.mouth) {
      const [mx, my] = face.mouth.at;
      const w = face.mouth.w;
      const style = face.mouth.style ?? "human";
      if (mood === "happy") {
        const d = `M${n(mx - w * 1.5)} ${n(my - 1)} Q${n(mx)} ${n(my + w * 1.9)} ${n(mx + w * 1.5)} ${n(my - 1)} Q${n(mx)} ${n(my + 2)} ${n(mx - w * 1.5)} ${n(my - 1)}Z`;
        s.fill(d, s.palette.blush, 0.55);
        s.line(d, 1.6);
        if (style === "gap") {
          s.paper(`M${n(mx - 3.6)} ${n(my + 0.4)} h3 v3.4 h-3Z M${n(mx + 0.6)} ${n(my + 0.4)} h3 v3.4 h-3Z`);
          s.soft(`M${n(mx - 3.6)} ${n(my + 0.4)} v3.4 h3 v-3.4 M${n(mx + 0.6)} ${n(my + 0.4)} v3.4 h3 v-3.4`, 0.9);
        }
      } else if (mood === "surprised") {
        s.fill(`M${n(mx - 3.4)} ${n(my + 2)} a3.4 4.4 0 1 0 6.8 0 a3.4 4.4 0 1 0 -6.8 0Z`, s.palette.blush, 0.4);
        s.line(`M${n(mx - 3.4)} ${n(my + 2)} a3.4 4.4 0 1 0 6.8 0 a3.4 4.4 0 1 0 -6.8 0`, 1.5);
      } else if (mood === "sad") {
        s.line(`M${n(mx - w)} ${n(my + 3)} Q${n(mx)} ${n(my - 2.5)} ${n(mx + w)} ${n(my + 3)}`, 1.6);
      } else if (mood === "thinking") {
        s.line(`M${n(mx - w * 0.8)} ${n(my + 1)} Q${n(mx)} ${n(my - 0.6)} ${n(mx + w * 0.9)} ${n(my + 1.8)}`, 1.5);
      } else if (mood === "sleepy") {
        s.line(`M${n(mx - 2)} ${n(my + 1)} a2 2.4 0 1 0 4 0 a2 2.4 0 1 0 -4 0`, 1.3);
      } else if (style === "cat") {
        s.line(`M${n(mx - w)} ${n(my)} Q${n(mx - w / 2)} ${n(my + 4)} ${n(mx)} ${n(my)} Q${n(mx + w / 2)} ${n(my + 4)} ${n(mx + w)} ${n(my)}`, 1.5);
      } else {
        s.line(`M${n(mx - w)} ${n(my)} Q${n(mx)} ${n(my + w * 0.75)} ${n(mx + w)} ${n(my)}`, 1.6);
      }
    }
    if (face.cheeks && (mood === "happy" || mood === "neutral")) {
      for (const [cx, cy] of face.cheeks) s.fill(`M${n(cx - 6)} ${n(cy)} a6 3.6 0 1 0 12 0 a6 3.6 0 1 0 -12 0Z`, s.palette.blush, mood === "happy" ? 0.5 : 0.28, false);
    }
    const [bx, by] = face.bubble;
    if (mood === "thinking") {
      s.line(`M${n(bx)} ${n(by)} a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0`, 1.2);
      s.line(`M${n(bx + 6)} ${n(by - 8)} a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0`, 1.3);
      const cx = bx + 20;
      const cy = by - 24;
      s.paper(`M${cx - 12} ${cy} c0 -8 6 -12 12 -12 c7 0 12 4 12 11 c0 8 -6 12 -12 12 c-7 0 -12 -4 -12 -11Z`);
      s.line(`M${cx - 12} ${cy} c0 -8 6 -12 12 -12 c7 0 12 4 12 11 c0 8 -6 12 -12 12 c-7 0 -12 -4 -12 -11Z`, 1.4);
      s.line(`M${cx - 3.6} ${cy - 3.4} c0 -4 7.4 -4 7.4 0.6 c0 3.4 -3.8 3 -3.8 6.4`, 1.6);
      s.dot(cx, cy + 6.6, 1.1);
    } else if (mood === "sleepy") {
      const z = (x, y, size) => `M${n(x)} ${n(y)} h${size} l${-size} ${n(size * 1.1)} h${size}`;
      s.line(z(bx + 2, by - 6, 6), 1.5);
      s.line(z(bx + 12, by - 20, 8.5), 1.6);
    } else if (mood === "surprised") {
      s.line(`M${n(bx)} ${n(by - 2)} l5 -7 M${n(bx + 6)} ${n(by + 4)} l9 -3 M${n(bx - 6)} ${n(by - 6)} l1 -9`, 1.5);
    } else if (mood === "sad") {
      const [tx, ty] = [lx - 3.5 * k, ly + 7 * k];
      const tear = `M${n(tx)} ${n(ty)} q-3.2 5.6 0 7.4 q3.2 -1.8 0 -7.4Z`;
      s.fill(tear, s.palette.sky, 1);
      s.line(tear, 1.1);
    }
  }

  // src/illustrations/index.ts
  var moods = ["neutral", "happy", "surprised", "sad", "thinking", "sleepy"];
  var characters = CHARACTERS.map(({ id, name, kind, role, traits, bestFor }) => ({ id, name, kind, role, traits, bestFor }));
  function isCharacterId(value) {
    return typeof value === "string" && CHARACTERS.some((c) => c.id === value);
  }
  function isMood(value) {
    return typeof value === "string" && moods.includes(value);
  }
  var escapeText = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
  function renderCharacter(id, mood = "neutral", options = {}) {
    const character = CHARACTERS.find((c) => c.id === id);
    if (!character) throw new Error(`Unknown character "${String(id)}". Use one of: ${CHARACTERS.map((c) => c.id).join(", ")}.`);
    if (!isMood(mood)) throw new Error(`Unknown mood "${String(mood)}". Use one of: ${moods.join(", ")}.`);
    const prefix = (options.idPrefix ?? `bk-${id}-${mood}`).replace(/[^a-zA-Z0-9_-]/g, "");
    const sketch = new Sketch(prefix, options.colors === "static" ? STATIC_PALETTE : TOKEN_PALETTE);
    character.draw(sketch);
    drawFace(sketch, character.face, mood);
    const a11y = options.title ? ` role="img" aria-labelledby="${prefix}-title"` : ' aria-hidden="true" focusable="false"';
    const size = options.size ? ` width="${options.size}" height="${options.size}"` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"${size} color="${GRAPHITE}" class="bk-character" data-character="${id}" data-mood="${mood}"${a11y}>` + (options.title ? `<title id="${prefix}-title">${escapeText(options.title)}</title>` : "") + sketch.defs() + sketch.body() + `</svg>`;
  }

  // src/illustrations/browser.ts
  var counter = 0;
  function draw(el) {
    const id = el.getAttribute("data-bk-character");
    const mood = el.getAttribute("data-mood") ?? "neutral";
    if (!isCharacterId(id) || !isMood(mood)) return;
    const label = el.getAttribute("data-label") ?? el.getAttribute("aria-label") ?? void 0;
    if (label) {
      el.setAttribute("data-label", label);
      el.removeAttribute("aria-label");
    }
    el.classList.add("bk-illustration");
    const size = el.getAttribute("data-size");
    if (size && !Number.isNaN(Number(size))) el.style.setProperty("--size", `${Number(size)}px`);
    el.innerHTML = renderCharacter(id, mood, { idPrefix: `bkc${++counter}`, title: label });
  }
  function mount(root = document) {
    root.querySelectorAll("[data-bk-character]").forEach((el) => {
      const svg = el.querySelector("svg");
      if (!svg || svg.getAttribute("data-mood") !== (el.getAttribute("data-mood") ?? "neutral") || svg.getAttribute("data-character") !== el.getAttribute("data-bk-character")) draw(el);
    });
  }
  if (typeof document !== "undefined") {
    const start = () => {
      mount();
      new MutationObserver((records) => {
        for (const r of records) {
          if (r.type === "attributes" && r.target instanceof HTMLElement) draw(r.target);
          else r.addedNodes.forEach((node) => node instanceof Element && mount(node.parentElement ?? node));
        }
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-mood", "data-bk-character"] });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  }
  return __toCommonJS(browser_exports);
})();
