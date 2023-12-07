import {
	FaInstagram,
	FaYoutube,
	FaFacebook,
	FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<div className="flex flex-col sm:flex-row bg-gray-600 justify-start text-xs">
            <div className="flex flex-col text-sm text-white py-6 pl-24 gap-2">
                <p>Darts counter 2023 ©</p>
                <div className="flex text-white gap-x-2">
                    <FaInstagram className="w-5 h-5"/>
                    <FaYoutube className="w-5 h-5"/>
                    <FaFacebook className="w-5 h-5"/>
                    <FaTwitter className="w-5 h-5"/>
                </div>
            </div>
			<div className="flex flex-col py-6 pl-24">
                <p>Privacy policy</p>
                <p>User agreement</p>
                <p>Cookies</p>
            </div>
            <div className="flex flex-col py-6 pl-24">
                <p>About us</p>
                <p>Contact us</p>
            </div>
		</div>
	);
};

export default Footer;
