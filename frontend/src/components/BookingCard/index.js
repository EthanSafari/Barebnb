import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBooking } from '../../store/booking';
import './BookingCard.css';

const BookingCard = ({ spot, guestNumber }) => {
    const dispatch = useDispatch();

    const spotBookings = useSelector(state => state.bookings.bookings);
    const bookingsArray = spotBookings ? Object.values(spotBookings) : null;

    const sessionUser = useSelector(state => state.session.user);

    const today = new Date();
    const makeDate = (date) => new Date(date);

    const [submitPushed, setSubmitPushed] = useState(false);
    const [underConstruction, setUnderConstruction] = useState(false);

    const [newStartDate, setNewStartDate] = useState(`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`);
    const [newEndDate, setNewEndDate] = useState(`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${(today.getDate() + 7).toString().padStart(2, '0') }`);

    const [guests, setGuests] = useState('1');

    const nonRefundablePrice = (num) => {
        return parseInt(num * 5).toFixed();
    };
    const refundablePrice = (num) => {
        return parseInt((num * 5) + (num + (num * .75))).toFixed();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBooking = {
            spotId: spot.id,
            userId: sessionUser.id,
            startDate: newStartDate,
            endDate: newEndDate
        };
        await dispatch(createNewBooking(newBooking)).catch((e) => {
            setSubmitPushed(true)
            setUnderConstruction(true)
        });
    }

    return (
        <form className="booking-card" onSubmit={handleSubmit}>
            <div className="price-and-rating">
                <div>
                    <p><strong>${spot.price}</strong> night</p>
                </div>
                <div>
                    <p><i class="fa-solid fa-star"></i> {spot.avgStarRating.toFixed(1)} ~ {spot.numReviews} {spot.numReviews === 1 ? (<>Review</>) : (<>Reviews</>)}</p>
                </div>
            </div>
            {bookingsArray.length > 0 && (
                <div className='unavailable-dates-container'>
                    <div className='checkout'>
                        UNAVAILABLE DATES
                    </div>
                    <div>
                        {bookingsArray.map(booking => (
                            <div className='unavailable-dates'>
                                <i class="fa-regular fa-calendar-xmark xmark-calendar"></i>
                                {`${makeDate(booking.startDate).getMonth() + 1}/${makeDate(booking.startDate).getDate()}`} - {`${makeDate(booking.endDate).getMonth() + 1}/${makeDate(booking.endDate).getDate()}`}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className='check-dates'>
                <div className='check-in-checkout'>
                    <div className='check-in'>
                        CHECK-IN
                        <input className='check-in-out-date'
                            type={'date'}
                            min={`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`}
                            onChange={(e) => setNewStartDate(e.target.value)}
                            name='Start Date'
                            value={newStartDate}
                            required
                            />
                    </div>
                    <div className='checkout'>
                        CHECKOUT
                        <input className='check-in-out-date'
                            type={'date'}
                            min={newStartDate}
                            onChange={(e) => setNewEndDate(e.target.value)}
                            value={newEndDate}
                            name='End Date'
                            required
                            />
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
                        <input type={'radio'} name='policy' defaultChecked={true} />
                    </div>
                </div>
                <div className='refundable-info'>
                    Despite this option saying that this is the refundable price to pay, if you forget to cancel within 48min of initially creating your booking, you will get nothing back and we keep all your money. Cancel by {new Date().toDateString()} to get a full refund.
                </div>
            </div>
            <button className={`reserve-button`} type='submit' disabled={sessionUser === null || bookingsArray.find(booking => booking.userId === sessionUser.id)}>
                Reserve
            </button>
            <div className='charged'>
                You will be charged once you press the button
            </div>
            {console.log(sessionUser)}
            {submitPushed && (
                <div className='submit-pushed'>
                    <div>
                        {/* **Feature under construction, will be available soon** <i style={{ color: 'red', margin: '10px', fontSize: '20px' }} class="fa-solid fa-person-digging"></i> */}
                        ** There's already a booking scheduled for those dates, please book another date**
                    </div>
                </div>
            )}
        </form>
    )
};

export default BookingCard;
