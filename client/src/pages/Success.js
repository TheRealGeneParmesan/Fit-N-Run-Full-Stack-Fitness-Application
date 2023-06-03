import '../index.css'
import woody from '../images/woody2.jpg';

const Success = () => {
    return (
        <div className="successDonation">
            <h1>Thank you for your Generous Donation!</h1>
            <div className="woody">
                <img src={woody} alt="Woody" className="woodyImage" />
            </div>
        </div>
    )
};

export default Success;