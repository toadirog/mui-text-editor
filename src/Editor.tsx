import { z } from 'zod';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { HeadingNode } from '@lexical/rich-text';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';

import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from './components/ContentEditable';
import { OnChangePlugin } from './plugins/OnChangePlugin';
import { CustomHeadingPlugin } from './plugins/CustomHeadingPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from '@lexical/react/LexicalAutoLinkPlugin';
import ImagesPlugin from './plugins/ImagePlugin';
import { ImageNode } from './nodes/ImageNode';
import { Toolbar } from './components/Toolbar';
import { EditorContainer } from './components/EditorContainer';
import { Placeholder } from './components/Placeholder';

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text.startsWith('http') ? text : `https://${text}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

export function validateUrl(url: string): boolean {
  const urlSchema = z.string().url();
  const result = urlSchema.safeParse(url);
  if (result.success) return true;
  return false;
}

const theme = {
  paragraph: 'editor-paragraph',
  text: {
    bold: 'text-bold',
    italic: 'text-italic',
    strikethrough: 'text-strikethrough',
  },
};

function Editor() {
  const lexicalConfig: InitialConfigType = {
    namespace: 'My Rich Text Editor',
    nodes: [
      HeadingNode,
      LinkNode,
      AutoLinkNode,
      ImageNode,
      ListNode,
      ListItemNode,
    ],
    theme,
    onError: (e) => {
      console.log('ERROR:', e);
    },
  };

  return (
    <EditorContainer>
      <LexicalComposer initialConfig={lexicalConfig}>
        <Toolbar />
        <div style={{ position: 'relative' }}>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<Placeholder>Enter some text...</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <CustomHeadingPlugin />
        <LinkPlugin validateUrl={validateUrl} />
        <AutoLinkPlugin matchers={MATCHERS} />
        <HistoryPlugin />
        <ListPlugin />
        <OnChangePlugin />
        <ImagesPlugin />
      </LexicalComposer>
    </EditorContainer>
  );
}

export default Editor;
