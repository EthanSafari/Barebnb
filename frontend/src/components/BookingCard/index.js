import './BookingCard.css';

const BookingCard = ({ spot }) => {
    return (
        <form className="booking-card">
            <div className="price-and-rating">
                <div>
                    <p><strong>${spot.price}</strong> night</p>
                </div>
                <div>
                    <p><i class="fa-solid fa-star"></i> {spot.avgStarRating.toFixed(1)} ~ {spot.numReviews} {spot.numReviews > 1 ? (<>Reviews</>) : (<>Review</>)}</p>
                </div>
            </div>
            <div className='check-dates'>
                <div className='check-in-checkout'>
                    <div className='check-in'>
                        CHECK-IN
                        <input className='check-in-out-date'
                            type={'date'} />
                    </div>
                    <div className='checkout'>
                        CHECKOUT
                        <input className='check-in-out-date'
                            type={'date'} />
                    </div>
                </div>
                <div className='guests'>
                    GUESTS
                    <div className='guests-number'>
                        1 guest
                    </div>
                </div>
            </div>
            <div className='cancellation'>
                CANCELLATION POLICIES
            </div>
            <div className='policies'>
                <div className='non-refundable'>
                    <div className='non-refundable-price'>
                        Non-refundable ~ ${spot.price * 5} total
                    </div>
                    <div className='non-refundable-input'>
                        <input type={'radio'} name='policy' />
                    </div>
                </div>
                <div className='refundable'>
                    <div className='refundable-price'>
                        Refundable ~ ${(spot.price * 5) + (spot.price + (spot.price * .75))} total
                    </div>
                    <div className='refundable-input'>
                        <input type={'radio'} name='policy' />
                    </div>
                </div>
                <div className='refundable-info'>
                    Despite this option saying that this is the refundable price to pay, if you forget to cancel within 48hrs of initially creating your booking, you will get nothing back and we keep all your money :)
                </div>
            </div>

        </form>
    )
};

export default BookingCard;
