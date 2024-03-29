import React, { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { marked as Marked } from 'marked';

Marked.setOptions({
    "baseUrl": null,
    "breaks": true,
    "gfm": true,
    "headerIds": true,
    "headerPrefix": "",
    "highlight": null,
    "langPrefix": "language-",
    "mangle": true,
    "pedantic": false,
    "sanitize": false,
    "sanitizer": null,
    "silent": false,
    "smartLists": false,
    "smartypants": false,
    "tokenizer": null,
    "walkTokens": null,
    "xhtml": false
});

const renderer = new Marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
  }
export default function App() {
    const [input, setInput] = useState(defaultMarkdowm);
    return (
        <div className='container'>
            <div className="editor">
                <textarea
                    id="editor"
                    name="editor"
                    rows="10"
                    cols="50"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                />
            </div>

            <div id="preview" dangerouslySetInnerHTML={{__html: Marked(sanitizeHtml(input), { renderer: renderer })}} />
        </div>
    )
}

const defaultMarkdowm = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
