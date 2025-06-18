import React, { useEffect, useRef, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
interface Props{
  aiOutput:string;
}

function OutputSection({aiOutput}:Props) {
  const editorRef:any=useRef<any>(null);
  const [htmlContent,setHtmlContent]=useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.getInstance()) { // Check if editor is available
      const editorInstance = editorRef.current.getInstance();
      if (aiOutput) {
        editorInstance.setMarkdown(aiOutput);
      } else {
        editorInstance.setMarkdown("your results appear here"); // Default text if aiOutput is empty
      }
    }
  }, [aiOutput]); // Runs only when aiOutput changes

  const handleEditorChange = () => {
    if (editorRef.current && editorRef.current.getInstance()) {
      const editorInstance = editorRef.current.getInstance();
      const html = editorInstance.getHTML();
      setHtmlContent(html);
      console.log("HTML Content:", html);
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
         <h2 className='font-medium text-lg'>Your Result</h2>
        <Button className='flex gap-2' 
        onClick={()=>navigator.clipboard.writeText(aiOutput)}><Copy className='w-4 h-4'/> Copy</Button>
      </div>
      
      <Editor
        ref={editorRef}
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={handleEditorChange} 
      />

      {/* Display the HTML content (use with caution!) */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} />  */}
    </div>
  );



  // useEffect(()=>
  // {
  //   const editorInstance=editorRef.current.getInstance();
  //   editorInstance.setMarkdown(aiOutput);
  // },[aiOutput])
  // return (
  //   <div className='bg-white shadow-lg border rounded-lg'>
  //     <div className='flex justify-between items-center p-5'>
  //       <h2 className='font-medium text-lg'>your result</h2>
  //       <Button className='flex gap-2'><Copy className='w-4 h-4'/> Copy</Button>
  //     </div>
  //     <Editor
  //       ref={editorRef}
  //       initialValue="your results appers here"
  //       initialEditType="wysiwyg"
  //       height="600px"
  //       useCommandShortcut={true}
  //       onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
  //     />
  //   </div>
  // )
}

export default OutputSection
