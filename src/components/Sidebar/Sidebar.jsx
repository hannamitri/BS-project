import React from "react";
import { Accordion } from "@mantine/core";
import sidebar from "./Sidebar.module.scss";
import { FaPagelines } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className={sidebar.sidebar}>
      <Accordion iconPosition="right">
        <Accordion.Item
          label={
            <span>
              <FaPagelines /> Customize
            </span>
          }
        >
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
        </Accordion.Item>
        <Accordion.Item
          label={
            <span>
              <FaPagelines /> Customize
            </span>
          }
        >
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
          <br />
          Colors, fonts, shadows and many other parts are customizable to fit
        </Accordion.Item>

        <Accordion.Item
          label={
            <span>
              <FaPagelines /> Customize
            </span>
          }
        >
          Configure components appearance and behavior with vast amount of
          settings or overwrite any part of component styles
        </Accordion.Item>

        <Accordion.Item
          label={
            <span>
              <FaPagelines /> Customize
            </span>
          }
        >
          With new :focus-visible pseudo-class focus ring appears only when user
          navigates with keyboard
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Sidebar;
