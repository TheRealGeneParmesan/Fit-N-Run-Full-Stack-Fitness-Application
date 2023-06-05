import { gql, useLazyQuery } from '@apollo/client';

const DONATE = gql`
    query Query {
        donationSession
    }
`
const DonateButton = () => {
    const [startDonation, { loading, error, data }] = useLazyQuery(DONATE, {
        onCompleted: (queryData) => {
            let data = JSON.parse(queryData.donationSession);
            let donateUrl = data.url;
            window.location.assign(donateUrl);
        }
    });

    if (loading) return null;
    if (error) return `${error}`;

    return (
        <div className="donateContainer" >
            <button className="donate-button" onClick={() => startDonation()}>Donate!</button>
        </div>
    );
}

export default DonateButton;