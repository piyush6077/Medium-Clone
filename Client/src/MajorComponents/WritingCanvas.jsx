import React, { useCallback, useEffect, useState } from "react";
import { createEditor, Transforms, Element, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Image, Code } from "lucide-react";
import CodeElement from "../Slate/CodeElement.jsx";
import DefaultElement from "../Slate/DefaultElement.jsx";
import usePostStore from "../store/usePostStore.js";
import ImageElement from "../Slate/ImageElement.jsx";

// Leaf Component for Bold & Italic Styles
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <i>{children}</i>;
  }
  return <span {...attributes}>{children}</span>;
};

// Initial Slate Value
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

// Custom Editor Utility Functions
const CustomEditor = {
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === format,
    });
    return !!match;
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : format },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },

  uploadImage(editor, url) {
    const image = {
      type: "image",
      url,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, image);
  },
};

const WritingCanvas = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [content, setContent] = useState({
    title: "",
    content: initialValue,
  });

  const { sendPost } = usePostStore();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Final Content Before Save:", JSON.stringify(content, null, 2));
    sendPost(content);
  };

  const handleImageUpload = () => {
    const url = prompt("Enter Image URL: ");
    if (url) {
      CustomEditor.uploadImage(editor, url);
    }
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [clickPosition, setClickPosition] = useState(null);

  const LeftClickEdit = ({ position }) => (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
      className="bg-gray-800 text-white p-2 flex items-center w-30 h-10 rounded-md italic font-semibold gap-x-4"
    >
      <p
        className="cursor-pointer"
        onClick={() => CustomEditor.toggleMark(editor, "bold")}
      >
        B
      </p>
      <p
        className="cursor-pointer"
        onClick={() => CustomEditor.toggleMark(editor, "italic")}
      >
        I
      </p>
      <p>
        <Code width={16} />
      </p>
      <Image width={16} className="cursor-pointer" onClick={handleImageUpload} />
    </div>
  );

  useEffect(() => {
    if (clickPosition) {
      const timer = setTimeout(() => {
        setClickPosition(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [clickPosition]);

  return (
    <div className="bg-white text-gray-700 w-[100vw] flex mt-6 justify-center">
      <button
        onClick={handlePostSubmit}
        className="rounded-md bg-blue-800 hover:bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3 mb-3"
      >
        Draft
      </button>
      <div className="flex flex-col w-[65%] items-center">
        <textarea
          type="text"
          placeholder="Title..."
          value={content.title}
          onChange={(e) =>
            setContent((prevContent) => ({
              ...prevContent,
              title: e.target.value,
            }))
          }
          className="w-full hide-scrollbar h-17 overflow-hidden resize-none text-5xl font-semibold 
            outline-none leading-16 border-gray-300"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />

        <Slate
          editor={editor}
          initialValue={content.content}
          className="w-full"
          onChange={(value) => {
            const mergedParas = [
              {
                type: "paragraph",
                children: value.flatMap((node) => node.children),
              },
            ];
            setContent((prevContent) => ({
              ...prevContent,
              content: mergedParas,
            }));
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Write something..."
            className="border w-full h-[430px] overflow-y-auto
            border-none text-lg rounded-lg ml-3 outline-none hide-scrollbar"
            onDoubleClick={(e) => {
              e.preventDefault();
              setClickPosition({ x: e.clientX, y: e.clientY });
            }}
            onKeyDown={(e) => {
              if (!e.ctrlKey) return;

              switch (e.key) {
                case "`":
                  e.preventDefault();
                  CustomEditor.toggleBlock(editor, "code");
                  break;
                case "b":
                  e.preventDefault();
                  CustomEditor.toggleMark(editor, "bold");
                  break;
                case "i":
                  e.preventDefault();
                  CustomEditor.toggleMark(editor, "italic");
                  break;
                case "l":
                  e.preventDefault();
                  handleImageUpload();
                  break;
                default:
                  break;
              }
            }}
          />
          {clickPosition && <LeftClickEdit position={clickPosition} />}
        </Slate>
      </div>
    </div>
  );
};

export default WritingCanvas;
