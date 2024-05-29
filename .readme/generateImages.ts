import * as pug from 'pug';
import * as fs from 'fs';

type colors = 'red' | 'blue' | 'green'

function renderBlock(options: {backgroundColor: colors, letter: string, index: number}): string {
    const { backgroundColor, letter, index } = options;
    const text = `${letter}[${index}]`;
    const colorCode = {
        red: '#c03a2b',
        blue: '#3498db',
        green: '#25af60',
    }[backgroundColor];
    const compiledFunction = pug.compileFile('.readme/block.pug');
    const renderedHtml = compiledFunction({ backgroundColor: colorCode, text });
    return renderedHtml;
}

const main = () => {
    type block = {letter: string, size: number, color: colors}
    const blocks: block[] = [
        {
          letter: 'P',
          size: 12,
          color: 'red'  
        }, 
        {
          letter: 'M',
          size: 5,
          color: 'blue'
        },
        {
          letter: 'L',
          size: 3,
          color: 'green'  
        },
        {
          letter: 'S',
          size: 9,
          color: 'red'  
        },
        {
          letter: 'A',
          size: 6,
          color: 'blue'    
        }
    ]

    blocks.forEach((block) => {
        new Array(block.size).fill(0).forEach((_, i) => {
            const filename = `.readme/images/${block.letter.toLowerCase()}${i}.svg`
            const svg = renderBlock({backgroundColor: block.color, letter: block.letter, index: i})
            fs.writeFileSync(filename, svg);
        })
    })
}

void main()

