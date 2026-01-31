const fs = require('fs');
const path = require('path');

/**
 * Simple build script to copy files to dist/ directory
 */

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Files to copy
const filesToCopy = ['index.html', 'styles.css', 'sudoku.js'];

console.log('🏗️  Building project...\n');

filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, distPath);
        console.log(`✓ Copied ${file} to dist/`);
    } else {
        console.warn(`⚠ Warning: ${file} not found in src/`);
    }
});

// Create build info file
const buildInfo = {
    buildDate: new Date().toISOString(),
    version: require('./package.json').version,
    files: filesToCopy,
};

fs.writeFileSync(
    path.join(distDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
);

console.log('\n✅ Build completed successfully!');
console.log(`📦 Output directory: ${distDir}`);
