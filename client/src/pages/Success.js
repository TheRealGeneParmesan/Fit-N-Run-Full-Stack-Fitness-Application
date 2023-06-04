import '../index.css'
import krabs from '../images/mr-krabs.gif';

const Success = () => {
    return (
        <div className="successDonation">
            <h1 className="successHeader">Thank you for your Generous Donation!</h1>
            <div className="krabs">
                <img src={krabs} alt="Krabs" className="krabsImage" />
            </div>
        </div>
    )
};

export default Success;