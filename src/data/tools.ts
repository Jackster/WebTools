export interface Tool {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  url: string;
  tags?: string[];
}

export const tools: Tool[] = [
  {
    id: 'example-tool-1',
    title: 'JSON Formatter',
    description: 'Format and validate JSON data with syntax highlighting and error detection.',
    screenshot: '/images/tools/json-formatter.svg',
    url: '/tools/json-formatter',
    tags: ['json', 'formatter', 'validator'],
  },
  {
    id: 'example-tool-2',
    title: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings quickly and efficiently.',
    screenshot: '/images/tools/base64-encoder.svg',
    url: '/tools/base64-encoder',
    tags: ['base64', 'encoder', 'decoder', 'converter'],
  },
  {
    id: 'example-tool-3',
    title: 'Color Palette Generator',
    description: 'Generate beautiful color palettes with harmonious color combinations.',
    screenshot: '/images/tools/color-palette.svg',
    url: '/tools/color-palette',
    tags: ['color', 'palette', 'design', 'generator'],
  },
  {
    id: 'example-tool-4',
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching and highlighting.',
    screenshot: '/images/tools/regex-tester.svg',
    url: '/tools/regex-tester',
    tags: ['regex', 'testing', 'debug'],
  },
  {
    id: 'example-tool-5',
    title: 'Markdown Previewer',
    description: 'Preview Markdown text with live rendering and syntax highlighting.',
    screenshot: '/images/tools/markdown-previewer.svg',
    url: '/tools/markdown-previewer',
    tags: ['markdown', 'previewer', 'documentation'],
  },
  {
    id: 'example-tool-6',
    title: 'URL Encoder',
    description: 'Encode and decode URLs with special character handling.',
    screenshot: '/images/tools/url-encoder.svg',
    url: '/tools/url-encoder',
    tags: ['url', 'encoder', 'decoder'],
  },
];
