import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  font-family: "Georgia", serif;
  font-size: 14px;
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const RichEditorContainer = styled.div`
  border-top: 1px solid #ddd;
  cursor: text;
  font-size: 16px;
  margin-top: 10px;
  padding: 15px;
`;

export const StyledStyleButton = styled.div`
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;

  ${({ isActive }: { isActive?: boolean }) =>
    isActive &&
    css`
      color: #5890ff;
    `}
`;

export const RichEditorsControls = styled.div`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
`;

export const StyledBlockQuote = styled.div`
  blockquote {
    padding: 80px 0;
    margin: 0 auto;
    font-size: 28px;
    font-style: italic;
    font-weight: 500;
    font-family: "Poopins";
  }
`;

export const MainTitle = styled.div`
  h1 {
    font-size: 73px;
    font-weight: 600;
    font-family: "Poopins";
    margin: 0;
  }
`;
