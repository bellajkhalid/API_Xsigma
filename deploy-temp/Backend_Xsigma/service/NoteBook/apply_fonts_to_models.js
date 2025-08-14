/**
 * Script to apply new font system to all model components
 * This script updates the typography classes across all model files
 */

const fs = require('fs');
const path = require('path');

const modelsDir = 'Frontend_Xsigma/src/components/models';
const modelFiles = [
  'HJMModel.tsx',
  'SVIModel.tsx',
  'AnalyticalSigmaVolatilityCalibration.tsx'
];

// Font mapping rules
const fontReplacements = [
  // Headers
  {
    from: /className="text-3xl font-bold/g,
    to: 'className="text-3xl font-corporate font-bold'
  },
  {
    from: /className="text-xl font-semibold/g,
    to: 'className="text-xl font-corporate font-semibold'
  },
  
  // Descriptions and body text
  {
    from: /className={\`\$\{theme\.textSecondary\} mt-2\`\}/g,
    to: 'className={`${theme.textSecondary} mt-2 font-clean text-lg`}'
  },
  {
    from: /className={\`\$\{theme\.textMuted\} space-y-3 text-sm leading-relaxed\`\}/g,
    to: 'className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}'
  },
  
  // Badges
  {
    from: /className="bg-([^"]+)-500\/20 text-([^"]+)-400 border-([^"]+)-500\/30"/g,
    to: 'className="bg-$1-500/20 text-$2-400 border-$3-500/30 font-mono text-xs"'
  },
  
  // Feature cards
  {
    from: /className="text-([^"]+)-400 font-medium text-sm"/g,
    to: 'className="text-$1-400 font-mono font-medium text-sm"'
  },
  {
    from: /className={\`\$\{theme\.textMuted\} text-xs\`\}/g,
    to: 'className={`${theme.textMuted} text-xs font-clean`}'
  },
  
  // Labels and inputs
  {
    from: /className=\{theme\.text\}>([^<]+)<\/Label>/g,
    to: 'className={`${theme.text} font-clean`}>$1</Label>'
  },
  {
    from: /className={\`\$\{theme\.glassBg\} \$\{theme\.borderColor\}\`\}/g,
    to: 'className={`${theme.glassBg} ${theme.borderColor} font-mono`}'
  },
  
  // Card titles
  {
    from: /CardTitle className={\`([^`]+) \$\{theme\.text\}\`\}/g,
    to: 'CardTitle className={`$1 ${theme.text} font-corporate`}'
  },
  {
    from: /CardTitle className=\{theme\.text\}/g,
    to: 'CardTitle className={`${theme.text} font-corporate`}'
  },
  
  // Strong text emphasis
  {
    from: /<strong className="text-([^"]+)-400">/g,
    to: '<strong className="text-$1-400 font-mono">'
  },
  {
    from: /<strong className="text-([^"]+)-400 ([^"]+)">/g,
    to: '<strong className="text-$1-400 font-code $2">'
  },
  
  // Results and metrics
  {
    from: /className="text-2xl font-bold text-([^"]+)-400/g,
    to: 'className="text-2xl font-mono font-bold text-$1-400 tracking-wider'
  },
  {
    from: /className={\`text-sm \$\{theme\.textMuted\}\`\}/g,
    to: 'className={`text-sm ${theme.textMuted} font-clean`}'
  }
];

function applyFontsToFile(filePath) {
  console.log(`\n📝 Processing: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changesMade = 0;
    
    fontReplacements.forEach((replacement, index) => {
      const matches = content.match(replacement.from);
      if (matches) {
        content = content.replace(replacement.from, replacement.to);
        changesMade += matches.length;
        console.log(`   ✅ Applied rule ${index + 1}: ${matches.length} replacements`);
      }
    });
    
    if (changesMade > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`   🎉 Total changes: ${changesMade}`);
    } else {
      console.log(`   ℹ️  No changes needed`);
    }
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filePath}:`, error.message);
  }
}

function main() {
  console.log('🔤 Applying new font system to all models...\n');
  
  modelFiles.forEach(file => {
    const filePath = path.join(modelsDir, file);
    if (fs.existsSync(filePath)) {
      applyFontsToFile(filePath);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  });
  
  console.log('\n🎉 Font application completed!');
  console.log('\n📋 Font classes now available:');
  console.log('   • font-corporate (IBM Plex Sans) - Headers, professional text');
  console.log('   • font-clean (Source Sans Pro) - Descriptions, labels');
  console.log('   • font-mono (JetBrains Mono) - Data, metrics, parameters');
  console.log('   • font-code (Fira Code) - Formulas, mathematical expressions');
  console.log('   • font-inter (Inter) - Alternative body text');
  console.log('   • font-sans (Geist) - Default font');
}

if (require.main === module) {
  main();
}

module.exports = { applyFontsToFile, fontReplacements };
