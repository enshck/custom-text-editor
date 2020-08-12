import React, { useState } from "react";
// import "../App.css";
import {
  Editor,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import "draft-js/dist/Draft.css";
import Immutable from "immutable";

import {
  MainContainer,
  RichEditorContainer,
  StyledStyleButton,
  RichEditorsControls,
  StyledBlockQuote,
  MainTitle,
} from "./styles";

export const CustomQuote = (props: any) => (
  <StyledBlockQuote>{props.children}</StyledBlockQuote>
);

export const CustomMainTitle = (props: any) => (
  <MainTitle>{props.children}</MainTitle>
);

const StyleButton = (props: any) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <StyledStyleButton onMouseDown={onToggle} isActive={props.active}>
      {props.label}
    </StyledStyleButton>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  // { label: "H3", style: "header-three" },
  // { label: "H4", style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  // { label: "UL", style: "unordered-list-item" },
  // { label: "OL", style: "ordered-list-item" },
  // { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <RichEditorsControls>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </RichEditorsControls>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <RichEditorsControls>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </RichEditorsControls>
  );
};

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  const blockRenderMap = Immutable.Map({
    blockquote: {
      element: "blockquote",
      wrapper: <CustomQuote />,
    },
    "header-one": {
      element: "h1",
      wrapper: <CustomMainTitle />,
    },
  });

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const toggleBlockType = (blockType: any) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: any) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap
  );

  return (
    <MainContainer>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <RichEditorContainer>
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={onChange}
          placeholder="Tell a story..."
          spellCheck={true}
          blockRenderMap={extendedBlockRenderMap}
        />
      </RichEditorContainer>
    </MainContainer>
  );
};

export default App;
