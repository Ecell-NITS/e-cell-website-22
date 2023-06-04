import React, { useState } from 'react'
import './Createblog.css'
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam'
import axios from 'axios'
import moment from "moment-timezone";
const Createblog = () => {
    const [title, setTitle] = useState("")
    const [intro, setIntro] = useState("")
    const [tag, setTag] = useState("")
    const [tag2, setTag2] = useState("")
    const [topicpic, setTopicpic] = useState("")
    const [content, setContent] = useState("")
    const [writernmae, setWritername] = useState("")
    const [writerintro, setWriterintro] = useState("")
    const [writerpic, setWriterpic] = useState("")
    const [submitting, setSubmitting] = useState(false);

    const iscreateblogempty = () => {
        return title !== "" && intro !== "" && tag !== "" && content !== "" && writernmae!== "" && writerintro!=="" && writerpic!== "" && topicpic!=="" ;
    };

    /* button onclick function */
    const submitform = async (event) => {
        event.preventDefault();
        if (!iscreateblogempty()) {
            alert("Please fill all the required blog details");
            return;
        }

        const timestamp = moment().tz("Asia/Kolkata").format();
        setSubmitting(true);
        axios
            // .post('http://localhost:2226/createblog', {
            .post(process.env.REACT_APP_CREATEBLOG_RENDER, {
                title,
                tag,
                intro,
                content,writernmae,writerintro,writerpic,timestamp,topicpic
            })
            .then((response) => {
                setTitle("");
                setIntro("");
                setTag("");
                setContent("");
                setWritername("")
                setWriterintro("")
                setWriterpic("")
                setTopicpic("")
                // setTag2("")
                setSubmitting(false);
                alert("Blog created but publish subject to verification");
            });
    }
    return (
        <div>
            <NavbarTeam />
            <div className="mainblogmake">
                <h2 className='titletopcbl'>Add New Blog </h2>
                <div className="firstboxvreateblog">
                    <h2>Title</h2>
                    <h4 className='specificttle'>Be specific with your title</h4>
                    <input
                        type="text"
                        id="name"
                        required
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        placeholder="Enter your title"
                        className='input-common-recruit'
                    />
                </div>

                <div className="firstboxvreateblog">
                    <h2>Brief Introduction</h2>
                    <h4 className='specificttle'>Write a brief introduction to your blog in about 40-50 words</h4>
                    <input
                        type="text"
                        required
                        value={intro}
                        onChange={(event) => {
                            setIntro(event.target.value);
                        }}
                        placeholder="Enter your intro"

                        className='input-common-recruit'
                    />
                </div>

                <div className="firstboxvreateblog">
                    <h2>Content</h2>
                    <h4 className='specificttle'>Write about your topic</h4>
                    <textarea cols="30" rows="10" className='input-common-recruit' type="text"
                        required
                        value={content}
                        onChange={(event) => {
                            setContent(event.target.value);
                        }}
                    >
                    </textarea>
                </div>

                <div className="firstboxvreateblog">
                    <h2>Tags</h2>
                    <h4 className='specificttle'>Add tags to describe your blog</h4>
                    <input
                        type="text"
                        required
                        value={tag}
                        onChange={(event) => {
                            setTag(event.target.value);
                        }}
                        placeholder="Enter tags"
                        className='input-common-recruit'
                    />
                </div>

                {/* <div className="firstboxvreateblog">
                    <h2>Second tag</h2>
                    <h4 className='specificttle'>Add second tag</h4>
                    <input
                        type="text"
                        required
                        value={tag2}
                        onChange={(event) => {
                            setTag2(event.target.value);
                        }}
                        placeholder="Enter tag"
                        className='input-common-recruit'
                    />
                </div> */}

                <div className="firstboxvreateblog">
                    <h2>Topic picture</h2>
                    <h4 className='specificttle'>Add a picture to your blog</h4>
                    <input
                        type="text"
                        required
                        value={topicpic}
                        onChange={(event) => {
                            setTopicpic(event.target.value);
                        }}
                        placeholder="Enter image link"
                        className='input-common-recruit'
                    />
                </div>

                <div className="firstboxvreateblog">
                    <h2>Writer Details</h2>
                    <h4 className='specificttle'>Name</h4>
                    <input
                        type="text"
                        required
                        value={writernmae}
                        onChange={(event) => {
                            setWritername(event.target.value);
                        }}
                        placeholder="Enter name"
                        className='input-common-recruit'
                    />

                    <h4 className='specificttle'>Brief Introduction</h4>
                    <input
                        type="text"
                        required
                        value={writerintro}
                        onChange={(event) => {
                            setWriterintro(event.target.value);
                        }}
                        placeholder="Enter intro to be displayed"
                        className='input-common-recruit'
                    />

                    <h4 className='specificttle'>Photograph</h4>
                    <input
                        type="text"
                        required
                        value={writerpic}
                        onChange={(event) => {
                            setWriterpic(event.target.value);
                        }}
                        placeholder="Your photograph link"
                        className='input-common-recruit'
                    />
                </div>

                <button onClick={submitform} className='kretrhereading'>
                    {submitting ? "Posting Blog" : "Post Blog"}{" "}
                </button>
            </div>


        </div>
    )
}

export default Createblog