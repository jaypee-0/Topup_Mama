import { faLinkedin, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import React from "react";
//import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
import '../styles/Footer.scss'

export const Footer = () => {
//   interface result {
//     status: number
//     text: string
//   }
//   const formref = React.useRef
//   const sendEmail = (e: React.FormEvent) => {    
//     e.preventDefault();
//     emailjs.sendForm('service_z5tjz2r', 'template_p844h7j', formref.current, 'HaNcE9O99LOqye6Uw')
//       .then((result:result) => {
//           console.log(result);
//           if (result.status === 200) {
//             swal({
//               title: "Successful",
//               text: "Your response has been recorded.",
//               icon: "success",
//               timer: 5000,  
//             }) 
//           }
//       }, (error: result) => {
//           console.log(error.text);
//       });
//   };

	return (
		<footer className="mt-2 py-2 container">
			<div className="d-flex flex-wrap">
				<div className="col-12 col-md-4"></div>
				<div className="col-6 col-md-4">
          {/* <form ref={formref} className="position-relative" style={{width: '90%'}} onSubmit={sendEmail}> */}
            <p className="mb-0">Let's discuss</p>
          <form className="position-relative" style={{width: '90%'}}>
            <input name="message" type="text" className="w-100 py-2 border border-2 ps-3 rounded" style={{paddingRight: '3.5rem'}} placeholder="Send me a message." />
            <button className="position-absolute border border-2 h-100 rounded px-3" style={{right: 0}}><FA icon={faPaperPlane} /></button>
          </form>
        </div>
				<div className="col-6 col-md-4 social_icons">
					<h5>Social Networks</h5>
					<ul className="list-unstyled d-flex gap-4 ps-0">
						<li><a href="https://www.linkedin.com/in/jaypee-/"><FA className="fa me-2 py-2 px-2 rounded" icon={faLinkedin} /></a></li>
						<li><a href="https://facebook.com"><FA className="fa me-2 py-2 px-2 rounded" icon={faFacebookF} /></a></li>
						<li><a href="https://twitter.com"><FA className="fa me-2 py-2 px-2 rounded" icon={faTwitter} /></a></li>
					</ul>
				</div>
			</div>
			<hr />
			<i className="footer_bottom my-2">
				created by <a target='_blank' href="https://github.com/jaypee-0">Jaypee</a> - Github
			</i>
		</footer>
	);
};
