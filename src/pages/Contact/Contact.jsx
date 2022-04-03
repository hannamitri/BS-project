import styles from "./Contact.module.scss";
import { FaUserAlt, FaRegCommentAlt } from "react-icons/fa";
import {
    TextInput,
    Box,
    Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { HiOutlineAtSymbol } from "react-icons/hi";
import ContactImage from "../../images/Contact/contact.webp";

export const Contact = () => {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>GET IN TOUCH!</h1>
            <div className={styles.wrapper}>
                <div>
                    <img src={ContactImage} alt="" width={400}
                        height={400} />
                </div>

                <div>
                    <Box sx={{ minWidth: 400 }} mx="auto" className={styles.rightview}>
                        <form >
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
                        </form>
                    </Box>
                </div>
            </div>
        </main >
    );
}
