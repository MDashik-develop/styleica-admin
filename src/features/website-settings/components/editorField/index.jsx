import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
   Alignment, Autoformat, BlockQuote, Bold, ClassicEditor, Code, CodeBlock,
   Essentials, Font, Heading, Highlight, HorizontalLine, Image, ImageCaption,
   ImageInsert, ImageResize, ImageStyle, ImageToolbar, Indent, IndentBlock,
   Italic, Link, LinkImage, List, ListProperties, MediaEmbed, Mention,
   Paragraph, SimpleUploadAdapter, Table, TableToolbar, TodoList, Undo, Underline
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

// value onChange 
function EditorField({ value, onChange }) {
   return (
      <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 col-span-2"> 
         <CKEditor
            editor={ClassicEditor}
            data={value || ""} 
            config={{
               plugins: [
                  Essentials, Bold, Italic, Underline, Paragraph, Undo, Heading, List, Link,
                  Table, TableToolbar, BlockQuote, Mention, Image, ImageToolbar,
                  ImageCaption, ImageStyle, ImageResize, ImageInsert, Alignment, Font,
                  Autoformat, Highlight, MediaEmbed, HorizontalLine, Indent,
                  IndentBlock, Code, CodeBlock, ListProperties, TodoList, LinkImage,
                  SimpleUploadAdapter
               ],
               toolbar: {
                  items: [
                     'undo', 'redo', '|', 'heading', '|',
                     'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                     'bold', 'italic', 'underline', 'code', 'highlight', '|',
                     'link', 'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote', 'horizontalLine', 'codeBlock', '|',
                     'alignment', '|',
                     'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                  ],
                  shouldNotGroupWhenFull: true 
               },
               image: {
                  toolbar: [
                     'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
                     'toggleImageCaption', 'imageTextAlternative', '|', 'linkImage'
                  ]
               },
               simpleUpload: {
                  uploadUrl: '/api/media/upload', 
                  headers: {
                     'X-CSRF-TOKEN': 'CSRF_TOKEN_HERE',
                  }
               },
               licenseKey: 'GPL',
            }}
            
            onChange={(event, editor) => {
               const data = editor.getData();
              
               onChange({ target: { value: data } });
            }}
         />
      </div>
   )
}

export default EditorField;