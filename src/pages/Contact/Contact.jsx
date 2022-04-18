import "./Contact.scss";
import { FaUserAlt } from "react-icons/fa";
import { TextInput, Box, Textarea, Button } from "@mantine/core";
import { HiOutlineAtSymbol } from "react-icons/hi";
import ContactImage from "../../images/Contact/contact.webp";
import Sidebar from "../../components/Sidebar/Sidebar";

export const Contact = () => {
  return (
    <div className="main__container">
      <Sidebar />
      <div className="contact__container">
        <h1 className="contact__title">GET IN TOUCH!</h1>
        <div className="contact__wrapper">
          <div>
            <img src={ContactImage} alt="" width={400} height={400} />
          </div>

          <div>
            <Box sx={{ minWidth: 400 }} mx="auto" className="contact__content">
              <form>
                <TextInput
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Name"
                  placeholder="Your name"
                />
                <TextInput
                  required
                  icon={<HiOutlineAtSymbol size={16} />}
                  label="Email"
                  placeholder="Your@email.com"
                />
                <Textarea
                  required
                  label="Message"
                  placeholder="Your Message..."
                  minRows={6}
                />
                <button className="contact__button button">Contact now</button>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
