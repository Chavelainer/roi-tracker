const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
const dest = path.join(__dirname, '..', 'node_modules', '@prisma', 'client', '.prisma', 'client');

function copyDir(srcDir, destDir) {
	if (!fs.existsSync(srcDir)) {
		console.error('Source Prisma client not found at', srcDir);
		process.exit(1);
	}
	fs.mkdirSync(destDir, { recursive: true });
	for (const entry of fs.readdirSync(srcDir)) {
		const s = path.join(srcDir, entry);
		const d = path.join(destDir, entry);
		const stat = fs.statSync(s);
		if (stat.isDirectory()) {
			copyDir(s, d);
		} else {
			fs.copyFileSync(s, d);
		}
	}
	console.log('Synced Prisma client to', destDir);
}

copyDir(src, dest);
