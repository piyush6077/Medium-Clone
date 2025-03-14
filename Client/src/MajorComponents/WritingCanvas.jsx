import React, { useCallback, useState } from 'react'
import { createEditor, Transforms , Element , Editor} from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import CodeElement from '../Slate/CodeElement.jsx';
import DefaultElement from '../Slate/DefaultElement.jsx';
import usePostStore from '../store/usePostStore.js';


const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <i>{children}</i>;
  }
  return <span {...attributes}>{children}</span>;
};


const initialValue = [
{
  type: 'paragraph',
  children: [{ text: '' }]
},
];


const CustomEditor = {
  isBoldMarkActive(editor){
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  isItalicMarkActive(editor){
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  },


  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'code',
    });
    return !!match;
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' }, // Toggle between 'paragraph' and 'code'
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
}

const WritingCanvas = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [content, setContent] = useState({
    title: '',
    content: initialValue
  })

  const { sendPost } = usePostStore()
  const handlePostSubmit = (e) =>{
    e.preventDefault()
    console.log("Final Content Before Save:", JSON.stringify(content, null, 2));
    sendPost(content);
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      
      default:
          return <DefaultElement {...props} />;
    }
  })

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  },[])


  return (
      <div className='bg-white text-gray-700 w-[100vw] flex mt-6 justify-center'>
      <button 
        onClick={handlePostSubmit}
        className='rounded-md bg-blue-800 hover:bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3 mb-3'
        >
          Draft
      </button>
      <div className='flex flex-col w-[65%] items-center'>
        <textarea
            type="text"
            placeholder="Title..."
            value={content.title}
            onChange={(e)=>{
              setContent({...content, title:e.target.value})
            
              e.target.style.height = "auto",
              e.target.style.height = `${e.target.scrollHeight}px`; 
            }}
            className="w-full flex hide-scrollbar h-17 overflow-hidden resize-none text-5xl font-semibold 
            outline-none leading-16 border-gray-300"
          />

        <Slate 
          editor={editor} 
          initialValue={content.content}
          className='w-full'
          onChange={(value) => {
            const mergedParas= [
              {
                type: 'paragraph',
                children: value.flatMap((node)=> node.children)
              }
            ];
            setContent((prevContent) => (
              { ...content, content: mergedParas }
              ))
            
            console.log(mergedParas)
            }
          }
        >
          <Editable 
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder='Write something...'
            className='border w-full h-[430px] overflow-y-auto
            border-none text-lg rounded-lg ml-3 outline-none hide-scrollbar'
            onKeyDown={e=>{
              if(!e.ctrlKey) return;
              
              switch (e.key){
                case '`': {
                  e.preventDefault();
                  CustomEditor.toggleCodeBlock(editor)
                  break;
                }

                case 'b':{
                  e.preventDefault()
                  CustomEditor.toggleBoldMark(editor)
                  break
                }
                
                case 'i':{
                  e.preventDefault()
                  CustomEditor.toggleItalicMark(editor)
                  break
                }
              }
              
            }}
          />
        </Slate>
      </div>
  </div>
  )
}

export default WritingCanvas
