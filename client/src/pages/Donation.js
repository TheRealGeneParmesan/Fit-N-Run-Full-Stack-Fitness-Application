import '../index.css'
import DonateButton from '../donationButton';

function Donation() {
    return (
        <div className="donationpage">
            <header>
                <h1>Make a donation to our cause</h1>
                <DonateButton />
            </header>
        </div>
    )
};

export default Donation;