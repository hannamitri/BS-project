import "./Contact.scss";
import { FaUserAlt } from "react-icons/fa";
import { TextInput, Box, Textarea, Button } from "@mantine/core";
import { HiOutlineAtSymbol } from "react-icons/hi";
import ContactImage from "../../images/Contact/contact.webp";

export const Contact = () => {
  return (
    <div className="flex">
      <div className="contact__container">
        <div className="contact__wrapper">
          <div>
            <Box sx={{ minWidth: 350 }} mx="auto" className="contact__content">
              <h1 className="contact__title">GET IN TOUCH!</h1>
              <form>
                <TextInput
                  required
                  icon={<FaUserAlt size={16} />}
                  placeholder="Your name"
                />
                <TextInput
                  required
                  icon={<HiOutlineAtSymbol size={16} />}
                  placeholder="Your@email.com"
                />
                <Textarea
                  required
                  placeholder="Your Message..."
                  minRows={6}
                />
                <button className="contact__button button">Contact now</button>
              </form>
            </Box>
          </div>
          <div>
            <img src={ContactImage} alt="" width={390} height={370} />
          </div>
        </div>
      </div>
    </div>
  );
};
