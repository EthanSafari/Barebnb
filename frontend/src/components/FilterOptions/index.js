import { useState } from 'react';
import './FilterOptions.css';

const FilterOptions = () => {

    const [underConstruction, setUnderConstruction] = useState(false);

    const iconArray = [
        {
            icon: "fa-solid fa-bugs",
            tag: 'Bedbugs',
        },
        {
            icon: "fa-solid fa-baby-carriage",
            tag: 'Noisy children'
        },
        {
            icon: "fa-brands fa-accessible-icon",
            tag: 'Racing'
        },
        {
            icon:"fa-brands fa-python",
            tag: 'Danger noodle'
        },
        {
            icon: "fa-brands fa-java",
            tag: 'Hot coffee'
        },
        {
            icon: "fa-brands fa-react",
            tag: 'Science'
        },
        {
            icon: "fa-solid fa-lungs-virus",
            tag: 'COVID-19'
        },
        {
            icon: "fa-solid fa-crow",
            tag: 'Murder'
        },
        {
            icon: "fa-brands fa-galactic-republic",
            tag: 'The better side'
        },
        {
            icon: "fa-solid fa-bowling-ball",
            tag: 'Coconuts'
        },
        {
            icon: "fa-brands fa-snapchat",
            tag: 'Ghosts'
        },
        {
            icon: "fa-solid fa-mosquito",
            tag: 'Winged ticks'
        }
    ];

    return (
        <div className="filter-options-bar">
            {iconArray.map(icon => (
                <div className='icon-card' onClick={() => setUnderConstruction(true)}>
                    <i class={`${icon.icon} icon-image ${underConstruction ? 'not-allowed' : ''}`}>
                        <div className='icon-tag'>{icon.tag}</div>
                    </i>
                </div>
            ))}
            {underConstruction && (
                <div className='icon-card not-allowed'>
                <i class={`fa-solid fa-person-digging icon-image`} style={{ color: 'red' }}>
                    <div className='icon-tag' style={{ color: 'red', textAlign: 'center'}}>Filter feature coming soon</div>
                </i>
            </div>
            )}
        </div>
    );
};

export default FilterOptions;
