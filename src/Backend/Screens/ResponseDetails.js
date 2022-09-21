
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Frontend/Components/Footer";
import { useGlobalContext } from "../../Functions/Context";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Loader";

const ResponseDetails = ({ offreplySection }) => {


    const [complain, complainF] = useState(
        {
            title: '',
            reply: {

                replyTxt: "",

                dateId: '',
            }
        }
    );


    const { loader, setloader } = useGlobalContext()


    const { id } = useParams()


    useEffect(() => {
        // setloader(true);
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









    // let nn = 19 / 09 / 2022, 15: 01: 33




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

                        <div className="report" style={{ marginTop: 30 }} >
                            <h5>Response from Admin</h5>

                            <p>{complain.reply.replyTxt}</p>

                        </div>

                    </div>
                    {/* <Footer /> */}

                </>
            )}
        </>
    );
};

export default ResponseDetails;


