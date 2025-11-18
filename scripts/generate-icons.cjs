/* eslint-disable @typescript-eslint/no-var-requires */
// Autogenerate icons
// How to use? After added new svg icon need to do:
// npm run generate-icons
// In SVG icon need to change fill -> fill="currentColor"

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const indexDir = path.resolve(__dirname, '../src/shared/assets');
const iconsDir = path.join(indexDir, 'svg');
const files = fs.readdirSync(iconsDir);
const icons = files.filter((file) => path.extname(file) === '.svg');

const makeNormal = (str) => {
  if (str.split('--').length >= 2) {
    const nameArray = str.split('--');
    return makeNormal(makeCapital(nameArray));
  }
  if (str.split('-').length >= 2) {
    const nameArray = str.split('-');
    return makeNormal(makeCapital(nameArray));
  }

  if (str.split('&').length >= 2) {
    const nameArray = str.split('&');
    return makeNormal(makeCapital(nameArray));
  }

  return makeCapital([str]);
};

const makeCapital = (array) => {
  const newArray = array
    .filter((item) => !!item)
    .map((item) => item.replace(/^\s+/g, ''));
  return newArray.map((item) => item[0].toUpperCase() + item.slice(1)).join('');
};

const generateImports = icons
  .map((icon) => {
    const iconName = path.basename(icon, '.svg');
    return `import ${makeNormal(iconName)} from './svg/${icon}?react';`;
  })
  .join('\n');

const generateIconObject = icons
  .map((icon) => {
    const iconName = path.basename(icon, '.svg');
    return `${makeNormal(iconName)},`;
  })
  .join('\n');

const content = `// This file is auto-generated. Don't edit manually.
${generateImports}

export const Icons = {
${generateIconObject}
};
`;

const filePath = path.join(indexDir, 'index.tsx');
fs.writeFileSync(filePath, content);

try {
  execSync(`npx prettier --write ${filePath}`, { stdio: 'inherit' });
  console.log('✅ Icons generated and formatted successfully!');
} catch (error) {
  console.error('❌ Prettier formatting failed:', error);
}
