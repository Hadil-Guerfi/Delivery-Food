import React from "react";
import "./Contact.css";
import contactImg from "../../assets/contact-img.png";
import { FiPhoneCall } from "react-icons/fi";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";

function Contact() {
  return (
    <div className="contact">
      <div className="colored-block"></div>
      <div className="white-wave-container"> </div>

      <div className="container">
        <div className="text">
          <div className="title">Have Some Question?</div>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim est
            explicabo maxime quibusdam quaerat nihil aliquid aperiam deleniti,
            repellendus dolorum. Possimus nisi cupiditate ad veritatis?
          </span>
        </div>

        <div className="contact-flex">
          <div className="left-s">
            <img src={contactImg} />
            <div id="getin">Get in touch</div>

            <div className="icons">
              <div className="icon-block">
                <FiPhoneCall className="phone" />
                <span>-1-760-284-3410</span>
              </div>
              <div className="icon-block">
                <BsFillEnvelopeFill />
                <span>Hello@demoemail.com</span>
              </div>
              <div className="icon-block">
                <MdLocationOn />
                <span>Lorem ipsum dolor sit amet</span>
              </div>
            </div>
          </div>

          <div className="right-s">
            <div>
              <input type="text" required />
              <label>
                <AiOutlineUser />
                First Name
              </label>
            </div>

            <div>
              <input type="text" />
              <label>
                <AiOutlineUser /> Last Name
              </label>
            </div>

            <div>
              <input type="text" required />
              <label>
                <BsTelephone />
                Phone
              </label>
            </div>

            <div>
              <input type="text" required />
              <label>
                <BsEnvelope />
                Email
              </label>
            </div>

            <div>
              <input type="text" />
              <label>
                <AiOutlineBars />
                Message
              </label>
            </div>

            <input type="submit" value="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
