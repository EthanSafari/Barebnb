import { useState } from 'react';
import './BookingCard.css';

const BookingCard = ({ spot }) => {

    const [submitPushed, setSubmitPushed] = useState(false);

    const nonRefundablePrice = (num) => {
        return parseInt(num * 5).toFixed();
    };
    const refundablePrice = (num) => {
        return parseInt((num * 5) + (num + (num * .75))).toFixed();
    };

    return (
        <form className="booking-card">
            <div className="price-and-rating">
                <div>
                    <p><strong>${spot.price}</strong> night</p>
                </div>
                <div>
                    <p><i class="fa-solid fa-star"></i> {spot.avgStarRating.toFixed(1)} ~ {spot.numReviews} {spot.numReviews === 1 ? (<>Review</>) : (<>Reviews</>)}</p>
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
                        Non-refundable ~ ${nonRefundablePrice(spot.price)} total
                    </div>
                    <div className='non-refundable-input'>
                        <input type={'radio'} name='policy' />
                    </div>
                </div>
                <div className='refundable'>
                    <div className='refundable-price'>
                        Refundable ~ ${refundablePrice(spot.price)} total
                    </div>
                    <div className='refundable-input'>
                        <input type={'radio'} name='policy' checked={true}/>
                    </div>
                </div>
                <div className='refundable-info'>
                    Despite this option saying that this is the refundable price to pay, if you forget to cancel within 48min of initially creating your booking, you will get nothing back and we keep all your money. Cancel by {new Date().toDateString()} to get a full refund.
                </div>
            </div>
        <button className='reserve-button' type='button' onClick={e => {
            e.preventDefault();
            setSubmitPushed(true);
        }}>
            Reserve
        </button>
        <div className='charged'>
            You will be charged once you press the button
        </div>
        {submitPushed && (
            <div className='submit-pushed'>
                **Feature under construction, will be available soon**
            </div>
        )}
        </form>
    )
};

export default BookingCard;
