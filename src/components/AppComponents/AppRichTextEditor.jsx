import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorText,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
  InsertPhoto,
  Link as LinkIcon,
  Redo,
  Undo,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import {
  MenuControlsContainer,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField
} from "mui-tiptap";
import { useState } from "react";
import styled from "styled-components";

// Editor Container with footer positioning
const EditorContainer = styled.div`
  position: relative;
  min-height: 17rem;
  max-height: 17rem;
  display: flex;
  flex-direction: column;
`;

const EditorContent = styled(RichTextField)`
  flex: 1;
  overflow-y: auto;
  ${'' /* min-height: 15rem; */}
    ${'' /* max-height: 15rem; */}
  border: none; /* Remove the border */
  outline: none; /* Remove the outline */
  & .MuiOutlinedInput-notchedOutline {
    border: none; /* Remove the border of the notched outline */
  }

  .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border: none; /* Ensure the border is also removed on hover */
    }
  }
  .FieldContainer-notchedOutline {
    border: none; /* Ensure the border is also removed on hover */
  }
  .MuiTiptap-FieldContainer-notchedOutline{
    border:none;
  }
`;

const EditorFooter = styled.div`
  ${'' /* position: absolute; */}
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  justify-content: center;
  ${'' /* border-top: 1px solid #ccc; */}
`;

const RichTextFieldWrapper = styled.div`
  /* Target the RichTextField container and apply hover styles */
  .MuiOutlinedInput-root:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: #ff0000;  /* Change the border color on hover */
    }
  }
    /* Target the MUI outlined input's notchedOutline and remove the border */
    .MuiOutlinedInput-notchedOutline {
    border: none; /* Remove the border */
  }
  & .ProseMirror {
    min-height: 150px; /* Adjust the editor height */
  }

  & .ProseMirror p::before {
    content: "Type here..."; /* Placeholder text */
    color: rgba(0, 0, 0, 0.5); /* Placeholder text color */
    font-style: italic; /* Optional: Make placeholder italic */
    position: absolute;
    top: 0;
    left: 10px;
    pointer-events: none;
  }
`;

const AppRichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      Image,
    ],
    // content: "<p>Type here...</p>",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleFontColorChange = (color) => {
    editor?.chain().focus().setColor(color).run();
    setAnchorEl(null);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <RichTextFieldWrapper isEmpty={false}>

    <RichTextEditorProvider editor={editor}>
      <EditorContainer>
        <EditorContent
                placeholder="Type your text here..."  // Set the placeholder text
isEmpty={true}
          controls={null} // Content area, toolbar is outside
        />
        <EditorFooter>
          <MenuControlsContainer>
            {/* Undo/Redo */}
            <IconButton onClick={() => editor?.chain().undo().run()}>
              <Undo />
            </IconButton>
            <IconButton onClick={() => editor?.chain().redo().run()}>
              <Redo />
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* Font Style */}
            <MenuSelectHeading />
            <Divider orientation="vertical" flexItem />

            {/* Formatting */}
            <IconButton onClick={() => editor?.chain().focus().toggleBold().run()}>
              <FormatBold />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <FormatItalic />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleUnderline().run()}>
              <FormatUnderlined />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleStrike().run()}>
              <FormatStrikethrough />
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* Font Color */}
            <IconButton onClick={openMenu}>
              <FormatColorText />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => handleFontColorChange("#FF0000")}>Red</MenuItem>
              <MenuItem onClick={() => handleFontColorChange("#00FF00")}>Green</MenuItem>
              <MenuItem onClick={() => handleFontColorChange("#0000FF")}>Blue</MenuItem>
            </Menu>

            {/* Link */}
            <IconButton
              onClick={() => {
                const url = prompt("Enter link URL");
                if (url) editor?.chain().focus().setLink({ href: url }).run();
              }}
            >
              <LinkIcon />
            </IconButton>

            {/* Image */}
            <IconButton
              onClick={() => {
                const url = prompt("Enter image URL");
                if (url) editor?.chain().focus().setImage({ src: url }).run();
              }}
            >
              <InsertPhoto />
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* Lists */}
            <IconButton onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <FormatListBulleted />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <FormatListNumbered />
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* Alignments */}
            <IconButton onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
              <FormatAlignLeft />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
              <FormatAlignCenter />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
              <FormatAlignRight />
            </IconButton>
          </MenuControlsContainer>
        </EditorFooter>
      </EditorContainer>
    </RichTextEditorProvider>
    </RichTextFieldWrapper>

  );
};

export default AppRichTextEditor;
