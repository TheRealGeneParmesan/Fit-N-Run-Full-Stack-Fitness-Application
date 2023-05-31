import { gql, useLazyQuery } from '@apollo/client';

const DONATE = gql`
    query Query {
        donationSession
    }
`
const DonateButton = () => {
    // lazy query doesn't run right away
    const [startDonation, { loading, error, data }] = useLazyQuery(DONATE, {
        onCompleted: (queryData) => {
            console.log(queryData);
            let data = JSON.parse(queryData.donationSession);
            console.log(data);
            let donateUrl = data.url;
            window.location.assign(donateUrl);
        }
    });

    if (loading) return null;
    if (error) return `${error}`;
    console.log(data);

    return (
        <div className="donateContainer" >
            <button className="donate-button" onClick={() => startDonation()}>Donate!</button>
        </div>
    );
}

export default DonateButton;