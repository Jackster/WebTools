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
    id: 'text-file-viewer',
    title: 'Text File Viewer',
    description: 'Open and view text files with drag-and-drop support. Auto-tail .log and .txt files like tail command.',
    screenshot: '/images/tools/text-file-viewer.svg',
    url: '/tools/text-file-viewer',
    tags: ['text', 'viewer', 'log', 'tail'],
  },
];
