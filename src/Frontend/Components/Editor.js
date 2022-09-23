import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useGlobalContext } from '../../Functions/Context';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import { toast } from 'react-toastify';

export default function TextEditor() {

    const { user,
        setloader,
        notification,
        notificationF } = useGlobalContext()

    const editorRef = useRef(null);




    const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(editorRef.current.getContent());

        if (editorRef.current) {
            // if we adding new blog
            setloader(true);
            try {
                await addDoc(collection(db, "complains"), {
                    title: 'Complain',

                    description: editorRef.current.getContent(),

                    reply: {

                        replyTxt: "",

                        dateId: '',
                    },
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    userId: user.uid,

                    dateId: dateId,

                });
                setloader(false);

                toast.success("Complaint Sent");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        // navigate("/");
    };


    return (
        <>
            <Editor
                apiKey='09ki2fwskph5jnq8sg8t19u4u84hosicu07j73ckr2n5sja2'
                onInit={(evt, editor) => editorRef.current = editor}
                // initialValue="<p>This is where you input your complaints</p>"
                init={{
                    height: 400,
                    menu: {
                        file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
                        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                        view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                        insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                        table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                        help: { title: 'Help', items: 'help' }
                    },
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <p>{notification}</p>
            <button onClick={handleSubmit}>Submit Complain</button>
        </>
    );
}
