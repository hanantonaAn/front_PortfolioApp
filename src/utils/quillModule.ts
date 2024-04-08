export const QuillFormats = [
    'bold',
    'italic',
    'underline',
    'strike',
  
    'blockquote',
    'code-block',
  
    'header',
    'font',
  
    'list',
  
    'script',
  
    'indent',
  
    'size',
  
    'image',
    'link',
    'video',
  
    'color',
    'background',
  
    'align',
  
    'clean',
  ]
  
  export const QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
  
      ['blockquote', 'code-block'],
  
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
  
      [{ list: 'ordered' }, { list: 'bullet' }],
  
      [{ script: 'sub' }, { script: 'super' }],
  
      [{ indent: '-1' }, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
  
      ['link', 'image', 'video'],
  
      [{ color: [] }, { background: [] }],
  
      [{ align: [] }],
  
      ['clean'],
    ],
  }
  