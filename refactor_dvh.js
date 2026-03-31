const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            updated = updated.replace(/\bmin-h-screen\b/g, 'min-h-dvh');
            updated = updated.replace(/\bh-screen\b/g, 'h-dvh');
            if (updated !== content) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDir('c:/Users/Mr. Tushar/Documents/student management/client/src');
console.log('Global viewport refactor completed.');
