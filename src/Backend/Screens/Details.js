
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Frontend/Components/Footer";
import { useGlobalContext } from "../../Functions/Context";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Loader";

const Details = ({ offreplySection }) => {

    const { loader, setloader } = useGlobalContext()

    const { id } = useParams()


    const [complain, complainF] = useState({
        title: '',
        description: '',
        reply: {
            replyTxt: "",
            dateId: '',
        }
    }

    );


    useEffect(() => {
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
            setloader(true)
            try {
                await updateDoc(doc(db, "complains", id), {
                    ...complain,
                    reply: replyObj,
                });
                toast.success("Reply uploaded");
                setloader(false)
            } catch (err) {
                console.log(err);
            }

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
                    <div style={{ minHeight: '70vh' }}>

                        <div className="report" >
                            <h5>{complain.title}</h5>

                            <p>{complain.description}</p>

                        </div>
                        {!offreplySection &&
                            <div className="commentForm">
                                <h4>Leave a Response to this Complaint</h4>



                                <form>
                                    <div className="commentFlex">
                                    </div>

                                    <textarea type="text"
                                        onChange={handleReplyChange}
                                        value={replyTxt}
                                        required
                                        rows={9}
                                        minLength={4}

                                        name="replyTxt" placeholder='This is where you enter your response' />

                                    <button onClick={wIP}>Submit Response</button>
                                </form>

                            </div>}

                    </div>

                </>
            )}
        </>
    );
};

export default Details;


