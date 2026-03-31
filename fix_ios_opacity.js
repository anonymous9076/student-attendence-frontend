/**
 * iOS Safari Fix: Strip opacity:0 from Framer Motion initial states.
 * Replaces animate props with static values so elements render immediately
 * without depending on JS to become visible.
 */
const fs = require('fs');
const path = require('path');

const files = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.js') || f.endsWith('.jsx')) files.push(full);
  }
}

walk('c:/Users/Mr. Tushar/Documents/student management/client/src');

let count = 0;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let updated = src;

  // Replace initial={{ opacity: 0, ... }} or initial={{ opacity: 0 }} → initial={{ opacity: 1 }}
  // This prevents the element from starting invisible
  updated = updated.replace(
    /initial=\{\{([^}]*?)opacity:\s*0([^}]*?)\}\}/g,
    (match, before, after) => {
      // Also zero out transform values so no jump occurs
      let inner = (before + 'opacity: 1' + after)
        .replace(/\by:\s*-?\d+(\.\d+)?\b/g, 'y: 0')
        .replace(/\bx:\s*-?\d+(\.\d+)?\b/g, 'x: 0')
        .replace(/\bscale:\s*[\d.]+\b/g, 'scale: 1');
      return `initial={{ ${inner.trim()} }}`;
    }
  );

  if (updated !== src) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Fixed: ${file}`);
    count++;
  }
}

console.log(`\nDone. Fixed ${count} files.`);
