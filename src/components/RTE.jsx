// This is Real time editor
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
// The above used Controller is used for forwarding the data from here to there 



// The control below used will be passed from place from where we will call this 
// Remember to use the parameters below always
function RTE({name,control,defaultValue="",label}) {
  return (
    <div className='w-full'>
        { label && <label className='inline-block mb-1 pl-1' >
            {label}
        </label> }
        <Controller 
        // Now controller takes many inputs some of them are mentioned below
        name = {name || "content"} // if name is not passes then value of name will be content 
        control = {control}  // control is passed as argument so that parent can take the control of all data 

        // Now we will study that how to render elements 
        // SYNTAX::
        // render = {({field:{onChange}})=>(  // In the place of onChange we can also write onBlur or onClick like that. onChange means whenever there is change in inside elment then inform us.
        //     write the element which we want to render
        // )}

        render = {({field:{onChange}})=>(
            <Editor
            apiKey='doo9kimmoha8mxd1iww4j49tzov13xtndm36e15t9og29ai4'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        // The name of onEditorChange should be same as the field setuped above 
        />
        )}

        />
    </div>
  )
}

export default RTE

//Means we can say here that Editor is totally handled by Controller beacuse Editor is inside the Controller


// We will use this RTE component in PostForm.jsx