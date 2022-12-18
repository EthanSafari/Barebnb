import './FooterBar.css';

const FooterBar = () => {
    return (
        <div className="footer-bar">
            <div className='footer-options'>
                <div className='left-side'>
                    <div>©️ 2022 Barebnb, Inc. ~ </div>
                    <a href='https://github.com/EthanSafari/API-Project/blob/main/README.md'>
                        Github Repo ~
                    </a>
                    <a href='https://www.linkedin.com/in/ethan-sauri-57a9b9240/'>
                        LinkedIn Link
                    </a>
                </div>
            </div>
            <a href='https://www.youtube.com/watch?v=p7YXXieghto' className='huh'>
                Huh?
            </a>
            <div className='left-side'>
                <div>
                    <i class="fa-solid fa-globe"></i> English
                </div>
                <div>
                    $ USD
                </div>
                <div>
                    SITE UNDER CONSTRUCTION <i class="fa-solid fa-person-digging"></i>
                </div>
            </div>
        </div>
    );
};

export default FooterBar;
