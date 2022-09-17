
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../Backend/Components/Loader";
import { useGlobalContext } from "../../../Functions/Context";
import { db } from "../../../Utils/Firebase";
import Footer from "../../Components/Footer";


const ReplyDetails = () => {


    const [complain, complainF] = useState({
        title: '',
        reply: {
            replyTxt: "",
            dateId: '',
        }
    });


    const { loader, setloader } = useGlobalContext()


    const { id } = useParams()


    useEffect(() => {

        id && getcomplainDetails();

    }, [id]);



    const getcomplainDetails = async () => {
        const docRef = doc(db, "complains", id);
        const docSnap = await getDoc(docRef);
        complainF(docSnap.data());

        setloader(false);

    };


    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <div style={{ minHeight: '70vh' }}>
                        {/* <div className='topauthnav'>
                        <h1>Response</h1>

                    </div> */}
                        <div className="report" >
                            <h5>{complain.title}(Response from Admin)</h5>

                            <p>{complain.reply.replyTxt}</p>

                        </div>

                    </div>
                    <Footer />

                </>
            )}
        </>
    );
};

export default ReplyDetails;


