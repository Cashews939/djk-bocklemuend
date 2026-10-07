const fs = require('fs');
const path = require('path');

const scopeDirs = ['@react-aria', '@react-stately'];

for (const scope of scopeDirs) {
  const dir = path.join(__dirname, '..', 'node_modules', scope);
  if (fs.existsSync(dir)) {
    for (const sub of fs.readdirSync(dir)) {
      const pkgPath = path.join(dir, sub, 'package.json');
      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
          if (pkg.type !== 'module') {
            pkg.type = 'module';
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
            console.log(`[patch] Added "type": "module" to ${scope}/${sub}`);
          }
        } catch (err) {
          console.error(`[patch] Error patching ${scope}/${sub}:`, err);
        }
      }
    }
  }
}
