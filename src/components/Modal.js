import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const Modal = (props) =>  {
    const [isLoaded, setIsLoaded] = useState(false);

    const wrapperRef = useRef(null);

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target))
            props.closeModal();
    }

    useEffect(() => {
        fetchImage();

        if (isLoaded)
            setComments(imageInfo.comments);

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isLoaded])

    const [imageInfo, setImageInfo] = useState();
    // Так как не работает POST запрос, создаем массив с комментариями
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const fetchImage = async () => {
        const data = await axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${props.id}`);
        setImageInfo(data.data);
        setIsLoaded(true);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const textChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (name && text) {
            const today = new Date();
            const day = `${today.getDate()}`.padStart(2, 0);
            const month = `${today.getMonth() + 1}`.padStart(2, 0);
            const year = today.getFullYear();
            const date = [day, month, year].join(".");

            const newComment = {
                date,
                id: comments.length === 0 ? 1 : comments[comments.length - 1].id + 1,
                text
            }

            setComments([...comments, newComment]);

            setName('');
            setText('');
        }

    }

    return (
        isLoaded ?
            <div className="modal-background">
                <div className="modal" ref={wrapperRef}>
                    <span className="modal-close" onClick={() => props.closeModal()}>&#10005;</span>
                        <img className="modal-image" src={imageInfo.url} alt=""/>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Ваше имя" value={name} onChange={nameChange}/>
                            <input type="text" placeholder="Ваш комментарий" value={text} onChange={textChange}/>
                            <button className="add-comment">Оставить комментарий</button>
                        </form>
                    <div className="comments">
                    {
                        comments.map(comment => {
                            return (
                                <div key={comment.id} className="comment">
                                    <p className="comment-date">{(comment.date == 1578054737927) ? '18.12.2019' : comment.date}</p>
                                    <p>{comment.text}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div> : <noscript/>
    );
}

export default Modal;