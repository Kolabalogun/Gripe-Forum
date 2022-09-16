
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../Functions/Context";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Loader";

const Details = () => {


    const [complain, complainF] = useState(null);


    const { loader, setloader } = useGlobalContext()


    const { id } = useParams()


    useEffect(() => {
        setloader(true);
        id && getcomplainDetails();

    }, [id]);



    const getcomplainDetails = async () => {
        const docRef = doc(db, "complains", id);
        const docSnap = await getDoc(docRef);
        complainF(docSnap.data());
        setloader(false);

    };




    // #=============================================#
    // reply Info
    const dateId = new Date().toLocaleDateString();

    const [replyObj, replyObjF] = useState({

        replyTxt: "",

        dateId: dateId,
    });

    const { replyTxt } = replyObj;

    const handleReplyChange = (e) => {
        replyObjF((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // Function responsible for sending replies and comments to Firestore

    const wIP = async (e) => {
        e.preventDefault();


        if (replyObj === "") {
        } else if (replyTxt) {
            try {
                await updateDoc(doc(db, "complains", id), {
                    ...complain,
                    reply: replyObj,
                });
                toast.success("Reply uploaded");
            } catch (err) {
                console.log(err);
            }
            window.location.reload();
        } else {
            return toast.error("All fields must be filled");
        }
    };







    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <div className="report" >
                        <h5>{complain.title}</h5>

                        <p>{complain.description}</p>

                    </div>

                    <div className="commentForm">
                        <h4>Leave a Response to this Complaint</h4>



                        <form>
                            <div className="commentFlex">
                                {/* <input type="text"
                                    onChange={handleReplyChange}
                                    value={title}
                                    required
                                    minLength={4}


                                    name="title" placeholder='Title of Response' /> */}

                            </div>

                            <textarea type="text"
                                onChange={handleReplyChange}
                                value={replyTxt}
                                required
                                rows={9}
                                minLength={4}

                                name="replyTxt" placeholder='This is Where you enter all your reply' />

                            <button onClick={wIP}>Submit Response</button>
                        </form>

                    </div>


                </>
            )}
        </>
    );
};

export default Details;


